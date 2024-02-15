import React from "react"

import { IAccountButton } from "./types"

import { TITLES } from "../constants"

import { StyledAccountButton } from "./styled"
import { Typography } from "../../common/CustomTypography"

export const AccountButton: React.FC<IAccountButton> = ({ image, accountName }) => {
  return (
    <StyledAccountButton>
      <img src={image} alt={TITLES.IMAGE_ALT} />
      <Typography>{accountName}</Typography>
    </StyledAccountButton>
  )
}
