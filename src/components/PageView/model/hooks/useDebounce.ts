import { useState, useEffect, type Dispatch, type SetStateAction } from "react";

function useDebounce<T>(value: T, delay: number): [T, Dispatch<SetStateAction<T>>, boolean] {
   const [debouncedValue, setDebouncedValue] = useState<T>(value);
   const [isDebouncing, setIsDebouncing] = useState<boolean>(false);

   useEffect(() => {
      setIsDebouncing(true);
      const handler = setTimeout(() => {
         setDebouncedValue(value);
         setIsDebouncing(false);
      }, delay);

      return () => {
         clearTimeout(handler);
      };
   }, [value, delay]);

   return [debouncedValue, setDebouncedValue, isDebouncing];
}

export default useDebounce;
