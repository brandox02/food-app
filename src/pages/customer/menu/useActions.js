import { gql, useQuery } from "@apollo/client";
import { useRouter } from "next/router";

const MENU = gql`
   query Menu($where: MenuWhereInput!){
      menu(where: $where){
         id json name
      }
   }
`

export const useActions = () => {
   const router = useRouter();
   const { id }= router.query;
   const { data } = useQuery(MENU, {
      variables: { where: { id: parseInt(id) } },
      fetchPolicy: 'cache-and-network',

   })

   const menu = data ? data?.menu.json : { typeId: null, items: [] };
   const menuName = data?.menu?.name || '';
   const menuId = data?.menu?.id;
   return { menu, menuName, menuId }
}