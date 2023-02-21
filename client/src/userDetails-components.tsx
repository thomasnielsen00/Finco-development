// import React, { useState, useEffect, useContext } from 'react';
// // import { NavLink } from 'react-router-dom';
// import companyService, { Company } from './company-service';
// import userService, { Investment, User } from './user-service';
// import { createHashHistory } from 'history';
// import {
//   Button,
//   Typography,
//   CssBaseline,
//   Container,
//   Grid,
//   Card,
//   CardContent,
//   CardActions,
//   Alert,
//   IconButton,
//   Collapse,
// } from '@mui/material';
// import CloseIcon from '@mui/icons-material/Close';
// import { ThemeProvider } from '@emotion/react';
// import { MidlertidigTheme, useStyles } from './styles';
// import { LanguageContext, UserContext } from './context';
// import { useParams } from 'react-router-dom';
// import { LanguageTextInfo } from './language';

// const history = createHashHistory(); // Use history.push(...) to programmatically change path, for instance after successfully saving a student

// export default function UserDetails() {
//   const classes = useStyles();

//   //   const { user } = useContext(UserContext);
//   const { language } = useContext(LanguageContext);
//   //   const { calculated_stock_value, live_stock_value, explore_company } = language;
//   const { show_details } = language;
//   //Må lære meg dette her:
//   const [user, setUser] = useState<User>();
//   const [openAlert, setOpenAlert] = useState<boolean>(false);
//   const [errorMessage, setErrorMessage] = useState<string>('');
//   const { user_id } = useParams();

//   useEffect(() => {
//     const current_id = parseInt(user_id, 10); //base 10

//     userService
//       .getUser(current_id)
//       .then((user) => {
//         setUser(user);
//       })
//       .catch((error) => {
//         setOpenAlert(true);
//         setErrorMessage(error.message);
//       });
//   }, [user_id]);

//   return (
//     <>
//       <ThemeProvider theme={MidlertidigTheme}>
//         <CssBaseline />
//         <Container maxWidth="lg" sx={{ mt: 3 }}>
//           {/* sx er midlertidig */}
//           <Collapse in={openAlert}>
//             <Alert
//               severity="error"
//               action={
//                 <IconButton
//                   aria-label="close"
//                   color="inherit"
//                   size="small"
//                   onClick={() => {
//                     setOpenAlert(false);
//                   }}
//                 >
//                   <CloseIcon fontSize="inherit" />
//                 </IconButton>
//               }
//               sx={{ mb: 2, p: 2 }}
//             >
//               {errorMessage}
//             </Alert>
//           </Collapse>
//           <Grid container spacing={4}>
//             <Grid item key={user?.user_id} xs={12} sm={6} md={4}>
//               <Card sx={{ p: 2 }}>
//                 <Card className={classes.container} sx={{ m: 1 }}>
//                   <CardContent>
//                     <Typography align="center" variant="h4">
//                       Brukernavn: {user?.username}
//                       {/* Midlertidig løsning */}
//                     </Typography>
//                   </CardContent>
//                 </Card>
//                 <CardContent>
//                   <Typography align="center" variant="h4">
//                     Månedlig sparebeløp: {user?.monthly_savings_amount}kr
//                   </Typography>
//                 </CardContent>
//                 <CardContent>
//                   <Typography align="center" variant="h4">
//                     Epost: {user?.email}
//                   </Typography>
//                 </CardContent>
//                 <CardContent>
//                   <Typography align="center" variant="h4">
//                     Risikovilje: {user?.risk_willingness}
//                   </Typography>
//                 </CardContent>

//                 <CardActions>
//                   <Button
//                     size="large"
//                     variant="contained"
//                     color="secondary"
//                     onClick={() => history.push('/user/' + user?.user_id + '/edit')}
//                   >
//                     Oppdater informasjon
//                   </Button>
//                 </CardActions>
//               </Card>
//             </Grid>
//           </Grid>
//         </Container>
//       </ThemeProvider>
//     </>
//   );
// }

