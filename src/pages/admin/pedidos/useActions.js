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
   const [{ generalParameters}] = useAppContext();
   const [page, setPage] = useState(0);
   const [noOrderInput, setNoOrderInput] = useState('');

  
   const { data, refetch } = useQuery(ORDERS, {
      variables: {
         page: page, 
         where: {
            "fromDate": dayjs().format('YYYY-MM-DD'),
            "filterDateByDelivered": false,
            "toDate": dayjs().format('YYYY-MM-DD'),
            noOrder: noOrderInput,
         }
      },
      fetchPolicy: 'cache-and-network',
   });

   useEffect(() => {
      refetch();
      // eslint-disable-next-line
   }, [page])

   const orders = ((data?.orders?.items) || []).filter(x => [2,3,4].includes(x.statusId));
   const modalOrder = orders.find(item => item.id === detailModalOpen);
   const totalPages = data?.orders?.metadata.totalPages;
   const totalItems = data?.orders?.metadata.totalItems;
   const dailyDishPrice = generalParameters.find(i => i.id === 3)?.value;

   return {
      modalOrder, orders, setPage, page, totalPages,
      detailModalOpen, setDetailModalOpen, dailyDishPrice, totalItems, noOrderInput, setNoOrderInput
   }
}