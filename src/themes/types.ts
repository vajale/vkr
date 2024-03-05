import {ThemeOptions} from "@mui/material";

export interface IExtendedTheme extends ThemeOptions {
    menuBackground: string;
    textSize: {
        sizeText10: string;
        sizeText12: string;
        sizeText14: string;
        sizeText16: string;
        sizeText18: string;
        sizeText20: string;
        sizeText22: string;
        sizeText24: string;
        sizeText26: string;
        sizeText28: string;
        sizeText32: string;
        sizeText36: string;
        sizeText40: string;
        sizeText56: string;
        sizeText72: string;
        sizeText96: string;
    };
    radiusSize: {
        sizeRadiusXS: string;
        sizeRadiusS: string;
        sizeRadius: string;
        sizeRadiusMax: string;
    };
    spaceSize: {
        space3XS: string;
        space2XS: string;
        spaceXS: string;
        spaceS: string;
        spaceM: string;
        spaceML: string;
        spaceL: string;
        spaceXL: string;
        space2XL: string;
        space3XL: string;
        space4XL: string;
        space5XL: string;
        space6XL: string;
    };
}

export interface IExtendedThemeProps {
    theme?: IExtendedTheme;
}
