import { Switch } from "@mantine/core"
import { Controller, useFormContext } from "react-hook-form";



export const RHFSwitch = ({ name, label }) => {
   const { setValue } = useFormContext();

   return (
      <Controller
         name={name}
         render={({ field, fieldState: { error } }) => {
            return (
               <div className="flex flex-col items-center mx-5">
                  <span className="text-[#003579] font-[poppins] text-sm">
                     {label}
                  </span>
                  <Switch
                     checked={field.value}

                     onChange={(evt) => setValue(name, evt.currentTarget.checked)}
                  />
                  {error && error.type === "required" && (
                     <span className="font-[poppins] text-sm md:text-base text-[red] font-semibold">
                        Este campo es requerido
                     </span>
                  )}
               </div>
            );
         }}
      />
   )
}