import { Button } from "@mui/material";
import { ReactNode } from "react";

interface SharedButtonProps {
  onClick?: () => void;
  children?: ReactNode;
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

export default SharedButton;
