import { GoogleSignInButton } from './button.styles';
import { BassButton, InvertedButton } from './button.styles';

export const BUTTON_TYPE_CLASSES = {
  base: 'base',
  google: 'google-sign-in',
  inverted: 'inverted',
};

const getButton = (buttonType = BUTTON_TYPE_CLASSES.base) => {
  return {
    [BUTTON_TYPE_CLASSES.base]: BassButton,
    [BUTTON_TYPE_CLASSES.google]: GoogleSignInButton,
    [BUTTON_TYPE_CLASSES.inverted]: InvertedButton,
  }[buttonType];
};

const Button = ({ children, buttonType, ...buttonProps }) => {
  const CustomButton = getButton(buttonType);

  return <CustomButton {...buttonProps}>{children}</CustomButton>;
};

export default Button;
