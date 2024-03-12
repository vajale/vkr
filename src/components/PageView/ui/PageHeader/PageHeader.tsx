import React from "react";
import { Avatar, Paper } from "@mui/material";
import { deepPurple } from "@mui/material/colors";

interface HeaderProps {
   text: string;
   isHaveHover: boolean;
   className?: string;
}

const PageHeader = (props: HeaderProps) => {
   const { text, className, isHaveHover } = props;

   return (
      <div>
         {isHaveHover && (
            <Paper
               sx={{
                  width: "100%",
                  height: 200,
                  background: "orange",
               }}>
               <Avatar sx={{ bgcolor: deepPurple[500], display: "flex", top: 180, left: 20 }}>
                  N
               </Avatar>
            </Paper>
         )}
      </div>
   );
};

export default PageHeader;
