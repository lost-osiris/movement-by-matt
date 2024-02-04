import React from 'react'
import ReactDOM from 'react-dom/client'
import Routes from '~/routes'
import { BrowserRouter, HashRouter } from 'react-router-dom'
import { Provider as ReduxProvider } from 'react-redux'
import { store } from '~/store'

import { ThemeProvider } from '@mui/material/styles'
import theme from '~/theme'
import '~/styles/index.scss'
import { GoogleOAuthProvider } from '@react-oauth/google'
import { AuthProvider } from './context/Authentication'

const App = () => {
  if (process.env.NODE_ENV === 'production') {
    return (
      <ReduxProvider store={store}>
        <ThemeProvider theme={theme}>
          <div className='App'>
            <GoogleOAuthProvider clientId={process.env.GOOGLE_OAUTH_CLIENT_ID}>
              <HashRouter>
                <AuthProvider>
                  <Routes />
                </AuthProvider>
              </HashRouter>
            </GoogleOAuthProvider>
          </div>
        </ThemeProvider>
      </ReduxProvider>
    )
  } else {
    return (
      <ReduxProvider store={store}>
        <ThemeProvider theme={theme}>
          <div className='App'>
            <GoogleOAuthProvider clientId={process.env.GOOGLE_OAUTH_CLIENT_ID}>
              <BrowserRouter>
                <AuthProvider>
                  <Routes />
                </AuthProvider>
              </BrowserRouter>
            </GoogleOAuthProvider>
          </div>
        </ThemeProvider>
      </ReduxProvider>
    )
  }
}

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  // <React.StrictMode>
  //   <App />
  // </React.StrictMode>,
  <App />,
)
