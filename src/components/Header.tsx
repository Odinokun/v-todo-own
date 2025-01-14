import React, { FC } from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';

export const Header: FC = React.memo(() => {
  console.log('HEADER');
  return (
    <AppBar position='static'>
      <Toolbar>
        <IconButton size='large' edge='start' color='inherit' sx={{ mr: 2 }}>
          <MenuIcon />
        </IconButton>
        <Typography variant='h6' component='div' sx={{ flexGrow: 1 }}>
          News
        </Typography>
        <Button color='inherit'>Login</Button>
        <Button color='inherit'>Logout</Button>
        <Button color='inherit'>FAQ</Button>
      </Toolbar>
    </AppBar>
  );
});
