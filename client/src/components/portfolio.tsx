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
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { ThemeProvider } from '@emotion/react';
import { MidlertidigTheme, useStyles } from '../styles';
import { LanguageContext, UserContext } from '../context';
import { NavLink, useParams } from 'react-router-dom';
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

  function Row(props: { row: Investment }) {
    const { row } = props;
    const [open, setOpen] = React.useState(false);
    const totalPrices: number[] = [];
    const currentSharePrice = [
      {
        company_name: 'Europris',
        currentSharePrice: 10.98,
      },
      {
        company_name: 'Airthings',
        currentSharePrice: 34,
      },
    ];

    // Calculate total prices for the current company
    investments.forEach((investment) => {
      if (investment.company_name === row.company_name) {
        totalPrices.push(Math.round(investment.amount * investment.buy_price * 100) / 100);
      }
    });
    const sum = totalPrices.reduce(
      (accumulator, currentElement) => accumulator + currentElement,
      0
    );

    const currentCompanyPrice = currentSharePrice.find(
      (price) => price.company_name === row.company_name
    );
    const currentPrice = currentCompanyPrice?.currentSharePrice || 0;
    const totalShares = investments
      .filter((investment) => investment.company_name === row.company_name)
      // accumulator is the variable that accumulates the result of the callback function,
      //and currentElement is the current element of the array being processed.
      .reduce((accumulator, currentElement) => accumulator + Number(currentElement.amount), 0);
    const currentValue = totalShares * currentPrice;
    const buyValue = sum;
    const returnPercentage = ((currentValue - buyValue) / buyValue) * 100;
    const returnAmount = (returnPercentage / 100) * sum;

    const [openSellConfirm, setOpenSellConfirm] = React.useState(false);
    const [investmentToSell, setInvestmentToSell] = React.useState<Investment | null>(null);

    function sellInvestment(investment: Investment) {
      const index = investments.findIndex((inv) => inv.investment_id === investment.investment_id);
      if (index !== -1) {
        investments.splice(index, 1);
      }
    }

    const handleOpenSellConfirm = (investment_id: number) => {
      const investment = investments.find((inv) => inv.investment_id === investment_id);
      if (investment) {
        setInvestmentToSell(investment);
        setOpenSellConfirm(true);
      }
    };

    const handleCloseSellConfirm = () => {
      setOpenSellConfirm(false);
      if (investmentToSell) {
        sellInvestment(investmentToSell);
      }
    };

    {
      console.log(returnPercentage + '*' + sum);
    }

    {
      console.log(currentValue);
      console.log(totalShares);
    }
    return (
      <React.Fragment>
        <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
          <TableCell>
            <IconButton aria-label="expand row" size="small" onClick={() => setOpen(!open)}>
              {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
            </IconButton>
          </TableCell>
          <TableCell component="th" scope="row">
            <NavLink to={'/company/' + row.company_id}>{row.company_name}</NavLink>
          </TableCell>
          <TableCell align="right">{sum} kr</TableCell>
          <TableCell align="right">{Number(returnPercentage.toFixed(2))} %</TableCell>
          <TableCell align="right">{Number(returnAmount).toFixed(2)} kr</TableCell>
          <TableCell align="right">{Number(currentValue).toFixed(2)} kr</TableCell>
        </TableRow>
        <TableRow>
          <TableCell
            style={{
              paddingBottom: 0,
              paddingTop: 0,
              boxShadow: 'inset 0 3px 6px 0 rgba(0 0 0 / 0.2)',
            }}
            colSpan={6}
          >
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
                      {/* Not necesary for now
                      <TableCell align="right">Yield (kr)</TableCell> */}
                      <TableCell align="right">Price (kr)</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {investments
                      .filter((investment) => investment.company_name === row.company_name)
                      .map((investment) => (
                        <TableRow key={investment.buy_date}>
                          <TableCell component="th" scope="row">
                            {new Date(investment.buy_date).toLocaleDateString('en-GB', {
                              day: 'numeric',
                              month: 'numeric',
                              year: 'numeric',
                            })}
                          </TableCell>
                          <TableCell>{Number(investment.amount).toFixed(1)}</TableCell>
                          <TableCell align="right">
                            {Number(investment.buy_price).toFixed(2)}
                          </TableCell>

                          {/* <TableCell align="right">Yield: To be implemented if necesary</TableCell> */}
                          <TableCell align="right">
                            {Math.round(investment.amount * investment.buy_price * 100) / 100}
                          </TableCell>

                          <TableCell align="right">
                            <Button
                              variant="contained"
                              onClick={() => handleOpenSellConfirm(investment.investment_id)}
                              color="warning"
                            >
                              Sell
                            </Button>
                            <Dialog
                              open={openSellConfirm}
                              onClose={handleCloseSellConfirm}
                              aria-labelledby="alert-dialog-title"
                              aria-describedby="alert-dialog-description"
                            >
                              <DialogTitle id="alert-dialog-title">
                                {'Sure you want to sell this investment?'}
                              </DialogTitle>
                              <DialogContent>
                                <DialogContentText id="alert-dialog-description">
                                  If you sell your investment of {Number(row.amount).toFixed(1)}{' '}
                                  shares in {row.company_name} you are left with{' '}
                                  {Number(
                                    investment.amount *
                                      investment.buy_price *
                                      ((currentValue - investment.amount * investment.buy_price) /
                                        (investment.amount * investment.buy_price))
                                  ).toFixed(2)}
                                  kr in return
                                </DialogContentText>
                              </DialogContent>
                              <DialogActions>
                                <Button onClick={handleCloseSellConfirm}>Cancel</Button>
                                <Button
                                  onClick={() => {
                                    //Her mangler jeg å oppdatere sellDate når metoden kjøres
                                    // userService.deleteUserInvestment(
                                    //   row.user_id,
                                    //   row.investment_id
                                    // );
                                    window.location.reload();
                                  }}
                                  autoFocus
                                >
                                  Confirm
                                </Button>
                              </DialogActions>
                            </Dialog>
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

  return (
    <>
      <ThemeProvider theme={MidlertidigTheme}>
        <CssBaseline />

        <Card
          style={{
            width: '90%',
            marginLeft: '5%',
            marginTop: '3%',
          }}
        >
          <TableContainer component={Paper}>
            <Table aria-label="collapsible table">
              <TableHead>
                <TableRow>
                  <TableCell />
                  <TableCell>Company name</TableCell>
                  <TableCell align="right">Total price</TableCell>
                  <TableCell align="right">Return(%)</TableCell>
                  <TableCell align="right">Return(kr)</TableCell>
                  <TableCell align="right">Current value</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {investments
                  .filter((investment, index, array) => {
                    // Check if the company_name of the current investment is unique
                    return (
                      array.findIndex((i) => i.company_name === investment.company_name) === index
                    );
                  })
                  .map((investment) => (
                    <Row key={investment.company_name} row={investment} />
                  ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Card>
      </ThemeProvider>
    </>
  );
}
