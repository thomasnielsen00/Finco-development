import React, { useState, useEffect, useContext } from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import {
  Button,
  Typography,
  CssBaseline,
  Container,
  Grid,
  Card,
  CardContent,
  CardActions,
  TextField,
  MenuItem,
  FormLabel,
  ThemeProvider,
} from '@material-ui/core';
import { Link, useParams } from 'react-router-dom';
import userService, { Industry, Investment, User } from '../user-service';
import {
  Alert,
  Autocomplete,
  Box,
  CardHeader,
  Checkbox,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Fab,
  FormControlLabel,
  FormHelperText,
  IconButton,
  InputLabel,
  List,
  ListItem,
  ListItemSecondaryAction,
  ListItemText,
  Radio,
  RadioGroup,
} from '@mui/material';
import SaveIcon from '@mui/icons-material/Save';
import CheckIcon from '@mui/icons-material/Check';
import { green } from '@mui/material/colors';
import clsx from 'clsx';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { LanguageContext } from '../context';

// Skal vi ha med dette?:
// const risk_willingness: Array<{ value: string; label: string }> = [
//   {
//     value: 'high',
//     label: 'High',
//   },
//   {
//     value: 'moderate',
//     label: 'Moderate',
//   },
//   {
//     value: 'low',
//     label: 'Low',
//   },
// ];

