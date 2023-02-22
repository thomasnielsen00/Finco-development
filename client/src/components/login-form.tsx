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
  Alert,
  IconButton,
  Collapse,
} from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import CloseIcon from '@mui/icons-material/Close';
import { ThemeProvider } from '@emotion/react';
import { MidlertidigTheme, useStyles } from '../styles';
import { LanguageContext, UserContext } from '../context';
import userService from '../user-service';

const history = createHashHistory(); // Use history.push(...) to programmatically change path, for instance after successfully saving a student

export default function LogIn() {
  const classes = useStyles();

  // context, må lage en type for brukere
  //@ts-ignore
  const { user, setUser } = useContext(UserContext);

  const [openAlert, setOpenAlert] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>('');

  //@ts-ignore
  const { language } = useContext(LanguageContext);
  const { log_in, register_text, mail, password, wrong_email_or_password, network_error } =
    language;

  const defaultLogInFormInput = {
    email: '',
    password: '',
  };

  const [logInFormValues, setLogInFormValues] = useState(defaultLogInFormInput);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setLogInFormValues({
      ...logInFormValues,
      [event.target.name]: event.target.value,
    });
  };

  //@ts-ignore
  const handleSubmit = (event) => {
    event.preventDefault();
    userService
      .signInUser(logInFormValues.email, logInFormValues.password)
      .then((user) => {
        setUser(user);
        history.push('/users/' + user.user_id);
      })
      .catch((error) => {
        if (error.response.status == 400) {
          setErrorMessage(wrong_email_or_password);
          setOpenAlert(true);
        } else {
          setErrorMessage(network_error);
          setOpenAlert(true);
        }
      });
  };

  return (
    <ThemeProvider theme={MidlertidigTheme}>
      <CssBaseline />
      <Container maxWidth="xs" className={classes.log_in_container}>
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
        <Box component="form" onSubmit={handleSubmit} className={classes.log_in_box}>
          {/* denne fungerer ikke  */}
          {/* <Avatar className={classes.log_in_avatar}> */}
          <Avatar sx={{ bgcolor: MidlertidigTheme.palette.secondary.main }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            {log_in}
          </Typography>
          <TextField
            required
            fullWidth
            color="secondary"
            margin="normal"
            name="email"
            value={logInFormValues.email}
            label={mail}
            onChange={handleChange}
          />
          <TextField
            required
            fullWidth
            color="secondary"
            margin="normal"
            name="password"
            value={logInFormValues.password}
            label={password}
            type="password"
            onChange={handleChange}
          />
          <Button
            className={classes.log_in_button}
            type="submit"
            color="secondary"
            fullWidth
            variant="contained"
            //midlertidig
            sx={{ mt: 2 }}
          >
            {log_in}
          </Button>
          <Grid container>
            <Grid item className={classes.register_link}>
              <Link href="#/register" variant="body2">
                {register_text}
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
