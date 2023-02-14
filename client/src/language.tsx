export type LanguageTextInfo = {
  property: string;
  portfolio: string;
  marked: string;
  about: string;
  log_in: string;
  change_language: string;
  username: string;
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
  portfolio_right: string;
  //USER-ACCOUNT
  my_account: string;
};

export const languageText = {
  norwegian: {
    property: 'norwegian',
    portfolio: 'Portefølje',
    marked: 'Marked',
    about: 'Om oss',
    log_in: 'Logg inn',
    change_language: 'Endre språk',
    username: 'Brukernavn',
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
    portfolio_right: 'Porteføljeoversikt',
    //USER-ACCOUNT
    my_account: 'Min profil',
  },
  english: {
    property: 'english',
    portfolio: 'Portfoilo',
    marked: 'Market',
    about: 'About us',
    log_in: 'Log in',
    change_language: 'Change language',
    username: 'Username',
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
    portfolio_right: 'Portfolio overview',
    //PROFILE
    my_account: 'My account',
  },
};
