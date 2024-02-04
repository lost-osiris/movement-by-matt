import React, { useContext } from 'react'
import { Outlet } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { AuthContext } from '../context'

import { CssBaseline, Toolbar, Box } from '@mui/material'
import Header from './Header'
import Sidenav from './Sidenav'
import AlertNotification from '~/components/Alert'

const Layout = () => {
  const auth = useContext(AuthContext)
  const alerts = useSelector((state) => state.value)

  const alertsList = alerts.map((value, index) => (
    <AlertNotification key={`alert-${index}`} value={value} />
  ))

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <Header />
      <Sidenav />
      <Box component='main' sx={{ flexGrow: 1, p: 3 }}>
        {alertsList}
        <Toolbar />
        {auth.isAuthenticated && <Outlet />}
      </Box>
    </Box>
  )
}

export default Layout
