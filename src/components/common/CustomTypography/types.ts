import type React from "react";

export interface ICustomTypography {
    children: React.ReactNode;
    className?: string;
    onClick?: React.MouseEventHandler<HTMLDivElement>;
}
