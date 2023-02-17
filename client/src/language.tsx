export type LanguageTextInfo = {
  property: string;
  portfolio: string;
  marked: string;
  about: string;
  log_in: string;
  profile: string;
  change_language: string;
  mail: string;
  password: string;
  //HOME
  get_started: string;
  welcome_text: string;
  //MARKED
  calculated_stock_value: string;
  live_stock_value: string;
  explore_company: string;
  difference: string;
  //PORTFOLIO
  show_details: string;
  //REGISTER
  register_text: string;
  sign_up: string;
  create_user: string;
  full_name: string;
  confirm_password: string;
  cancel: string;
};

export const languageText = {
  norwegian: {
    property: 'norwegian',
    portfolio: 'Portefølje',
    marked: 'Marked',
    about: 'Om oss',
    log_in: 'Logg inn',
    profile: 'Min profil',
    change_language: 'Endre språk',
    mail: 'E-post',
    password: 'Passord',
    //HOME
    get_started: 'Kom i gang!',
    welcome_text:
      'Velkommen til FINCO-inverstering, ikke la inflasjonen spise opp dine sparepenger',
    //MARKED
    calculated_stock_value: 'Kalkulert akjseverdi',
    live_stock_value: 'Sanntids aksjekurs',
    explore_company: 'Utforsk selskapet',
    difference: 'Differanse',
    //PORTFOLIO
    show_details: 'Vis detaljer',
    //REGISTER
    register_text: 'Har du ingen bruker? Registrer deg her',
    sign_up: 'Registrer deg her',
    create_user: 'Lag bruker',
    full_name: 'Fullt navn',
    confirm_password: 'Gjenta passord',
    cancel: 'Avbryt',
  },
  english: {
    property: 'english',
    portfolio: 'Portfoilo',
    marked: 'Market',
    about: 'About us',
    log_in: 'Sign in',
    profile: 'My profile',
    change_language: 'Change language',
    mail: 'E-mail adress',
    password: 'Password',
    //HOME
    get_started: 'Get started!',
    welcome_text: 'Welcome to FINCO-investement, dont let the inflation eat your savings',
    //MARKED
    calculated_stock_value: 'Calculated stock value',
    live_stock_value: 'Live stock value',
    explore_company: 'Explore the company',
    difference: 'Difference',
    //PORTFOLIO
    show_details: 'Show details',
    //REGISTER
    register_text: 'No user? Sign up here',
    sign_up: 'Sign up',
    create_user: 'Create user',
    full_name: 'Full name',
    confirm_password: 'Confirm password',
    cancel: 'Cancel',
  },
};
