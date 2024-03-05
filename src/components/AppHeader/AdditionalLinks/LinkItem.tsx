import React from "react";
import TextWithIcon from "@/components/common/TextWithIcon";
import { ILinkItem } from "@/components/AppHeader/AdditionalLinks/types";

export const LinkItem: React.FC<ILinkItem> = ({ svg, title, href }) => {
   return (
      <li className="link">
         <a href={href}>
            <TextWithIcon svg={svg} title={title} />
         </a>
      </li>
   );
};
