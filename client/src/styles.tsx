import { createTheme } from '@mui/material/styles';
import { makeStyles } from '@material-ui/styles';

export const MidlertidigTheme = createTheme({
  palette: {
    //@ts-ignore
    type: 'light',
    primary: {
      main: '#3f51b5',
    },
    secondary: {
      main: '#173828',
    },
    background: {
      default: '#dfe8e4',
    },
  },
  props: {
    MuiAppBar: {
      color: 'primary',
    },
  },
});

export const useStyles = makeStyles((MidlertidigTheme) => ({
  home_page_container: {
    backgroundImage: 'linear-gradient(to right, lightgreen, white)',
    width: '100vw',
    height: '100vh',
  },
  container: {
    // backgroundColor: '#faa7a7',
    backgroundImage: 'linear-gradient(to bottom right, lightblue, lightgreen)',
  },
  log_in_container: {
    marginTop: '75px',
  },
  log_in_box: {
    marginTop: '8px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  log_in_button: {
    marginTop: '50px',
  },
  log_in_avatar: {
    backgroundColor: '#092d0d',
    //vet ikke hvorfor denne over ikke fungerer,

    margin: '20px',
  },
  register_link: {
    paddingTop: '15px',
  },
  logo: {
    maxWidth: '160',
    height: '45px',
    margin: '0px 30px',
  },
  navbar_button: {
    display: 'block',
    margin: '0px 20px',
  },
}));
