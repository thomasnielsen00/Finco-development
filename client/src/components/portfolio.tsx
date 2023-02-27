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
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { ThemeProvider } from '@emotion/react';
import { MidlertidigTheme, useStyles } from '../styles';
import { LanguageContext, UserContext } from '../context';
import { useParams } from 'react-router-dom';
import { LanguageTextInfo } from '../language';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';

const history = createHashHistory(); // Use history.push(...) to programmatically change path, for instance after successfully saving a student

export function Portfolio() {
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

  function createData(
    company_name: string,
    sum: number,
    investment_yield: string,
    current_value: number
  ) {
    return {
      company_name,
      sum,
      //As an investment yield refers to income earned on an investment and  is a more forward-looking assessmen
      //it may be more appropriate to include as general investment key-figure:
      investment_yield,
      current_value,
      // name,
      // calories,
      // fat,
      // carbs,
      // protein,
      // price,
      history: [
        //As an investment return references what an investor gained or lost on that investment
        //is may be appropriate to include it under history:
        {
          date: '2020-01-05',
          amount: 3,
          historic_share_price: 2.4,
          return: 200,
        },

        {
          date: '2021-02-07',
          amount: 5,
          historic_share_price: 5.6,
          return: 400,
        },
      ],
    };
  }

  function Row(props: { row: ReturnType<typeof createData> }) {
    const { row } = props;
    const [open, setOpen] = React.useState(false);

    return (
      <React.Fragment>
        <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
          <TableCell>
            <IconButton aria-label="expand row" size="small" onClick={() => setOpen(!open)}>
              {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
            </IconButton>
          </TableCell>
          <TableCell component="th" scope="row">
            {row.company_name}
          </TableCell>
          <TableCell align="right">{row.sum}kr</TableCell>
          <TableCell align="right">{row.investment_yield}%</TableCell>
          <TableCell align="right">{row.current_value}kr</TableCell>
        </TableRow>
        <TableRow>
          <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
            <Collapse in={open} timeout="auto" unmountOnExit>
              <Box sx={{ margin: 1 }}>
                <Typography variant="h6" gutterBottom component="div">
                  History
                </Typography>
                <Table size="small" aria-label="purchases">
                  <TableHead>
                    <TableRow>
                      <TableCell>Date</TableCell>
                      <TableCell>Amount</TableCell>
                      <TableCell align="right">Historic share price (kr)</TableCell>
                      <TableCell align="right">Return (kr)</TableCell>
                      <TableCell align="right">Total price (kr)</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {row.history.map((historyRow) => (
                      <TableRow key={historyRow.date}>
                        <TableCell component="th" scope="row">
                          {historyRow.date}
                        </TableCell>
                        <TableCell>{historyRow.amount}</TableCell>
                        <TableCell align="right">{historyRow.historic_share_price}</TableCell>
                        {/* Denne kan kanskje regnes ut direkte på siden evt, altså uavhengig av databsen */}
                        <TableCell align="right">{historyRow.return}</TableCell>
                        <TableCell align="right">
                          {Math.round(historyRow.amount * historyRow.historic_share_price * 100) /
                            100}
                          kr
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </Box>
            </Collapse>
          </TableCell>
        </TableRow>
      </React.Fragment>
    );
  }

  const rows = [
    createData('ABG Sundal', 1000, 40, 1400),
    createData('BCG consulting', 100, 4, 104),

    createData('Apple', 600, 10, 660),

    // createData('Ice cream sandwich', 237, 9.0, 37, 4.3, 4.99),
    // createData('Eclair', 262, 16.0, 24, 6.0, 3.79),
    // createData('Cupcake', 305, 3.7, 67, 4.3, 2.5),
    // createData('Gingerbread', 356, 16.0, 49, 3.9, 1.5),
  ];

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

        <TableContainer component={Paper}>
          <Table aria-label="collapsible table">
            <TableHead>
              <TableRow>
                <TableCell />
                <TableCell>Company name</TableCell>
                <TableCell align="right">Sum</TableCell>
                <TableCell align="right">Yield</TableCell>
                <TableCell align="right">Current value</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row) => (
                <Row key={row.company_name} row={row} />
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </ThemeProvider>
    </>
  );
}
