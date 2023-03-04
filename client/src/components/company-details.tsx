import React, { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
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
  Stack,
  TextField,
  InputAdornment,
  Box,
  Divider,
  CardMedia,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { ThemeProvider } from '@emotion/react';
import { MidlertidigTheme, useStyles } from '../styles';
import { LanguageContext } from '../context';

const history = createHashHistory(); // Use history.push(...) to programmatically change path, for instance after successfully saving a student

export default function CompanyDetails() {
  const classes = useStyles();

  //denne må ses over
  // @ts-ignore
  const { company_id } = useParams();
  //@ts-ignore
  const { language } = useContext(LanguageContext);
  const { calculated_stock_value, live_stock_value, difference } = language;

  const [company, setCompany] = useState<Company>();
  const [openAlert, setOpenAlert] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [sum, setSum] = useState<number>(0);
  const [roi, setRoi] = useState<number>(0);

  useEffect(() => {
    companyService
      .get(company_id)
      .then((company) => {
        setCompany(company);
      })
      .catch((error) => {
        setOpenAlert(true);
        setErrorMessage(error.message);
        // av en eller annen grunn tar siden mye lenger tid å laste inn med disse useState
      });
  }, []);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    let event_sum = Number(event.currentTarget.value);
    setSum(event_sum);
    let calculated_roi = (
      (event_sum / Number(company?.currentSharePrice)) *
        Number(company?.calculated_value_per_share) -
      event_sum
    ).toFixed(2);
    setRoi(Number(calculated_roi));
  };

  const handleBuy = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    alert('Not implemented');
  };

  function calculateDifference(cal_val: number | undefined, cur_stc: number | undefined) {
    if (cal_val && cur_stc) {
      return (((cal_val - cur_stc) / cur_stc) * 100).toFixed(2);
    } else {
      return NaN;
    }
  }

  return (
    <>
      <ThemeProvider theme={MidlertidigTheme}>
        <CssBaseline />
        <Container maxWidth="md" sx={{ mt: 3 }}>
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
            <Grid item xs={12}>
              <Box sx={{ pt: 1 }}>
                <Typography gutterBottom variant="h3" sx={{ m: 2 }}>
                  {company?.company_name}
                </Typography>
                <Grid container spacing={1}>
                  <Grid item xs={12} md={4}>
                    <Grid container>
                      <Grid item xs={6} md={12}>
                        <Card sx={{ m: 1 }}>
                          <CardContent>
                            <Typography variant="body1" gutterBottom textAlign="center">
                              {calculated_stock_value}
                            </Typography>
                            <Typography variant="h3" textAlign="center">
                              {Number(company?.calculated_value_per_share).toFixed(2)},-
                            </Typography>
                          </CardContent>
                        </Card>
                      </Grid>
                      <Grid item xs={6} md={12}>
                        <Card sx={{ m: 1 }}>
                          <CardContent>
                            <Typography variant="body1" gutterBottom textAlign="center">
                              {live_stock_value}
                            </Typography>
                            <Typography variant="h3" textAlign="center">
                              {Number(company?.currentSharePrice).toFixed(2)},-
                            </Typography>
                          </CardContent>
                        </Card>
                      </Grid>
                    </Grid>
                  </Grid>

                  <Grid item xs={12} md={8}>
                    <Card sx={{ m: 1, maxHeight: 267.22 }}>
                      {/* 135.01 x 2 + 16, 135 er høyde på de andre kortene til venstre, foreløpig*/}
                      <CardContent>
                        <CardMedia
                          sx={{ aspectRatio: '16/9' }}
                          component="img"
                          src="images/test-chart.png"
                          alt="Chart"
                        ></CardMedia>
                      </CardContent>
                    </Card>
                  </Grid>
                </Grid>

                <Grid item xs={12} sx={{ m: 2 }}>
                  <Divider>NØKKELTALL</Divider>
                  <Box sx={{ m: 2 }}>
                    <Grid container justifyContent="space-between">
                      <Grid item xs={12} sm={3}>
                        <Typography variant="h6">
                          {difference}:{' '}
                          {calculateDifference(
                            company?.calculated_value_per_share,
                            company?.currentSharePrice
                          )}
                          %
                        </Typography>
                      </Grid>
                      <Grid>
                        <Typography variant="h6">Flere nøkkeltall bortover her kanskje?</Typography>
                      </Grid>
                    </Grid>
                  </Box>
                </Grid>

                <Grid item xs={12} sx={{ m: 2 }}>
                  <Divider>KJØP AKSJE</Divider>
                  <Box sx={{ ml: 2, mr: 2 }}>
                    <Grid container justifyContent="space-between" alignItems="center">
                      <Grid item xs={12} sm={3}>
                        <TextField
                          color="secondary"
                          margin="normal"
                          type="number"
                          name="Sum"
                          value={sum}
                          label="Sum"
                          fullWidth
                          inputProps={{ min: 1 }}
                          InputProps={{
                            endAdornment: <InputAdornment position="end">kr</InputAdornment>,
                          }}
                          onChange={handleChange}
                        ></TextField>
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <Typography align="center" variant="h6" sx={{ m: 1 }}>
                          Kalkulert avkastning: {roi} kr
                        </Typography>
                      </Grid>
                      <Grid item xs={12} sm={3}>
                        <Button
                          disabled={sum ? false : true}
                          size="large"
                          variant="contained"
                          color="success"
                          fullWidth
                          onClick={handleBuy}
                        >
                          KJØP
                        </Button>
                      </Grid>
                    </Grid>
                  </Box>
                </Grid>
              </Box>
            </Grid>
          </Grid>
        </Container>
      </ThemeProvider>
    </>
  );
}
