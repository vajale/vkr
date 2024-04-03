import React, {MouseEventHandler} from "react";

export interface IAccountButton {
    image?: string;
    accountName: string;
    svgIcon?: React.ReactNode;
    onClick?: () => void
}