import React, { useState, useEffect } from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import {
  Button,
  Typography,
  CssBaseline,
  Container,
  Grid,
  Card,
  CardContent,
  CardActions,
  TextField,
  MenuItem,
  FormLabel,
} from '@material-ui/core';
import { useParams } from 'react-router-dom';
import userService, { Industry, Investment, User } from './user-service';
import {
  Alert,
  Checkbox,
  CircularProgress,
  Fab,
  FormControlLabel,
  FormHelperText,
  InputLabel,
} from '@mui/material';
import SaveIcon from '@material-ui/icons/Save';
import { green } from '@mui/material/colors';
import clsx from 'clsx';
import CheckIcon from '@material-ui/icons/Check';

//Skal vi ha med dette?:
// const risk_willingness: Array<{ value: string; label: string }> = [
//   {
//     value: 'high',
//     label: 'High',
//   },
//   {
//     value: 'moderate',
//     label: 'Moderate',
//   },
//   {
//     value: 'low',
//     label: 'Low',
//   },
// ];

const useStyles = makeStyles((theme) => ({
  form: {
    margin: '50px auto', // adjust the vertical margin as needed
    maxWidth: '50%', // adjust the maximum width as needed
    //Vi trenger kanskje flere breakpoints?
    [theme.breakpoints.up('md')]: {
      marginTop: '3%', // adjust the vertical margin on larger screens
    },
  },
  TextField: {
    backgroundColor: 'white',
  },

  buttonSuccess: {
    backgroundColor: green[500],
    '&:hover': {
      backgroundColor: green[700],
    },
  },

  buttonProgress: {
    color: green[500],
    position: 'absolute',
    top: '50%',
    left: '50%',
    marginTop: -12,
    marginLeft: -12,
  },
}));

