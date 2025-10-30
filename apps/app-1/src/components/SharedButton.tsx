import { Button } from "@mui/material";
import { exposeFederationComponent } from "@lexware/expose-federation-component";

interface SharedButtonProps {
  onClick?: () => void;
  children?: React.ReactNode;
}

export function SharedButton({
  onClick,
  children = "Shared Button from App-1",
}: SharedButtonProps) {
  return (
    <Button
      onClick={onClick}
      variant="contained"
      sx={{
        backgroundColor: "#1976d2",
        color: "#fff",
        margin: 1,
      }}
    >
      {children}
    </Button>
  );
}

export default exposeFederationComponent(SharedButton);
