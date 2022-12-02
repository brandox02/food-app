import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { toast } from "react-toastify";
import { v4 as generateId } from 'uuid';
import dayjs from 'dayjs';
import { useAppContext } from "../../AppProvider";
import { useEffect, useState } from "react";

export const useActions = ({ menu }) => {

   const [mock, setMock] = useState({ typeId: null, items: [] });

   const [{ user, generalParameters }] = useAppContext();
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
      ...(menu.typeId === 1 ? { resolver: yupResolver(schema) } : {}),
      defaultValues: { currentStep: menu.typeId === 1 ? 1 : 2 }
   });

   useEffect(() => {
      if (menu) {
         const filteredByEnabled = menu.items.filter(item => item.header?.enabled).map(item => {
            if (item.fieldsetTypeId === 1) {
               return { ...item, items: item.items.filter(x => x?.enabled) }
            } else {
               return { ...item, sizes: item.sizes.filter(x => x?.enabled), flavors: item.flavors.filter(x => x?.enabled) }
            }
         });
         setMock({ typeId: menu.typeId, items: filteredByEnabled });
         methods.setValue('currentStep', menu.typeId === 1 ? 1 : 2);
      }
      // eslint-disable-next-line
   }, [menu])

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