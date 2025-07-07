import React from 'react';
import { Typography, TypographyProps } from '@mui/material';

type CustomTypographyProps = TypographyProps & {
    text?: string;
};

const CustomTypography = ({
    text,
    ...props
}: CustomTypographyProps) => {
    return (
        <Typography
            {...props}
        >
            {text || props.children}
        </Typography>
    );
};

export default CustomTypography;
