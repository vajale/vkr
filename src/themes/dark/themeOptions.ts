import { IExtendedTheme } from "../types";
import { COMMON_OPTIONS } from "../common";

const themeOptions: IExtendedTheme = {
    menuBackground: "#404040",
    ...COMMON_OPTIONS,
    palette: {
        text: {
            primary: "#FFF",
        },
        primary: {
            main: "#FFFFFF",
        },
        secondary: {
            main: "#F50057",
        },
    },
};

export default themeOptions;
