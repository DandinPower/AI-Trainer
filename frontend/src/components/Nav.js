import * as React from 'react';
import {useState} from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import AdbIcon from '@mui/icons-material/Adb';
import BindKeyDialog from './bindKey' 
import HintDialog from './hint';

function ResponsiveAppBar() {
  const [hintMessage, setHintMessage] = useState('');
  const [openHint, setOpenHint] = useState(false);
  const [openBind, setOpenBind] = useState(false);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleLogOut = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('nickName')
    handleCloseUserMenu()
    window.location.href = "/SignIn"
  };

  const nickName = localStorage.getItem('nickName')

  const handleOpenDialog = () => {
    handleCloseUserMenu()
    setOpenBind(true);
  };

  const handleCloseDialog = (status, message) => {
    setHintMessage(message)
    setOpenBind(false);
    if (status === true) handleOpenHint();
  };

  const handleOpenHint = () => {
    setOpenHint(true);
  };

  const handleCloseHint = () => {
    setOpenHint(false);
  };

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <AdbIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            LOGO
          </Typography>
          <AdbIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
          <Typography
            variant="h5"
            noWrap
            component="a"
            href=""
            sx={{
              mr: 2,
              display: { xs: 'flex', md: 'none' },
              flexGrow: 1,
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            LOGO
          </Typography>

          { nickName && (
          <Box sx={{ flexGrow: 0, marginLeft: 'auto'}}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
            <MenuItem key={'BindKey'} onClick={handleOpenDialog}>
                  <Typography textAlign="center">{'BindKey'}</Typography>
            </MenuItem>
            <MenuItem key={'Log out'} onClick={handleLogOut}>
                <Typography textAlign="center">{'Log out'}</Typography>
            </MenuItem>
            </Menu>
          </Box>)}
          
        </Toolbar>
      </Container>
      <BindKeyDialog open={openBind} handleOpen={handleOpenDialog} handleClose={handleCloseDialog}/>
      <HintDialog open={openHint} handleOpen={handleOpenHint} handleClose={handleCloseHint} hintText={hintMessage} />
    </AppBar>
  );
}
export default ResponsiveAppBar;