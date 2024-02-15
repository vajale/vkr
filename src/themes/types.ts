import { ThemeOptions } from "@mui/material"

export interface IExtendedTheme extends ThemeOptions {
  menuBackground: string
}

export interface IExtendedThemeProps {
  theme?: IExtendedTheme
}
