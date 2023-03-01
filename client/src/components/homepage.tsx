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
        <Grid
          className={classes.home_grid}
          container
          // show borders
          // sx={{
          //   pt: 10,
          //   pl: 10,
          //   '--Grid-borderWidth': '1px',
          //   borderTop: 'var(--Grid-borderWidth) solid',
          //   borderLeft: 'var(--Grid-borderWidth) solid',
          //   borderColor: 'divider',
          //   '& > div': {
          //     borderRight: 'var(--Grid-borderWidth) solid',
          //     borderBottom: 'var(--Grid-borderWidth) solid',
          //     borderColor: 'divider',
          //   },
          // }}
        >
          <Grid item xs={6}>
            <Typography variant="h2" color="textPrimary" gutterBottom>
              {header}
            </Typography>
            <Typography variant="h5" color="textSecondary" paragraph gutterBottom>
              {welcome_text}
            </Typography>
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
          <Grid item sx={{ display: { md: 'none', lg: 'flex' } }}>
            <Box
              component="img"
              sx={{
                display: { xs: 'none', md: 'flex' },
                height: '16rem',
                ml: 7,
              }}
              alt="Finco logo"
              src="images/money.png"
            />
          </Grid>
        </Grid>
      </div>
    </ThemeProvider>
  );
}
