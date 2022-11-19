import { Radio } from '@mantine/core';
import React from 'react';
import { FiArrowLeft, FiPlus } from 'react-icons/fi';
import { useAppContext } from '../../../AppProvider';
import dayjs from 'dayjs';
import { v4 as generateId } from 'uuid'
import { Controller, useFormContext } from 'react-hook-form';

export function ProductPickerType1({ item }) {
   const { setValue } = useFormContext();
   const concatName = (name) => `extrasStep.${item.id}.${name}`;

   function onClick({ id, value }) {
      if (value < 0) return;
      setValue(concatName(id), value);
   }
   return (

      <div className="flex flex-col gap-2">
         <span className="text-orange-400 font-semibold">
            {item.header.name}
         </span>
         {item.items.map(product => {
            return (
               <Controller
                  key={product.id}
                  name={concatName(product.id)}
                  render={({ field }) => {
                     const quantity = field.value || 0;
                     return <div key={product.id} className="flex justify-between w-full max-w-[300px]">
                        <div>
                           {product.name} <span className="font-semibold">RD${product.price}</span>
                        </div>
                        <div className="p-1 bg-orange-400 rounded-full active:scale-95"
                           onClick={() => onClick({ id: product.id, value: quantity - 1 })}
                        >
                           -
                        </div>
                        <div className="p-1 bg-orange-400 rounded-full active:scale-95"
                           onClick={() => onClick({ id: product.id, value: quantity + 1 })}
                        >
                           <FiPlus className="text-white" />
                        </div>

                        <span>{quantity}</span>
                     </div>
                  }} />

            )
         })}
      </div>




   )
}

export function PorductPickerType2({ item }) {
   const { setValue, watch } = useFormContext();
   const concatFlavorName = () => `extrasStep.${item.id}.flavor`;
   const concatSizeName = (name) => `extrasStep.${item.id}.size.${name}`;

   const onClick = ({ value, id }) => {
      if (value < 0) return;
      setValue(concatSizeName(id), value);
   };
   const onChange = (value) => setValue(concatFlavorName(), value);
   const disabled = Object.values(watch(`extrasStep.${item.id}.size`) || {}).every(x => !x);
   return <>
      <div className="flex flex-col gap-2">
         <span className="text-orange-400 font-semibold">{item.header.name}</span>
         <span className="text-sm font-semibold text-blue-900">
            Tamaño
         </span>
         {item.sizes.map(size => (
            <Controller
               name={concatSizeName(size.id)}
               key={size.id}
               render={({ field }) => {
                  const quantity = field.value || 0;
                  return (
                     <div className="flex justify-between w-full max-w-[300px]">
                        <div>
                           {size.name} <span className="font-semibold">RD${size.price}</span>
                        </div>
                        <div className="p-1 bg-orange-400 rounded-full active:scale-95" onClick={() => onClick({ id: size.id, value: quantity - 1 })}>
                           {'-'}
                        </div>
                        <div className="p-1 bg-orange-400 rounded-full active:scale-95" onClick={() => onClick({ id: size.id, value: quantity + 1 })}>
                           <FiPlus className="text-white" />
                        </div>
                        <span>{quantity}</span>
                     </div>
                  )
               }}
            />

         ))}
      </div>
      <div className="flex flex-col gap-2">

         <span className="text-sm font-semibold text-blue-900">
            {'Sabores'}
         </span>
         <Controller
            name={concatFlavorName()}
            render={({ field }) => {
               return <Radio.Group
                  className="pl-5"
                  name={concatFlavorName()}
                  orientation="vertical"
                  spacing="xs"
                  value={field.value}
                  onChange={onChange}
               >
                  {item.flavors.map(flavor => (
                     <div key={flavor.id} className="flex text-sm gap-1" >
                        <Radio value={flavor.id} label={flavor.name} disabled={disabled} />
                     </div>
                  ))}

               </Radio.Group>
            }} />


      </div>

   </>
}

