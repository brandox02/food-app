import { Switch } from '@mantine/core';
import React, { useState } from 'react';
import { AiOutlinePicture } from 'react-icons/ai';
import { FiTrash2 } from 'react-icons/fi';
import { RiPencilLine } from 'react-icons/ri';

export const MenuDish = ({ title, onRemove, updateTitle, togleEnabled, enabled, onSelecIcon }) => {
  const [editing, setEditing] = useState(false);


  function onChange(e) {
    const { value } = e.currentTarget;
    updateTitle(value);
  }

  return (
    <>
      <div className="flex">
        <div className="flex w-full items-center bg-[#e9f5ff]">
          <div onClick={onRemove} className="bg-[#0064CE]/30 text-gray-500 p-3 cursor-pointer hover:text-red-500">
            <FiTrash2 size={24} />
          </div>
          <div className="flex h-full w-full justify-between">
            <div className="flex items-center gap-2 px-2">
              {editing ?
                <input value={title} onChange={onChange} className="text-2xl underline underline-offset-2 text-[#1A579A] italic font-semibold" type='text' /> :
                <span className="text-2xl underline underline-offset-2 text-[#1A579A] italic font-semibold">
                  {title}
                </span>}
              <RiPencilLine
                onClick={() => setEditing(!editing)}
                className="text-blue-400 cursor-pointer"
                size={25}
              />
            </div>
            <div className="flex items-center gap-3 px-4">
              <button
                onClick={onSelecIcon}
                className="bg-blue-500 hover:bg-blue-400 py-1 px-3 rounded-md text-white h-fit flex items-center gap-1"
              >
                <AiOutlinePicture />
                Seleccionar ícono
              </button>
              <Switch className="flex" checked={enabled} onClick={togleEnabled} />
            </div>
          </div>
        </div>
        {/* <div className="w-fit text-2xl flex justify-center cursor-move items-center px-3 text-gray-300">
          <FiMenu />
        </div> */}
      </div>
    </>
  );
};
