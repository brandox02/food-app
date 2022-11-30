import { gql, useQuery } from "@apollo/client";
import { useEffect, useState } from "react"
import { useAppContext } from "../../../AppProvider";

const ORDERS = gql`
   query Orders($page: Float,$where: OrderWhereInput) {
   orders(page: $page, where: $where) {
      items {
         id
         createdAt
         deliverDate
         noOrder
         statusId
         status {
            id name
         }
         type {
            name id
         }
         user {
            firstname lastname
            id
            department {
               id
               name
            }
            email
         }
         details {
            name
            price
            quantity
            total
            comment
         }
         total
      }
      metadata {
         totalItems
         perPage
         totalPages
      }
  }
}
`;


export const useActions = () => {
   const [detailModalOpen, setDetailModalOpen] = useState(null);
   const [{ generalParameters }] = useAppContext();
   const [page, setPage] = useState(0);
   const [noOrderInput, setNoOrderInput] = useState('');
   const [confirmModalAllOrderDelivered, setConfirmModalAllOrderDelivered] = useState(false);

   //   const [markAsDeliveredAllMutation] = useMutation(MARK_AS_DELIVERED_ALL);
   const { data, refetch } = useQuery(ORDERS, {
      variables: {
         page, 
         where: {
            "fromDate": dayjs().format('YYYY-MM-DD'),
            "filterDateByDelivered": false,
            "toDate": dayjs().format('YYYY-MM-DD'),
            noOrder: noOrderInput,
            statusId: 4
         }
      },
      fetchPolicy: 'cache-and-network',
   });

   useEffect(() => {
      refetch();
      // eslint-disable-next-line
   }, [page])

   // const markAllAsDeliveredAll = async () => {
   //    try {
         
   //       const {data} = await markAsDeliveredAllMutation();
   //       if(!data.markAsDeliveredToday){
   //          throw new Error()
   //       }
   //       await refetch();
   //       setConfirmModalAllOrderDelivered(false);
   //       toast.success('Todas las ordenes de hoy fueron marcadas como entregadas');
   //    } catch (error) {
   //       console.error(error);
   //       toast.error('Ocurrió un error a la hora de marcar todas las ordenes de hoy como entregadas');

   //    }
   // }

   const orders = (data?.orders?.items) || [];
   const modalOrder = orders.find(item => item.id === detailModalOpen);
   const totalPages = data?.orders?.metadata.totalPages;
   const totalItems = data?.orders?.metadata.totalItems;
   const dailyDishPrice = generalParameters.find(i => i.id === 3)?.value;
   


   return {
      modalOrder, orders, setPage, page, totalPages,
      detailModalOpen, setDetailModalOpen, dailyDishPrice, totalItems, noOrderInput, setNoOrderInput,
      confirmModalAllOrderDelivered, setConfirmModalAllOrderDelivered,
   
   }
}