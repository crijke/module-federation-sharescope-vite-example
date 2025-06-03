declare module "app1/SharedButton" {
  interface SharedButtonProps {
    onClick?: () => void;
    children?: React.ReactNode;
    variant?: "text" | "outlined" | "contained";
  }

  export function SharedButton(props: SharedButtonProps): JSX.Element;
  export default SharedButton;
}
