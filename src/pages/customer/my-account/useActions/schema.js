import * as yup from 'yup'

export const schema = yup.object().shape({
   currentPass: yup.string()
      .when('tabSelected', {
      is: '2',
      then: yup.string().required()
   }),
   newPass1: yup.string()
      .when('tabSelected', {
      is: '2',
      then: yup.string().required()
   }),
   newPass2: yup.string()
      .when('tabSelected', {
      is: '2',
      then: yup.string().required()
   }),
   user: yup.object().when('tabSelected', {
      is: '1',
      then: yup.object().shape({
         firstname: yup.string().required(),
         lastname: yup.string().required(),
         email: yup.string().required(),
         cedula: yup.string().required(),
         departmentId: yup.number().required(),
      })
   })
})