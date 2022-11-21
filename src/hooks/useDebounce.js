import { useEffect, useState } from "react";


export const useDebounce = ({ debounceTime = 2500, execute}) => {
   const [debounceTotal, setDebounceTotal] = useState(null);

   useEffect(() => {
      if (debounceTotal === 0) {
         execute();
      }
   // eslint-disable-next-line
   }, [debounceTotal]);

   const debounce = () => {

      setDebounceTotal(debounceTotal => (debounceTotal || 0) + 1);
      setTimeout(() => {
         setDebounceTotal(debounceTotal => debounceTotal - 1);
      }, [debounceTime]);

   }

   return { debounce }

}