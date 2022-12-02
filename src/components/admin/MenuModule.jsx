import { Group, Modal, Select, TextInput } from '@mantine/core';
import { useState } from 'react';
import { FiPlus } from 'react-icons/fi';
import { toast } from 'react-toastify';

export const MenuModule = ({ title, shapeAvalibles, onAccept }) => {
  const [opened, setOpened] = useState();
  const [formSelected, setFormSelected] = useState();
  const [text, setText] = useState('');
  function add() {
    if (!text.trim() || !formSelected)
      return toast.error(
        'Debes colocar un nombre y seleccionar un tipo de forma'
      );
    setOpened(false);
    onAccept({ name: text, fieldsetTypeId: formSelected });
    setFormSelected(null);
    setText('');
  }
  return (
    <>
      <Modal
        centered
        opened={opened}
        onClose={() => setOpened(false)}
        title={
          <div className="w-fit">
            <span className="text-blue-900 text-xl font-semibold">
              {'Agregar nueva categoría'}
            </span>
            <div className="h-[3px] w-44 bg-blue-400 self-start rounded-full"></div>
          </div>
        }
      >
        <div className="flex flex-col gap-2 mb-6">
          <TextInput
            placeholder="Título"
            label="Título"
            value={text}
            onChange={(e) => setText(e.currentTarget.value)}
          />
          <Select
            label="Selecciona el tipo de forma:"
            placeholder="Seleccionar"
            value={formSelected}
            onChange={setFormSelected}
            data={shapeAvalibles}
          />
        </div>
        <Group position="center">
          <span
            onClick={add}
            className="md:text-sm text-xs font-semibold cursor-pointer text-white tracking-wider bg-blue-600 rounded-md px-5 min-h-[40px] h-full flex items-center font-[poppins] hover:text-blue-500"
          >
            Aceptar
          </span>
        </Group>
      </Modal>
      <div className="flex items-center gap-1">
        <div className="flex items-center">
          <span
            onClick={() => setOpened(true)}
            className="mr-3 md:text-sm text-xs font-semibold cursor-pointer text-white tracking-wider bg-blue-600 rounded-md px-2.5 min-h-[40px] h-full flex items-center font-[poppins] hover:text-blue-500"
          >
            <FiPlus size={20} />
          </span>
          <h4 className="w-auto whitespace-nowrap pr-2 font-semibold text-blue-400 italic font-[poppins] text-xl">
            Módulo {title}
          </h4>
        </div>
        <span className="h-[1.5px] w-full bg-gray-200 rounded-full"></span>
      </div>
    </>
  );
};
