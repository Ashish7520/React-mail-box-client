import React from "react";
import ReactDOM from "react-dom/client";

import "./index.css";
import App from "./App";

import store from "./store/redux";
import { Provider } from "react-redux";

import "../node_modules/react-bootstrap/dist/react-bootstrap";
import "../node_modules/bootstrap/dist/css/bootstrap.css";
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <App />
  </Provider>
);