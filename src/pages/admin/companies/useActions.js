import { gql, useMutation } from "@apollo/client";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form"
import { toast } from "react-toastify";
import * as yup from 'yup';
import { yupResolver} from '@hookform/resolvers/yup';

const UPDATE_COMPANY = gql`
   mutation UpdateCompany($input: UpdateCompanyInput!) {
      updateCompany(input: $input){
         id
      }
   }
`;

const CREATE_COMPANY = gql`
   mutation CreateCompany($input: CreateCompanyInput!) {
      createCompany(input: $input){
         id
      }
   }
`;

const schema = yup.object({
   company: yup.object().shape({
      name: yup.string().nullable().required(),
      sede: yup.string().nullable().required(),
      location: yup.string().nullable().required(),
      acronym: yup.string().nullable().required(),
   })
})

export const useActions = () => {
   const methods = useForm({
      defaultValues: {
         company: {departments: []},
         companySelected: null
      },
      resolver: yupResolver(schema)
   });
   const [updateCompanyMutation] = useMutation(UPDATE_COMPANY);
   const [createCompanyMutation] = useMutation(CREATE_COMPANY);
   const [isEditing, setIsEditing]=  useState(false);
   const { watch, setValue } = methods;
  
   useEffect(() => {
      if(watch('companySelected')){
         setValue('company', watch('companySelected'));
         // console.log('companySelected', watch('companySelected'))
         setIsEditing(true);
         return;
      }

      setIsEditing(false);
   // eslint-disable-next-line
   }, [watch('companySelected')]);

   
   const onSave = async (data) => {
      try {
         const company = data['company'];
         if(!company?.departments || !Array.isArray(company.departments) || !company.departments.length){
            toast.error('Debes agregar por lo menos un departamento');
            return;
         }
         if(company.departments) {
            company.departments = company.departments.map(item => typeof item.id === 'string' ? {name: item.name} : item)
         }
         await (isEditing ? updateCompanyMutation : createCompanyMutation)({ variables: { input: company }});
         toast.success(`Empresa ${isEditing ? 'actualizada' : 'creada'} correctamente`);
         setTimeout(() => window.location.reload(), 1000)
      } catch (error) {
         console.error(error);
         toast.error(`Ocurrio un error a la hora de ${isEditing ? 'editar' : 'crear'} esta empresa`);

      }
   }

   return {
      methods, onSave, isEditing, setIsEditing
   }
}