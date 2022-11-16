import { useForm } from "react-hook-form"
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { gql, useLazyQuery, useQuery } from "@apollo/client"
import { useAppContext } from '../../../AppProvider'
import dayjs from "dayjs"
import { useState } from "react"
// const schema= yup.object({
//    keyDateId: yup.number().required(), fromDate: yup.date().required(), toDate: yup.date().required()
// });

const QUERY = gql`
   query Orders($page: Float,$where: OrderWhereInput) {
   orders(page: $page, where: $where) {
      items {
         id
         createdAt
         deliverDate
         noOrder
         type {
            name id
         }
         details {
            name
            price
            quantity
            total
         }
         total
      }
      metadata {
         totalItems
         perPage
         totalPages
      }
  }
  moneyAccumulatedMonth
}
`

export const useActions = () => {
   const [{ user }] = useAppContext()
   const [page, setPage] = useState(1);

   const methods = useForm({
      // resolver: yupResolver(schema),
      defaultValues: { keyDateId: 1, fromDate: null, toDate: null }
   });

   const { data } = useQuery(QUERY, {
      variables: {
         where: {
            "userId": user.id,
            "statusId": 4,
            "fromDate": dayjs(methods.watch('fromDate') || new Date()).format('YYYY-MM-DD'),
            "filterDateByDelivered": methods.watch('keyDateId') === 2,
            "toDate": dayjs(methods.watch('toDate') || new Date()).format('YYYY-MM-DD'),
         }, page: page -1
      },
      fetchPolicy: 'cache-and-network'
   });

   const orders = data?.orders.items || [];
   const totalPages = data?.orders?.metadata?.totalPages || 0;

   const onAction = async (data) => {
      
      console.log(data);
   }

   const clear = () => {
      methods.setValue('fromDate', null);
      methods.setValue('toDate', null);

   }

   return { methods, onAction, clear, orders, moneyAccumulatedMonth: data?.moneyAccumulatedMonth || 0, page,setPage,totalPages }
}