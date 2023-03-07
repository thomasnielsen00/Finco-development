import React, { useState, useContext } from 'react';
import { NavLink } from 'react-router-dom';
// import companyService, { Company } from './company-service';
import { createHashHistory } from 'history';
import {
  Button,
  Typography,
  AppBar,
  Toolbar,
  CssBaseline,
  Box,
  Container,
  Grid,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemText,
  ListItemButton,
  Icon,
} from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import { MidlertidigTheme, useStyles } from '../styles';
import { languageText, LanguageTextInfo } from '../language';
import { LanguageContext, UserContext } from '../context';
import { Menu as MenuIcon } from '@mui/icons-material';
import { alignProperty } from '@mui/material/styles/cssUtils';

const history = createHashHistory(); // Use history.push(...) to programmatically change path, for instance after successfully saving a student


const NavBar = () => {
  const classes = useStyles();
  //@ts-ignore
  const { language, setLanguage } = useContext(LanguageContext);
  const { change_language, property, marked, portfolio, log_in, about, profile } = language;
  //@ts-ignore
  const { user, setUser } = useContext(UserContext);
  const [open, setOpen] = useState(false);

  const handleDrawerToggle = () => {
    setOpen(!open);
  };

  function updateLanguage() {
    if (property == 'norwegian') {
      setLanguage(languageText.english);
    } else {
      setLanguage(languageText.norwegian);
    }
  }

  const menuItems = (
    <List>
      <ListItemButton key={marked} href={'/#/marked'}>
        <ListItemText primary={marked} />
      </ListItemButton>
      <ListItemButton key={portfolio} href={'/#/portifolio'}>
        <ListItemText primary={portfolio} />
      </ListItemButton>
      <ListItemButton key={about} href={'/#/about'}>
        <ListItemText primary={about} />
      </ListItemButton>
      <ListItemButton key={log_in} href={user ? '/#/users/' + user.user_id : '/#/log_in'}>
        <ListItemText primary={user ? profile : log_in} />
      </ListItemButton>
      <ListItemButton key={change_language} onClick={() => updateLanguage()}>
        <ListItemText primary={change_language} />
      </ListItemButton>
    </List>
  );

  return (
    <>
      <ThemeProvider theme={MidlertidigTheme}>
        <CssBaseline />
        <AppBar position="static" color="secondary">
          <Container maxWidth="xl">
            <Toolbar>
              <IconButton
                edge="start"
                color="inherit"
                aria-label="menu"
                onClick={handleDrawerToggle}
                sx={{ display: { md: 'none' } }}
              >
                <MenuIcon />
              </IconButton>
              <NavLink to={'/'}>
                <Box
                  className={classes.logo}
                  component="img"
                  sx={{
                    display: { xs: 'none', md: 'flex' },
                  }}
                  alt="Finco logo"
                  src="images/logo.png"
                />
              </NavLink>
              <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                <Button
                  className={classes.navbar_button}
                  key={marked}
                  color="inherit"
                  component="a"
                  href={'/#/marked'}
                >
                  {marked}
                </Button>
                <Button
                  className={classes.navbar_button}
                  key={portfolio}
                  color="inherit"
                  component="a"
                  href={user ? '/#/portfolio/' + user.user_id : '/#/log_in_needed'}
                >
                  {portfolio}
                </Button>
                <Button
                  className={classes.navbar_button}
                  key={about}
                  color="inherit"
                  component="a"
                  href={'/#/about'}
                >
                  {about}
                </Button>
              </Box>
              <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
                <Button
                  className={classes.navbar_button}
                  color="inherit"
                  key={log_in}
                  component="a"
                  href={user ? '/#/users/' + user.user_id : '/#/log_in'}
                >
                  {user ? profile : log_in}
                </Button>
                <Button
                  className={classes.navbar_button}
                  color="inherit"
                  onClick={() => updateLanguage()}
                >
                  {change_language}
                </Button>
              </Box>
              <IconButton
                edge="start"
                color="inherit"
                aria-label="logo"
                sx={{ display: { md: 'none' } }}
              >
                <NavLink to={'/'}>
                  <Box
                    className={classes.logo}
                    component="img"
                    sx={{
                      display: { md: 'none', xs: 'flex' },
                      flexGrow: 1,
                      justifyContent: 'flex-end',
                    }}
                    alt="Finco logo"
                    src="images/logo.png"
                  />
                </NavLink>
              </IconButton>
            </Toolbar>
          </Container>
        </AppBar>
        <Drawer anchor="top" open={open} onClose={handleDrawerToggle}>
          <div
            //@ts-ignore
            className={classes.drawer}
            role="presentation"
            onClick={handleDrawerToggle}
            onKeyDown={handleDrawerToggle}
          >
            {menuItems}
          </div>
        </Drawer>
      </ThemeProvider>
    </>
  );
};

export default NavBar;
