import React, { useState, useEffect, useContext } from 'react';
// import { NavLink } from 'react-router-dom';
import companyService, { Company } from '../company-service';
import userService, { Investment } from '../user-service';
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
import { useParams } from 'react-router-dom';
import { LanguageTextInfo } from '../language';

const history = createHashHistory(); // Use history.push(...) to programmatically change path, for instance after successfully saving a student

export default function Portfolio() {
  const classes = useStyles();

  //@ts-ignore
  const { user } = useContext(UserContext);
  //@ts-ignore
  const { language } = useContext(LanguageContext);
  //   const { calculated_stock_value, live_stock_value, explore_company } = language;
  const { show_details } = language;
  //Må lære meg dette her:
  const [investments, setInvestments] = useState<Investment[]>([]);
  const [openAlert, setOpenAlert] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>('');
  //@ts-ignore
  const { user_id } = useParams();

  useEffect(() => {
    const current_id = parseInt(user_id, 10); //base 10

    userService
      .getAllUserInvestments(current_id)
      .then((investments) => {
        setInvestments(investments);
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
            {investments.map((investment: Investment) => (
              <Grid item key={investment.investment_id} xs={12} sm={6} md={4}>
                {/* <NavLink to={'/companies/' + company.company_id}> */}
                <Card sx={{ p: 2 }}>
                  <Card className={classes.container} sx={{ m: 1 }}>
                    <CardContent>
                      <Typography align="center" variant="h4">
                        {investment.company_name}
                        {/* Midlertidig løsning */}
                      </Typography>
                    </CardContent>
                  </Card>
                  <CardContent>
                    <Typography align="center" variant="h4">
                      {(() => {
                        const date = new Date(investment.investment_date);
                        //The getMonth() method of the Date object returns an integer value between 0 and 11,
                        //representing the month of the date object, where 0 corresponds to January,
                        // and 11 corresponds to December. There 1 needs to be added to getMonth()
                        const formattedDate = `${date.getDate()}.${
                          date.getMonth() + 1 < 10
                            ? `0${date.getMonth() + 1}`
                            : `${date.getMonth() + 1}`
                        }.${date.getFullYear()}`;
                        return formattedDate;
                      })()}
                    </Typography>
                  </CardContent>
                  <Card>
                    <CardContent style={{ display: 'flex' }}>
                      <div style={{ flex: 1 }}>
                        <Typography align="center" variant="h4">
                          Beløp: {investment.amount}kr
                        </Typography>
                        <Card sx={{ bgcolor: '#b6e3c0', m: 1 }} />
                      </div>
                      <div style={{ flex: 1 }}>
                        <Typography align="center" variant="h4">
                          Avkastning: {investment.investment_yield}
                        </Typography>
                      </div>
                    </CardContent>
                  </Card>

                  <CardActions>
                    <Button
                      size="large"
                      variant="contained"
                      color="secondary"
                      onClick={() => history.push('/investment/' + investment.investment_id)}
                    >
                      {show_details}
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
