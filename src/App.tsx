import React from "react";
import ReactDOM from "react-dom";

import Pestel from "./components/pestel";

import "./index.css";

const App = () => (
  <div className="container">
    <Pestel />
  </div>
);
ReactDOM.render(<App />, document.getElementById("app"));
