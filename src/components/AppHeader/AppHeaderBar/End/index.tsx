import React from "react";
import MenuMainButtons from "../../../StatickBlocks/MenuMainButtons";
import ColorModeButton from "@/components/buttons/ColorMode/index";
import { StyledHeaderEnd } from "./styled";
import Users from "@/components/Users/Users";

export const AppHeaderEnd: React.FunctionComponent = () => {
   return (
      <StyledHeaderEnd>
          <Users/>
         <MenuMainButtons />
         <ColorModeButton/>
      </StyledHeaderEnd>
   );
};
