import React from 'react';
import ReactDOM from 'react-dom/client';
import { ThemeProvider } from '@mui/material/styles';
import customTheme from './mui/theme/customTheme';
import { SnackbarProvider } from 'notistack';
import App from './App';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <ThemeProvider theme={customTheme}>
      <SnackbarProvider
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
      >
        <App />
      </SnackbarProvider>
    </ThemeProvider>
  </React.StrictMode>
);

