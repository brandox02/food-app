import { Modal } from "@mantine/core"
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { FormProvider } from '../../../components/react-hook-form/FormProvider'
import { RHFTextarea } from "../../../components/react-hook-form/RHFTextarea";

export const ClaimModal = ({ open, setOpen, onSave, claim }) => {
   const methods = useForm({
      defaultValues: {
         name: claim?.name,
         description: claim?.description
      }
   });

   useEffect(() => {
      methods.reset(claim);
      // eslint-disable-next-line
   }, [claim])

   async function onSubmit(...params) {
      await onSave(...params);
      methods.reset();
   }

   return (
      <Modal
         title={claim ? "Reporte" : <span className="">Realizar reporte</span>} opened={open}
         onClose={() => setOpen(false)}
      >
         <div className="p-2">
            <FormProvider methods={methods} onSubmit={onSubmit}>

               <RHFTextarea disabled={claim} name={'name'} minRows={1} autosize withAsterisk label="Asunto" />

               <RHFTextarea disabled={claim} name={'description'} minRows={5} autosize withAsterisk className={''} label="Descripción" />
               {!claim && (
                  <button className=" mt-5 bg-blue-500 hover:bg-blue-400 transition-all text-white font-semibold uppercase text-sm w-full px-10 md:px-16 rounded-lg py-2">
                     Aceptar
                  </button>
               )}
            </FormProvider>
         </div>

      </Modal>
   )
}