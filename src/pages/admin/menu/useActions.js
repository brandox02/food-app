import { useEffect, useState } from "react"
import mock from '../../../mocks/dailyDishMenu.json';
import { v4 as generateId } from 'uuid'
import { gql, useMutation, useQuery } from "@apollo/client";
import { useAppContext } from '../../../AppProvider'
import { toast } from "react-toastify";

const UPDATE_GENERAL_PARAMETER = gql`
   mutation UpdateGeneralParameter($input: UpdateGeneralParameterInput!){
      updateGeneralParameter(input: $input){
         id
      }
   }
`

const UPDATE_MENU = gql`
   mutation UpdateMenu($input: UpdateMenuInput!){
      updateMenu(input: $input){
         id
      }
   }
`

const MENU = gql`
   query Menu($where: MenuWhereInput!){
      menu(where: $where){
         id json name
      }
   }
`

export const useActions = () => {
   const [{ generalParameters }, setGlobalContext] = useAppContext();
   const [json, setJson] = useState([]);
   const [dailyDishPrice, setDailyDishPrice] = useState(0);
   const [typeId, setTypeId] = useState();
   const { data } = useQuery(MENU, {
      variables: { where: { id: 1 } },
      fetchPolicy: 'cache-and-network'
   });

   useEffect(() => {
      if (data) {
         const json = data.menu.json?.items || [];
         const typeId = data.menu.id;
         setJson(json);
         setTypeId(typeId);
      }
   }, [data]);

   useEffect(() => console.log(json));
   useEffect(() => setDailyDishPrice(parseInt(generalParameters.find(x => x.id === 3).value)), [generalParameters]);


   const [updateGeneralParameterMutation] = useMutation(UPDATE_GENERAL_PARAMETER);
   const [updateMenuMutation] = useMutation(UPDATE_MENU);


   const addShapeOneItem = ({ id1, name }) => {
      let newA = {
         name,
         imageUrl: "",
         id: generateId(),
         enabled: true
      }
      setJson(json.map(item => item.id === id1 ? { ...item, items: [...item.items, newA] } : item));
   }
   const updateShapeOneItem = ({ id1, id2, key, value }) => {

      setJson(
         json.map(item => item.id === id1 ? { ...item, items: item.items.map(item2 => item2.id === id2 ? { ...item2, [key]: value } : item2) } : item)
      );
   }

   const removeShapeOneItem = ({ id1, id2 }) => {
      setJson(
         json.map(item => item.id === id1 ? { ...item, items: item.items.filter(item2 => item2.id !== id2) } : item)
      );
   }

   const addShapeOne = ({ name, extra }) => {
      const newItem = {
         "id": generateId(),
         "extra": extra,
         "fieldsetTypeId": 1,
         "header": {
            "name": name,
            "imageUrl": "",
            enabled: true
         },
         "items": []
      }
      setJson([...json, newItem]);
   }

   const removeShapeOne = ({ id }) => {
      setJson(
         json.filter(item => item.id !== id)
      );
   }
   const updateShapeOne = ({ id, key, value }) => {
      setJson(
         json.map(item => item.id === id ? { ...item, header: { ...item.header, [key]: value } } : item)
      );
   }

   const addShapeTwo = ({ name }) => {
      const newItem = {
         "extra": true,
         "fieldsetTypeId": 2,
         "id": generateId(),
         "header": {
            "name": name,
            "imageUrl": "",
            "enabled": true
         },
         "sizes": [],
         "flavors": []
      }
      setJson([...json, newItem]);
   }

   const removeShapeTwo = ({ id }) => {
      setJson(
         json.filter(item => item.id !== id)
      );
   }

   const updateShapeTwo = ({ id, key, value }) => {
      setJson(
         json.map(item => item.id === id ? { ...item, header: { ...item.header, [key]: value } } : item)
      );
   }

   const updateShapeTwoItem = ({ id1, id2, key, value, isForSize }) => {
      const keyr = isForSize ? 'sizes' : 'flavors';
      setJson(
         json.map(item => item.id === id1 ? { ...item, [keyr]: item[keyr].map(item2 => item2.id === id2 ? { ...item2, [key]: value } : item2) } : item)
      );
   }

   const addShapeTwoItem = ({ id, name, isForSize }) => {
      const keyr = isForSize ? 'sizes' : 'flavors';
      let newA = {
         name,
         imageUrl: "",
         id: generateId(),
         enabled: true,
         price: 0,
         enabled: true
      }
      setJson(json.map(item => item.id === id ? { ...item, [keyr]: [...item[keyr], newA] } : item));
   }

   const removeShapeTwoItem = ({ id1, id2, isForSize }) => {
      const keyr = isForSize ? 'sizes' : 'flavors';
      setJson(
         json.map(item => item.id === id1 ? { ...item, [keyr]: item[keyr].filter(item2 => item2.id !== id2) } : item)
      );
   }

   const onSave = async () => {
      try {
         
         await updateGeneralParameterMutation({ variables: { input: { id: 3, value: dailyDishPrice.toString() } } });


         await updateMenuMutation({ variables: { input: { id: typeId, json: { typeId, items: json } } } });

         setGlobalContext(state => ({ ...state, generalParameters: state.generalParameters.map(x => x.id === 3 ? { ...x, value: dailyDishPrice } : x) }));

         toast.success('Menu guardado correctamente!');

      } catch (error) {
         toast.error('Ocurrió un error inesperado!');
         console.error(error);
      }
   }


   return {
      json,
      typeId,
      dailyDishPrice,
      setDailyDishPrice,
      addShapeOneItem,
      updateShapeOneItem,
      removeShapeOneItem,
      addShapeOne,
      removeShapeOne,
      updateShapeOne,
      updateShapeTwoItem,
      addShapeTwo,
      removeShapeTwo,
      updateShapeTwo,
      addShapeTwoItem,
      removeShapeTwoItem,
      onSave,
      dailyDishPrice
   }
}