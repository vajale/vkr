import React from "react"
import { ThemeProvider } from "@mui/system"
import themes from "../../../themes"
import { useAppSelector } from "../../../store/hooks"

const ThemeWrapper: React.FC = ({ children }) => {
  const currentTheme = useAppSelector((state) => state.app.colorMode)
  const theme = currentTheme === "light" ? themes.light : themes.dark

  return <ThemeProvider theme={theme}>{children}</ThemeProvider>
}

export default ThemeWrapper
