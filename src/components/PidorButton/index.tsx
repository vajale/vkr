import React from "react"

import { Button } from "@mui/material"
import { useAppSelector } from "../../store/hooks"
import { themePalette } from "../../enums/themePalette"
import { setColorMode } from "../../store/slices/app"
import { useDispatch } from "react-redux"

const PidorButton = () => {
  const currentColorMode = useAppSelector((state) => state.app.colorMode)
  const dispatch = useDispatch()

  const handleClick = () => {
    if (currentColorMode === themePalette.Light) {
      dispatch(setColorMode(themePalette.Dark))
      return
    }

    dispatch(setColorMode(themePalette.Light))
  }

  return <Button onClick={handleClick}>TI PIDOR</Button>
}

export default PidorButton
