import React from 'react'

import { AppBar, Typography, Toolbar, Fab } from '@mui/material'
import HomeIcon from '@mui/icons-material/Home'

import HeaderUser from './HeaderUser'

const Header = () => {
  return (
    <AppBar
      position='fixed'
      sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
    >
      <Toolbar>
        <Fab onClick={() => (window.location.href = '/')} size='small'>
          <HomeIcon />
        </Fab>
        <Typography component='div' sx={{ flexGrow: 1, pl: 1 }} variant='h6'>
          Movement By Matt
        </Typography>
        <HeaderUser />
      </Toolbar>
    </AppBar>
  )
}

export default Header
