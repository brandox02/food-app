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
         console.log(data);
         const payload = pick(data, ['email', 'password']);
         await login(payload);

         
         router.push('/');
         toast.success('Haz iniciado sesión correctamente');
      } catch (error) {
         console.error(error);

         const message= error.message === 'Resource not found' ? 'Credenciales incorrectas' : 'Ocurrió un error a la hora de iniciar sesión';
         toast.error(message);
      }

   }

   return { methods, onSubmit }
}