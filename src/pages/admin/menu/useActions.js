import { useEffect, useState } from "react"
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

const DELETE_MENU = gql`
   mutation DeleteMenu($id: Float!){
      deleteMenu(id: $id){
         id
      }
   }
`

const MENUS = gql`
   query Menus{
      menuList{
         id json name
      }
   }
`

const CREATE_MENU = gql`
   mutation CreateMenu($input: CreateMenuInput!){
      createMenu(input: $input) {
         id json name
      }
   }
`

export const useActions = () => {
   const [{ generalParameters }, setGlobalContext] = useAppContext();
   const [dailyDishPrice, setDailyDishPrice] = useState(0);
   const [openPreviewModal, setOpenPreviewModal] = useState(false);
   const [selectedMenu, setSelectedMenu] = useState('1');
   const [menus, setMenus] = useState([]);
   const { data } = useQuery(MENUS, {
      fetchPolicy: 'cache-and-network'
   });
   const [deleteMenuMutation] = useMutation(DELETE_MENU);
   const json = menus.find(menu => menu.id === parseInt(selectedMenu))?.json?.items || [];
   const typeId = menus.find(menu => menu.id === parseInt(selectedMenu))?.id;

   useEffect(() => data && setMenus(data.menuList), [data]);

   // useEffect(() => {
   //    const menu = menus.find(x => x.id === parseInt(selectedMenu));
   //    console.log({menu})
   //    if (menu) {
   //       const json = menu.json.items || [];
   //       const typeId = menu.id;
   //       setJson(json);
   //       setTypeId(typeId);
   //    }

   //    // eslint-disable-next-line
   // }, [selectedMenu]);

   // update the state in menu list with json
   // useEffect(() => {
   //    if(menus.length){
   //       let copy = [ ...menus ];
   //       let index = copy.findIndex(item => item.id === parseInt(selectedMenu));
   //       console.log({index})
   //       if(index >= 0) {

   //          copy[index] = {...copy[index], json };
   //          setMenus(copy);
   //       }
   //    }
   //    // eslint-disable-next-line
   // }, [json]);


   useEffect(() => console.log(menus), [menus]);
   // load daily dish price
   useEffect(() => setDailyDishPrice(parseInt(generalParameters.find(x => x.id === 3).value)), [generalParameters]);

   const [updateGeneralParameterMutation] = useMutation(UPDATE_GENERAL_PARAMETER);
   const [updateMenuMutation] = useMutation(UPDATE_MENU);
   const [createMenuMutation] = useMutation(CREATE_MENU);

   const updateJson = (fn) => {
      return (...args) => {
         const response = fn(...args);
         setMenus(menus => menus.map(menu => menu.id === parseInt(selectedMenu) ? { ...menu, json: { typeId: menu.id, items: response } } : menu));
      }
   }

   const addMenu = async () => {
      try {
         const input = { name: `Nuevo Menu ${(Math.random() * 10000).toFixed(0)}`, json: { items: [] } }
         const { data: { createMenu: newMenu } } = await createMenuMutation({ variables: { input } });
         setMenus([...menus, newMenu]);
         toast.success('Menú creado correctamente');
      } catch (error) {
         toast.error('Ocurrió un error a la hora de crear el menú');
         console.error(error);
      }

   }

   const addShapeOneItem = updateJson(({ id1, name }) => {
      let newA = {
         name,
         imageUrl: "",
         id: generateId(),
         enabled: true,
         price: 0
      }

      return json.map(item => item.id === id1 ? { ...item, items: [...item.items, newA] } : item);
   })
   const updateShapeOneItem = updateJson(({ id1, id2, key, value }) => {

      return (
         json.map(item => item.id === id1 ? { ...item, items: item.items.map(item2 => item2.id === id2 ? { ...item2, [key]: value } : item2) } : item)
      );
   })

   const removeShapeOneItem = updateJson(({ id1, id2 }) => {
      return (
         json.map(item => item.id === id1 ? { ...item, items: item.items.filter(item2 => item2.id !== id2) } : item)
      );
   })

   const addShapeOne = updateJson(({ name, extra }) => {
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
      return ([...json, newItem]);
   })

   const removeShapeOne = updateJson( ({ id }) => {
      return (
         json.filter(item => item.id !== id)
      );
   })

   const updateShapeOne = updateJson(({ id, key, value }) => {
      return (
         json.map(item => item.id === id ? { ...item, header: { ...item.header, [key]: value } } : item)
      );
   })

   const addShapeTwo = updateJson(({ name }) => {
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
      return ([...json, newItem]);
   })

   const removeShapeTwo = updateJson(({ id }) => {
      return (
         json.filter(item => item.id !== id)
      );
   })

   const updateShapeTwo = updateJson(({ id, key, value }) => {
      return (
         json.map(item => item.id === id ? { ...item, header: { ...item.header, [key]: value } } : item)
      );
   })

   const updateShapeTwoItem = updateJson(({ id1, id2, key, value, isForSize }) => {
      const keyr = isForSize ? 'sizes' : 'flavors';
      return (
         json.map(item => item.id === id1 ? { ...item, [keyr]: item[keyr].map(item2 => item2.id === id2 ? { ...item2, [key]: value } : item2) } : item)
      );
   })

   const addShapeTwoItem = updateJson(({ id, name, isForSize }) => {
      const keyr = isForSize ? 'sizes' : 'flavors';
      let newA = {
         name,
         imageUrl: "",
         id: generateId(),
         enabled: true,
         price: 0,
         enabled: true
      }
      return (json.map(item => item.id === id ? { ...item, [keyr]: [...item[keyr], newA] } : item));
   })

   const removeShapeTwoItem = updateJson(({ id1, id2, isForSize }) => {
      const keyr = isForSize ? 'sizes' : 'flavors';
      return (
         json.map(item => item.id === id1 ? { ...item, [keyr]: item[keyr].filter(item2 => item2.id !== id2) } : item)
      );
   })

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
      dailyDishPrice,
      openPreviewModal, setOpenPreviewModal,
      setSelectedMenu,
      selectedMenu,
      menus,
      addMenu,
      deleteMenuMutation,
      updateMenuMutation,
      setMenus
   }
}