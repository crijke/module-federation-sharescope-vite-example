import { Button } from "@mui/material";

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

export default SimpleButton;
