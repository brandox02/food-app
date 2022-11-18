import Router from 'next/router';
import React, { useState } from 'react';
import { FiArrowLeft, FiHome } from 'react-icons/fi';
import { OrderSummary } from '../../../../../components/order-summary';
import { useActions } from './useActions';

export const SummaryStep = ({ summaryPayload, setSummaryPayload, goBack }) => {


  const { createOrder, order, setOrder, canOrder } = useActions({ summaryPayload, setSummaryPayload });

  return (

    <div className="px-5">
      <div className="w-full lg:max-w-[850px] relative mx-auto bg-white rounded-sm shadow flex flex-col px-6 md:px-14 py-8 gap-8">
        <div className=" text-center flex flex-col gap-2 font-[poppins] text-[#1A579A]">
          <div className="md:absolute flex w-full md:justify-start justify-center lg:-ml-8 md:-mt-4 mb-2 md:mb-0">
            <span
              className=" bg-blue-300 rounded-full p-2 cursor-pointer"
              onClick={goBack}
            >
              <FiArrowLeft className="text-white w-5 h-5" />
            </span>
          </div>
          <span>Aqui te mostramos tu resumen de Orden</span>
        </div>

        <OrderSummary order={order} setOrder={setOrder} />


        <div className="flex justify-between mt-8 px-10 md:px-24">
          <button
            onClick={() => createOrder({ statusId: 1 })}
            disabled={!canOrder}
            className={
              'bg-blue-500 rounded-lg py-2 hover:bg-blue-400 text-white uppercase font-semibold w-full'
            }
          >
            Agregar al carrito
          </button>
          <button
            onClick={() => createOrder({ statusId: 2 })}
            disabled={!canOrder}
            className={
              true
                ? 'bg-gray-300 rounded-lg py-2 hover:bg-gray-200 text-white uppercase font-semibold w-full'
                : 'bg-green-500 rounded-lg py-2 hover:bg-green-400 text-white uppercase font-semibold w-full'
            }
          >
            Ordenar
          </button>
        </div>

      </div>
    </div>

  );
};

