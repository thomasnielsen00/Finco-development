import { Link, Typography, Container } from '@mui/material';
import React from 'react';

export default function Footer() {
  return (
    <Container maxWidth="xl">
      <Typography variant="body2" color="text.secondary" align="center">
        {'Copyright © '}
        <Link color="inherit" href="https://www.finco.no/">
          Finco
        </Link>
        {' 2023 | All Rights Reserved'}
      </Typography>
    </Container>
  );
}
