import { useForm } from "react-hook-form"
import { schema } from "./accesories/schema";
import { yupResolver } from '@hookform/resolvers/yup'
import { useAuth } from '../../hooks/useAuth';
import { pick } from "lodash";
import { toast } from "react-toastify";
import { useRouter } from "next/router";


export const useActions = () => {
   const methods = useForm({
      resolver: yupResolver(schema)
   });
   const { login } = useAuth();
   const router = useRouter();

   const onSubmit = async (data) => {
      try {

         const payload = pick(data, ['email', 'password']);
         await login(payload);
         await router.push('/');
         window.location.reload();
         // setTimeout(() => {

         // }, 2000);
         // toast.success('Haz iniciado sesión correctamente');
      } catch (error) {
         let message;
          switch(error.message){
            case 'Resource not found':
               message = 'Credenciales incorrectas';
               break;
            case 'Unauthorized':
               message = 'Credenciales incorrectas';
               break;
            case 'UNACTIVE_USER':
               message = 'Este usuario debe ser activado por un administrador';
               break;
            default:
                  message = 'Ocurrió un error al momento de iniciar sesión';
                  break;
         }
         console.error(error);

         
         toast.error(message);
      }

   }

   return { methods, onSubmit }
}