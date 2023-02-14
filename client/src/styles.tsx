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
      main: '#092d0d',
    },
    background: {
      default: '#cdf5e2',
    },
  },
  props: {
    MuiAppBar: {
      color: 'secondary',
    },
  },
});

export const useStyles = makeStyles({
  container: {
    // backgroundColor: '#faa7a7',
    backgroundImage: 'linear-gradient(to bottom right, lightblue, lightgreen)',
  },
  log_in_container: {
    marginTop: '75px',
  },
  log_in_box: {
    backgroundColor: 'white',
    marginTop: '8px',
    padding: '25px 50px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  log_in_button: {
    marginTop: '20px',
  },
  log_in_avatar: {
    margin: '20px',
    backgroundColor: '#092d0d',
    //sjekke om man kan få inn secondary color her...
  },
});
