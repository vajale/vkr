import {Button, styled} from "@mui/material";
import {IExtendedThemeProps} from "src/themes/types";

interface IProps extends IExtendedThemeProps {
    dayMode: boolean;
}

export const StyledColorMode = styled(Button)(({theme, dayMode}: IProps) => ({
    backgroundColor: !dayMode ? "antiquewhite" : "transparent",
    borderRadius: theme?.radiusSize.sizeRadiusMax,
    minWidth: "40px",
    minHeight: "40px",
    width: "40px",
    height: "40px",

    img: {
        minWidth: "40px",
        minHeight: "40px",
        width: "40px",
        height: "40px",
    }
}))
