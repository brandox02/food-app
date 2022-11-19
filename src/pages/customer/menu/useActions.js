import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
// import mock from '../../../mocks/dailyDishMenu.json';
import { toast } from "react-toastify";
import { v4 as generateId } from 'uuid';
import dayjs from 'dayjs';
import { useAppContext } from "../../../AppProvider";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { gql, useQuery } from "@apollo/client";

const toApi = {
   "details": [
      {
         "name": "Carne Asada",
         "price": 0,
         "quantity": 0,
         "total": 0,
         "isDailyDish": true,
         id: generateId(),
         "comment": ""
      },
      {
         "name": "Arroz Blanco",
         "price": 0,
         "quantity": 0,
         "total": 0,
         "isDailyDish": true,
         id: generateId(),
         "comment": ""
      },
      {
         "name": "Habichuela",
         "price": 0,
         "quantity": 0,
         "total": 0,
         "isDailyDish": true,
         id: generateId(),
         "comment": ""
      },
      {
         "name": "Aguacate",
         "price": 50,
         "quantity": 1,
         "total": 50,
         "isDailyDish": false,
         id: generateId(),
         "comment": ""
      },
      {
         "name": "Bollito de Yuca",
         "price": 50,
         "quantity": 1,
         "total": 50,
         "isDailyDish": false,
         id: generateId(),
         "comment": ""
      },

   ],
   "total": 350,
   "userId": 1,
   "deliverDate": dayjs().add(1, 'day').toDate(),
   "typeId": 1,
   "dailyDishPrice": 250
}

const MENU = gql`
   query Menu($where: MenuWhereInput!){
      menu(where: $where){
         id json name
      }
   }
`

export const useActions = () => {

   const { data } = useQuery(MENU, {
      variables: { where: { id: 1 } },
      fetchPolicy: 'cache-and-network',

   })

   const [mock, setMock] = useState({ typeId: null, items: [] });

   useEffect(() => {
      if (data) {
         const filteredByEnabled = data.menu.json.items.filter(item => item.header?.enabled).map(item => {
            if (item.fieldsetTypeId === 1) {
               return { ...item, items: item.items.filter(x => x?.enabled) }
            } else {
               return { ...item, sizes: item.sizes.filter(x => x?.enabled), flavors: item.flavors.filter(x => x?.enabled) }
            }
         });
         setMock({ typeId: data.menu.json.typeId, items: filteredByEnabled });
      }
   }, [data])


   const [{ user, generalParameters }, setGlobalState] = useAppContext();
   const [summaryPayload, setSummaryPayload] = useState();
   const stepOneItems = mock.items.filter(item => !item.extra && item.fieldsetTypeId === 1);
   const extraStepItems = mock.items.filter(item => item.extra);

   const schema = yup.object().shape({
      currentStep: yup.number(),
      stepOne: yup.object().when('currentStep', {
         is: 1,
         then: yup.object(stepOneItems.reduce((acc, item) => ({
            ...acc,
            [item.id]: yup.string().required(),
         }), {}))
      }),
      // extrasStep: yup.object().when('currentStep', {
      //    is: 2,
      //    then: yup.object(tecnica)
      // })
   });

   const methods = useForm({
      resolver: yupResolver(schema),
      defaultValues: { currentStep: 1 }
   });

   function process() {
      const details = mock.items
         .filter((_, i) => true)
         .map(item => {
            if (item.fieldsetTypeId === 1) {
               if (!item.extra) {
                  const value = methods.watch(`stepOne.${item.id}`) || '';
                  const name = item.items.find(x => x.id === value)?.name || '';
                  return {
                     comment: '',
                     id: generateId(),
                     isDailyDish: true,
                     price: 0,
                     quantity: 0,
                     total: 0,
                     name
                  }
               } else {
                  return item.items
                     .filter(x => methods.watch(`extrasStep.${item.id}.${x.id}`))
                     .map(sta => {
                        const quantity = methods.watch(`extrasStep.${item.id}.${sta.id}`) || 0;
                        return ({
                           comment: '',
                           id: generateId(),
                           isDailyDish: false,
                           price: sta.price,
                           quantity,
                           total: quantity * sta.price,
                           name: sta.name
                        })
                     })
               }
            } else {
               let flavorId = methods.watch(`extrasStep.${item.id}.flavor`) || '';
               let flavor = item.flavors.find(x => x.id === flavorId)?.name || '';
               const cos =
                  Object.entries(methods.watch(`extrasStep.${item.id}`)?.size || {})
                     .filter(([_, value]) => value)
                     .map(([key, value]) => {
                        const quantity = value;
                        const a = item.sizes.find(item => item.id === key);
                        const price = a?.price || 0;
                        return {
                           comment: '',
                           id: key,
                           isDailyDish: !item.extra,
                           price,
                           quantity,
                           total: quantity * price,
                           name: `${item.header.name} ${flavor} ${a.name}`
                        }
                     });

               return cos;
            }
         })
         .flat();

      const dailyDishPrice = parseInt(generalParameters.find(x => x.id === 3).value);

      const payload = {
         total: details.reduce((acc, item) => acc + item.total, 0) + (mock.typeId === 1 ? dailyDishPrice : 0),
         userId: user.id,
         deliverDate: dayjs().add(1, 'day').toDate(),
         typeId: mock.typeId,
         dailyDishPrice: mock.typeId === 1 ? parseInt(generalParameters.find(x => x.id === 3).value) : 0,
         details
      }
      return payload;
   }

   function validationToProcess() {
      const every = extraStepItems.every(item => {
         if (item.fieldsetTypeId === 2) {
            const sizes = Object.entries(methods.watch(`extrasStep.${item.id}.size`) || {});
            const flavor = methods.watch(`extrasStep.${item.id}.flavor`)
            const someSizeAdded = sizes.some(([_, value]) => {
               return !!value;
            });
            if (someSizeAdded && !flavor) {
               toast.error('Debes seleccionar un sabor de ' + item.header.name);
               return false;
            }
         }
         return true;
      })
      return every;
   }


   function onAction(data) {
      console.log('cadena', extraStepItems)
      // console.log({ data, mock, toApi });
      if (methods.watch('currentStep') == 1) {
         setCurrentStep(2);
      } else if (methods.watch('currentStep') == 2) {
        
         if (!validationToProcess()) return;

         const payload = process();
         setSummaryPayload(payload);
         // setGlobalState(state => ({ ...state, toSummary: payload }));

         // router.push('/customer/summary');

         setCurrentStep(3);

      }
   }


   const setCurrentStep = (currentStep) => methods.setValue('currentStep', currentStep);
   const currentStep = methods.watch('currentStep');

   return { currentStep, setCurrentStep, mock, extraStepItems, stepOneItems, methods, onAction, summaryPayload, setSummaryPayload }
}