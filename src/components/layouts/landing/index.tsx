import React from "react";

import { StyledLandingLayout } from "@/components/layouts/landing/styled";
import { type ILandingLayout } from "@/components/layouts/landing/types";

export const LandingLayout: React.FC<ILandingLayout> = ({ children }) => {
	return <StyledLandingLayout>
		{children}
	</StyledLandingLayout>;
};
