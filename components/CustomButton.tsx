import React from 'react';
import { Button, ButtonProps } from '@mui/material';

type CustomButtonProps = ButtonProps & {
  label?: string;
};

const CustomButton: React.FC<CustomButtonProps> = ({
  label,
  variant = 'contained',
  color = 'primary',
  ...props
}) => {
  return (
    <Button
      variant={variant}
      color={color}
      {...props}
    >
      {label || props.children}
    </Button>
  );
};

export default CustomButton;
