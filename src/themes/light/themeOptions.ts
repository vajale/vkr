import { IExtendedTheme } from "../types";
import { COMMON_OPTIONS } from "../common";

const themeOptions: IExtendedTheme = {
    menuBackground: "#EDEDED",
    ...COMMON_OPTIONS,
    palette: {
        text: {
            primary: "#000",
        },
        primary: {
            main: "#000000",
        },
        secondary: {
            main: "#F50057",
        },
    },
};

export default themeOptions;
