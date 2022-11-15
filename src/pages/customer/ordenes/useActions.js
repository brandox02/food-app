import { gql, useQuery } from "@apollo/client";
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
   const [{user}] = useAppContext();
   const {data} = useQuery(ORDERS, {
      fetchPolicy: 'cache-and-network',
      variables: { where: {userId: user?.id}}
   });

   const orders = data?.orders || [];
   const ordersOrdenated = orders.filter(item => item.statusId === 2);
   const ordersComfirmedOrDelivered = orders.filter(item => [3,4].includes(item.statusId));

   return {orders, ordersOrdenated, ordersComfirmedOrDelivered};
}