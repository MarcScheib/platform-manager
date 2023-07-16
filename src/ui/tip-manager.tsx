import AppBar from '@mui/material/AppBar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import blue from '@mui/material/colors/blue';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import MenuIcon from '@mui/icons-material/Menu';
import React from 'react';
import { Axios } from 'axios';
import { CommonAPI } from './electron-api/common';

const theme = createTheme({
  palette: {
    primary: blue,
  },
});

export function TipManager() {
  const setTitle = () => {
    new CommonAPI().setTitle(`${Math.random()}`);
  };

  const loadBitBucketRepos = () => {
    new Axios().get('https://api.bitbucket.org/2.0/repositories/').then(res => {
      console.log(res.data);
    });
  };

  return (
    <React.Fragment>
      <ThemeProvider theme={theme}>
        <CssBaseline />

        <AppBar position="static">
          <Toolbar>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2 }}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              TIP Manager
            </Typography>
            <Button color="inherit">Login</Button>
          </Toolbar>
        </AppBar>

        <Stack spacing={2} direction="row">
          <Button variant="contained" onClick={setTitle}>
            Title
          </Button>
        </Stack>
      </ThemeProvider>
    </React.Fragment>
  );
}
