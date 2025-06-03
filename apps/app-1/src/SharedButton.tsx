import { Button } from "@mui/material";

interface SharedButtonProps {
  onClick?: () => void;
  children?: React.ReactNode;
  variant?: "text" | "outlined" | "contained";
}

export function SharedButton({
  onClick,
  children = "Shared Button from App-1",
  variant = "contained",
}: SharedButtonProps) {
  return (
    <Button
      variant={variant}
      onClick={onClick}
      sx={{
        backgroundColor: variant === "contained" ? "#1976d2" : undefined,
        margin: 1,
      }}
    >
      {children}
    </Button>
  );
}

export default SharedButton;
