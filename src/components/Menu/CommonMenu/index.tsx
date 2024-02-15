import React from "react"

import PidorButton from "../../PidorButton"

import { StyledCommonMenu } from "./styled"
import { Typography } from "../../common/CustomTypography"
import Login from "../../Login"

export const CommonMenu: React.FC = () => {
  return (
    <StyledCommonMenu>
      <Typography>Common Menu</Typography>
      <Login />
      <PidorButton></PidorButton>
    </StyledCommonMenu>
  )
}
