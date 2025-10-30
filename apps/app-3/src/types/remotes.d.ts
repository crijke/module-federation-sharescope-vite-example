declare module "app1/SharedButton" {
  interface SharedButtonProps {
    onClick?: () => void;
    children?: React.ReactNode;
  }

  export function SharedButton(props: SharedButtonProps): JSX.Element;
  export default SharedButton;
}

declare module "app1/SharedHtmlButton" {
  interface SharedHtmlButtonProps {
    onClick?: () => void;
    children?: React.ReactNode;
  }

  export function SharedHtmlButton(props: SharedHtmlButtonProps): JSX.Element;
  export default SharedHtmlButton;
}
