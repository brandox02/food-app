import { Group, Modal, Tabs } from '@mantine/core';
import Head from 'next/head';

import { FiEye, FiPlus, FiTrash2 } from 'react-icons/fi';
import { AiFillEdit } from 'react-icons/ai';
import { BiSave } from 'react-icons/bi';

import AdminLayout from '../../../components/admin/Layout';
import { MenuModule } from '../../../components/admin/MenuModule';
import { ShapeOne } from './accesories/ShapeOne';

import { ShapeTwo } from './accesories/ShapeTwo';
import { useActions } from './useActions';
import { PreviewModal } from './accesories/PreviewModal';
import { useState } from 'react';
import { useDebounce } from '../../../hooks/useDebounce';
import { toast } from 'react-toastify';
import { ImagePicker } from '../../../components/image-picker';

function MenuBarItem({
  menu,
  setSelectedMenu,
  updateMenuMutation,
  deleteMenuMutation,
  setMenus,
}) {
  const [isHover, setIsHover] = useState(false);
  const [editable, setEditable] = useState(false);
  const [text, setText] = useState(menu.name);
  const [confirmDeleteModal, setConfirmDeleteModal] = useState(false);
  const { debounce } = useDebounce({
    debounceTime: 1500,
    execute: async () => {
      try {
        if (text === '') {
          setMenus((item) =>
            item.id === menu.id ? { ...menu, name: text } : item
          );
          toast.error('No puedes dejar el nombre del menu vacio');
          return;
        }
        await updateMenuMutation({
          variables: { input: { id: menu.id, name: text } },
        });
        toast.success('Nombre de menu actualizado correctamente');
      } catch (error) {
        toast.error('Ocurrió un error al actualizar el nombre del menú');
        console.error(error);
      }
    },
  });

  const onChange = (evt) => {
    const { value } = evt.currentTarget;
    setText(value);
    debounce();
  };

  const onDelete = async () => {
    try {
      if (menu.id === 1) {
        toast.error('No puedes eliminar el menu del plato del día');
        return;
      }
      await deleteMenuMutation({ variables: { id: menu.id } });
      setSelectedMenu('1');
      setMenus((menus) => menus.filter((item) => item.id !== menu.id));
      toast.success('Menu eliminado correctamente');
      setConfirmDeleteModal(false);
    } catch (error) {
      toast.error('Ocurrió un error al borrar el menú');
      console.error(error);
    }
  };

  return (
    <div
      className="flex flex-col"
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
    >
      <Modal
        centered
        opened={!!confirmDeleteModal}
        title={`¿Seguro que deseas eliminar el siguiente menú: ${menu.name}?`}
        onClose={() => setConfirmDeleteModal(false)}
      >
        <Group position="center">
          <button
            onClick={onDelete}
            className=" text-white bg-blue-400 hover:bg-blue-300 flex items-center py-1.5 px-4 gap-2 uppercase"
          >
            Confirmar
          </button>
        </Group>
      </Modal>
      <Tabs.Tab
        key={menu.id}
        className="text-white hover:text-[#1A579A] font-[poppins]"
        value={menu.id.toString()}
        onClick={() => setSelectedMenu(menu.id.toString())}
      >
        {editable ? (
          <input value={text} className="py-1 text-black" onChange={onChange} />
        ) : (
          <span>{text}</span>
        )}
      </Tabs.Tab>
      {isHover && (
        <div className='flex justify-around m-2'>
          <div
            onClick={() => setConfirmDeleteModal(true)}
            className="bg-[#0064CE]/30 text-gray-500 flex px-1.5 items-center cursor-pointer hover:text-red-500"
          >
            <FiTrash2 size={24} />
          </div>
          <div
            onClick={() => setEditable(!editable)}
            className="bg-[#0064CE]/30 text-gray-500 flex px-1.5 items-center cursor-pointer  hover:text-blue-500"
          >
            <AiFillEdit size={24} />
          </div>
        </div>
      )}
    </div>
  );
}

