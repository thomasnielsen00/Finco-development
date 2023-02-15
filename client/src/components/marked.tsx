import React, { useState, useEffect, useContext } from 'react';
// import { NavLink } from 'react-router-dom';
import companyService, { Company } from '../company-service';
import { createHashHistory } from 'history';
import {
  Button,
  Typography,
  CssBaseline,
  Container,
  Grid,
  Card,
  CardContent,
  CardActions,
  Alert,
  IconButton,
  Collapse,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { ThemeProvider } from '@emotion/react';
import { MidlertidigTheme, useStyles } from '../styles';
import { LanguageContext, UserContext } from '../context';

const history = createHashHistory(); // Use history.push(...) to programmatically change path, for instance after successfully saving a student

export default function Marked() {
  const classes = useStyles();

  //@ts-ignore
  const { user } = useContext(UserContext);
  //@ts-ignore
  const { language } = useContext(LanguageContext);
  const { calculated_stock_value, live_stock_value, explore_company } = language;
  const [companies, setCompanies] = useState<Company[]>([]);
  const [openAlert, setOpenAlert] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>('');

  useEffect(() => {
    companyService
      .getAll()
      .then((companies) => {
        setCompanies(companies);
      })
      .catch((error) => {
        setOpenAlert(true);
        setErrorMessage(error.message);
        // av en eller annen grunn tar siden mye lenger tid å laste inn med disse useState
      });
  }, []);

  return (
    <>
      <ThemeProvider theme={MidlertidigTheme}>
        <CssBaseline />
        <Container maxWidth="lg" sx={{ mt: 3 }}>
          {/* sx er midlertidig */}
          <Collapse in={openAlert}>
            <Alert
              severity="error"
              action={
                <IconButton
                  aria-label="close"
                  color="inherit"
                  size="small"
                  onClick={() => {
                    setOpenAlert(false);
                  }}
                >
                  <CloseIcon fontSize="inherit" />
                </IconButton>
              }
              sx={{ mb: 2, p: 2 }}
            >
              {errorMessage}
            </Alert>
          </Collapse>
          <Grid container spacing={4}>
            {companies.map((company) => (
              <Grid item key={company.company_id} xs={12} sm={6} md={4}>
                {/* <NavLink to={'/companies/' + company.company_id}> */}
                <Card sx={{ p: 2 }}>
                  <CardContent>
                    <Typography gutterBottom variant="h5">
                      {company.company_name}
                    </Typography>
                    <Typography>
                      This is the card to show the information about the different companies. This
                      is the card to show the information about the different companies. This is the
                      card to show the information about the different companies...
                    </Typography>
                    <Card sx={{ bgcolor: '#b6e3c0', m: 1 }}>
                      {/* Midlertidig løsning, her må man legge inn en state som sjekke forskjell mellom
                    de to verdiene og gir farge deretter */}
                      <CardContent>
                        <Typography align="center"> {calculated_stock_value}</Typography>
                        <Typography align="center" variant="h4">
                          {company.calculated_value_per_share} kr
                        </Typography>
                      </CardContent>
                    </Card>
                    <Card className={classes.container} sx={{ m: 1 }}>
                      <CardContent>
                        <Typography align="center">{live_stock_value}</Typography>
                        <Typography align="center" variant="h4">
                          {Number(company.calculated_value_per_share) + 2.12} kr
                          {/* Midlertidig løsning */}
                        </Typography>
                      </CardContent>
                    </Card>
                  </CardContent>
                  <CardActions>
                    <Button
                      size="large"
                      variant="contained"
                      color="secondary"
                      onClick={() => history.push('/company/' + company.company_id)}
                    >
                      {explore_company}
                    </Button>
                  </CardActions>
                </Card>
                {/* </NavLink> */}
              </Grid>
            ))}
          </Grid>
        </Container>
      </ThemeProvider>
    </>
  );
}
