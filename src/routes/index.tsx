import React from "react";
import { HashRouter, Navigate, Route, Routes } from "react-router-dom";

import Constants from "../constants/index";

import { HomePage } from "../pages/HomePage";
import { CalendarPage } from "@/pages/Calendar";

export const DesktopRouter = () => {
    return (
        <HashRouter>
            <Routes>
                <Route
                    path={"/"}
                    element={<Navigate to={`${Constants.URL.HOME}`} replace={true} />}
                />
                <Route path={`${Constants.URL.HOME}/*`} element={<HomePage />} />
                <Route path={`${Constants.URL.CALENDAR}/*`} element={<CalendarPage />} />
            </Routes>
        </HashRouter>
    );
};
