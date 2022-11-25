import { gql, useMutation, useQuery } from "@apollo/client";
import dayjs from "dayjs";
import { useAppContext } from "../../../AppProvider";

const ORDERS = gql`
   query Orders($where: OrderWhereInput) {
      orders: orderList(where: $where) {
         id
         noOrder
         typeId
         statusId
         details {
            id name price total isDailyDish quantity comment
         }
         total
         dailyDishPrice
         createdAt
      }
   }
`

export const useActions = () => {
   const [{ user }] = useAppContext();
   const today = dayjs().format('YYYY-MM-DD');
   const { data, refetch } = useQuery(ORDERS, {
      fetchPolicy: 'cache-and-network',
      variables: {
         where: {
            userId: user?.id, 
            fromDate: today,
            filterDateByDelivered: false,
            toDate: today,
            statusIds: [2,3,4]
         }
      }
   });

   const orders = data?.orders || [];
   const ordersOrdenated = orders.filter(item => item.statusId === 2);
   const ordersComfirmedOrDelivered = orders.filter(item => [3, 4].includes(item.statusId));

   return { orders, ordersOrdenated, ordersComfirmedOrDelivered, refetch, };
}