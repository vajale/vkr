import React from "react";
import { HashRouter, Navigate, Route, Routes } from "react-router-dom";

import Constants from "../constants/index";

import { HomePage } from "../pages/HomePage";

export const DesktopRouter = () => {
   return (
      <HashRouter>
         <Routes>
            <Route path={"/"} element={<Navigate to={`${Constants.URL.HOME}`} replace={true} />} />

            <Route path={`${Constants.URL.HOME}/*`} element={<HomePage />} />
         </Routes>
      </HashRouter>
   );
};
