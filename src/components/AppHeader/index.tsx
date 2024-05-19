import React, { type ReactNode } from "react";

import { CommonBar } from "./CommonBar";

interface IBaseLayoutProps {
   children?: ReactNode;
}

const AppHeader: React.FC<IBaseLayoutProps> = ({}) => {
   return <CommonBar/>;
};

export default AppHeader;
