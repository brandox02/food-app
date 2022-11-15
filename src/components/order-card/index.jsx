import { Tooltip } from '@mantine/core';
import Link from 'next/link';
import React from 'react';
import dayjs from 'dayjs';
import Countdown from 'react-countdown'

export const OrderCard = ({ order }) => {

   const isDailyDish = order.typeId === 1;
   const diff = dayjs().diff(dayjs(order.createdAt), 'milliseconds');
   const dateWithDiff = dayjs().subtract(diff, 'milliseconds').toDate();
   function generateSeq(size, count) {
      const breakpoint = size - count.toString().length;
      const result =
         [...Array(breakpoint)].map(() => '0').join('') + count.toString();
      return result;
   }

   return (
      <Link href={`/customer/ordenes/${order.id}`}>
         <div className="bg-gray-200 flex flex-col gap-3 font-[poppins] hover:scale-[98.5%] cursor-pointer transition-all">
            <div className="flex self-end bg-yellow-400">
               <span className="font-semibold text-sm px-2 py-1">
                  {dayjs(order.createdAt).format('DD/MM/YYYY hh:mmA')}
               </span>
            </div>
            <div className="flex flex-col px-6 gap-2 xl:px-12">
               <div className="italic font-bold text-blue-900">
                  Detalles de la Orden
               </div>
               {isDailyDish && (
                  <>
                     <div className="w-full text-sm text-gray-500 flex justify-between">
                        <span>Plato del dia</span>
                        <span className="italic font-semibold">RD$ {order.dailyDishPrice}</span>
                     </div>
                     <div className="flex flex-col text-sm text-gray-500 pl-3 xl:pl-6">
                        {order.details.filter(item => item.isDailyDish).map(item => (
                           <span key={item.id}>* {item.name}</span>
                        ))}
                     </div>
                  </>
               )}
            </div>
            <div className="flex flex-col gap-2 px-6 xl:px-12 mb-2">
               <div className="w-full text-sm text-gray-500">
                  <span>{isDailyDish ? 'Extras' : ''}</span>
               </div>
               <div className="flex flex-col text-sm text-gray-500 pl-3 xl:pl-6">
                  {order.details.filter(item => !item.isDailyDish).map(item => (
                     <div key={item.id}>
                        <div className="flex justify-between">
                           <span>* {item.name}</span>
                           <span className="italic font-semibold">RD$ ${item.total}</span>
                        </div>
                     </div>
                  ))}

               </div>
            </div>
            <div>
               <div className="bg-gray-300 py-2 flex justify-end gap-6 px-6 xl:px-12">
                  <span className="font-semibold italic">Total:</span>
                  <span className="font-semibold italic">RD${order.total}</span>
               </div>
               {(() => {
                  switch (order.statusId) {
                     case 2:
                        return (<Tooltip
                           position="bottom"
                           withArrow
                           label="Tiempo límite para cancelar su pedido."
                           color="blue"
                        >
                           <div className="bg-gray-500 py-1.5 flex justify-center">
                              <span className="font-semibold text-white italic">
                                 {'Ordenado'} <Countdown date={dateWithDiff} renderer={({ hours, minutes, seconds, completed }) => {
                                    return <span>{`${generateSeq(2, hours)}:${generateSeq(2, minutes)}:${generateSeq(2, seconds)}`}</span>
                                 }} />

                              </span>
                           </div>
                        </Tooltip>);
                     case 3:
                        return (
                           <div className="bg-blue-500 py-1.5 flex justify-center">
                              <span className="font-semibold text-white italic">Confimado</span>
                           </div>
                        )
                     case 4:
                        return (
                           <div className="bg-green-500 py-1.5 flex justify-center">
                              <span className="font-semibold text-white italic">Entregado</span>
                           </div>
                        )
                  }
               })()}

            </div>
         </div>
      </Link>
   );

};
