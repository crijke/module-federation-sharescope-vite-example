// import { Button } from "@mui/material";

interface SharedHtmlButtonProps {
  onClick?: () => void;
  children?: React.ReactNode;
}

export function SharedHtmlButton({
  onClick,
  children = "Shared Button from App-1",
}: SharedHtmlButtonProps) {
  return <button onClick={onClick}>{children}</button>;
}

export default SharedHtmlButton;
