import React from "react";
import { HashRouter, Route, Routes } from "react-router-dom";

import Constants from "../constants/index";

import { HomePage } from "@/pages/HomePage";
import CalendarPage from "@/pages/Calendar";
import LandingPage from "@/pages/Landing";
import { Navigate } from "react-router";
import { SecureRoute } from "@/routes/SecureRoute";
import { NestRoute } from "@/routes/NestRoute";
import LandingCarousel from "@/components/StatickBlocks/Landing/Carousel";
import { Page } from "@/pages/Page";
import { InvitePage } from "@/pages/InvitePage";
import { Prices } from "@/components/StatickBlocks/Landing/Prices";
import { Tasks } from "@/pages/Tasks";

const { URL } = Constants;

export const DesktopRouter = () => {
    return (
        <HashRouter>
            <Routes>
                <Route path={`/`} element={<Navigate to={URL.HOME} replace={true} />} />
                <Route path={`${Constants.URL.PAGE}`} element={<Page />} />
                <Route path={`${Constants.URL.INVITE}/:id`} element={<InvitePage />} />
                <Route path={`${Constants.URL.TASKS}`} element={<Tasks />} />
                <Route
                    path={`${Constants.URL.PAGE}/:id`}
                    element={
                        <SecureRoute>
                            <Page />
                        </SecureRoute>
                    }>
                    <Route
                        index
                        element={
                            <SecureRoute>
                                <Page />
                            </SecureRoute>
                        }
                    />
                </Route>

                <Route
                    path={`${Constants.URL.HOME}`}
                    element={
                        <SecureRoute>
                            <HomePage />
                        </SecureRoute>
                    }
                />
                <Route
                    path={`${Constants.URL.CALENDAR}/*`}
                    element={
                        <SecureRoute>
                            <CalendarPage />
                        </SecureRoute>
                    }
                />
                <Route path={`${Constants.URL.LANDING}/*`} element={<LandingPage />} />

                <Route path={`${Constants.URL.LANDING}/*`} element={<NestRoute />}>
                    <Route path="" element={<LandingPage />}>
                        <Route path={`${Constants.URL.MAIN}/*`} element={<LandingCarousel />} />
                        <Route path={`${URL.PRICES}`} element={<Prices />} />
                    </Route>
                </Route>
            </Routes>
        </HashRouter>
    );
};
