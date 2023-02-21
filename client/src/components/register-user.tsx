import React, { useState, useEffect, useContext } from 'react';
import { createHashHistory } from 'history';
import {
  Button,
  CssBaseline,
  Container,
  TextField,
  Box,
  Typography,
  Avatar,
  Grid,
  Link,
} from '@mui/material';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import { ThemeProvider } from '@emotion/react';
import { MidlertidigTheme, useStyles } from '../styles';
import { LanguageContext, UserContext } from '../context';
import userService from '../user-service';

const history = createHashHistory(); // Use history.push(...) to programmatically change path, for instance after successfully saving a student

export default function Register() {
  const classes = useStyles();
  // context, må lage en type for brukere
  //@ts-ignore
  const { user, setUser } = useContext(UserContext);
  //@ts-ignore
  const { language } = useContext(LanguageContext);
  const {
    sign_up,
    create_user,
    full_name,
    mail,
    password,
    confirm_password,
    cancel,
    write_full_name,
    email_not_valid,
    password_not_long_enough,
    passwords_not_matching,
  } = language;

  const defaultSignUpFormValues = {
    full_name: '',
    mail: '',
    password: '',
    confirm_password: '',
  };

  const [signUpFormValues, setSignUpFormValues] = useState(defaultSignUpFormValues);
  const [error, setError] = useState({
    full_name: false,
    mail: false,
    password: false,
    confirm_password: false,
  });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSignUpFormValues({
      ...signUpFormValues,
      [event.target.name]: event.target.value,
    });
  };

  //@ts-ignore
  const handleSubmit = (event) => {
    event.preventDefault();
    // funker, men oppdaterer ikke error fort nok
    formValidation(signUpFormValues, setError)
      .then(() =>
        userService
          .createUser(signUpFormValues.full_name, signUpFormValues.mail, signUpFormValues.password)
          .then((user_id) => {
            userService
              .getUser(user_id)
              .then((user) => {
                setUser(user);
              })
              .then(() => history.push('/profile/' + user_id))
              .catch((error) => {
                console.error(error.message);
              });
          })
          .catch((error) => {
            console.error(error.message);
          })
      )
      .catch(() => console.log('Error detected'));
  };

  // midlertidig type
  const formValidation = (signUpFormValues: any, setError: any) => {
    return new Promise<void>((resolve, reject) => {
      //pattern for testing if there is a letter both before and after the space (\s), both with upper and lowerCase
      let pattern = /[a-zA-Z]\s[a-zA-Z]/;
      //Validation for full name input
      if (!pattern.test(signUpFormValues.full_name)) {
        //usikker på om dette er riktig typescript
        setError((prevState: object) => ({ ...prevState, full_name: true }));
        reject();
      } else {
        //@ts-ignore
        setError((prevState) => ({ ...prevState, full_name: false }));
      }
      //Validation for email input
      if (!signUpFormValues.mail.includes('@')) {
        //@ts-ignore
        setError((prevState) => ({ ...prevState, mail: true }));
        reject();
      } else {
        //@ts-ignore
        setError((prevState) => ({ ...prevState, mail: false }));
      }
      //Validation for password input
      if (signUpFormValues.password.length < 8) {
        //@ts-ignore
        setError((prevState) => ({ ...prevState, password: true }));
        reject();
      } else {
        //@ts-ignore
        setError((prevState) => ({ ...prevState, password: false }));
      }
      //Validation for confirm_password input
      if (signUpFormValues.password != signUpFormValues.confirm_password) {
        //@ts-ignore
        setError((prevState) => ({ ...prevState, confirm_password: true }));
        reject();
      } else {
        //@ts-ignore

        setError((prevState) => ({ ...prevState, confirm_password: false }));
      }
      resolve();
    });
  };

  return (
    <ThemeProvider theme={MidlertidigTheme}>
      <CssBaseline />
      <Container maxWidth="xs" className={classes.log_in_container}>
        <Box component="form" onSubmit={handleSubmit} className={classes.log_in_box}>
          {/* denne fungerer ikke  */}
          {/* <Avatar className={classes.log_in_avatar}> */}
          <Avatar sx={{ bgcolor: MidlertidigTheme.palette.secondary.main }}>
            <PersonAddIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            {sign_up}
          </Typography>
          <TextField
            required
            error={error.full_name}
            fullWidth
            color="secondary"
            helperText={error.full_name ? write_full_name : ''}
            margin="normal"
            name="full_name"
            value={signUpFormValues.full_name}
            label={full_name}
            onChange={handleChange}
          />
          <TextField
            required
            error={error.mail}
            fullWidth
            color="secondary"
            helperText={error.mail ? email_not_valid : ''}
            margin="normal"
            name="mail"
            value={signUpFormValues.mail}
            label={mail}
            onChange={handleChange}
          />
          <TextField
            required
            error={error.password}
            fullWidth
            color="secondary"
            helperText={error.password ? password_not_long_enough : ''}
            margin="normal"
            name="password"
            value={signUpFormValues.password}
            label={password}
            type="password"
            onChange={handleChange}
          />
          <TextField
            required
            error={error.confirm_password}
            fullWidth
            color="secondary"
            helperText={error.confirm_password ? passwords_not_matching : ''}
            margin="normal"
            name="confirm_password"
            value={signUpFormValues.confirm_password}
            label={confirm_password}
            type="password"
            onChange={handleChange}
          />
          <Button
            className={classes.log_in_button}
            type="submit"
            //hvorfor vil ikke denne endre marginTop
            color="secondary"
            fullWidth
            variant="contained"
            //midlertidig
            sx={{ mt: 2 }}
          >
            {create_user}
          </Button>
          <Grid container>
            <Grid item className={classes.register_link}>
              <Link href="#" variant="body2">
                {cancel}
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
