"use client";

import React, { createContext, useContext, ReactNode } from 'react';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import { useAlertController, AlertSeverity } from '@/hook/useAlert';

interface AlertContextType {
    showAlert: (message: string, severity?: AlertSeverity) => void;
}

const AlertContext = createContext<AlertContextType | undefined>(undefined);

export const useAlert = (): AlertContextType => {
    const context = useContext(AlertContext);
    if (!context) {
        throw new Error('useAlert must be used within an AlertProvider');
    }
    return context;
};

export const AlertProvider = ({ children }: { children: ReactNode }) => {
    const { state, showAlert, hideAlert } = useAlertController();

    return (
        <AlertContext.Provider value={{ showAlert }}>
            {children}
            <Snackbar
                data-testid="alert-container"
                open={state.open}
                autoHideDuration={3000}
                onClose={hideAlert}
                anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
            >
                <Alert
                    onClose={hideAlert}
                    severity={state.severity}
                    variant="filled"
                    sx={{ width: '100%' }}
                >
                    {state.message}
                </Alert>
            </Snackbar>
        </AlertContext.Provider>
    );
};
