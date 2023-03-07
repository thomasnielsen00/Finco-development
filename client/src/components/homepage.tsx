import React, { useContext } from 'react';
// import companyService, { Company } from './company-service';
import { createHashHistory } from 'history';
import {
  Button,
  Typography,
  Container,
  Grid,
  CssBaseline,
  Box,
  Card,
  CardMedia,
} from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import { MidlertidigTheme, useStyles } from '../styles';
import { languageText, LanguageTextInfo } from '../language';
import { LanguageContext, UserContext } from '../context';

const history = createHashHistory(); // Use history.push(...) to programmatically change path, for instance after successfully saving a student

export default function Home() {
  //@ts-ignore
  const { language } = useContext(LanguageContext);
  const { get_started, header, welcome_text } = language;
  const classes = useStyles();

  return (
    <ThemeProvider theme={MidlertidigTheme}>
      <CssBaseline />
      <div className={classes.home_page_container}>
        <Container maxWidth="lg">
          <Grid container sx={{ paddingTop: { xs: 10, sm: 12, md: 15, lg: 18 } }}>
            <Grid item md={7} xs={12}>
              <Grid container>
                <Grid item xs={12}>
                  <Typography variant="h2" color="textPrimary" gutterBottom>
                    {header}
                  </Typography>
                </Grid>
                <Grid item xs={12}>
                  <Typography variant="h5" color="textSecondary" paragraph gutterBottom>
                    {welcome_text}
                  </Typography>
                </Grid>
                <Grid item>
                  <Button
                    variant="contained"
                    sx={{
                      mt: 3,
                      height: '50px',
                      width: '200px',
                      padding: 2,
                      background: '#d4af37',
                      fontSize: '20px',
                      fontWeight: 'bold',
                    }}
                  >
                    {get_started}
                  </Button>
                </Grid>
              </Grid>
            </Grid>
            <Grid md={5} item sx={{ display: { xs: 'none', md: 'flex' } }}>
              <Box
                component="img"
                sx={{
                  height: '16rem',
                  pl: { md: 0.5, lg: 6 },
                }}
                alt="Home page image"
                src="images/home-pic.png"
              />
            </Grid>
          </Grid>
        </Container>
      </div>
    </ThemeProvider>
  );
}
