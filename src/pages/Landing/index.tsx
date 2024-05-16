import React from "react";
import LandingHeader from "@/components/StatickBlocks/Landing/Header";
import { LandingLayout } from "@/components/layouts/landing";
import { Outlet } from "react-router-dom";

const Landing = () => {
    return (
        <LandingLayout>
            <LandingHeader />
            <Outlet />
        </LandingLayout>
    );
};

export default Landing;
