import React from "react";

import PidorButton from "../../PidorButton";
import Login from "../../Login";
import MenuMainButtons from "../../StatickBlocks/MenuMainButtons";

import { StyledCommonMenu } from "./styled";

export const CommonMenu: React.FC = () => {
   return (
      <StyledCommonMenu>
         <Login />
         <MenuMainButtons />
         <PidorButton></PidorButton>
      </StyledCommonMenu>
   );
};
