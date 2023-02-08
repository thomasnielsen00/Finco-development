import React, { useState, useEffect } from 'react';
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
  Alert,
  IconButton,
  Collapse,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

const history = createHashHistory(); // Use history.push(...) to programmatically change path, for instance after successfully saving a student

export default function MarkedPage() {
  const [companies, setCompanies] = useState<Company[]>([]);
  const [openAlert, setOpenAlert] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>('');

  useEffect(() => {
    companyService
      .getAll()
      .then((companies) => {
        setCompanies(companies);
      })
      .catch((error) => {
        setOpenAlert(true);
        setErrorMessage(error.message);
      });
  }, []);

  return (
    <>
      <CssBaseline />
      <Container maxWidth="lg">
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
            sx={{ mb: 2 }}
          >
            {errorMessage}
          </Alert>
        </Collapse>
        <Grid container spacing={4}>
          {companies.map((company) => (
            <Grid item key={company.company_id} xs={12} sm={6} md={4}>
              <Card>
                <CardContent>
                  <Typography gutterBottom variant="h5">
                    {company.company_name}
                  </Typography>
                  <Typography>
                    This is the card to show the information about the different companies This is
                    the card to show the information about the different companies This is the card
                    to This is the card to show the information about the different companies
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button size="small" color="primary">
                    Les mer
                  </Button>
                  <Button size="small" color="primary">
                    Test
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </>
  );
}
