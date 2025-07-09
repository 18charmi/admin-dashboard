"use client";

import * as React from "react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import CustomButton from "./CustomButton";

type CustomFormDialogProps = {
  open: boolean;
  title: string;
  onClose: () => void;
  children: React.ReactNode;
};

export default function CustomFormDialog({
  open,
  title,
  onClose,
  children
}: CustomFormDialogProps) {

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle >{title}
        <CustomButton variant="outlined" onClick={onClose}
          sx={{
            position: 'absolute',
            right: '1rem'
          }}>X</CustomButton>
      </DialogTitle>
      <DialogContent>
        {children}
      </DialogContent>
    </Dialog>
  );
}
