import { Collapse, Switch } from "@mantine/core";
import Image from "next/image";
import { useState } from "react";
import { AiOutlinePicture } from "react-icons/ai";
import { FiChevronDown, FiChevronRight } from "react-icons/fi";
import { toast } from "react-toastify";
import { MenuDish } from "../../../../components/admin/MenuDish"

export const MenuDishOption = ({ remove, update, dish, isDailyDish, item, onLoadImage }) => {
   const [openedCollapse, setOpenedCollapse] = useState(false);
   return (
      <>
         <div className="flex gap-2">
            <Switch className="flex mt-1" onClick={() => update({ key: 'enabled', value: !item?.enabled })} checked={item?.enabled} />
            <div className="flex flex-col gap-2">
               <div
                  className="flex items-center cursor-pointer"
                  onClick={() => setOpenedCollapse((o) => !o)}
               >
                  <span className="text-lg italic font-semibold">{dish}</span>
                  {openedCollapse ? <FiChevronDown /> : <FiChevronRight />}
               </div>
               <Collapse in={openedCollapse}>
                  {!isDailyDish && <div className="flex gap-3 mb-5">
                     <div className="flex justify-center items-center w-fit border-2 border-[#1A579A] rounded-lg font-[poppins]">
                        <span className="text-gray-400 px-3">$</span>
                        <input
                           className="outline-none max-w-[100px] px-1 font-[poppins] py-2 h-full"
                           type="text"
                           placeholder="0"
                           value={item.price}
                           disabled={isDailyDish}
                           onChange={e => update({ key: 'price', value: parseInt(e.currentTarget.value || 0) })}
                        />
                        <span className="bg-blue-100 rounded-lg py-2 px-3 text-gray-400">
                           DOP
                        </span>
                     </div>
                  </div>}
                  <div className="flex gap-3">

                     {item?.image ? <Image className="rounded" src={item.image} height={70} width={70} alt={'image'} /> : (
                        <div className="bg-gray-200 rounded-lg flex justify-center items-center px-3 py-1">
                           <AiOutlinePicture size={45} />
                        </div>
                     )}
                     <div className="flex flex-col gap-2 text-xs justify-center">
                        <button onClick={onLoadImage} className="text-white bg-blue-600 rounded-md p-1 hover:bg-blue-500">
                           Seleccionar
                        </button>
                     </div>
                  </div>
                  <button onClick={remove} className="text-blue-400 italic text-sm underline underline-offset-2 hover:text-blue-300">
                     Eliminar item
                  </button>
               </Collapse>
            </div>
         </div>
      </>
   );
};

export const ShapeOne = ({ item, addShapeOneItem, removeShapeOneItem, updateShapeOneItem, removeShapeOne, updateShapeOne, isDailyDish, executeImagePickerModal }) => {
   const [text, setText] = useState('');
   function newItem() {
      if (text.trim()) {
         addShapeOneItem({ id1: item.id, name: text.trim() })
         setText('');
         return;
      }
      toast.error('No puedes agregar un item sin nombre');

   }
   return <div className="flex flex-col gap-5">
      <MenuDish
         onSelecIcon={() => executeImagePickerModal({ onLoadFn: (image) => updateShapeOne({ id: item.id, key: 'image', value: image }), image: item.header?.image })}
         title={item.header.name}
         onRemove={() => removeShapeOne({ id: item.id })}
         updateTitle={(text) => updateShapeOne({ id: item.id, key: 'name', value: text })}
         togleEnabled={() => updateShapeOne({ id: item.id, key: 'enabled', value: !item.header?.enabled })}
         enabled={item.header?.enabled}
      />
      <div>
         <div className="flex justify-center items-center w-fit border-2 border-[#1A579A] rounded-lg font-[poppins]">
            <span className="text-gray-400 px-3">$</span>
            <input
               className="outline-none max-w-[300px] px-1 font-[poppins] py-2 h-full"
               type="text"
               placeholder="Nuevo item"
               onChange={e => setText(e.currentTarget.value)}
               value={text}
            />

            <span className="cursor-pointer bg-blue-100 rounded-lg py-2 px-3 text-gray-400" style={{ color: '#3B81F6', fontStyle: 'oblique' }} onClick={newItem}>
               Agregar
            </span>
         </div>
      </div>
      {item.items.map(x => (
         <MenuDishOption
            isDailyDish={isDailyDish}
            item={x}
            dish={x.name}
            key={x.id}
            remove={async () => await removeShapeOneItem({ id1: item.id, id2: x.id })}
            update={({ key, value }) => updateShapeOneItem({ id1: item.id, id2: x.id, key, value })}
            onLoadImage={() => executeImagePickerModal({ onLoadFn: (image) => updateShapeOneItem({ id1: item.id, id2: x.id, key: 'image', value: image }), image: x?.image })}
         />
      ))}

   </div>
}