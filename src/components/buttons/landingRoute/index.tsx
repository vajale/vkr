import React from "react";
import { Typography } from "@/components/common/CustomTypography";
import { matchPath, useLocation, useNavigate } from "react-router-dom";

import { StyledLandingRouteButtons } from "./styled";
import Constants from "@/constants";
import { Link } from "@mui/material";

const ROUTE_BUTTONS = [
    {
        title: "главная",
        URL: Constants.NAVIGATION.LANDING.MAIN,
        shortCut: Constants.URL.MAIN,
    },
    {
        title: "тарифы",
        URL: Constants.NAVIGATION.LANDING.PRICES,
        shortCut: Constants.URL.PRICES,
    },

    {
        title: "о нас",
        URL: Constants.NAVIGATION.LANDING.ABOUT,
        shortCut: Constants.URL.ABOUT,
    },
];

const LandingRoute = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const handleClick = (url: string) => {
        navigate(url, { replace: true });
    };

    const checkIsActive = (url: string) => {
        return matchPath(url, location.pathname);
    };

    return (
        <StyledLandingRouteButtons>
            {ROUTE_BUTTONS.map((button) => (
                <Link
                    key={button.title}
                    onClick={() => {
                        handleClick(button.shortCut);
                    }}>
                    <Typography className={checkIsActive(button.URL) != null ? "active" : ""}>
                        {button.title}
                    </Typography>
                </Link>
            ))}
        </StyledLandingRouteButtons>
    );
};

export default LandingRoute;
