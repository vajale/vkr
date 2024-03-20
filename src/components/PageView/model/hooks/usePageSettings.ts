import { useAppSelector } from "../../../../store/hooks";
import {
   selectFullWithFlag,
   selectTextSize,
   selectPageLockedFlag,
   selectFontStyle,
} from "../../../../store/slices/pageSettingsSlice";

export const usePageSettings = () => {
   const size = useAppSelector(selectTextSize);
   const style = useAppSelector(selectFontStyle);
   const fullWidth = useAppSelector(selectFullWithFlag);
   const isPageLocked = useAppSelector(selectPageLockedFlag);

   const fontSize = size === "default" ? 14 : 12;
   return { fontSize, style, fullWidth, isPageLocked };
};
