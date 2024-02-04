import React, { useContext, useState } from 'react'
import { GoogleLogin } from '@react-oauth/google'
import { AuthContext } from '../context'
import { Avatar, Menu, MenuItem, ListItemIcon, IconButton } from '@mui/material'
import Logout from '@mui/icons-material/Logout'

const HeaderUser = () => {
  const auth = useContext(AuthContext)

  const [anchorEl, setAnchorEl] = useState()
  const open = Boolean(anchorEl)
  const handleOpen = (event) => {
    setAnchorEl(event.currentTarget)
  }
  const handleClose = () => {
    setAnchorEl(null)
  }

  return (
    <>
      {!auth.user && (
        <GoogleLogin
          context='signin'
          onSuccess={(e) => auth.logIn(e)}
          shape='circle'
          size='large'
          theme='filled_blue'
          type='standard'
        />
      )}
      {auth.user && (
        <>
          <IconButton onClick={handleOpen}>
            <Avatar
              alt={auth.user.email}
              src={auth.user.picture}
              sx={{ height: 50, width: 50 }}
            />
          </IconButton>
          <Menu
            anchorEl={anchorEl}
            anchorOrigin={{
              horizontal: 'right',
              vertical: 'bottom',
            }}
            onClick={handleClose}
            onClose={handleClose}
            open={open}
            transformOrigin={{
              horizontal: 'right',
              vertical: 'top',
            }}
          >
            <MenuItem onClick={auth.logOut}>
              <ListItemIcon>
                <Logout fontSize='small' />
              </ListItemIcon>
              Logout
            </MenuItem>
          </Menu>
        </>
      )}
    </>
  )
}

export default HeaderUser
