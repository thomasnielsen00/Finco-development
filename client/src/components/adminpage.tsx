import React, { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import companyService, { Company } from '../company-service';
import companyCalculations from '../company-service';
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
  Paper,
  SelectChangeEvent,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Tooltip,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { ThemeProvider } from '@emotion/react';
import { MidlertidigTheme, useStyles } from '../styles';
import { LanguageContext, UserContext } from '../context';

import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import TrendingFlatIcon from '@mui/icons-material/TrendingFlat';
import TrendingDownIcon from '@mui/icons-material/TrendingDown';
import VisibilityIcon from '@mui/icons-material/Visibility';
import ReadMoreIcon from '@mui/icons-material/ReadMore';
import SearchIcon from '@mui/icons-material/Search';
import SortIcon from '@mui/icons-material/Sort';
import SsidChartIcon from '@mui/icons-material/SsidChart';
const history = createHashHistory(); // Use history.push(...) to programmatically change path, for instance after successfully saving a student

export default function adminpage() {
  const classes = useStyles();

  //denne må ses over
  // @ts-ignore
  //const { company_id } = useParams();
  //@ts-ignore
  const { language } = useContext(LanguageContext);
  //@ts-ignore
  const { user } = useContext(UserContext);
  const [company, setCompany] = useState<Company>();
  const [openAlert, setOpenAlert] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>('');

  const {
    calculated_stock_value,
    live_stock_value,
    explore_company,
    difference,
    // watchlist,
    calculate,
    search,
    sort_by,
    no_sort,
  } = language;
  const [companies, setCompanies] = useState<Company[]>([]);
  const [searchValue, setSearchValue] = useState<string>('');
  const [sortValue, setSortValue] = useState('');

  useEffect(() => {
    if (user.admin) {
      companyService
        .getAll()
        .then((companies) => {
          setCompanies(companies);
          const updatedCompanies = companies.map((c) => {
            return {
              ...c,
              calculated_difference: Number(
                (
                  ((c.calculated_value_per_share - c.currentSharePrice) / c.currentSharePrice) *
                  100
                ).toFixed(2)
              ),
            };
          });
          setCompanies(updatedCompanies);
        })
        .catch((error) => {
          setOpenAlert(true);
          setErrorMessage(error.message);
          // av en eller annen grunn tar siden mye lenger tid å laste inn med disse useState
        });
    } else {
      history.push('');
    }
  }, []);

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(event.currentTarget.value);
  };

  const handleSort = (event: SelectChangeEvent) => {
    setSortValue(event.target.value);
  };

  //@ts-ignore
  const sortedCompanies = [...companies].sort((a, b) => {
    if (sortValue == 'CSV') {
      return b.calculated_value_per_share - a.calculated_value_per_share;
    }
    if (sortValue == 'LIVE') {
      return b.currentSharePrice - a.currentSharePrice;
    }
    if (sortValue == 'DIFF') {
      return b.calculated_difference - a.calculated_difference;
    } else {
      return companies;
    }
  });

  const filterCompanies = sortedCompanies.filter((c) => {
    if (searchValue) {
      return c.company_name.toLowerCase().includes(searchValue.toLowerCase());
    } else {
      return sortedCompanies;
    }
  });

  function calculateDifference(cal_val: number, cur_stc: number) {
    let diff = Number((((cal_val - cur_stc) / cur_stc) * 100).toFixed(2));
    if (diff > 10) {
      return (
        <Typography variant="h6" color={'green'} sx={{ fontWeight: 600 }}>
          {diff} % <TrendingUpIcon />
        </Typography>
      );
    }
    if (10 > diff && diff > -10) {
      return (
        <Typography variant="h6" color={'orange'} sx={{ fontWeight: 600 }}>
          {diff} % <TrendingFlatIcon />
        </Typography>
      );
    }
    if (diff < -10) {
      return (
        <Typography variant="h6" color={'red'} sx={{ fontWeight: 600 }}>
          {diff} % <TrendingDownIcon />
        </Typography>
      );
    }
  }

  /* useEffect(() => {
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
  */

  return (
    <>
      <ThemeProvider theme={MidlertidigTheme}>
        <CssBaseline />
        <Container maxWidth="lg" sx={{ mt: 3, marginBottom: '4rem' }}>
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
              <Divider>Admin Dashbord</Divider>
            </Grid>
            <Grid item xs={12}>
              <Box sx={{ pt: 1 }}>
                <Typography gutterBottom variant="h3" sx={{ m: 2, textAlign: 'center' }}>
                  Selskapskalulasjoner
                </Typography>

                <Divider>
                  <Typography variant="h6" textAlign={'center'}>
                    Velg selskap:
                  </Typography>
                </Divider>

                <Box sx={{ mt: 2, mb: 3 }}>
                  <Grid container alignItems="center" justifyContent="space-between">
                    <Grid item lg={3} md={4} xs={6}>
                      <TextField
                        color="secondary"
                        value={searchValue}
                        label={search}
                        onChange={handleSearch}
                        fullWidth
                        InputProps={{
                          endAdornment: (
                            <InputAdornment position="end">
                              <SearchIcon />
                            </InputAdornment>
                          ),
                        }}
                      ></TextField>
                    </Grid>
                    <Grid lg={3} md={4} xs={6} item>
                      <FormControl fullWidth>
                        <InputLabel>{sort_by}</InputLabel>
                        <Select
                          label={sort_by}
                          value={sortValue}
                          IconComponent={SortIcon}
                          onChange={handleSort}
                        >
                          <MenuItem value="">
                            <em>{no_sort}</em>
                          </MenuItem>
                          <MenuItem value={'CSV'}>{calculated_stock_value}</MenuItem>
                          <MenuItem value={'LIVE'}>{live_stock_value}</MenuItem>
                          <MenuItem value={'DIFF'}>{difference}</MenuItem>
                        </Select>
                      </FormControl>
                    </Grid>
                  </Grid>
                </Box>
                {filterCompanies.map((company) => (
                  <Card key={company.company_id} sx={{ mt: 2, p: 1 }}>
                    <Grid container spacing={1} alignItems="center" justifyContent="space-between">
                      <Grid item md={2.5} xs={12}>
                        <Typography variant="h5">{company.company_name}</Typography>
                      </Grid>
                      <Grid item md={2} xs={4}>
                        <Tooltip title={calculated_stock_value}>
                          <Typography variant="h6">
                            CSV: {Number(company.calculated_value_per_share).toFixed(2)} kr
                          </Typography>
                        </Tooltip>
                      </Grid>
                      <Grid item md={2} xs={4}>
                        <Tooltip title={live_stock_value}>
                          <Typography variant="h6">
                            LIVE: {Number(company.currentSharePrice).toFixed(2)} kr
                          </Typography>
                        </Tooltip>
                      </Grid>
                      <Grid item md={2} xs={4}>
                        <Tooltip title={difference}>
                          <div>
                            {calculateDifference(
                              company.calculated_value_per_share,
                              company.currentSharePrice
                            )}
                          </div>
                        </Tooltip>
                      </Grid>
                      <Grid item md={2.2} xs={6}>
                        <Button
                          variant="contained"
                          endIcon={<SsidChartIcon />}
                          component="a"
                          href={'/#/companycalculations/' + company.company_id}
                        >
                          {calculate}
                        </Button>
                      </Grid>
                      <Grid item md={1.3} xs={6}>
                        <Button
                          color="success"
                          variant="contained"
                          endIcon={<ReadMoreIcon />}
                          component="a"
                          href={'/#/company/' + company.company_id}
                        >
                          {explore_company}
                        </Button>
                      </Grid>
                    </Grid>
                  </Card>
                ))}
                <Grid>
                  <Typography textAlign={'center'} variant="h3" marginTop={'6rem'}>
                    <Divider></Divider>
                    Her legger vi til brukeroversikt? F.eks. totalt antall brukere
                  </Typography>
                </Grid>
                {/**
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
                    // 135.01 x 2 + 16, 135 er høyde på de andre kortene til venstre, foreløpig
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
                        <Typography variant="h6"></Typography>
                      </Grid>
                      <Grid>
                        <Typography variant="h6">Flere nøkkeltall bortover her kanskje?</Typography>
                      </Grid>
                    </Grid>
                  </Box>
                </Grid>

                <Grid item xs={12} sx={{ m: 2 }}>
                  <Divider>KJØP AKSJE</Divider>
                </Grid> */}
              </Box>
            </Grid>
          </Grid>
        </Container>
      </ThemeProvider>
    </>
  );
}