export const ExtrasStep = ({ goBack, items }) => {
   const [{ user }, setGlobalState] = useAppContext();

   function onSummary() {
      // const payload = {
      //    "details": [
      //       {
      //          "name": "Carne Asada",
      //          "price": 0,
      //          "quantity": 0,
      //          "total": 0,
      //          "isDailyDish": true,
      //          id: generateId(),
      //          "comment": ""
      //       },
      //       {
      //          "name": "Arroz Blanco",
      //          "price": 0,
      //          "quantity": 0,
      //          "total": 0,
      //          "isDailyDish": true,
      //          id: generateId(),
      //          "comment": ""
      //       },
      //       {
      //          "name": "Habichuela",
      //          "price": 0,
      //          "quantity": 0,
      //          "total": 0,
      //          "isDailyDish": true,
      //          id: generateId(),
      //          "comment": ""
      //       },
      //       {
      //          "name": "Aguacate",
      //          "price": 50,
      //          "quantity": 1,
      //          "total": 50,
      //          "isDailyDish": false,
      //          id: generateId(),
      //          "comment": ""
      //       },
      //       {
      //          "name": "Bollito de Yuca",
      //          "price": 50,
      //          "quantity": 1,
      //          "total": 50,
      //          "isDailyDish": false,
      //          id: generateId(),
      //          "comment": ""
      //       },

      //    ],
      //    "total": 350,
      //    "userId": user.id,
      //    "deliverDate": dayjs().add(1, 'day').toDate(),
      //    "typeId": 1,
      //    "dailyDishPrice": 250
      // }

      const payload = {
         "details": [
            {
               "name": "Aguacate",
               "price": 50,
               "quantity": 1,
               "total": 50,
               "isDailyDish": false,
               "id": generateId(),
               "comment": ""
            },
            {
               "name": "Bollito de Yuca",
               "price": 50,
               "quantity": 1,
               "total": 50,
               "isDailyDish": false,
               "id": generateId(),
               "comment": ""
            },
            {
               "name": "Patica de cerdo",
               "price": 100,
               "quantity": 1,
               "total": 100,
               "isDailyDish": false,
               "id": generateId(),
               "comment": ""
            },

         ],
         "total": 200,
         "userId": user.id,
         "deliverDate": dayjs().add(1, 'day').toDate(),
         "typeId": 1,
         "dailyDishPrice": 0
      }

      setGlobalState(state => ({ ...state, toSummary: payload }));

      // router.push('/customer/summary');
   }

   return (
      <div className="w-full flex flex-col gap-6">
         <div className="px-5">
            <div className="w-full lg:max-w-[850px] relative mx-auto bg-white rounded-sm shadow flex flex-col px-6 md:px-14 py-8 gap-8">
               <div className=" text-center flex flex-col font-[poppins] text-[#1A579A]">
                  <div className="md:absolute flex w-full md:justify-start justify-center lg:-ml-8 md:-mt-4 mb-2 md:mb-0">
                     <div
                        className=" bg-blue-300 rounded-full p-2 cursor-pointer"
                        href="/customer/lunch"
                        onClick={goBack}
                     >
                        <FiArrowLeft className="text-white w-5 h-5" />
                     </div>
                  </div>
                  <span>Antes de terminar, ¿Deseas agregar un adicional?</span>
                  <span className="text-gray-400">
                     Recuerda que el total del extra se te sumará al monto del plato
                     del día.
                  </span>
               </div>
               <div className="flex flex-col w-full font-[poppins]">
                  <div className="w-full flex items-end justify-between">
                     <span className="text-2xl text-[#1A579A] font-semibold italic pl-2">
                        Extras
                     </span>
                     <span className="text-xs text-gray-400 italic">
                        Selecciona lo que desees
                     </span>
                  </div>
                  <div className="h-[3px] w-full bg-orange-400 self-start rounded-full"></div>
               </div>
               {items.length ? (
                  <div className="flex flex-col gap-6 italic px-10 lg:px-20 font-[poppins]">
                     {items.map(item => {
                        switch (item.fieldsetTypeId) {
                           case 1:
                              return <ProductPickerType1 item={item} key={item.id} />
                           case 2:
                              return <PorductPickerType2 item={item} key={item.id} />
                           default:
                              return ''
                        }
                     })}
                  </div>
               ) : <div>No hay extras en estos momentos</div>}
               <div className="flex justify-center mt-8 px-10 md:px-24">
                  <button type='submit' onClick={() => { }} className="bg-[#0064CE] rounded-lg py-2 hover:bg-blue-600 text-white uppercase font-semibold w-full">
                     Ver Resumen de Orden
                  </button>
               </div>
            </div>
         </div>
      </div>
   );
};

