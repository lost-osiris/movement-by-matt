import React from 'react'
import {
  Box,
  Drawer,
  List,
  ListItemButton,
  ListItem,
  ListItemText,
  Toolbar,
} from '@mui/material'

import { useNavigate } from 'react-router-dom'

const drawerWidth = 240

const Sidenav = () => {
  const navigate = useNavigate()
  return (
    <Drawer
      sx={{
        '& .MuiDrawer-paper': {
          boxSizing: 'border-box',
          width: drawerWidth,
        },
        flexShrink: 0,
        width: drawerWidth,
      }}
      variant='permanent'
    >
      <Toolbar />
      <Box sx={{ overflow: 'auto' }}>
        <List>
          <ListItem onClick={() => navigate('/vimeo-ott-customers')}>
            <ListItemButton>
              <ListItemText primary={'Vimeo OTT Customers'} />
            </ListItemButton>
          </ListItem>
        </List>
      </Box>
    </Drawer>
  )
}

export default Sidenav
