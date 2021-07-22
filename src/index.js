import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { BrowserRouter as Router } from "react-router-dom";
import { store } from "./app/store";
import { Provider } from "react-redux";

ReactDOM.render(
  <React.Fragment>
    <Provider store={store}>
      <Router>
        <App />
      </Router>
    </Provider>
  </React.Fragment>,
  document.getElementById("root")
);
