import { yupResolver } from "@hookform/resolvers/yup";
import { pick } from "lodash";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { useAuth } from "../../hooks/useAuth";
import { isValidEmail } from "../../utils/isValidEmail";
import { schema } from "./accesories/schema";



export const useActions = () => {
   const methods = useForm({
      resolver: yupResolver(schema),
   });
   const { signin } = useAuth();
   const router = useRouter();
   const { watch, setError } = methods;

   const onSubmit = async (data) => {
      if (data.password !== data.confirmPassword) {
         toast.error('La contraseña debe coincidir');
         return;
      }

      if (!isValidEmail(watch('email'))) {
         setError('email', { type: 'invalidEmail', message: 'El email es inválido' });

         return
      }
      try {
         const payload = pick(data, ["email", "firstname", "lastname",
            "password",
            "cedula",
            "companyId",
            "departmentId"]);
         await signin(payload);
         toast.success('Te haz registrado correctamente');
         router.push('/');
      } catch (error) {
         console.error(error);
         const message = error.message === 'Is not possible to create a user with the given definition because another user already exists with the same attributes' ? 'Este correo o cédula ya esta tomado' : 'Ocurrió un error al momento de registrarte'
         toast.error(message);
      }


   };

   return { onSubmit, methods }
}