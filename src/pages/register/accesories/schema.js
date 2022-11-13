import * as yup from 'yup'

export const schema = yup.object({
   firstname: yup.string().required(),
   lastname: yup.string().required(),
   email: yup.string().required(),
   cedula: yup.string().required(),
   departmentId: yup.number().required(),
   password: yup.string().required(),
   confirmPassword: yup.string().required(),
   companyId: yup.number().required(),
 });