import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import companyService, { Company } from './company-service';
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
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { ThemeProvider } from '@emotion/react';
import { MidlertidigTheme, useStyles } from './styles';

const history = createHashHistory(); // Use history.push(...) to programmatically change path, for instance after successfully saving a student

export default function CompanyPage() {
  const classes = useStyles();
  //denne må ses over
  //@ts-ignore
  const { company_id } = useParams();

  const [company, setCompany] = useState<Company>();
  const [openAlert, setOpenAlert] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>('');

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

  const companyShort = '(GGL)';
  const currentStock: number = 0.34214;

  function difference(cal_val: number | undefined, cur_stc: number) {
    if (cal_val) {
      return (((cal_val - cur_stc) / cur_stc) * 100).toFixed(2);
    }
  }

  return (
    <>
      <ThemeProvider theme={MidlertidigTheme}>
        <CssBaseline />
        <Container maxWidth="md" sx={{ mt: 3 }}>
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
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Card>
                <CardContent>
                  <Typography gutterBottom variant="h3">
                    {company?.company_name} {companyShort} - ID:{company?.company_id}
                  </Typography>
                  <Grid
                    container
                    spacing={1}
                    direction="row"
                    justifyContent="space-evenly"
                    alignItems="flex-end"
                  >
                    <Grid item>
                      <Card>
                        <CardContent>
                          <Typography variant="h6" gutterBottom textAlign="center">
                            Kalkulert aksjeverdi
                          </Typography>
                          <Typography variant="h3" gutterBottom textAlign="center">
                            {company?.calculated_value_per_share},-
                          </Typography>
                        </CardContent>
                      </Card>
                    </Grid>
                    <Grid item>
                      <Card>
                        <CardContent>
                          <Typography variant="h6" gutterBottom textAlign="center">
                            Sanntids aksjekurs
                          </Typography>
                          <Typography variant="h3" gutterBottom textAlign="center">
                            {currentStock},-
                          </Typography>
                        </CardContent>
                      </Card>
                    </Grid>
                  </Grid>
                  {/* NEDENFOR kommer differanse */}
                  <Typography variant="h5">
                    DIFFERANSE: {difference(company?.calculated_value_per_share, currentStock)}%
                  </Typography>
                  <hr></hr>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Container>
      </ThemeProvider>
    </>
  );
}
