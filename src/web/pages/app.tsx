import * as React from "react";
import Routes from "../routes";
const { Component } = React;
import { BrowserRouter, Route } from "react-router-dom";
const App = () => {
  return <BrowserRouter basename="/">{Routes()}</BrowserRouter>;
};
export default App;
