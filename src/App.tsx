import React from "react";
import { Provider } from "react-redux";

import store from "./store/store";

import { DesktopRouter } from "./routes";
import ThemeWrapper from "./components/common/ThemeWrapper";

import "normalize.css";
import "./style.css";
import "./assets/fonts/Inter.ttf";
import { AuthProvider } from "@/Providers/Auth";
import { ToastContainer } from "react-toastify";

const App = () => {
    return (
        <div className="app">
            <Provider store={store}>
                <ThemeWrapper>
                    <AuthProvider>
                        <ToastContainer />
                        <DesktopRouter />
                    </AuthProvider>
                </ThemeWrapper>
            </Provider>
        </div>
    );
};

export default App;
