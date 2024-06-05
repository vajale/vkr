import { type FC } from "react";
import * as MaterialIcons from "react-icons/md";
import * as LucideIcons from "react-icons/lu";
import { type LucideIconName, type MaterialIconName } from "@/assets/icons";
import React from "react";

export const MaterialIcon: FC<{ name: MaterialIconName; className?: string }> = ({
    name,
    className
}) => {
    const IconComponent = MaterialIcons[name];
    return <IconComponent className={className} />;
};

export const LucideIcon: FC<{ name: LucideIconName; className?: string }> = ({ name, className }) => {
    const IconComponent = LucideIcons[name];
    return <IconComponent className={className} />;
};
