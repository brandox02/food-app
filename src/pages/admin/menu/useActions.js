import { useEffect, useState } from "react"
import { v4 as generateId } from 'uuid'
import { gql, useMutation, useQuery } from "@apollo/client";
import { useAppContext } from '../../../AppProvider'
import { toast } from "react-toastify";
import { getBase64FromUrl } from "../../../utils/imageUrlToBase64";

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

const DESTROY_IMAGE = gql`
   mutation DestroyImage($publicId: String!){
      destroyImage(publicId: $publicId)
   }
`

export const useActions = () => {
   const [{ generalParameters }, setGlobalContext] = useAppContext();
   const [dailyDishPrice, setDailyDishPrice] = useState(0);
   const [openPreviewModal, setOpenPreviewModal] = useState(false);
   const [openImagePickerModal, setImagePickerModal] = useState(false);
   const [selectedMenu, setSelectedMenu] = useState('1');
   const [menus, setMenus] = useState([]);
   const { data, refetch } = useQuery(MENUS, {
      fetchPolicy: 'cache-and-network'
   });
   const [deleteMenuMutation] = useMutation(DELETE_MENU);
   const [destroyImageMutation] = useMutation(DESTROY_IMAGE);
   const json = menus.find(menu => menu.id === parseInt(selectedMenu))?.json?.items || [];
   const typeId = menus.find(menu => menu.id === parseInt(selectedMenu))?.id;
   const [onLoadImagePickerFn, setOnLoadImagePickerFn] = useState({ fn: () => { } });
   const [imagePicker, setImagePicker] = useState();

   useEffect(() => {
      if (data) {
         Promise.all(data.menuList.map(async item => {
            let cloneItems = [...item.json.items];
            cloneItems = await Promise.all(cloneItems.map(async item2 => {
               let cloneItem = { ...item2 };
               if (cloneItem.header?.imageUrl) {
                  cloneItem.header = { ...cloneItem.header, image: await getBase64FromUrl(cloneItem.header.imageUrl) };
               }
               if (item2.fieldsetTypeId === 1) {
                  cloneItem.items = await Promise.all(cloneItem.items.map(async x => {
                     let copyX = { ...x };
                     if (copyX?.imageUrl) {
                        copyX.image = await getBase64FromUrl(copyX.imageUrl);
                     }
                     return copyX;
                  }));
               }
               return cloneItem;
            }))
            return { ...item, json: { ...item.json, items: cloneItems } };
         })).then(result => {
            setMenus(result);
         });
      }
   }, [data]);


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
      return async (...args) => {
         const response = await fn(...args);
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
         imageId: "",
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

   const removeShapeOneItem = updateJson(async ({ id1, id2 }) => {
      const response = await Promise.all(json.map(async item => {
         if (item.id === id1) {
            const items = await Promise.all(item.items.filter(item2 => {
               if (item2.id === id2) {
                  const publicId = item2?.imageId;
                  if (publicId) {
                     destroyImageMutation({ variables: { publicId } });
                  }
                  return false;
               }
               return true;
            }))
            return {
               ...item,
               items: items
            }
         }
         return item;
      }));
      return response;
   })

   const addShapeOne = updateJson(({ name, extra }) => {
      const newItem = {
         "id": generateId(),
         "extra": extra,
         "fieldsetTypeId": 1,
         "header": {
            "name": name,
            "imageUrl": "",
            "imageId": "",
            enabled: true
         },
         "items": []
      }
      return ([...json, newItem]);
   })

   const removeShapeOne = updateJson(async ({ id }) => {
      return (
         await Promise.all(json.filter(item => {
            if (item.id === id) {
               if (item.header?.imageId) {
                  destroyImageMutation({ variables: { publicId: item.header.imageId } })
               }

               Promise.all(item.items.map(que => {
                  if (que?.imageId) {
                     destroyImageMutation({ variables: { publicId: que?.imageId } });
                  }
               }));

               return false;
            }
            return true;;
         }))
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
            "imageId": "",
            "enabled": true
         },
         "sizes": [],
         "flavors": []
      }
      return ([...json, newItem]);
   })

   const removeShapeTwo = updateJson(async ({ id }) => {
      return (
         await Promise.all(json.filter(item => {

            if (item.id === id) {
               if (item.header?.imageId) {
                  destroyImageMutation({ variables: { publicId: item.header.imageId } })
               }

               return false;
            }

            return true;
         }))
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
         imageId: "",
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

         await refetch();

         setGlobalContext(state => ({ ...state, generalParameters: state.generalParameters.map(x => x.id === 3 ? { ...x, value: dailyDishPrice } : x) }));

         toast.success('Menu guardado correctamente!');

      } catch (error) {
         toast.error('Ocurrió un error inesperado!');
         console.error(error);
      }
   }

   const executeImagePickerModal = ({ onLoadFn, image }) => {
      setOnLoadImagePickerFn({ fn: onLoadFn });
      setImagePicker(image);
      setImagePickerModal(true);
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
      setMenus,
      openImagePickerModal, setImagePickerModal,
      executeImagePickerModal, onLoadImagePickerFn,
      imagePicker, setImagePicker
   }
}