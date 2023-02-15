import React, { useState, useEffect, useContext } from 'react';
import { createHashHistory } from 'history';
import { Button, CssBaseline, Container, TextField, Box, Typography, Avatar } from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { ThemeProvider } from '@emotion/react';
import { MidlertidigTheme, useStyles } from '../styles';
import { LanguageContext, UserContext } from '../context';

const history = createHashHistory(); // Use history.push(...) to programmatically change path, for instance after successfully saving a student

export default function LogIn() {
  const defaultLogInFormInput = {
    username: '',
    password: '',
  };

  const [logInFormInput, setLogInFormInput] = useState(defaultLogInFormInput);
  const { username, password } = logInFormInput;
  const classes = useStyles();

  // context, må lage en type for brukere
  //@ts-ignore
  const { user, setUser } = useContext(UserContext);
  //@ts-ignore
  const { language } = useContext(LanguageContext);
  const { log_in } = language;

  const onInputChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setLogInFormInput((prevState) => ({
      ...prevState,
      [event.target.id]: event.target.value,
    }));
  };

  const logInSubmit = () => {
    // kode under vil kobles til backend og sjekke om passord og brukernavn stemmer overens.
    //videre skal man kjøre denne med all data som trengs å lagres for hver bruker ;D
    setUser({ username: username, password: password });
    //videre skal man pushes til hjemside eller brukerside
    history.push('/');
  };

  return (
    <ThemeProvider theme={MidlertidigTheme}>
      <CssBaseline />
      <Container maxWidth="sm" className={classes.log_in_container}>
        <Box className={classes.log_in_box}>
          {/* denne fungerer ikke  */}
          <Avatar className={classes.log_in_avatar}>
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
            id="username"
            label={language.username}
            onChange={onInputChange}
          />
          <TextField
            required
            fullWidth
            color="secondary"
            margin="normal"
            id="password"
            label={language.password}
            type="password"
            onChange={onInputChange}
          />
          <Button
            color="secondary"
            fullWidth
            className={classes.log_in_button}
            variant="contained"
            onClick={logInSubmit}
          >
            {language.log_in}
          </Button>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
