import React from "react";
import { HashRouter, Navigate, Route, Routes } from "react-router-dom";

import { URL } from "../constants/navigation";
import { HomePage } from "../pages/HomePage";

export const DesktopRouter = () => {
  return (
    <HashRouter>
      <Routes>
        <Route
          path={"/"}
          element={<Navigate to={`${URL.HOME}`} replace={true} />}
        />

        <Route path={`${URL.HOME}/*`} element={<HomePage />} />
      </Routes>
    </HashRouter>
  );
};