const Menu = () => {
  const {
    json,
    addShapeOneItem,
    removeShapeOneItem,
    updateShapeOneItem,
    addShapeOne,
    removeShapeOne,
    updateShapeOne,
    updateShapeTwoItem,
    addShapeTwoItem,
    addShapeTwo,
    removeShapeTwo,
    removeShapeTwoItem,
    updateShapeTwo,
    dailyDishPrice,
    onSave,
    setDailyDishPrice,
    openPreviewModal,
    setOpenPreviewModal,
    typeId,
    selectedMenu,
    setSelectedMenu,
    menus,
    addMenu,
    deleteMenuMutation,
    updateMenuMutation,
    setMenus,
    openImagePickerModal,
    setImagePickerModal,
    executeImagePickerModal,
    onLoadImagePickerFn,
    imagePicker,
    setImagePicker,
  } = useActions();

  return (
    <>
      <Head>
        <title>Pa&apos; Come Admin | Menú</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <ImagePicker
        open={openImagePickerModal}
        setOpen={setImagePickerModal}
        onLoad={onLoadImagePickerFn.fn}
        image={imagePicker}
        setImage={setImagePicker}
      />
      <PreviewModal
        menu={{ typeId, items: json }}
        open={openPreviewModal}
        setOpen={setOpenPreviewModal}
      />
      <AdminLayout>
        <div className="w-full flex flex-col gap-8">
          <div className="flex w-full items-center justify-between">
            <div className="w-fit">
              <span className="text-blue-900 text-2xl font-semibold">
                Administrar Menú
              </span>
              <div className="h-[3px] w-40 bg-blue-400 self-start rounded-full"></div>
            </div>
            <div>
              <button
                onClick={onSave}
                className=" text-white bg-blue-400 hover:bg-blue-300 flex items-center py-1.5 px-4 gap-2 uppercase italic rounded-md"
              >
                <BiSave />
                Guardar
              </button>
              <button
                onClick={() => setOpenPreviewModal(true)}
                className="mt-5 bg-yellow-400 hover:bg-yellow-300 flex items-center py-1.5 px-4 gap-2 uppercase italic rounded-md"
              >
                <FiEye className="shrink-0" />
                Vista Previa
              </button>
            </div>
          </div>
          <div>
            <Tabs variant="pills" value={selectedMenu}>
              <Tabs.List className="w-100 gap-3 bg-[#1A579A] px-5 py-1.5 rounded-md font-semibold">
                {menus.map((menu) => (
                  <MenuBarItem
                    key={menu.id}
                    setMenus={setMenus}
                    menu={menu}
                    setSelectedMenu={setSelectedMenu}
                    updateMenuMutation={updateMenuMutation}
                    deleteMenuMutation={deleteMenuMutation}
                  />
                ))}
                <span
                  onClick={addMenu}
                  className="md:text-sm self-center text-xs font-semibold cursor-pointer text-white tracking-wider bg-blue-600 rounded-md px-2.5 min-h-[40px] h-full flex items-center font-[poppins] hover:text-blue-500"
                >
                  <FiPlus size={20} />
                </span>
              </Tabs.List>
              {/* PLATO DEL DIA JSX*/}
              <Tabs.Panel value={'1'} pt="xs">
                <div className="flex flex-col gap-5">
                  <div className="py-4 flex flex-col gap-2">
                    <span className="text-[#1A579A] font-semibold">
                      Precio del plato del día
                    </span>
                    <div className="flex justify-center items-center w-fit border-2 border-[#1A579A] rounded-lg font-[poppins]">
                      <span className="text-gray-400 px-3">$</span>
                      <input
                        className="outline-none max-w-[100px] px-1 font-[poppins] py-2 h-full"
                        type="text"
                        placeholder="150"
                        value={dailyDishPrice}
                        onChange={(e) =>
                          setDailyDishPrice(
                            parseInt(e.currentTarget.value || 0)
                          )
                        }
                      />
                      <span className="bg-blue-100 rounded-lg py-2 px-3 text-gray-400">
                        DOP
                      </span>
                    </div>
                  </div>
                  <MenuModule
                    title="Plato del día"
                    onAccept={({ name }) => addShapeOne({ name, extra: false })}
                    shapeAvalibles={[{ value: 1, label: 'Forma 1' }]}
                  />
                  {json
                    .filter((x) => !x.extra)
                    .map((x) => (
                      <ShapeOne
                        executeImagePickerModal={executeImagePickerModal}
                        isDailyDish={true}
                        key={x.id}
                        item={x}
                        updateShapeOne={updateShapeOne}
                        removeShapeOne={removeShapeOne}
                        addShapeOneItem={addShapeOneItem}
                        removeShapeOneItem={removeShapeOneItem}
                        updateShapeOneItem={updateShapeOneItem}
                      />
                    ))}
                  <MenuModule
                    title="Extras"
                    onAccept={({ name, fieldsetTypeId }) =>
                      fieldsetTypeId === 1
                        ? addShapeOne({ name, extra: true })
                        : addShapeTwo({ name })
                    }
                    shapeAvalibles={[
                      { value: 1, label: 'Forma 1' },
                      ,
                      { value: 2, label: 'Forma 2' },
                    ]}
                  />
                  {json
                    .filter((x) => x.extra)
                    .map((x) =>
                      x.fieldsetTypeId === 1 ? (
                        <ShapeOne
                          executeImagePickerModal={executeImagePickerModal}
                          isDailyDish={false}
                          key={x.id}
                          item={x}
                          updateShapeOne={updateShapeOne}
                          removeShapeOne={removeShapeOne}
                          addShapeOneItem={addShapeOneItem}
                          removeShapeOneItem={removeShapeOneItem}
                          updateShapeOneItem={updateShapeOneItem}
                        />
                      ) : (
                        <ShapeTwo
                          executeImagePickerModal={executeImagePickerModal}
                          key={x.id}
                          item={x}
                          updateShapeTwoItem={updateShapeTwoItem}
                          addShapeTwoItem={addShapeTwoItem}
                          removeShapeTwo={removeShapeTwo}
                          removeShapeTwoItem={removeShapeTwoItem}
                          updateShapeTwo={updateShapeTwo}
                        />
                      )
                    )}
                </div>
              </Tabs.Panel>
              {menus.filter(x => x.id !== 1).map(menu => {
                return (

                  <Tabs.Panel key={menu.id} value={menu.id.toString()} pt="xs">
                    <div className="flex flex-col gap-5">
                      <MenuModule
                        title={menu.name}
                        onAccept={({ name, fieldsetTypeId }) =>
                          fieldsetTypeId === 1
                            ? addShapeOne({ name, extra: true })
                            : addShapeTwo({ name })
                        }
                        shapeAvalibles={[
                          { value: 1, label: 'Forma 1' },
                          ,
                          { value: 2, label: 'Forma 2' },
                        ]}
                      />
                      {json
                        .filter((x) => x.extra)
                        .map((x) =>
                          x.fieldsetTypeId === 1 ? (
                            <ShapeOne
                              executeImagePickerModal={executeImagePickerModal}
                              isDailyDish={false}
                              key={x.id}
                              item={x}
                              updateShapeOne={updateShapeOne}
                              removeShapeOne={removeShapeOne}
                              addShapeOneItem={addShapeOneItem}
                              removeShapeOneItem={removeShapeOneItem}
                              updateShapeOneItem={updateShapeOneItem}
                            />
                          ) : (
                            <ShapeTwo
                              executeImagePickerModal={executeImagePickerModal}
                              key={x.id}
                              item={x}
                              updateShapeTwoItem={updateShapeTwoItem}
                              addShapeTwoItem={addShapeTwoItem}
                              removeShapeTwo={removeShapeTwo}
                              removeShapeTwoItem={removeShapeTwoItem}
                              updateShapeTwo={updateShapeTwo}
                            />
                          )
                        )}
                    </div>
                  </Tabs.Panel>

                )
              })}
            </Tabs>
          </div>
        </div>
      </AdminLayout>
    </>
  );
};

export default Menu;
