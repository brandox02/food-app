import { gql, useQuery } from "@apollo/client";
import Image from "next/image"
import Link from "next/link"
import bell from '../../../../../../public/assets/campana.png';
import * as dayjs from 'dayjs';

const ORDERS = gql`
   query Orders($page: Float,$where: OrderWhereInput) {
   orders(page: $page, where: $where) {
      metadata {
         totalItems
      }
  }
}
`;
export const Pedidos = () => {

   const { data } = useQuery(ORDERS, {
      variables: {
         page: 0,
         where: {
            "fromDate": dayjs().format('YYYY-MM-DD'),
            "filterDateByDelivered": false,
            "toDate": dayjs().format('YYYY-MM-DD'),
            statusIds: [2, 3, 4]
         }
      },
      fetchPolicy: 'cache-and-network',
   });

   const totalItems = data ? data.orders.metadata.totalItems : 0;

   return (
      <div className="lg:w-full relative w-full max-w-[400px] mx-auto rounded-lg shadow-md flex flex-col justify-around font-[poppins] items-center px-3 xl:px-10 min-h-[350px] py-6 gap-6 text-center bg-white">
         <div className="w-fit absolute right-0 top-0 p-4">
            <Image src={bell} alt="Bell" />
         </div>
         <span className="text-blue-900 italic text-xl md:text-2xl px-3 xl:px-5">
            Pedidos
         </span>
         <div className="border-4 text-7xl italic border-blue-500 text-blue-500 p-6 rounded-full">
            {totalItems}
         </div>
         <Link
            className="text-lg underline underline-offset-2 italic text-blue-500"
            href="/admin/pedidos"
         >
            Ver todos
         </Link>
      </div>
   )
}