import { useForm } from "react-hook-form"
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { gql, useLazyQuery, useQuery } from "@apollo/client"
import { useAppContext } from '../../../AppProvider'
import dayjs from "dayjs"
// const schema= yup.object({
//    keyDateId: yup.number().required(), fromDate: yup.date().required(), toDate: yup.date().required()
// });

const QUERY = gql`
   query Orders($page: Float,$where: OrderWhereInput) {
   orders(page: $page, where: $where) {
      id
      createdAt
      deliverDate
      noOrder
      details {
         name
         price
         quantity
         total
      }
      total
  }
  moneyAccumulatedMonth
}
`

export const useActions = () => {
   const [{ user }] = useAppContext()


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
         }, page: 0
      }
   });

   const orders = data?.orders || [];

   const onAction = async (data) => {
      
      console.log(data);
   }

   const clear = () => {
      methods.setValue('fromDate', null);
      methods.setValue('toDate', null);

   }

   return { methods, onAction, clear, orders, moneyAccumulatedMonth: data?.moneyAccumulatedMonth || 0 }
}