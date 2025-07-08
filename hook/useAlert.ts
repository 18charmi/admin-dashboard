import { useState } from 'react';

export type AlertSeverity = 'success' | 'info' | 'warning' | 'error';

export interface AlertState {
  message: string;
  severity: AlertSeverity;
  open: boolean;
}

export const useAlertController = () => {
  const [state, setState] = useState<AlertState>({
    message: '',
    severity: 'info',
    open: false,
  });

  const showAlert = (message: string, severity: AlertSeverity = 'info') => {
    setState({ message, severity, open: true });
  };

  const hideAlert = () => {
    setState((prev) => ({ ...prev, open: false }));
  };

  return {
    state,
    showAlert,
    hideAlert,
  };
};
