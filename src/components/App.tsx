import * as React from "react";
import { hot } from "react-hot-loader";
import Ticker from './Ticker/Ticker'

class App extends React.Component<Record<string, unknown>, undefined> {
  public render() {
    return (
      <Ticker/>
    );
  }
}

declare let module: Record<string, unknown>;

export default hot(module)(App);
