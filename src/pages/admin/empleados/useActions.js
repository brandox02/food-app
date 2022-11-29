import { gql, useMutation, useQuery } from "@apollo/client";
import { useForm } from "react-hook-form";
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup';
import { pick } from "lodash";
import { toast } from "react-toastify";
import dayjs from "dayjs";

const USERS = gql`
   query Users($page: Float, $where: UserWhereInput) {
      users(page: $page, where: $where) {
         items {
            id firstname lastname email cedula createdAt enabled enableDate
            department {
               id name
            }
            company { id name }
         }
         metadata {
            totalItems totalPages perPage
         }
      }
   }
`

const UPDATE_USER = gql`
   mutation UpdateUsers($input: UpdateUserInput!) {
      updateUser(input: $input) {
         id
      }
   }
`

const schemaDateFilter = yup.object({
   fromDate: yup.mixed().required(),
   toDate: yup.mixed().required(),
   filterByEnableDate: yup.mixed().required()
})

export const useActions = () => {
   const dateFilterMethods = useForm({
      defaultValues: {
         fromDate: null,
         toDate: null,
         filterByEnableDate: null
      },
      resolver: yupResolver(schemaDateFilter)
   });

   const otherFilterMethods = useForm({
      defaultValues: {
         page: 0,
         name: '',
         enabled: true,

      }
   });

   const managementModalMethods = useForm({
      defaultValues: {
         managementModalOpen: null
      }
   });

   const [updateUserMutation] = useMutation(UPDATE_USER);

   const fromDate = dateFilterMethods.watch('fromDate');
   const toDate = dateFilterMethods.watch('toDate');
   const filterByEnableDate = dateFilterMethods.watch('filterByEnableDate');
   const enabled = otherFilterMethods.watch('enabled');
   const managementModalOpen = managementModalMethods.watch('managementModalOpen');
   const name= otherFilterMethods.watch('name');
   
   const { data, refetch } = useQuery(USERS, {
      fetchPolicy: 'cache-and-network',
      variables: {
         page: otherFilterMethods.watch('page'),
         where: {
            ...(name ? { name:otherFilterMethods.watch('name') } :{}),
            ...(
               fromDate && toDate && filterByEnableDate !== null ? {
                  fromDate: dayjs(fromDate).format('YYYY-MM-DD'),
                  toDate: dayjs(toDate).format('YYYY-MM-DD'),
                  filterByEnableDate
               }
                  : {}),
            ...(enabled === null ? {} : { enabled })

         },
      },
   });

   const users = data ? data.users.items : []
   const totalItems = data ? data.users.metadata.totalItems : 0;
   const totalPages = data ? data.users.metadata.totalPages : 0;

   const onSeachDateFilter = async () => await refetch();
   const onSearchOtherFilter = () => refetch({});
   const clearFilters = () => {
      dateFilterMethods.clearErrors();
      dateFilterMethods.setValue('toDate', null);
      dateFilterMethods.setValue('fromDate', null);
      dateFilterMethods.setValue('filterByEnableDate', null);
   }

   const setPage = page => otherFilterMethods.setValue('page', page - 1);
   const setManagementOpenModal = user => {
      if (!user) {
         managementModalMethods.setValue('managementModalOpen', null);
         return
      }
      managementModalMethods.reset(user);
      managementModalMethods.setValue('managementModalOpen', user.id);
      managementModalMethods.setValue('company', user.company.name);
      managementModalMethods.setValue('department', user.department.name);
   };

   const onSubmitManagementModal = async (data) => {
      try {

         const payload = pick(data, ['id', 'enabled', 'firstname', 'lastname']);

         await updateUserMutation({ variables: { input: payload } });
         await refetch();
         managementModalMethods.reset();
         toast.success('Infomación guardada exitosamente');

      } catch (error) {
         console.error(error);
         toast.error('Ocurrió un error a la hora de guardar la información')
      }

   }

   return { managementModalMethods, onSubmitManagementModal, managementModalOpen, setManagementOpenModal, onSearchOtherFilter, users, totalItems, totalPages, setPage, dateFilterMethods, onSeachDateFilter, clearFilters, otherFilterMethods };
}