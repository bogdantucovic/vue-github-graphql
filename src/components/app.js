import React from "react";
import ReactDOM from "react-dom";
import Main from './components/main';

import "./styles.css";

const App = () => (
  <div className="App">
    <Main/>
  </div>
);

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
