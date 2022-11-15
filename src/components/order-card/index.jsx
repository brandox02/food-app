import { Tooltip } from '@mantine/core';
import Link from 'next/link';
import React, { use, useEffect, useState } from 'react';
import dayjs from 'dayjs';


export const OrderCard = ({ order }) => {

   const isDailyDish = order.typeId === 1;
   const diffSeconds = dayjs().diff(dayjs(order.createdAt), 'seconds');
   const [counterDate, setCounterDate] = useState(dayjs().set('seconds', diffSeconds).set('minutes', 0).set('hours', 0).set('milliseconds', 0));
   const [intervalToken, setIntervalToken] = useState(false);
   console.log({ diffSeconds })

   useEffect(() => {


      const intervalToken = setInterval(() => {
         setCounterDate(counter => counter.subtract(1, 'seconds'));

      }, 1000);
      setIntervalToken(intervalToken);


      return () => {
         clearInterval(intervalToken);
      }
      // eslint-disable-next-line
   }, []);


   useEffect(() => {
      const diff = counterDate.diff(dayjs(), 'seconds');
      console.log(diff)
      if (diff < 0) {
         clearInterval(intervalToken);
      }
      //eslint-disable-next-line
   }, [counterDate])

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
                                 Ordenado ({counterDate.format('hh:mm:ss')})
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
