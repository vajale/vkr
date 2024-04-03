import { IExtendedTheme } from "../types";
import { COMMON_OPTIONS } from "../common";

const themeOptions: IExtendedTheme = {
    menuBackground: {
        primary: "#EDEDED",
        secondary: "#f5f5f5",
    },
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
        borderColors: {
            primary: "#262626",
        }
    },
};

export default themeOptions;
