import React, { useState, useEffect, useContext } from 'react';
// import { NavLink } from 'react-router-dom';
import companyService, { Company } from './company-service';
import userService, { Investment, User } from './user-service';
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
import { MidlertidigTheme, useStyles } from './styles';
import { LanguageContext, UserContext } from './context';
import { useParams } from 'react-router-dom';
import { LanguageTextInfo } from './language';

const history = createHashHistory(); // Use history.push(...) to programmatically change path, for instance after successfully saving a student

export default function UserDetails() {
  const classes = useStyles();

  //   const { user } = useContext(UserContext);
  const { language } = useContext(LanguageContext);
  //   const { calculated_stock_value, live_stock_value, explore_company } = language;
  const { show_details } = language;
  //Må lære meg dette her:
  const [user, setUser] = useState<User>();
  const [openAlert, setOpenAlert] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>('');
  const { user_id } = useParams();

  useEffect(() => {
    const current_id = parseInt(user_id, 10); //base 10

    userService
      .getUser(current_id)
      .then((user) => {
        setUser(user);
      })
      .catch((error) => {
        setOpenAlert(true);
        setErrorMessage(error.message);
      });
  }, [user_id]);

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
            <Grid item key={user?.user_id} xs={12} sm={6} md={4}>
              {/* <NavLink to={'/companies/' + company.company_id}> */}
              <Card sx={{ p: 2 }}>
                <Card className={classes.container} sx={{ m: 1 }}>
                  <CardContent>
                    <Typography align="center" variant="h4">
                      Brukernavn: {user?.username}
                      {/* Midlertidig løsning */}
                    </Typography>
                  </CardContent>
                </Card>
                <CardContent>
                  <Typography align="center" variant="h4">
                    Månedlig sparebeløp: {user?.monthly_savings_amount}kr
                  </Typography>
                </CardContent>
                <CardContent>
                  <Typography align="center" variant="h4">
                    Epost: {user?.email}
                  </Typography>
                </CardContent>
                <CardContent>
                  <Typography align="center" variant="h4">
                    Risikovilje: {user?.risk_willingness}
                  </Typography>
                </CardContent>

                <CardActions>
                  <Button
                    size="large"
                    variant="contained"
                    color="secondary"
                    onClick={() => history.push('/user/' + user?.user_id + '/edit')}
                  >
                    Oppdater informasjon
                  </Button>
                </CardActions>
              </Card>
              {/* </NavLink> */}
            </Grid>
          </Grid>
        </Container>
      </ThemeProvider>
    </>
  );
}
