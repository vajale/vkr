import React, { useEffect, useMemo } from "react";

import { useAppSelector } from "@/store/hooks";
import { themePalette } from "@/enums/themePalette";
import { setColorMode } from "@/store/slices/app";
import { useDispatch } from "react-redux";

import { StyledColorMode } from "./styled";

import { MaterialIcon } from "@/assets/Icon";
import {
   useLazyUpdatePageRealtimeQuery,
} from "@/api/firebasePageAPI/pagesEndpoins";
import { selectPage } from "@/store/slices/pageSlice";

const ColorModeButton = () => {
   const currentColorMode = useAppSelector((state) => state.app.colorMode);
   const dispatch = useDispatch();
   const isDayMode = useMemo(() => currentColorMode === themePalette.Light, [currentColorMode]);

   const [updatePageData] = useLazyUpdatePageRealtimeQuery();
   const page = useAppSelector(selectPage);

   const handleClick = async () => {
      updatePageData({ page });
      if (isDayMode) {
         dispatch(setColorMode(themePalette.Dark));
         return;
      }

      dispatch(setColorMode(themePalette.Light));
   };

   return (
      <StyledColorMode dayMode={isDayMode} onClick={handleClick}>
         {/* <img src={ColorMode} alt="Day/Night" /> */}
         <MaterialIcon name={'MdOutlinePalette'}/>
      </StyledColorMode>
   );
};

export default ColorModeButton;
