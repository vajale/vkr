import {styled} from "@mui/material";
import {IExtendedThemeProps} from "@/themes/types";

export const StyledTextWithIcon = styled("div")(({theme}: IExtendedThemeProps) => ({
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: theme?.spaceSize.spaceXS,

    "img": {
        width: "17px",
        height: "17px",
    }
}))
