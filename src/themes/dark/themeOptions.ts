import { IExtendedTheme } from "../types";
import { COMMON_OPTIONS } from "../common";

const themeOptions: IExtendedTheme = {
    menuBackground: {
        primary: "#404040",
        secondary: "#505050",
    },
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
        borderColors: {
            primary: "#bdbdbd",
        }
    },
};

export default themeOptions;
