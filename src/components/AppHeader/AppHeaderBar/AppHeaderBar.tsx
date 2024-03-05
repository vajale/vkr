import React from "react";

import { IAppHHeader } from "./types";

import { AppHeaderStart } from "./Start";
import { AppHeaderEnd } from "./End";
import { StyledHeaderBar } from "./styled";

export const AppHeaderBar: React.FC<IAppHHeader> = () => {
   return (
      <StyledHeaderBar>
         <AppHeaderStart />
         <AppHeaderEnd />
      </StyledHeaderBar>
   );
};
