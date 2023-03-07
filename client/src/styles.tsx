import { createTheme } from '@mui/material/styles';
import { makeStyles } from '@material-ui/styles';

export const MidlertidigTheme = createTheme({
  palette: {
    //@ts-ignore
    mode: 'light',
    primary: {
      main: '#06293d',
    },
    secondary: {
      main: '#06293d',
    },
    background: {
      default: '#fffcf4',
    },
  },
  typography: {
    fontFamily: ['Quicksand', 'sans-serif'].join(','),
  },
});

export const useStyles = makeStyles((MidlertidigTheme) => ({
  home_page_container: {
    // paddingTop: '100px',
    width: '100%',
    height: '88vh',
    background: 'linear-gradient(0deg, rgba(255,252,244,1) 60%, rgba(6,41,61,1) 100%)',
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
