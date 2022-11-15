import { gql, useMutation } from '@apollo/client';
import { omit } from 'lodash';
import { useRouter } from 'next/router';
import { toast } from 'react-toastify';
import { useAppContext } from '../../../AppProvider';

const CREATE_ORDER_MUTATION = gql`
   mutation CreateOrder($createOrderInput: CreateOrderInput!) {
   createOrder(input: $createOrderInput) {
      id
      createdAt
      updatedAt
      noOrder
      deliverDate
      total
      
      details {
         id name quantity price total
      }
      seq
   }
   }
`

export const useActions = () => {
   const [{ toSummary }, setGlobalState] = useAppContext();
  
   const [createOrderMutation] = useMutation(CREATE_ORDER_MUTATION);
   const router = useRouter();

   async function createOrder({ statusId }) {
      try {
         let payload = { statusId, ...toSummary};
         payload.details = payload.details.map(item => omit(item, 'id'));
         
         await createOrderMutation({ variables: { createOrderInput: payload } });
         const message = statusId === 1 ? 'Pedido agregado al carrito correctamente, puedes seguir agregando al carrito mas pedidos' : 'Pedido ordenado correctamente'
         toast.success(message);


         router.push('/');


      } catch (error) {
         toast.error('Ocurrió un error a la hora de procesar tu pedido');
         console.error(error);
      }
   }



   const setOrder = (order) => setGlobalState(state => ({...state, toSummary: order}));

   return { order: toSummary, setOrder, createOrder }
}