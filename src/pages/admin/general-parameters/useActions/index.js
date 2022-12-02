import { gql, useMutation, useQuery } from "@apollo/client"
import { pick } from "lodash";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { useAppContext } from "../../../../AppProvider";




const useResolvers = () => {
   const GENERAL_PARAMETERS = gql`
   query GeneralParameters{
      generalParameterList {
         id name value description createdAt
      }
   }
`;

   const UPDATE_GENERAL_PARAMETERS = gql`
   mutation UpdateGeneralParameters($input: [UpdateGeneralParameterInput!]!){
      items: updateGeneralParameters(input: $input) {
         id name value description createdAt
      }
   }
`;
   const { data } = useQuery(GENERAL_PARAMETERS, {
      fetchPolicy: 'cache-and-network'
   });
   const [updateGeneralParametersMutation] = useMutation(UPDATE_GENERAL_PARAMETERS);

   const generalParameters = data?.generalParameterList || [];

   return { generalParameters, updateGeneralParametersMutation }
}



export const useActions = () => {
   const methods = useForm({ defaultValues: { items: [] } });
   const { setValue } = methods;
   const [_, setGlobalContext] = useAppContext();
   const { generalParameters, updateGeneralParametersMutation} = useResolvers();
   useEffect(() => {
      setValue('items', generalParameters);
      // eslint-disable-next-line
   }, [generalParameters]);

   const onSave = async (data) => {
      try {
         const payload = data.items.map(item => pick(item, ['id', 'name', 'value', 'description']));
         const response = await updateGeneralParametersMutation({variables: {input: payload}});
         setGlobalContext(state => ({...state, generalParameters: response.data.items}));
         toast.success('Parámetros generales guardados exitosamente');
      } catch (error) {
         toast.error('Ocurrió un error al momento de guardar');
         console.error(error);  
      }
   }

   return { generalParameters, methods, onSave }
}