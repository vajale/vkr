import { styled } from "@mui/material"
import { IExtendedThemeProps } from "../../../themes/types"

export const StyledCommonMenu = styled("div")(({ theme }: IExtendedThemeProps) => ({
  height: "100%",
  width: "20%",
  padding: "20px 30px",
  backgroundColor: theme?.menuBackground,
}))
