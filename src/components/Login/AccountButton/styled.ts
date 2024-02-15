import { Button, styled } from "@mui/material"

export const StyledAccountButton = styled(Button)(() => ({
  display: "flex",
  justifyContent: "start",
  gap: "8px",
  width: "100%",

  img: {
    width: "40px",
    height: "40px",
  },
}))
