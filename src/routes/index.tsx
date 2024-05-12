import React from "react";
import { HashRouter, Route, Routes } from "react-router-dom";

import Constants from "../constants/index";

import { HomePage } from "@/pages/HomePage";
import { CalendarPage } from "@/pages/Calendar";
import { Page } from "@/pages/Page";
import LandingPage from "@/pages/Landing";
import { Navigate } from "react-router";

const { URL } = Constants;

export const DesktopRouter = () => {
    return (
        <HashRouter>
            <Routes>
                <Route path={`/`} element={<Navigate to={URL.HOME} replace={true} />} />

                <Route path={`${URL.PAGE}/*`} element={<Page />} />
                <Route path={`${Constants.URL.HOME}`} element={<HomePage />} />
                <Route path={`${Constants.URL.CALENDAR}/*`} element={<CalendarPage />} />
                <Route path={`${Constants.URL.LANDING}/*`} element={<LandingPage />} />
            </Routes>
        </HashRouter>
    );
};
