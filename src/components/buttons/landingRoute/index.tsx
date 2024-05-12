import React from "react";
import { Typography } from "@/components/common/CustomTypography";
import { matchPath, useLocation, useNavigate } from "react-router-dom";

import { StyledLandingRouteButtons } from "./styled";
import Constants from "@/constants";

const ROUTE_BUTTONS = [
    {
        title: "главная",
        URL: Constants.NAVIGATION.LANDING.MAIN,
    },
    {
        title: "тарифы",
        URL: Constants.NAVIGATION.LANDING.PRICES,
    },
    {
        title: "контакты",
        URL: Constants.NAVIGATION.LANDING.CONTACT,
    },
    {
        title: "о нас",
        URL: Constants.NAVIGATION.LANDING.ABOUT,
    },
];

const LandingRoute = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const handleClick = (url: string) => {
        navigate(url, { replace: true });
    };
    const checkIsActive = (url: string) => {
        console.log(matchPath(url, location.pathname) != null);
        console.log(url, location.pathname);
        console.log(" ");
        return matchPath(url, location.pathname);
    };

    return (
        <StyledLandingRouteButtons>
            {ROUTE_BUTTONS.map((button) => (
                <div
                    className={checkIsActive(button.URL) != null ? "active" : ""}
                    key={button.title}
                    onClick={() => {
                        handleClick(button.URL);
                    }}>
                    <Typography>{button.title}</Typography>
                </div>
            ))}
        </StyledLandingRouteButtons>
    );
};

export default LandingRoute;
