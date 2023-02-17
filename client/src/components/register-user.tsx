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
  const { sign_up, create_user, full_name, mail, password, confirm_password, cancel } = language;

  const defaultSignUpFormValues = {
    full_name: '',
    mail: '',
    password: '',
    confirm_password: '',
  };

  const [signUpFormValues, setSignUpFormValues] = useState(defaultSignUpFormValues);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSignUpFormValues({
      ...signUpFormValues,
      [event.target.name]: event.target.value,
    });
  };

  //@ts-ignore
  const handleSubmit = (event) => {
    event.preventDefault();
    userService
      .createUser(
        signUpFormValues.full_name,
        signUpFormValues.password,
        signUpFormValues.mail,
        'Medium',
        100
      )
      .then((user_id) => {
        console.log(user_id);
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
      });
    setSignUpFormValues(defaultSignUpFormValues);
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
            fullWidth
            color="secondary"
            margin="normal"
            name="full_name"
            value={signUpFormValues.full_name}
            label={full_name}
            onChange={handleChange}
          />
          <TextField
            required
            fullWidth
            color="secondary"
            margin="normal"
            name="mail"
            value={signUpFormValues.mail}
            label={mail}
            onChange={handleChange}
          />
          <TextField
            required
            fullWidth
            color="secondary"
            margin="normal"
            name="password"
            value={signUpFormValues.password}
            label={password}
            type="password"
            onChange={handleChange}
          />
          <TextField
            required
            fullWidth
            color="secondary"
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
