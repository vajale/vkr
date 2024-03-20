import React from "react";

import { ITextWithIcon } from "@/components/common/TextWithIcon/types";
import { Typography } from "@/components/common/CustomTypography";
import { StyledTextWithIcon } from "@/components/common/TextWithIcon/styled";

const TextWithIcon: React.FC<ITextWithIcon> = ({ svg, title }) => {
   return (
      <StyledTextWithIcon>
         <img src={svg} alt={title} />
         <Typography>{title}</Typography>
      </StyledTextWithIcon>
   );
};

export default TextWithIcon;