const useStyles = makeStyles((theme) => ({
  form: {
    margin: '50px auto', // adjust the vertical margin as needed
    maxWidth: '50%', // adjust the maximum width as needed
    //Vi trenger kanskje flere breakpoints?
    [theme.breakpoints.up('md')]: {
      marginTop: '3%', // adjust the vertical margin on larger screens
    },
  },
  TextField: {
    backgroundColor: 'white',
  },

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

export function UserProfile() {
  //Language-select related
  const { language } = useContext(LanguageContext);
  const {
    general_information,
    email_inputLabel,
    password_inputLabel,
    full_name_inputLabel,
    phone_number_inputLabel,
    investing_details,
    monthly_savings_inputLabel,
    from_kr_underLabel,
    to_kr_underLabel,
    risk_willingness_inputLabel,
    prefered_industries_inputLabel,
    button_saved,
    button_save,
  } = language;

  const [userData, setUserData] = useState<User>({});

  //Save-button related
  const [loading, setLoading] = React.useState(false);
  ////Save-button related
  const [savedChange, setSavedChange] = React.useState(false);
  ////Save-button related
  const timer = React.useRef<number>();
  const { user_id } = useParams();
  //Constant referering to the defined styling of given elements:
  const classes = useStyles();
  //Following const is regarding user-prefered Industry:
  const [preferedIndustries, setPreferedIndustries] = useState<Industry[]>([]);
  //Following const is related to the Automcomplete element regarding all industries
  const [allIndustries, setAllIndustries] = useState<Industry[]>([]);
  //Following const is related to the new industries a user selects in the autoComplete-element
  const [selectedIndustries, setSelectedIndustries] = useState<Industry[]>([]);

  const handleIndustryChange = (event: any, values: Industry[]) => {
    const updatedValues = values.map((value) => {
      if (!value.user_id) {
        // add user_id to the new industry object
        return {
          industry_id: value.industry_id,
          user_id: Number(user_id),
          industry_name: value.industry_name,
        };
      } else {
        return value;
      }
    });
    setPreferedIndustries(updatedValues);
    setSavedChange(false);

    // Check if an industry was removed
    const removedIndustry = preferedIndustries.find((industry) => !values.includes(industry));

    if (removedIndustry) {
      const industryId = removedIndustry.industry_id;
      userService.deleteUserIndustry(industryId, user_id);
    }
  };

  const buttonClassname = clsx({
    [classes.buttonSuccess]: savedChange,
  });

  //Save-button related
  React.useEffect(() => {
    return () => {
      clearTimeout(timer.current);
    };
  }, []);

  //Denne er flytte ned inn i handleSubmit, men vet ikke hva som er best?
  // const handleButtonClick = () => {
  //   if (!loading) {
  //     setSavedChange(false);
  //     setLoading(true);
  //     timer.current = window.setTimeout(() => {
  //       setSavedChange(true);
  //       setLoading(false);
  //     }, 2000);
  //   }
  // };

  const buttonText = savedChange ? button_saved : button_save;

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUserData({ ...userData, [event.target.name]: event.target.value });
    //Every time there is a change of input the button is reset to "Save changes"
    setSavedChange(false);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    if (!loading) {
      setSavedChange(false);
      setLoading(true);
      timer.current = window.setTimeout(() => {
        setSavedChange(true);
        setLoading(false);
        //.preventDefault is a common pattern in React form handling to prevent the default
        //behavior of the form submission, which typically involves the page being refreshed or reloaded.
        event.preventDefault();

        userService.updateUser(userData).catch((error) => console.log(error));
        preferedIndustries.map((preferedIndustry) =>
          userService.createNewPreferedIndustry(
            preferedIndustry.user_id,
            preferedIndustry.industry_name
          )
        );
      }, 2000);
    }
  };

  //The code below fetches the details for a given user with the provided method in the userService-objekt
  useEffect(() => {
    const current_id = parseInt(user_id, 10); //base 10

    userService.getAllPreferedIndustries(current_id).then((preferedIndustries) => {
      setPreferedIndustries(preferedIndustries);

      // setSelectedIndustries(preferedIndustries);
    });

    userService.getAllIndustries().then((allIndustries) => setAllIndustries(allIndustries));

    userService
      .getUser(current_id)
      .then((user) => {
        setUserData(user);
      })
      .catch((error) => {
        // setOpenAlert(true);
        // setErrorMessage(error.message);
        <Alert>{error}</Alert>;
      });
  }, [user_id]);

  return (
    <>
      {console.log(userData)}
      <form className={classes.form}>
        <Typography variant="h5">{general_information}</Typography>

        <Grid container spacing={2}>
          <Grid item xs={6}>
            {/* htmlFor = inputfelt-iden gjør at kan føres til tilhørende inpultfeltet når man trykker på labelen */}
            <InputLabel htmlFor="email">{email_inputLabel}</InputLabel>

            <TextField
              required
              // helperText="Denne må være fylt ut"
              id="email"
              name="email"
              // label={userData?.email}
              variant="outlined"
              disabled
              value={userData?.email}
              onChange={handleChange}
              fullWidth
              className={classes.TextField}
            />
          </Grid>
          <Grid item xs={6}>
            {/* htmlFor = inputfelt-iden gjør at kan føres til tilhørende inpultfeltet når man trykker på labelen */}
            <InputLabel htmlFor="password">{password_inputLabel}</InputLabel>

            <TextField
              required
              id="password"
              name="password"
              disabled
              // type="password"
              // label={userData?.password}
              variant="outlined"
              value={userData?.password}
              onChange={handleChange}
              fullWidth
              className={classes.TextField}
            />
          </Grid>
          <Grid item xs={6}>
            {/* htmlFor = inputfelt-iden gjør at kan føres til tilhørende inpultfeltet når man trykker på labelen */}
            <InputLabel htmlFor="full_name">{full_name_inputLabel}</InputLabel>

            <TextField
              required
              id="full_name"
              name="full_name"
              // label="Full name"
              variant="outlined"
              // type="tel"
              value={userData?.full_name}
              onChange={handleChange}
              fullWidth
              className={classes.TextField}
            />
          </Grid>
          <Grid item xs={6}>
            {/* htmlFor = inputfelt-iden gjør at kan føres til tilhørende inpultfeltet når man trykker på labelen */}
            <InputLabel htmlFor="phone_number">{phone_number_inputLabel}</InputLabel>

            <TextField
              required
              id="phone_number"
              name="phone_number"
              // label={userData?.phone_number}
              variant="outlined"
              // type="tel"
              value={userData?.phone_number}
              onChange={handleChange}
              fullWidth
              className={classes.TextField}
            />
          </Grid>
        </Grid>
        <br></br>
        <Typography variant="h5">{investing_details}</Typography>

        <Grid container spacing={2}>
          {/* htmlFor = inputfelt-iden gjør at kan føres til tilhørende inpultfeltet når man trykker på labelen */}
          <Grid item xs={6}>
            <InputLabel htmlFor="monthly_savings_amount">{monthly_savings_inputLabel}</InputLabel>

            <Grid container spacing={2}>
              <Grid item xs={6}>
                <TextField
                  required
                  id="savings_from"
                  name="savings_from"
                  // label="From"
                  variant="outlined"
                  // type="date"
                  value={userData?.savings_from}
                  onChange={handleChange}
                  fullWidth
                  className={classes.TextField}
                />
                <FormHelperText>{from_kr_underLabel}</FormHelperText>
              </Grid>

              {/* <Grid item xs={6}>
          <TextField
            id="gender"
            name="gender"
            select
            label="Gender"
            variant="outlined"
            value={userData.gender}
            onChange={handleChange}
            fullWidth
          >
            {genders.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>
        </Grid> */}

              {/* htmlFor = inputfelt-iden gjør at kan føres til tilhørende inpultfeltet når man trykker på labelen */}
              <Grid item xs={6}>
                <TextField
                  required
                  id="savings_to"
                  name="savings_to"
                  variant="outlined"
                  value={userData?.savings_to}
                  onChange={handleChange}
                  fullWidth
                  className={classes.TextField}
                />
                <FormHelperText>{to_kr_underLabel}</FormHelperText>
              </Grid>
            </Grid>
          </Grid>

          <Grid item xs={6}>
            {/* htmlFor = inputfelt-iden gjør at kan føres til tilhørende inpultfeltet når man trykker på labelen */}
            <InputLabel htmlFor="risk_willingness">{risk_willingness_inputLabel}</InputLabel>

            <TextField
              required
              id="risk_willingness"
              name="risk_willingness"
              // label= "Risk willing"
              variant="outlined"
              value={userData?.risk_willingness}
              onChange={handleChange}
              fullWidth
              className={classes.TextField}
            />
          </Grid>

          <Grid item xs={12}>
            <InputLabel htmlFor="prefered_industries">{prefered_industries_inputLabel}</InputLabel>
            {/* Må sørge for at alle industrier slettes når kryss-knappen trykkes på */}
            <Autocomplete
              multiple
              id="tags-outlined"
              //Here i check if the option is already a part of preferedIndustries
              //and thus removing it from the options-dropDown menu
              options={allIndustries.filter(
                (option) =>
                  //Checks wheter preferedIndustries does not contain a industry_id equal to the option in question
                  !preferedIndustries.some(
                    (preferedIndustry) => preferedIndustry.industry_id === option.industry_id
                  )
              )}
              getOptionLabel={(option) => option.industry_name}
              value={preferedIndustries}
              onChange={handleIndustryChange}
              filterSelectedOptions
              renderInput={(params) => (
                <TextField className={classes.TextField} variant="outlined" {...params} />
              )}
            />

            {console.log(preferedIndustries)}
          </Grid>

          {/* <Grid item xs={6}>
            {/* {preferedIndustries && (
              <div>
                <Typography variant="h5">Preferred Industries</Typography>
                {preferedIndustries.map((industry) => (
                  <div key={industry.industry_id}>
                    <Typography>{industry.industry_name}</Typography>
                  </div>
                ))}
              </div>
            )} */}
          {/* </Grid> */}
        </Grid>
        <br></br>
        {loading && <CircularProgress size={68} className={classes.buttonProgress} />}
        <Button
          variant="contained"
          aria-label="save"
          color="primary"
          className={buttonClassname}
          onClick={handleSubmit}
        >
          {buttonText}
          {savedChange ? <CheckIcon /> : <SaveIcon />}
        </Button>
      </form>
    </>
  );
}

export function LogInNeeded() {
  const { language } = useContext(LanguageContext);
  const { log_in_needed_text, log_in_here, or, create_a_user, to_access_portfolio } = language;
  return (
    <>
      <div
        style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '60vh' }}
      >
        <Card style={{ width: '40%', textAlign: 'center' }}>
          <CardHeader title={log_in_needed_text} />
          <CardContent>
            <Typography>
              <Link to={'/log_in'}>{log_in_here}</Link>, {or}
              <Link to={'/register'}> {create_a_user} </Link> {to_access_portfolio}{' '}
            </Typography>
          </CardContent>
        </Card>
      </div>
    </>
  );
}
