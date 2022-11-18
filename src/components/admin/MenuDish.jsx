import { Modal, Switch } from '@mantine/core';
import React, { useState } from 'react';
import { AiOutlinePicture } from 'react-icons/ai';
import { FiMenu, FiTrash2 } from 'react-icons/fi';
import { RiPencilLine } from 'react-icons/ri';

export const MenuDish = ({ title }) => {
  const [openedModal, setOpenedModal] = useState(false);
  return (
    <>
      <div className="flex">
        <div className="flex w-full items-center bg-[#e9f5ff]">
          <div className="bg-[#0064CE]/30 text-gray-500 p-3 cursor-pointer hover:text-red-500">
            <FiTrash2 size={24} />
          </div>
          <div className="flex h-full w-full justify-between">
            <div className="flex items-center gap-2 px-2">
              <span className="text-2xl underline underline-offset-2 text-[#1A579A] italic font-semibold">
                {title}
              </span>
              <RiPencilLine
                className="text-blue-400 cursor-pointer"
                size={25}
              />
            </div>
            <div className="flex items-center gap-3 px-4">
              <Modal
                centered
                opened={openedModal}
                onClose={() => setOpenedModal(false)}
                title="Seleccionar ícono"
              >
                {/* Modal content */}
              </Modal>
              <button
                onClick={() => setOpenedModal(true)}
                className="bg-blue-500 hover:bg-blue-400 py-1 px-3 rounded-md text-white h-fit flex items-center gap-1"
              >
                <AiOutlinePicture />
                Seleccionar ícono
              </button>
              <Switch className="flex" />
            </div>
          </div>
        </div>
        <div className="w-fit text-2xl flex justify-center cursor-move items-center px-3 text-gray-300">
          <FiMenu />
        </div>
      </div>
    </>
  );
};
