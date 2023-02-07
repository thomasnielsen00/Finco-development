import * as React from 'react';
// import { NavLink } from 'react-router-dom';
// import companyService, { Company } from './company-service';
import { createHashHistory } from 'history';
import {
  Button,
  Typography,
  AppBar,
  Toolbar,
  CssBaseline,
  Box,
  Container,
  Grid,
} from '@mui/material';

const history = createHashHistory(); // Use history.push(...) to programmatically change path, for instance after successfully saving a student
const pages = ['Din portefølje', 'Marked', 'Om oss'];

export default function NavBar() {
  return (
    <>
      <CssBaseline />
      <AppBar position="static" color="secondary" sx={{ boxShadow: 20 }}>
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <Typography
              variant="h6"
              noWrap
              component="a"
              href="/"
              sx={{
                mr: 2,
                display: { xs: 'none', md: 'flex' },
                fontFamily: 'monospace',
                fontWeight: 700,
                letterSpacing: '.3rem',
                color: 'inherit',
                textDecoration: 'none',
              }}
            >
              FINCO
            </Typography>
            <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
              {pages.map((page) => (
                <Button
                  key={page}
                  sx={{ my: 2, color: 'white', display: 'block' }}
                  component="a"
                  href={'/#' + page}
                >
                  {page}
                </Button>
              ))}
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
    </>
  );
}

export class Home extends React.Component {
  render() {
    return (
      <>
        <div>
          <Container
            maxWidth="sm"
            sx={{ boxShadow: 10, borderRadius: 2, marginTop: '100px', padding: '50px' }}
          >
            <Typography variant="h2" align="center" color="textPrimary" gutterBottom>
              FINCO
            </Typography>
            <Typography
              variant="h5"
              align="center"
              color="textSecondary"
              paragraph
              // sx={{ color: 'pink' }}
            >
              Velkommen til Finco investement, ikke la drømmene dine vente!
            </Typography>
            <div>
              <Grid container spacing={2} justifyContent="center">
                <Grid item>
                  <Button className="button" variant="contained" color="secondary">
                    KOM I GANG NÅ
                  </Button>
                </Grid>
              </Grid>
            </div>
          </Container>
        </div>
        <Container maxWidth="lg"></Container>
      </>
    );
  }
  mounted() {}
}
