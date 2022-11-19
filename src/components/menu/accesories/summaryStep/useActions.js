import { gql, useMutation } from '@apollo/client';
import { omit } from 'lodash';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { useAppContext } from '../../../../AppProvider';

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

export const useActions = ({summaryPayload, setSummaryPayload}) => {
   const [{ generalParameters }] = useAppContext();
  
   const [createOrderMutation] = useMutation(CREATE_ORDER_MUTATION);
   const router = useRouter();
   const [canOrder, setCanOrder] = useState(true);

   useEffect(() => {
    const hourLimit = parseInt(generalParameters.find(item => item.id === 2)?.value || 0);
    const countDownDate = dayjs().set('hours', hourLimit).set('minutes', 0).set('seconds', 0).set('millisecond', 0);
    if (countDownDate.diff(dayjs(), 'milliseconds') < 0) {
      setCanOrder(false);
      toast.error('Ya paso el tiempo para poder ordenar por hoy');
    }

    // eslint-disable-next-line
  }, []);

   async function createOrder({ statusId }) {
      try {
         let payload = { statusId, ...summaryPayload};
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


   return { order: summaryPayload, setOrder: setSummaryPayload, createOrder, canOrder }
}