import { Group, Modal, Select, TextInput } from "@mantine/core";
import { useState } from "react";
import { FiPlus } from "react-icons/fi";
import { toast } from "react-toastify";

export const MenuModule = ({ title, shapeAvalibles, onAccept }) => {
  const [opened, setOpened] = useState();
  const [formSelected, setFormSelected] = useState();
  const [text, setText] = useState('')
  function add() {
    if (!text.trim() || !formSelected) return toast.error('Debes colocar un nombre y seleccionar un tipo de forma');
    setOpened(false);
    onAccept({ name: text, fieldsetTypeId: formSelected });
    setFormSelected(null);
    setText('');
  }
  return (
    <>
      <Modal
        opened={opened}
        onClose={() => setOpened(false)}
        title="Nuevo Fieldset"
      >
        <TextInput
          placeholder="Titulo"
          label="Titulo"
          value={text}
          onChange={e => setText(e.currentTarget.value)}
        />
        <Select
          label="Selecciona el tipo de forma"
          placeholder="Seleccionar una"
          value={formSelected}
          onChange={setFormSelected}
          // data={[
          //   { value: 1, label: 'Forma 1' },
          //   { value: 2, label: 'Forma 2' }
          // ]}
          data={shapeAvalibles}
        />
        <Group position="center">
          <span onClick={add} className="mr-3 md:text-sm text-xs font-semibold cursor-pointer text-white tracking-wider bg-blue-600 rounded-md px-2.5 min-h-[40px] h-full flex items-center font-[poppins] hover:text-blue-500">
            Aceptar
          </span>
        </Group>
      </Modal>
      <div className="flex items-center gap-1">
        <div className="flex items-center">
          <span onClick={() => setOpened(true)} className="mr-3 md:text-sm text-xs font-semibold cursor-pointer text-white tracking-wider bg-blue-600 rounded-md px-2.5 min-h-[40px] h-full flex items-center font-[poppins] hover:text-blue-500">
            <FiPlus size={20} />
          </span>
          <h4 className="w-52 font-semibold text-blue-400 italic font-[poppins] text-xl">
            Módulo {title}
          </h4>
        </div>
        <span className="h-[1.5px] w-full bg-gray-200 rounded-full"></span>
      </div>
    </>
  );
};
