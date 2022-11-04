import { Tooltip } from '@mantine/core';
import React, { useEffect, useState } from 'react';

export const OrderCard = ({ orderTotal = '245', status = 'ordered' }) => {
  const [delivered, setDelivered] = useState(false);

  useEffect(() => {
    return () => {
      if (status == 'delivered') {
        setDelivered(true);
      } else setDelivered(false);
    };
  }, [status, delivered]);

  return (
    <div className="bg-gray-200 flex flex-col gap-3 font-[poppins] hover:scale-[98.5%] cursor-pointer transition-all">
      <div className="flex self-end bg-yellow-400">
        <span className="font-semibold text-sm px-2 py-1">
          25/10/2022 12:30 PM
        </span>
      </div>

      <div className="flex flex-col px-6 gap-2 xl:px-12">
        <div className="italic font-bold text-blue-900">
          Detalles de la Orden
        </div>
        <div className="w-full text-sm text-gray-500 flex justify-between">
          <span>Plato del dia</span>
          <span className="italic font-semibold">RD$ 150</span>
        </div>
        <div className="flex flex-col text-sm text-gray-500 pl-3 xl:pl-6">
          <span>x Arroz blanco</span>
          <span>x Pollo guisado</span>
          <span>x Ensalada Rusa</span>
        </div>
      </div>
      <div className="flex flex-col gap-2 px-6 xl:px-12 mb-2">
        <div className="w-full text-sm text-gray-500">
          <span>Extras</span>
        </div>
        <div className="flex flex-col text-sm text-gray-500 pl-3 xl:pl-6">
          <div className="flex justify-between">
            <span>x Aguacate</span>
            <span className="italic font-semibold">RD$ 50</span>
          </div>
          <div className="flex justify-between">
            <span>x Jugo Chinola 20Oz</span>
            <span className="italic font-semibold">RD$ 45</span>
          </div>
        </div>
      </div>
      <div>
        <div className="bg-gray-300 py-2 flex justify-end gap-6 px-6 xl:px-12">
          <span className="font-semibold italic">Total:</span>
          <span className="font-semibold italic">RD${orderTotal}</span>
        </div>

        {delivered ? (
          <div className="bg-green-500 py-1.5 flex justify-center">
            <span className="font-semibold text-white italic">Entregado</span>
          </div>
        ) : (
          <Tooltip
            position="bottom"
            withArrow
            label="Tiempo límite para cancelar su pedido."
            color="blue"
          >
            <div className="bg-gray-500 py-1.5 flex justify-center">
              <span className="font-semibold text-white italic">
                Ordenado (00:14:12)
              </span>
            </div>
          </Tooltip>
        )}
      </div>
    </div>
  );
};
