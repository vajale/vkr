import { type FC } from 'react';
import * as MaterialIcons from 'react-icons/md';
import { type MaterialIconName } from "@/assets/icons";
import React from 'react';

export const MaterialIcon: FC<{ name: MaterialIconName }> = ({ name }) => {
    const IconComponent = MaterialIcons[name];
    return <IconComponent/>;
};
