import { createBridgeComponent } from "@module-federation/bridge-react";
import { AppRouter } from "./AppRouter";
import ReactDOM from "react-dom";

const reactVersion = ReactDOM.version;
console.log("app-1 React Version: ", reactVersion);

export default createBridgeComponent({
  rootComponent: () => <AppRouter />,
});
