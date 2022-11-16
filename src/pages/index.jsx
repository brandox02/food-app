import { gql, useQuery } from '@apollo/client';
import { Breadcrumbs } from '@mantine/core';
import dayjs from 'dayjs';
import Head from 'next/head';
import Link from 'next/link';
import { FiHome } from 'react-icons/fi';
import { useAppContext } from '../AppProvider';
import { MainGrid } from '../components/customer/home/MainGrid';
import { OrderCard } from '../components/order-card'

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
      moneyAccumulatedMonth
   }
`

export default function Home() {

  const [{ user }] = useAppContext();
  const today = dayjs().format('YYYY-MM-DD');
  const { data } = useQuery(ORDERS, {
    fetchPolicy: 'cache-and-network',
    variables: {
      where: {
        userId: user?.id,
        fromDate: today,
        filterDateByDelivered: true,
        toDate: today,
      }
    }
  });

  const orders = data?.orders || [];

  const items = [
    { title: <FiHome />, href: '/' },

  ].map((item, index) => (
    <Link
      className="text-[#003579] font-semibold italic hover:underline underline-offset-2"
      href={item.href}
      key={index}
    >
      {item.title}
    </Link>
  ));
  if (user) {
    return (
      <div className="h-full">
        <Head>
          <title>Pa&apos; Come | Inicio</title>
          <meta name="description" content="Generated by create next app" />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <div className="w-full max-w-[1750px] mx-auto lg:px-24 px-5 mb-6 text-[#003579] font-[poppins] font-semibold">
          <Breadcrumbs separator=">" className='pb-3'>{items}</Breadcrumbs>
          <span>
            ¡Bienvenido,{' '}
            <span className="text-[#4278bf]">{`${user.firstname} ${user.lastname}`}</span>
            !
          </span>
        </div>
        <MainGrid accMount={data?.moneyAccumulatedMonth || 0} />
        <div className="w-full">
          <div className="w-full flex flex-col gap-5 max-w-[1750px] bg-white mx-auto px-10 lg:px-24 py-8">
            <div className=" w-fit">
              <span className="text-blue-900 text-2xl font-semibold">
                Tus ordenes de hoy
              </span>
              <div className="h-[3px] w-40 bg-blue-400 self-start rounded-full"></div>
            </div>
            <div className="grid lg:grid-cols-3 gap-5 lg:gap-10">
              {orders.map(order => (
                <OrderCard order={order} key={order.id} />
              ))}

            </div>
          </div>
        </div>
      </div>
    );
  }
}
