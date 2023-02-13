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
import { ThemeProvider } from '@emotion/react';
import { MidlertidigTheme, useStyles } from './styles';

const history = createHashHistory(); // Use history.push(...) to programmatically change path, for instance after successfully saving a student

