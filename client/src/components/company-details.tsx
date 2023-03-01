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
          <Grid container spacing={4} justifyContent="space-between" alignItems="center">
            <Grid item xs={12}>
              <Box sx={{ pt: 1 }}>
                <Typography gutterBottom variant="h3" sx={{ m: 2 }}>
                  {company?.company_name}
                </Typography>
                <Grid
                  container
                  spacing={1}
                  direction="row"
                  justifyContent="space-between"
                  alignItems="flex-end"
                >
                  <Grid item xs={4}>
                    <Box>
                      <Card sx={{ m: 2 }}>
                        <CardContent>
                          <Typography variant="h6" gutterBottom textAlign="center">
                            {calculated_stock_value}
                          </Typography>
                          <Typography variant="h3" textAlign="center">
                            {Number(company?.calculated_value_per_share).toFixed(2)},-
                          </Typography>
                        </CardContent>
                      </Card>
                      <Card sx={{ m: 2 }}>
                        <CardContent>
                          <Typography variant="h6" gutterBottom textAlign="center">
                            {live_stock_value}
                          </Typography>
                          <Typography variant="h3" textAlign="center">
                            {Number(company?.currentSharePrice).toFixed(2)},-
                          </Typography>
                        </CardContent>
                      </Card>
                    </Box>
                  </Grid>
                  <Grid item xs={8}>
                    <Card sx={{ mb: 2, mr: 2, height: 286.02 }}>
                      {/* 135.01 x 2 + 16, 135 er høyde på de andre kortene til venstre, foreløpig*/}
                      <CardContent>
                        <Typography>Test, her kommer graf</Typography>{' '}
                        <CardMedia
                          component="img"
                          src="images/test-chart.png"
                          alt="Chart"
                          sx={{ aspectRatio: '16/9' }}
                        ></CardMedia>
                      </CardContent>
                    </Card>
                  </Grid>
                </Grid>
                <Grid item xs={12} sx={{ m: 2 }}>
                  <Divider>NØKKELTALL</Divider>
                  <Box sx={{ m: 2 }}>
                    <Grid container justifyContent="space-between" alignItems="center">
                      <Grid item xs={3}>
                        <Typography variant="h6" sx={{}}>
                          {difference}:{' '}
                          {calculateDifference(
                            company?.calculated_value_per_share,
                            company?.currentSharePrice
                          )}
                          %
                        </Typography>
                      </Grid>
                      <Grid item>
                        <Typography variant="h6">Flere nøkkeltall bortover her kanskje?</Typography>
                      </Grid>
                    </Grid>
                  </Box>
                </Grid>
                <Grid item xs={12} sx={{ m: 2 }}>
                  <Divider>KJØP AKSJE</Divider>
                  <Box sx={{ ml: 2, mr: 2 }}>
                    <Grid container justifyContent="space-between" alignItems="center">
                      <Grid item xs={3}>
                        <TextField
                          color="secondary"
                          margin="normal"
                          type="number"
                          name="Sum"
                          value={sum}
                          label="Sum"
                          inputProps={{ min: 1 }}
                          InputProps={{
                            endAdornment: <InputAdornment position="end">kr</InputAdornment>,
                          }}
                          onChange={handleChange}
                        ></TextField>
                      </Grid>
                      {/* <Grid item xs={2}>
                        <Typography variant="h6">Kjøp:</Typography>
                      </Grid> */}
                      <Grid item xs={6}>
                        <Typography align="center" variant="h6">
                          Kalkulert avkastning: {roi} kr
                        </Typography>
                      </Grid>
                      <Grid item xs={3}>
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
