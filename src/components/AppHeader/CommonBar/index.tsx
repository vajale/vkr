import React from "react";

import { StyledCommonBar } from "./styled";
import AppHeaderBar from "../AppHeaderBar/index";

export const CommonBar: React.FC = () => {
   return (
      <StyledCommonBar>
         <AppHeaderBar />
         {/*<BottomBar />*/}
      </StyledCommonBar>
   );
};
