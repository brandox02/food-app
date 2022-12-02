import { gql, useMutation, useQuery } from '@apollo/client';
import { Breadcrumbs } from '@mantine/core';
import dayjs from 'dayjs';
import Head from 'next/head';
import Link from 'next/link';
import Router, { useRouter } from 'next/router';
import React, { useState } from 'react';
import { FiArrowLeft, FiHome } from 'react-icons/fi';
import { toast } from 'react-toastify';
import { ClaimModal } from '../../../components/ClaimModal';

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

const CREATE_CLAIM = gql`
   mutation CreateClaim($input: CreateClaimInput!) {
      createClaim(input: $input) {
      id
  }
}
`

const ORDER = gql`
  query Order($where: OrderWhereInput!) {
    order(where: $where) {
        id
         noOrder
         typeId
         details {
            id name price total isDailyDish quantity comment
         }
         statusId
         status {
          id
          name
         }
         total
         dailyDishPrice
         createdAt
      
    }
}

`

const OrderDetails = () => {
  const [claimModalOpen, setClaimModalOpen] = useState(null);
  const [createClaimMutation] = useMutation(CREATE_CLAIM);
  const { query: { id } } = useRouter();
  const { data, refetch } = useQuery(ORDER, { variables: { where: { id: parseInt(id) } }, fetchPolicy: 'cache-and-network' });
  const [updateOrderMutation] = useMutation(UPDATE_ORDER);
  const router = useRouter();
  if (!data) {
    return <div>Cargando...</div>
  }

  const cancelOrder = async () => {
    try {
      const { data } = await refetch();
      if (data.order.statusId === 2) {
        await updateOrderMutation({ variables: { input: { id: data.order.id, statusId: 5 } } });
        toast.success('Orden Cancelada correctamente');
        router.push('/');
        return;
      }

      toast.error('Ya paso el tiempo para poder cancelar este pedido');



    } catch (error) {
      toast.error('Ocurrió un error a la hora de cancelar la orden');
      console.error(error);
    }

  }

  const buildClaim = async ({ name, description }) => {
    try {
      await createClaimMutation({ variables: { input: { name, description, orderId: claimModalOpen } } });
      toast.success('Reporte generado correctamente');
      setClaimModalOpen(null);
    } catch (error) {
      toast.error('Ocurrió un error a la hora de generar el reporte');
      console.error(error);
    }
  }

  const isDailyDish = data.order.typeId === 1;
  const statusColor = (() => {
    switch (data.order.status.id) {
      case 2:
        return 'bg-gray-500';
      case 3:
        return 'bg-blue-500';
      case 4:
        return 'bg-green-500'
    }
  })();


  const items = [
    { title: <FiHome />, href: '/' },
    { title: 'Ordenes', href: '/customer/ordenes' },
    { title: 'Detalles', href: '/customer/ordenes/detalles' },
  ].map((item, index) => (
    <Link
      className="text-[#003579] font-semibold italic hover:underline underline-offset-2"
      href={item.href}
      key={index}
    >
      {item.title}
    </Link>
  ));

  return (
    <div className="w-full flex flex-col gap-6">
      <Head>
        <title>Pa&apos; Come | Detalles de la Orden</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <ClaimModal open={claimModalOpen} setOpen={setClaimModalOpen} onSave={buildClaim} />
      <div className="w-full max-w-[1750px] mx-auto lg:px-24 px-5">
        <Breadcrumbs separator=">">{items}</Breadcrumbs>
      </div>
      <div className="px-5">
        <div className="w-full lg:max-w-[850px] relative mx-auto bg-white rounded-sm shadow flex flex-col gap-3 font-[poppins]">
          <div className="flex self-end bg-yellow-400 px-4">
            <span className="font-semibold text-sm px-2 py-1">
              {dayjs(data.order.createdAt).format('DD/MM/YYYY hh:mm:ssA')}
            </span>
          </div>
          <div className="flex self-end bg-blue-700 text-white px-6" style={{ marginTop: -7 }}>
            <span className="font-semibold py-1">
              {data.order.noOrder}
            </span>
          </div>
          <div className="flex flex-col px-6 gap-2 xl:px-12">
            <div className="flex w-full justify-start -mt-4">
              <span
                className=" bg-blue-300 rounded-full p-2 cursor-pointer"
                onClick={() => Router.back()}
              >
                <FiArrowLeft className="text-white w-5 h-5" />
              </span>
            </div>
            <div className="italic font-bold self-center text-blue-900 mb-5">
              Detalles de la Orden
            </div>
            {isDailyDish && (
              <>
                <div className="w-full text-sm text-gray-500 flex justify-between">
                  <span>Plato del dia</span>
                  <span className="italic font-semibold">RD$ 150</span>
                </div>
                <div className="flex flex-col text-sm text-gray-500 pl-3 xl:pl-6">
                  {data.order.details.filter(item => item.isDailyDish).map(item => (
                    <div key={item.id} className={'my-1'}>
                      <span key={item.id}><span className='text-black'>{'X '}</span>{item.name}</span>
                      {item.comment && (
                        <div className='text-orange-600'><span className='text-black'>Nota: </span> {item.comment}</div>
                      )}
                    </div>
                  ))}
                </div>
              </>
            )}

          </div>
          <div className="flex flex-col gap-2 px-6 xl:px-12 mb-2">
            <div className="w-full text-sm text-gray-500">
              <span>{isDailyDish ? 'Extras' : 'Productos'}</span>
            </div>
            <div className="flex flex-col text-sm text-gray-500 pl-3 xl:pl-6">
              {data.order.details.filter(item => !item.isDailyDish).map(item => (
                <div key={item.id} className="flex justify-between my-1">
                  <div>
                    <span>{item.name}</span>
                    {item.comment && (
                      <div className='text-orange-600'><span className='text-black'>Nota: </span> {item.comment}</div>
                    )}
                  </div>
                  <span className="italic font-semibold">RD$ {item.total}</span>
                </div>
              ))}


            </div>
          </div>
          <div>
            <div className="bg-gray-300 py-2 flex justify-end gap-6 px-6 xl:px-12">
              <span className="font-semibold italic">Total:</span>
              <span className="font-semibold italic">RD$${data.order.total}</span>
            </div>
            <div className="flex flex-col items-center px-6 xl:px-12 py-4 gap-5">
              <div className="flex gap-2">
                <span className="font-semibold italic text-blue-900">
                  Estado:
                </span>
                <span className={`${statusColor} text-white px-3 font-semibold italic`}>
                  {data.order.status.name}
                </span>
              </div>
              <div className="flex text-blue-900 flex-col items-center text-center italic">
                <span className="text-sm">
                  ¿Has tenido algún inconveniente con esta orden?
                </span>
                <span className="text-xs">
                  Si es así, déjanos saber cómo podemos ayudarte
                </span>
              </div>
              <div className="flex flex-col items-center gap-4">
                <button onClick={() => setClaimModalOpen(data.order.id)} className="bg-orange-500 hover:bg-red-400 transition-all text-white font-semibold uppercase text-sm w-full px-10 md:px-16 rounded-lg py-2">
                  Realizar Reporte
                </button>
                {data.order.statusId === 2 && (
                  <button onClick={cancelOrder} className="bg-red-500 hover:bg-red-400 transition-all text-white font-semibold uppercase text-sm w-full px-10 md:px-16 rounded-lg py-2">
                    Cancelar Orden
                  </button>
                )}
                <Link
                  className="underline underline-offset-2 text-xs text-blue-400"
                  href="/customer/ordenes"
                >
                  Ordenes
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetails;
