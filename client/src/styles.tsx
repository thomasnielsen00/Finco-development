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
    backgroundColor: '#faa7a7',
  },
});
