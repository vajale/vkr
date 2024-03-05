import React from "react";
import { Paper } from "@mui/material";

interface HeaderProps {
   text: string;
   isHaveHover: boolean
   className?: string;
}

const PageHeader = (props: HeaderProps) => {
   const { text, className, isHaveHover } = props;

   return (
       <div>
           {isHaveHover && <Paper sx={{ width: '100%', height: 400, background: "FAEBD7FF" }}/>}
       </div>
   );
};

export default PageHeader;
