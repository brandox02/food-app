import { Collapse, Switch } from '@mantine/core';
import React, { useState } from 'react';
import { AiOutlinePicture } from 'react-icons/ai';
import { FiChevronDown, FiChevronRight } from 'react-icons/fi';

export const MenuDishOption = ({ dish = 'Nombre del Plato' }) => {
  const [openedCollapse, setOpenedCollapse] = useState(true);
  return (
    <>
      <div className="flex gap-2">
        <Switch className="flex mt-1" />
        <div className="flex flex-col gap-2">
          <div
            className="flex items-center cursor-pointer"
            onClick={() => setOpenedCollapse((o) => !o)}
          >
            <span className="text-lg italic font-semibold">{dish}</span>
            {openedCollapse ? <FiChevronDown /> : <FiChevronRight />}
          </div>
          <Collapse in={openedCollapse}>
            <div className="flex gap-3">
              <div className="bg-gray-200 rounded-lg flex justify-center items-center px-3 py-1">
                <AiOutlinePicture size={45} />
              </div>
              <div className="flex flex-col gap-2 text-xs justify-center">
                <span className="bg-gray-200 italic px-2 text-gray-500 font-semibold">
                  imagen.png
                </span>
                <button className="text-white bg-blue-600 rounded-md py-0.5 hover:bg-blue-500">
                  Seleccionar
                </button>
              </div>
            </div>
            <button className="text-blue-400 italic text-sm underline underline-offset-2 hover:text-blue-300">
              Eliminar Sub-Categoría
            </button>
          </Collapse>
        </div>
      </div>
    </>
  );
};
