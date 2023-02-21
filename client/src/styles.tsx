import { createTheme } from '@mui/material/styles';
import { makeStyles } from '@material-ui/styles';
import { green } from '@mui/material/colors';

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

  //USERDETAILS-COMPONENTS STYLES:
  form: {
    margin: '50px auto', // adjust the vertical margin as needed
    maxWidth: '50%', // adjust the maximum width as needed
    //Vi trenger kanskje flere breakpoints?

    // [theme.breakpoints.up('md')]: {
    //   marginTop: '3%', // adjust the vertical margin on larger screens
    // },
  },
  // TextField: {
  //   backgroundColor: 'white',
  // },

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
