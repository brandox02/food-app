import { Radio } from "@mantine/core";
import Image from "next/image";
import { useAppContext } from "../../../AppProvider";
import riceIcon from '../../../../public/icons/riceIcon.svg';
import { Controller, useFormContext } from "react-hook-form";

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
                     <Image src={riceIcon} alt="" />
                  </div>
                  <div className="flex flex-col w-full">
                     <div className="w-full flex gap-3 items-end justify-between">
                        <span className="text-2xl text-[#1A579A] font-semibold italic pl-2">
                           {item.header.name}
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
                        <div className="flex text-sm gap-1" key={option.id}>
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
            {/* <div className="flex flex-col gap-5 font-[poppins]">
               <div className="flex items-end w-full">
                  <div className="w-[30px] md:w-auto">
                     <Image src={meatIcon} alt="" />
                  </div>
                  <div className="flex flex-col w-full">
                     <div className="w-full flex items-end justify-between">
                        <span className="text-2xl text-[#1A579A] font-semibold italic pl-2">
                           Carnes
                        </span>
                        <span className="text-[10px] sm:text-xs text-right text-gray-400 italic">
                           Favor seleccionar una opción
                        </span>
                     </div>
                     <div className="h-[3px] w-full bg-red-400 self-start rounded-full"></div>
                  </div>
               </div>
               <div className=" font-semibold italic px-10 lg:px-24">
                  <Radio.Group name="meat" orientation="vertical" spacing="xs">
                     <div className="flex text-sm gap-1">
                        <input type="radio" id="pollo" name="meat" />
                        <label for="pollo">Pollo guisado</label>
                     </div>
                     <div className="flex text-sm gap-1">
                        <input type="radio" id="cerdo" name="meat" />
                        <label for="cerdo">Cerdo guisado</label>
                     </div>
                     <div className="flex text-sm gap-1">
                        <input type="radio" id="pechuga" name="meat" />
                        <label for="pechuga">Pechuga a la plancha</label>
                     </div>
                     <div className="flex text-sm gap-1">
                        <input type="radio" id="noneMeat" name="meat" value="" />
                        <label for="noneMeat">Ninguno/a</label>
                     </div>
                  </Radio.Group>
               </div>
            </div>
            <div className="flex flex-col gap-5 font-[poppins]">
               <div className="flex items-end w-full">
                  <div className="w-[30px] md:w-auto">
                     <Image src={saladIcon} alt="" />
                  </div>
                  <div className="flex flex-col w-full">
                     <div className="w-full flex items-end justify-between">
                        <span className="text-2xl text-[#1A579A] font-semibold italic pl-2">
                           Ensalada
                        </span>
                        <span className="text-[10px] sm:text-xs text-right text-gray-400 italic">
                           Favor seleccionar una opción
                        </span>
                     </div>
                     <div className="h-[3px] w-full bg-green-400 self-start rounded-full"></div>
                  </div>
               </div>
               <div className=" font-semibold italic px-10 lg:px-24">
                  <Radio.Group name="salad" orientation="vertical" spacing="xs">
                     <div className="flex text-sm gap-1">
                        <input type="radio" id="verde" name="salad" />
                        <label for="verde">Ensalada verde</label>
                     </div>
                     <div className="flex text-sm gap-1">
                        <input type="radio" id="rusa" name="salad" />
                        <label for="rusa">Ensalada rusa</label>
                     </div>
                     <div className="flex text-sm gap-1">
                        <input type="radio" id="coditos" name="salad" />
                        <label for="coditos">Ensalada de coditos</label>
                     </div>
                     <div className="flex text-sm gap-1">
                        <input type="radio" id="noneSalad" name="salad" value="" />
                        <label for="noneSalad">Ninguno/a</label>
                     </div>
                  </Radio.Group>
               </div>
            </div> */}
         </div>
         <div className="flex justify-center px-10 md:px-24">
            <button className="bg-[#0064CE] rounded-lg py-2 hover:bg-blue-600 text-white uppercase font-semibold w-full">
               Siguiente
            </button>
         </div>
      </div>
   </div>
}