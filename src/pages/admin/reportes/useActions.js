import { gql, useQuery } from "@apollo/client";
import { useForm } from "react-hook-form";
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup';
import dayjs from "dayjs";
import { useAppContext } from "../../../AppProvider";

const CLAIMS = gql`
   query Claims($page: Float, $where: WhereClaimInput) {
      claims(page: $page, where: $where) {
         items {
           id name description createdAt done
           order { 
               createdAt
               noOrder
               user {
                  email firstname lastname department { name } company { id name }
               }
           }
         }
         metadata {
            totalItems totalPages perPage
         }
      }
   }
`;

const schemaDateFilter = yup.object({
   fromDate: yup.mixed().required(),
   toDate: yup.mixed().required(),
   filterDateByClaimDate: yup.mixed().required()
})

export const useActions = () => {
   const dateFilterMethods = useForm({
      defaultValues: {
         fromDate: null,
         toDate: null,
         filterDateByClaimDate: null
      },
      resolver: yupResolver(schemaDateFilter)
   });

   const otherFilterMethods = useForm({
      defaultValues: {
         page: 0,
         name: '',
         done: null,
         noOrder: '',
         claimModal: null
      }
   });

   const managementModalMethods = useForm({
      defaultValues: {
         managementModalOpen: null
      }
   });

   const [{user}] = useAppContext();

   const fromDate = dateFilterMethods.watch('fromDate');
   const toDate = dateFilterMethods.watch('toDate');
   const filterDateByClaimDate = dateFilterMethods.watch('filterDateByClaimDate');
   const managementModalOpen = managementModalMethods.watch('managementModalOpen');
   const noOrder= otherFilterMethods.watch('noOrder');
   const claimModal= otherFilterMethods.watch('claimModal');
   const done = otherFilterMethods.watch('done');
   
   const { data, refetch } = useQuery(CLAIMS, {
      fetchPolicy: 'cache-and-network',
      variables: {
         page: otherFilterMethods.watch('page'),
         where: {
            ...( noOrder ? { noOrder } :{}),
            ...( done !== null ? { done } :{}),
            ...(
               fromDate && toDate && filterDateByClaimDate !== null ? {
                  fromDate: dayjs(fromDate).format('YYYY-MM-DD'),
                  toDate: dayjs(toDate).format('YYYY-MM-DD'),
                  filterDateByClaimDate
               }
                  : {}),
         },
      },
   });

   const claims = data ? data.claims.items : []
   const totalItems = data ? data.claims.metadata.totalItems : 0;
   const totalPages = data ? data.claims.metadata.totalPages : 0;
   const roleId = user.role.id;

   const onSeachDateFilter = async () => await refetch();
   const onSearchOtherFilter = () => refetch({});
   const clearFilters = () => {
      dateFilterMethods.clearErrors();
      dateFilterMethods.setValue('toDate', null);
      dateFilterMethods.setValue('fromDate', null);
      dateFilterMethods.setValue('filterDateByClaimDate', null);
   }

   const setPage = page => otherFilterMethods.setValue('page', page - 1);
   // const setManagementOpenModal = user => {
   //    if (!user) {
   //       managementModalMethods.setValue('managementModalOpen', null);
   //       return
   //    }
   //    managementModalMethods.reset(user);
   //    managementModalMethods.setValue('managementModalOpen', user.id);
   //    managementModalMethods.setValue('company', user.company.name);
   //    managementModalMethods.setValue('department', user.department.name);
   // };

   // const onSubmitManagementModal = async (data) => {
   //    try {

   //       const payload = pick(data, ['id', 'enabled', 'firstname', 'lastname']);

   //       await updateUserMutation({ variables: { input: payload } });
   //       await refetch();
   //       managementModalMethods.reset();
   //       toast.success('Infomación guardada exitosamente');

   //    } catch (error) {
   //       console.error(error);
   //       toast.error('Ocurrió un error a la hora de guardar la información')
   //    }
   // }

   return {roleId, managementModalMethods, managementModalOpen, onSearchOtherFilter, claims, totalItems, totalPages, 
      setPage, dateFilterMethods, onSeachDateFilter, clearFilters, otherFilterMethods, claimModal, 
      setClaimModal: claimModalValue =>  otherFilterMethods.setValue('claimModal', claimModalValue), refetch };
}