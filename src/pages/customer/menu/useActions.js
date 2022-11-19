import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
// import mock from '../../../mocks/dailyDishMenu.json';
import { toast } from "react-toastify";
import { v4 as generateId } from 'uuid';
import dayjs from 'dayjs';
import { useAppContext } from "../../../AppProvider";
import { useEffect, useState } from "react";
import { gql, useQuery } from "@apollo/client";

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

   const menu = data ? data?.menu.json : { typeId: null, items: [] };

   return { menu }
}