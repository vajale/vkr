import React, { ReactNode } from "react";

import { CommonMenu } from "./CommonMenu";

interface IBaseLayoutProps {
    children?: ReactNode;
}

export const Menu: React.FC<IBaseLayoutProps> = ({}) => {
    return <CommonMenu></CommonMenu>;
};
