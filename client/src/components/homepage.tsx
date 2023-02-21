import React, { useContext } from 'react';
// import companyService, { Company } from './company-service';
import { createHashHistory } from 'history';
import { Button, Typography, Container, Grid } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import { MidlertidigTheme, useStyles } from '../styles';
import { languageText, LanguageTextInfo } from '../language';
import { LanguageContext, UserContext } from '../context';

const history = createHashHistory(); // Use history.push(...) to programmatically change path, for instance after successfully saving a student

export default function Home() {
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
