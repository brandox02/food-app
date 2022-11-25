import { Radio } from "@mantine/core";
import { useAppContext } from "../../../AppProvider";
import { Controller, useFormContext } from "react-hook-form";
import unknownFoodImage from '../../../../public/assets/unknown-food.jpg';
import { ZoomImage } from "./ZoomImage";

export function RadioGroup({ item }) {
   const { setValue, trigger, formState: { isSubmitted } } = useFormContext();
   const concatName = (name) => `stepOne.${name}`;

   function onChange(e) {
      setValue(concatName(item.id), e);
      isSubmitted && trigger();
   }

   return (
      <Controller
         name={concatName(item.id)}
         render={({ field, fieldState: { error, }, formState: { isSubmitted } }) => (
            <div className="flex flex-col gap-5 font-[poppins]">
               <div className="flex items-end w-full">
                  <div className="w-[30px] md:w-auto">
                     {/* <Image width={100} height={100} src={riceIcon} alt="" /> */}
                  </div>
                  <div className="flex flex-col w-full">
                     <div className="mb-1 w-full flex gap-3 items-end justify-between">
                        <span className="items-center  flex text-2xl text-[#1A579A] font-semibold italic pl-2">
                           <ZoomImage className="rounded" src={item.header?.imageUrl ? item.header.imageUrl : unknownFoodImage} alt={'image'} width={60} height={60} />
                           <span className="ml-2">{item.header.name}</span>
                        </span>
                        <span className="text-[10px] sm:text-xs text-right text-gray-400 italic">
                           Favor seleccionar una opción
                        </span>
                     </div>
                     <div className="h-[3px] w-full bg-yellow-400 self-start rounded-full"></div>
                  </div>
               </div>
               <div className=" font-semibold italic px-10 lg:px-24">
                  <Radio.Group name={item.id} orientation="vertical" spacing="xs" onChange={onChange} value={field.value}>
                     {item.items.map(option => (
                        <div className="flex text-sm gap-1 border items-center p-1" key={option.id}>

                           <ZoomImage className="rounded mr-2" src={option?.imageUrl ? option.imageUrl : unknownFoodImage} alt={'img'} width={140} height={140} />
                           <Radio value={option.id} label={option.name} />
                        </div>
                     ))}
                  </Radio.Group>
                  {error && (
                     <span className="font-[poppins] text-sm md:text-base text-[red] font-semibold">
                        {error.type === "required" ? 'Debes Selecionar una opción' : error.message}
                     </span>
                  )}
               </div>
            </div >
         )}
      />

   )
}

export function MainStep({ items }) {
   const [{ generalParameters }] = useAppContext();
   const dailyDishPrice = parseFloat(generalParameters.find(item => item.id === 3)?.value || 0);

   return <div className="px-5">
      <div className="w-full lg:max-w-[850px] mx-auto bg-white rounded-sm shadow flex flex-col px-6 md:px-14 py-8 gap-8">
         <div className=" text-center flex font-[poppins] text-[#1A579A]">
            <span>
               Este es nuestro menú del día de hoy, recuerda que el monto total
               del plato del día sin importar la opción que selecciones es de{' '}
               <span className="font-semibold">RD${dailyDishPrice}</span>
            </span>
         </div>
         <div className="flex flex-col gap-6 mb-10">
            {items.map(item => (

               <RadioGroup item={item} key={item.id} />

            ))}
         </div>
         <div className="flex justify-center px-10 md:px-24">
            <button className="bg-[#0064CE] rounded-lg py-2 hover:bg-blue-600 text-white uppercase font-semibold w-full">
               Siguiente
            </button>
         </div>
      </div>
   </div>
}