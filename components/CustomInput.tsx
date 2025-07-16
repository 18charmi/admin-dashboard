import React from 'react';
import { TextField, TextFieldProps } from '@mui/material';

type CustomInputProps = TextFieldProps;

const CustomInput = ({
    variant = 'outlined',
    fullWidth = true,
    ...props
}: CustomInputProps) => {
    return (
        <TextField
            data-testid={`${String(props.label)?.toLowerCase()}-container`}
            variant={variant}
            fullWidth={fullWidth}
            margin="normal"
            {...props}
        />
    );
};

export default CustomInput;
