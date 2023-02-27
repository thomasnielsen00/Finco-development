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
} from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import { MidlertidigTheme, useStyles } from '../styles';
import { languageText, LanguageTextInfo } from '../language';
import { LanguageContext, UserContext } from '../context';

const history = createHashHistory(); // Use history.push(...) to programmatically change path, for instance after successfully saving a student
// const pages = ['Din portefølje', 'Marked', 'Logg inn'];

export default function NavBar() {
  const classes = useStyles();
  //@ts-ignore
  const { language, setLanguage } = useContext(LanguageContext);
  const { change_language, property, marked, portfolio, log_in, about, profile } = language;
  //@ts-ignore
  const { user, setUser } = useContext(UserContext);

  function updateLanguage() {
    if (property == 'norwegian') {
      setLanguage(languageText.english);
    } else {
      setLanguage(languageText.norwegian);
    }
  }

  return (
    <>
      <ThemeProvider theme={MidlertidigTheme}>
        <CssBaseline />
        <AppBar position="static" color="secondary">
          <Container maxWidth="xl">
            <Toolbar>
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
            </Toolbar>
          </Container>
        </AppBar>
      </ThemeProvider>
    </>
  );
}
