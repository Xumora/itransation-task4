import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom';
import { UsersContext } from './contexts/UsersContext';
import { SnackbarProvider } from 'notistack';
import App from './App'



const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <SnackbarProvider
    maxSnack={3}
    anchorOrigin={{
      vertical: 'top',
      horizontal: 'right',
    }}
    autoHideDuration={3000}
  >
    <React.StrictMode>
      <BrowserRouter>
        <UsersContext>
          <App />
        </UsersContext>
      </BrowserRouter>
    </React.StrictMode>
  </SnackbarProvider>
)