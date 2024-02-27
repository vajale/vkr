"use client";

import { type RefObject, useCallback, useEffect, useLayoutEffect, useRef } from "react";

interface UseOutsideClickOptions {
   elementRef: RefObject<HTMLElement>;
   triggerRef?: RefObject<HTMLElement>;
   enabled?: boolean;
   onOutsideClick: (e: MouseEvent | TouchEvent) => void;
}

export function useEvent<T extends Function>(fn: T) {
   const fnRef = useRef(fn);

   useLayoutEffect(() => {
      fnRef.current = fn;
   }, [fn]);

   const eventCb = useCallback((...args: unknown[]) => fnRef.current.apply(null, args), [fnRef]);

   return eventCb as unknown as T;
}

export default function useOutsideClick({
   elementRef,
   triggerRef,
   enabled = true,
   onOutsideClick,
}: UseOutsideClickOptions) {
   const handleOutsideClick = useEvent(onOutsideClick);

   useEffect(() => {
      if (!enabled) {
         return;
      }
      const handleClick = (e: MouseEvent | TouchEvent) => {
         const target = e.target;

         if (!(target instanceof Node)) {
            return;
         }

         if (!elementRef.current) {
            return;
         }

         const ignoreElements = [elementRef.current];

         if (triggerRef?.current) {
            ignoreElements.push(triggerRef.current);
         }

         if (!ignoreElements.some((element) => element.contains(target))) {
            handleOutsideClick(e);
         }
      };

      document.addEventListener("mousedown", handleClick);

      return () => {
         document.removeEventListener("mousedown", handleClick);
      };
   }, [enabled, elementRef, triggerRef, handleOutsideClick]);
}
