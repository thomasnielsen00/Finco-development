import React, { useState, useContext } from 'react';
// import { NavLink } from 'react-router-dom';
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
import { MidlertidigTheme, useStyles } from './styles';
import { languageText, LanguageTextInfo } from './language';
import { LanguageContext, UserContext } from './context';

const history = createHashHistory(); // Use history.push(...) to programmatically change path, for instance after successfully saving a student
const pages = ['Din portefølje', 'Marked', 'Logg inn'];

export default function NavBar() {
  //@ts-ignore
  const { language, setLanguage } = useContext(LanguageContext);
  const { change_language, property } = language;

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
        <AppBar position="static" color="secondary" sx={{ boxShadow: 20 }}>
          <Container maxWidth="xl">
            <Toolbar disableGutters>
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
                FINCO
              </Typography>
              <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                {pages.map((page) => (
                  <Button
                    key={page}
                    sx={{ my: 2, color: 'white', display: 'block' }}
                    component="a"
                    href={'/#' + page}
                  >
                    {page}
                  </Button>
                ))}
              </Box>
              <Box>
                <Button sx={{ color: 'inherit' }} onClick={() => updateLanguage()}>
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

export function Home() {
  //@ts-ignore
  const { language } = useContext(LanguageContext);
  const { get_started, welcome_text } = language;
  const classes = useStyles();

  return (
    <ThemeProvider theme={MidlertidigTheme}>
      <Container
        maxWidth="sm"
        sx={{
          boxShadow: 10,
          borderRadius: 2,
          padding: '50px',
          bgcolor: 'white',
          mt: 10,
        }}
      >
        <Typography variant="h2" align="center" color="textPrimary" gutterBottom>
          FINCO
        </Typography>
        <Typography
          variant="h5"
          align="center"
          color="textSecondary"
          paragraph
          // sx={{ color: 'pink' }}
        >
          {welcome_text}
        </Typography>
        <Grid container spacing={2} justifyContent="center">
          <Grid item>
            <Button className="button" variant="contained" color="secondary">
              {get_started}
            </Button>
          </Grid>
        </Grid>
      </Container>
    </ThemeProvider>
  );
}
