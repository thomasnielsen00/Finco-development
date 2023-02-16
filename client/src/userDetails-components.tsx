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
import userService, { Investment, User } from './user-service';
import { Alert, Checkbox, FormControlLabel, InputLabel } from '@mui/material';

const genders: Array<{ value: string; label: string }> = [
  {
    value: 'female',
    label: 'Female',
  },
  {
    value: 'male',
    label: 'Male',
  },
  {
    value: 'other',
    label: 'Other',
  },
];

// interface UserProfileProps {
//   firstName: string;
//   lastName: string;
//   birthday: string;
//   gender: string;
//   email: string;
//   phone: string;
// }

const useStyles = makeStyles((theme) => ({
  form: {
    margin: '50px auto', // adjust the vertical margin as needed
    maxWidth: '600px', // adjust the maximum width as needed
    [theme.breakpoints.up('md')]: {
      marginTop: '100px', // adjust the vertical margin on larger screens
    },
  },
  TextField: {
    backgroundColor: 'white',
  },
}));

export const UserProfile: User = () => {
  const [userData, setUserData] = useState<User>();
  const testPhonenumber = 7676686;

  const { user_id } = useParams();

  useEffect(() => {
    const current_id = parseInt(user_id, 10); //base 10

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

  const classes = useStyles();

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUserData({ ...userData, [event.target.name]: event.target.value });
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log(userData);
  };

  return (
    <form onSubmit={handleSubmit} className={classes.form}>
      <Typography variant="h5">General information</Typography>
      <br></br>
      <Grid container spacing={2}>
        <Grid item xs={6}>
          {/* htmlFor = inputfelt-iden gjør at kan føres til tilhørende inpultfeltet når man trykker på labelen */}
          <InputLabel htmlFor="username">Username</InputLabel>
          <br></br>
          <TextField
            required
            id="username"
            name="username"
            label={userData?.username}
            variant="outlined"
            value={userData?.username}
            onChange={handleChange}
            fullWidth
            className={classes.TextField}
          />
        </Grid>
        <Grid item xs={6}>
          {/* htmlFor = inputfelt-iden gjør at kan føres til tilhørende inpultfeltet når man trykker på labelen */}
          <InputLabel htmlFor="password">Password</InputLabel>
          <br></br>
          <TextField
            required
            id="password"
            name="password"
            label={userData?.password}
            variant="outlined"
            value={userData?.password}
            onChange={handleChange}
            fullWidth
            className={classes.TextField}
          />
        </Grid>
        <Grid item xs={6}>
          {/* htmlFor = inputfelt-iden gjør at kan føres til tilhørende inpultfeltet når man trykker på labelen */}
          <InputLabel htmlFor="email">Email</InputLabel>
          <br></br>
          <TextField
            required
            id="email"
            name="email"
            label={userData?.email}
            variant="outlined"
            // type="date"
            value={userData?.email}
            onChange={handleChange}
            fullWidth
            className={classes.TextField}
          />
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
        <Grid item xs={6}>
          {/* htmlFor = inputfelt-iden gjør at kan føres til tilhørende inpultfeltet når man trykker på labelen */}
          <InputLabel htmlFor="risk_willingness">Risk willingness</InputLabel>
          <br></br>
          <TextField
            required
            id="risk_willingness"
            name="risk_willingness"
            label={userData?.risk_willingness}
            variant="outlined"
            // type="email"
            value={userData?.risk_willingness}
            onChange={handleChange}
            fullWidth
            className={classes.TextField}
          />
        </Grid>

        <Grid item xs={6}>
          {/* htmlFor = inputfelt-iden gjør at kan føres til tilhørende inpultfeltet når man trykker på labelen */}
          <InputLabel htmlFor="monthly_savings_amount">Monthly savings amount</InputLabel>
          <br></br>
          <TextField
            required
            id="monthly_savings_amount"
            name="monthly_savings_amount"
            label={userData?.monthly_savings_amount}
            variant="outlined"
            // type="tel"
            value={userData?.monthly_savings_amount}
            onChange={handleChange}
            fullWidth
            className={classes.TextField}
          />
        </Grid>
        <Grid item xs={6}>
          {/* htmlFor = inputfelt-iden gjør at kan føres til tilhørende inpultfeltet når man trykker på labelen */}
          <InputLabel htmlFor="monthly_savings_amount">Phonenumber</InputLabel>
          <br></br>
          <TextField
            required
            id="phonenumber"
            name="phonenumber"
            label={testPhonenumber}
            variant="outlined"
            // type="tel"
            value={testPhonenumber}
            onChange={handleChange}
            fullWidth
            className={classes.TextField}
          />
        </Grid>
      </Grid>
    </form>
  );
};
