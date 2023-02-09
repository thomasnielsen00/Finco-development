import { createTheme, createStyles } from '@mui/material/styles';

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

export const useStyles = createStyles({
  container: {
    backgroundColor: 'red',
  },
});
