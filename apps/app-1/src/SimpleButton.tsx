import { Button } from "@mui/material";
import { createBridgeComponent } from "@module-federation/bridge-react";

function SimpleButton() {
  return (
    <Button
      variant="outlined"
      color="primary"
      onClick={() => alert("Button from App 1 clicked!")}
    >
      Simple Button from App 1
    </Button>
  );
}

export default createBridgeComponent({
  rootComponent: SimpleButton,
});
