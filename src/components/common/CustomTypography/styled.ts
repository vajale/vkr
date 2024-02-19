import { styled, Typography } from "@mui/material";
import { IExtendedThemeProps } from "../../../themes/types";

export const StyledCustomTypography = styled(Typography)(
  ({ theme }: IExtendedThemeProps) => ({
    color: theme?.palette?.text?.primary,
  }),
);
