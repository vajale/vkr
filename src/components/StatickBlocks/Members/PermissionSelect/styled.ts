import { Select, styled } from "@mui/material";
import { type IExtendedThemeProps } from "@/themes/types";

export const StyledPermissionSelect = styled(Select)(({ theme }: IExtendedThemeProps) => ({
    // Пример кастомных стилей
    width: "200px",
    height: "50px",
    margin: "20px",
    padding: "10px",
    // border: `1px solid ${theme?.palette.primary.main}`,
    // borderRadius: "4px",
    // "& .MuiSelect-select": {
    //     padding: "10px",
    // },
    "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
        borderColor: theme?.palette.primary.main,
    },
}));
