import * as React from "react";
import * as ReactDOM from "react-dom";
import { MainComponent } from "./App";
import { hydrate, render } from "react-dom";

const rootElement = document.getElementById("root");
if (rootElement.hasChildNodes()) {
  hydrate(<MainComponent />, rootElement);
} else {
  render(<MainComponent />, rootElement);
}
