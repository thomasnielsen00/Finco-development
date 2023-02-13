import React, { useState, useEffect, useContext } from 'react';
// import { NavLink } from 'react-router-dom';
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
  TextField,
  Collapse,
  FormControl,
  Input,
  InputLabel,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { ThemeProvider } from '@emotion/react';
import { MidlertidigTheme, useStyles } from './styles';
import { LanguageContext, UserContext } from './context';

const history = createHashHistory(); // Use history.push(...) to programmatically change path, for instance after successfully saving a student

export default function LogIn() {
  const defaultLogInFormInput = {
    username: '',
    password: '',
  };

  const [logInFormInput, setLogInFormInput] = useState(defaultLogInFormInput);
  const { username, password } = logInFormInput;

  // context, må lage en type for brukere
  //@ts-ignore
  const { user, setUser } = useContext(UserContext);
  //@ts-ignore
  const { language } = useContext(LanguageContext);

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
  };

  return (
    <ThemeProvider theme={MidlertidigTheme}>
      <CssBaseline />
      <Container maxWidth="md" sx={{ mt: 3 }}>
        <Card>
          <CardContent>
            <TextField id="username" label={language.username} onChange={onInputChange} />
          </CardContent>
          <CardContent>
            <TextField
              id="password"
              label={language.password}
              type="password"
              onChange={onInputChange}
            />
          </CardContent>
          <CardActions>
            <Button variant="contained" onClick={logInSubmit}>
              {language.log_in}
            </Button>
          </CardActions>
        </Card>
      </Container>
    </ThemeProvider>
  );
}
