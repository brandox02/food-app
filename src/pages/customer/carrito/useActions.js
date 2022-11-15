import { gql, useMutation, useQuery } from "@apollo/client"
import { pick } from "lodash";
import { clone } from "lodash";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import {useAppContext} from '../../../AppProvider'


const ORDERS = gql`
   query Orders($where: OrderWhereInput) {
      orderList(where: $where) {
         id
         noOrder
         typeId
         details {
            id name price total isDailyDish quantity comment
         }
         total
         dailyDishPrice
         createdAt
         deliverDate
      }
}
`

const UPDATE_ORDER = gql`
   mutation UpdateOrder($input: UpdateOrderInput!) {
      updateOrder(input: $input) {
      id
      noOrder
      status {
         name
         id
      }
      details {
         id
         name
      }
  }
}
`

export const useActions = () => {
   const [{ user }] = useAppContext();
   const { data, refetch } = useQuery(ORDERS, { fetchPolicy: 'cache-and-network', variables: { where: { userId: user?.id, statusId: 1}} });
   const [updateOrderMutation] = useMutation(UPDATE_ORDER);
   const [orders, setOrders] = useState([]);

   useEffect(() => {
      if (data) {
         const orders = data?.orderList || [];
         setOrders(orders);
      }
   }, [data])
   
   function setOrder(order) {
      console.log({order})
      setOrders(orders => orders.map(ordersItem => ordersItem.id === order.id ? order : ordersItem));
   }

   async function onAction (order){
     
      try {
         let payload = clone(order);
         payload = pick(order,['details', 'id', 'total', 'statusId']);
         payload.details = payload.details.map(item => pick(item, ['id','name','comment', 'quantity', 'price', 'total']))
         payload.statusId = 2;
         await updateOrderMutation({ variables: { input: payload }});
         await refetch();
         toast.success('Pedido ordenado correctamente');
      } catch (error) {
         toast.error('Ocurrió un error a la hora de ordenar este pedido');
         console.error(error);
      }


   }

   return { orders, setOrder, onAction }

}