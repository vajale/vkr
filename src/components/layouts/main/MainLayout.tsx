import React from "react"

import { StyledMainLayout } from "./styled"
import { Menu } from "../../Menu"

export const MainLayout: React.FC = () => {
  return (
    <StyledMainLayout>
      <Menu>menu</Menu>
      <div>page</div>
    </StyledMainLayout>
  )
}
