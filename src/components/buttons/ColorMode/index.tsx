import React, { useMemo } from "react";

import { useAppSelector } from "@/store/hooks";
import { themePalette } from "@/enums/themePalette";
import { setColorMode } from "@/store/slices/app";
import { useDispatch } from "react-redux";

import { StyledColorMode } from "./styled";

import ColorMode from "@/assets/svg/DayNightMode.svg";

const ColorModeButton = () => {
   const currentColorMode = useAppSelector((state) => state.app.colorMode);
   const dispatch = useDispatch();

   const isDayMode = useMemo(() => currentColorMode === themePalette.Light, [currentColorMode]);

   const handleClick = () => {
      if (isDayMode) {
         dispatch(setColorMode(themePalette.Dark));
         return;
      }

      dispatch(setColorMode(themePalette.Light));
   };

   return (
      <StyledColorMode dayMode={isDayMode} onClick={handleClick}>
         <img src={ColorMode} alt="Day/Night" />
      </StyledColorMode>
   );
};

export default ColorModeButton;
