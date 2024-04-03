import type React from "react";

export interface IAccountButton {
    image?: string;
    accountName: string;
    svgIcon?: React.ReactNode;
    onClick?: (e: EventTarget) => void
}
