import { Collapse, Switch } from "@mantine/core"
import { useState } from "react"
import { FiChevronDown, FiChevronRight } from "react-icons/fi"
import { MenuDish } from "../../../../components/admin/MenuDish"

export const SizeItem = ({ item, remove, update }) => {
   const [openedCollapse, setOpenedCollapse] = useState(false);
   const [editing, setEditing] = useState(false);

   const onNameChange = (evt) => update({ key: 'name', value: evt.currentTarget.value });
   return <>
      <div className="flex gap-2">
         <Switch className="flex mt-1" checked={item?.enabled} onClick={() => update({ key: 'enabled', value: !item?.enabled })} />
         <div className="flex flex-col gap-2">
            <div
               className="flex items-center cursor-pointer"

            >
               {editing ? (
                  <input
                     className="text-lg font-semibold cursor-text"
                     value={item.name}
                     onChange={onNameChange}
                     onBlur={() => setEditing(false)}
                  />
               ) : (
                  <span onClick={() => setEditing(true)} className="text-lg cursor-text font-semibold">{item.name}</span>
               )}
               <div
                  className=""
                  onClick={() => setOpenedCollapse((o) => !o)}
               >
                  {openedCollapse ? <FiChevronDown size={30} /> : <FiChevronRight size={30} />}
               </div>
            </div>
            <Collapse in={openedCollapse}>
               <div className="flex gap-3">
                  <div className="flex justify-center items-center w-fit border-2 border-[#1A579A] rounded-lg font-[poppins]">
                     <span className="text-gray-400 px-3">$</span>
                     <input
                        className="outline-none max-w-[100px] px-1 font-[poppins] py-2 h-full"
                        type="text"
                        placeholder="0"
                        value={item.price}
                        onChange={e => update({ key: 'price', value: parseFloat(e.currentTarget.value || 0) })}
                     />
                     <span className="bg-blue-100 rounded-lg py-2 px-3 text-gray-400">
                        DOP
                     </span>
                  </div>
               </div>
               <button onClick={remove} className="text-blue-400 italic text-sm underline underline-offset-2 hover:text-blue-300">
                  Eliminar
               </button>
            </Collapse>
         </div>
      </div>
   </>
}

export const FlavorItem = ({ item, remove, update }) => {
   const [editing, setEditing] = useState(false);

   const onNameChange = (evt) => update({ key: 'name', value: evt.currentTarget.value });
   return <>
      <div className="flex gap-2">
         <Switch className="flex mt-1" checked={item?.enabled} onClick={() => update({ key: 'enabled', value: !item?.enabled })} />
         <div className="flex flex-col gap-2">
            <div
               className="flex items-center cursor-pointer"

            >
               {editing ? (
                  <input
                     className="text-lg font-semibold cursor-text"
                     value={item.name}
                     onChange={onNameChange}
                     onBlur={() => setEditing(false)}
                  />
               ) : (
                  <span onClick={() => setEditing(true)} className="text-lg cursor-text font-semibold">{item.name}</span>
               )}
               <button onClick={remove} className="ml-2 text-blue-400 italic text-sm underline underline-offset-2 hover:text-blue-300">
                  Eliminar
               </button>
            </div>
         </div>
      </div>
   </>
}

export const ShapeTwo = ({ item, updateShapeTwoItem, addShapeTwoItem, removeShapeTwo, removeShapeTwoItem, updateShapeTwo, executeImagePickerModal }) => {
   const [sizeText, setSizeText] = useState('');
   const [flavorText, setFlavorText] = useState('');

   const onAddItem = ({ isSize }) => {
      isSize ? setSizeText('') : setFlavorText('');
      addShapeTwoItem({ id: item.id, name: isSize ? sizeText : flavorText, isForSize: isSize })
   };

   return <div className="flex flex-col gap-5">
      <MenuDish
         onSelecIcon={() => executeImagePickerModal({ onLoadFn: (image) => updateShapeTwo({ id: item.id, key: 'image', value: image }), image: item.header?.image })}
         title={item.header.name}
         onRemove={() => removeShapeTwo({ id: item.id })}
         updateTitle={(value) => updateShapeTwo({ id: item.id, key: 'name', value })}
         togleEnabled={() => updateShapeTwo({ id: item.id, key: 'enabled', value: !item.header?.enabled })}
         enabled={item.header?.enabled}
      />
      <div>
         <span className="">Tamaños</span>

         <div>
            <div className="flex justify-center items-center w-fit border-2 border-[#1A579A] rounded-lg font-[poppins] mb-3">
               <span className="text-gray-400 px-3">$</span>
               <input
                  className="outline-none max-w-[300px] px-1 font-[poppins] py-2 h-full"
                  type="text"
                  placeholder="Nuevo tamaño"
                  onChange={e => setSizeText(e.currentTarget.value)}
                  value={sizeText}
               />

               <span
                  onClick={() => onAddItem({ isSize: true })}
                  className="cursor-pointer bg-blue-100 rounded-lg py-2 px-3 text-gray-400"
                  style={{ color: '#3B81F6', fontStyle: 'oblique' }}
               >
                  Agregar
               </span>
            </div>
         </div>
         {item.sizes.map(x =>
            <SizeItem
               key={x.id}
               item={x}
               remove={() => removeShapeTwoItem({ id1: item.id, id2: x.id, isForSize: true })}
               update={({ key, value }) => updateShapeTwoItem({ id1: item.id, id2: x.id, key, value, isForSize: true })}
            />
         )}
      </div>
      <div>
         <span className="">Sabores</span>
         <div>
            <div className="flex justify-center items-center w-fit border-2 border-[#1A579A] rounded-lg font-[poppins] mb-3">
               <span className="text-gray-400 px-3">$</span>
               <input
                  className="outline-none max-w-[300px] px-1 font-[poppins] py-2 h-full"
                  type="text"
                  placeholder="Nuevo sabor"
                  onChange={e => setFlavorText(e.currentTarget.value)}
                  value={flavorText}
               />

               <span
                  onClick={() => onAddItem({ isSize: false })}
                  className="cursor-pointer bg-blue-100 rounded-lg py-2 px-3 text-gray-400"
                  style={{ color: '#3B81F6', fontStyle: 'oblique' }}
               >
                  Agregar
               </span>
            </div>
         </div>
         {item.flavors.map(x =>
            <FlavorItem
               key={x.id}
               item={x}
               remove={() => removeShapeTwoItem({ id1: item.id, id2: x.id, isForSize: false })}
               update={({ value, key }) => updateShapeTwoItem({ id1: item.id, id2: x.id, key, value, isForSize: false })}
            />
         )}
      </div>
   </div>
}