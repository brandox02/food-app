import { gql, useMutation } from "@apollo/client";
import { Modal } from "@mantine/core"
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { useAppContext } from "../AppProvider";
import { FormProvider } from './react-hook-form/FormProvider'
import { RHFTextarea } from "./react-hook-form/RHFTextarea";


const UPDATE_CLAIM = gql`
   mutation UpdateClaim($input: UpdateClaimInput!){
      updateClaim(input: $input){
         id
      }
   }
`

export const ClaimModal = ({ open, setOpen, onSave, claim, refetch }) => {
   const [updateClaimMutation] = useMutation(UPDATE_CLAIM);
   const [{ user }] = useAppContext();
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

   async function checkDone() {
      try {

         await updateClaimMutation({ variables: { input: { id: claim.id, done: true } } });
         toast.success('Reporte marcado como realizado exitoso correctamente');
         setOpen(false);
         refetch && refetch();
      } catch (error) {
         toast.error('Ocurrió un error al momento de marcar como realizado este reporte');
         console.error(error);
      }
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
               {claim ?

                  user.role.id === 3 && !claim.done && (
                     <div className="flex" onClick={checkDone}>
                        <span className="flex justify-center cursor-pointer mt-5 bg-blue-500 hover:bg-blue-400 transition-all text-white font-semibold uppercase text-sm w-full px-10 md:px-16 rounded-lg py-2">
                           MARCAR COMO REALIZADO
                        </span>
                     </div>
                  )
                  :
                  <button className=" mt-5 bg-blue-500 hover:bg-blue-400 transition-all text-white font-semibold uppercase text-sm w-full px-10 md:px-16 rounded-lg py-2">
                     Aceptar
                  </button>}
            </FormProvider>
         </div>

      </Modal>
   )
}