//Er det her riktig måte å benytte komponentene på? Altså som en funksjon
export const UserProfile: React.FC = () => {
  const [userData, setUserData] = useState<User>();
  //Save-button related
  const [loading, setLoading] = React.useState(false);
  ////Save-button related
  const [savedChange, setSavedChange] = React.useState(false);
  ////Save-button related
  const timer = React.useRef<number>();
  const { user_id } = useParams();
  //Constant referering to the defined styling of given elements:
  const classes = useStyles();
  //Following const is regarding userInvestment:
  const [preferedIndustry, setPreferedIndustry] = useState<Industry>();

  const buttonClassname = clsx({
    [classes.buttonSuccess]: savedChange,
  });

  //Save-button related
  React.useEffect(() => {
    return () => {
      clearTimeout(timer.current);
    };
  }, []);

  //Denne er flytte ned inn i handleSubmit, men vet ikke hva som er best?
  // const handleButtonClick = () => {
  //   if (!loading) {
  //     setSavedChange(false);
  //     setLoading(true);
  //     timer.current = window.setTimeout(() => {
  //       setSavedChange(true);
  //       setLoading(false);
  //     }, 2000);
  //   }
  // };

  const buttonText = savedChange ? 'Saved' : 'Save changes';

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUserData({ ...userData, [event.target.name]: event.target.value });
    //Every time there is a change of input the button is reset to "Save changes"
    setSavedChange(false);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    if (!loading) {
      setSavedChange(false);
      setLoading(true);
      timer.current = window.setTimeout(() => {
        setSavedChange(true);
        setLoading(false);
        //.preventDefault is a common pattern in React form handling to prevent the default
        //behavior of the form submission, which typically involves the page being refreshed or reloaded.
        event.preventDefault();
        userService.updateUser(userData).catch((error) => console.log(error));
      }, 2000);
    }
  };

  //The code below fetches the details for a given user with the provided method in the userService-objekt
  useEffect(() => {
    const current_id = parseInt(user_id, 10); //base 10

    userService.get;

    userService
      .getUser(current_id)
      .then((user) => {
        setUserData(user);
      })
      .catch((error) => {
        // setOpenAlert(true);
        // setErrorMessage(error.message);
        <Alert>{error}</Alert>;
      });
  }, [user_id]);

  return (
    <>
      <form className={classes.form}>
        <Typography variant="h5">General information</Typography>

        <Grid container spacing={2}>
          <Grid item xs={6}>
            {/* htmlFor = inputfelt-iden gjør at kan føres til tilhørende inpultfeltet når man trykker på labelen */}
            <InputLabel htmlFor="email">Email</InputLabel>

            <TextField
              required
              // helperText="Denne må være fylt ut"
              id="email"
              name="email"
              // label={userData?.email}
              variant="outlined"
              value={userData?.email}
              onChange={handleChange}
              fullWidth
              className={classes.TextField}
            />
          </Grid>
          <Grid item xs={6}>
            {/* htmlFor = inputfelt-iden gjør at kan føres til tilhørende inpultfeltet når man trykker på labelen */}
            <InputLabel htmlFor="password">Password</InputLabel>

            <TextField
              required
              id="password"
              name="password"
              // label={userData?.password}
              variant="outlined"
              value={userData?.password}
              onChange={handleChange}
              fullWidth
              className={classes.TextField}
            />
          </Grid>
          <Grid item xs={6}>
            {/* htmlFor = inputfelt-iden gjør at kan føres til tilhørende inpultfeltet når man trykker på labelen */}
            <InputLabel htmlFor="full_name">Full name</InputLabel>

            <TextField
              required
              id="full_name"
              name="full_name"
              // label="Full name"
              variant="outlined"
              // type="tel"
              value={userData?.full_name}
              onChange={handleChange}
              fullWidth
              className={classes.TextField}
            />
          </Grid>
          <Grid item xs={6}>
            {/* htmlFor = inputfelt-iden gjør at kan føres til tilhørende inpultfeltet når man trykker på labelen */}
            <InputLabel htmlFor="phone_number">Phone number</InputLabel>

            <TextField
              required
              id="phone_number"
              name="phone_number"
              // label={userData?.phone_number}
              variant="outlined"
              // type="tel"
              value={userData?.phone_number}
              onChange={handleChange}
              fullWidth
              className={classes.TextField}
            />
          </Grid>

          {/* htmlFor = inputfelt-iden gjør at kan føres til tilhørende inpultfeltet når man trykker på labelen */}
          <Grid item xs={6}>
            <InputLabel htmlFor="monthly_savings_amount">Monthly savings amount</InputLabel>

            <Grid container spacing={2}>
              <Grid item xs={6}>
                <TextField
                  required
                  id="savings_from"
                  name="savings_from"
                  // label="From"
                  variant="outlined"
                  // type="date"
                  value={userData?.savings_from}
                  onChange={handleChange}
                  fullWidth
                  className={classes.TextField}
                />
                <FormHelperText>From kr</FormHelperText>
              </Grid>

              {/* <Grid item xs={6}>
          <TextField
            id="gender"
            name="gender"
            select
            label="Gender"
            variant="outlined"
            value={userData.gender}
            onChange={handleChange}
            fullWidth
          >
            {genders.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>
        </Grid> */}

              {/* htmlFor = inputfelt-iden gjør at kan føres til tilhørende inpultfeltet når man trykker på labelen */}
              <Grid item xs={6}>
                <TextField
                  required
                  id="savings_to"
                  name="savings_to"
                  // label="To"
                  variant="outlined"
                  // type="email"
                  value={userData?.savings_to}
                  onChange={handleChange}
                  fullWidth
                  className={classes.TextField}
                />
                <FormHelperText>To kr</FormHelperText>
              </Grid>
            </Grid>
          </Grid>

          <Grid item xs={6}>
            {/* htmlFor = inputfelt-iden gjør at kan føres til tilhørende inpultfeltet når man trykker på labelen */}
            <InputLabel htmlFor="risk_willingness">Risk willingness</InputLabel>

            <TextField
              required
              id="risk_willingness"
              name="risk_willingness"
              // label= "Risk willing"
              variant="outlined"
              value={userData?.risk_willingness}
              onChange={handleChange}
              fullWidth
              className={classes.TextField}
            />
          </Grid>
          {/* <Button
          variant="contained"
          color="primary"
          size="small"
          className={classes.button}
          startIcon={<SaveIcon />}
          onClick={handleSubmit}
        >
          Save changes
        </Button> */}

          <Button
            variant="contained"
            aria-label="save"
            color="primary"
            className={buttonClassname}
            onClick={handleSubmit}
          >
            {buttonText}
            {savedChange ? <CheckIcon /> : <SaveIcon />}
          </Button>

          {loading && <CircularProgress size={68} className={classes.buttonProgress} />}
        </Grid>
      </form>

      <ul>
        <li></li>
      </ul>
    </>
  );
};
