import { pick } from "lodash";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { useAppContext } from "../../../../AppProvider";
import { useResolvers } from "./useResolvers"

import { yupResolver } from '@hookform/resolvers/yup'
import { schema } from "./schema";
import { useAuth } from "../../../../hooks/useAuth";



export const useActions = () => {
   const [{ user }] = useAppContext();
   const { updateUserMutation, updatePasswordMutation } = useResolvers();
   const methods = useForm({
      defaultValues: {
         user: { ...user, image: user?.imageUrl },
         tabSelected: '1', imagePickerOpen: false, currentPass: '', newPass1: '', newPass2: ''
      },
      resolver: yupResolver(schema)
   });
   const { beAuthenticated } = useAuth();

   async function onSubmit(data) {
      try {
         if (methods.watch('tabSelected') === '1') {
            const payload = pick(data.user, ['id', 'firstname', 'lastname', 'departmentId', 'image']);
            const response = await updateUserMutation({ variables: { input: payload } });
            // const user = methods.watch('user');
            // user.imageUrl = response.data.updateUser.user.imageUrl;
            await beAuthenticated(response.data.updateUser.accessToken);
            toast.success('Información actualizada correctamente');
         } else {
            const {currentPass, newPass1, newPass2} = pick(data, ['currentPass', 'newPass1', 'newPass2']);
            if(newPass1 !== newPass2){
               toast.error('La nueva contraseña no coincide con su confirmación');
               return;
            }
            const response = await updatePasswordMutation({ variables: { 
               userId: data.user.id, currentPassword: currentPass, newPassword: newPass1 
            } });

            if (response.data.updatePassword === 'UMMATCH_PASS_CURR') {
               toast.error('La contraseña actual es incorrecta!');
               
            } else if(response.data.updatePassword === 'MATCH_NEW_PASS_AND_OLD') {
               toast.error('La contraseña actual es igual a la nueva!');
            }else {

               toast.success('Contraseña actualizada correctamente');
            }
         }
      } catch (error) {
         console.error(error);
         toast.error('Ocurrió un error a la hora de actualizar la información');
      }
   }

   const setTab = tab => methods.setValue('tabSelected', tab);

   return {
      methods,
      onSubmit,
      user,
      setTab
   }
}