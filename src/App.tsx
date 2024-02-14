import React from "react";
import { Provider } from "react-redux";

import store from "./store/store";

import { DesktopRouter } from "./routes";
import ThemeWrapper from "./components/common/ThemeWrapper";

const App = () => {
  return (
    <div className="app">
      <Provider store={store}>
        <ThemeWrapper>
          <DesktopRouter />
        </ThemeWrapper>
      </Provider>
    </div>
  );
};

export default App;
