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
  header: string;
  welcome_text: string;
  //MARKED
  calculated_stock_value: string;
  live_stock_value: string;
  explore_company: string;
  difference: string;
  watchlist: string;
  search: string;
  sort_by: string;
  no_sort: string;
  //PORTFOLIO
  show_details: string;
  //REGISTER
  register_text: string;
  sign_up: string;
  create_user: string;
  full_name: string;
  confirm_password: string;
  cancel: string;
  write_full_name: string;
  email_not_valid: string;
  password_not_long_enough: string;
  passwords_not_matching: string;
  wrong_email_or_password: string;
  network_error: string;
  email_in_use: string;
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
    profile: 'Min profil',
    change_language: 'Endre språk',
    mail: 'E-post',
    password: 'Passord',
    //HOME
    get_started: 'Kom i gang!',
    header: 'Vanskelig å komme i gang med aksjer?',
    welcome_text:
      'Velkommen til FINCO-inverstering, ikke la inflasjonen spise opp dine sparepenger. Sjekk ut våre beregninger og gjør akjseinvesteringer på en trygg måte!',
    //MARKED
    calculated_stock_value: 'Kalkulert akjseverdi',
    live_stock_value: 'Sanntids aksjekurs',
    explore_company: 'Utforsk',
    difference: 'Differanse',
    watchlist: 'Følg selskap',
    search: 'Søk her',
    sort_by: 'Sorter etter',
    no_sort: 'Ingen sortering',
    //PORTFOLIO
    show_details: 'Vis detaljer',
    //REGISTER
    register_text: 'Har du ingen bruker? Registrer deg her',
    sign_up: 'Registrer deg her',
    create_user: 'Lag bruker',
    full_name: 'Fullt navn',
    confirm_password: 'Gjenta passord',
    cancel: 'Avbryt',
    write_full_name: 'Vennligst skriv inn ditt fulle navn',
    email_not_valid: 'E-post ikke gyldig',
    password_not_long_enough: 'Vennligst velg et passord med minumum 8 tegn',
    passwords_not_matching: 'Passordene dine er ikke like, vennligst prøv igjen',
    wrong_email_or_password: 'Feil e-post eller passord!',
    network_error: 'Nettverksfeil!',
    email_in_use: 'E-post er allerede i bruk',
    portfolio_right: 'Porteføljeoversikt',
    //USER-ACCOUNT
    my_account: 'Min profil',
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
    header: 'Struggling to get started with stocks?',
    welcome_text:
      'Welcome to FINCO-investement, dont let the inflation eat your savings. Browse our calculations and make safe trades!',
    //MARKED
    calculated_stock_value: 'Calculated stock value',
    live_stock_value: 'Live stock value',
    explore_company: 'Explore',
    difference: 'Difference',
    watchlist: 'Add to watchlist',
    search: 'Search',
    sort_by: 'Sort by',
    no_sort: 'No sorting',
    //PORTFOLIO
    show_details: 'Show details',
    //REGISTER
    register_text: 'No user? Sign up here',
    sign_up: 'Sign up',
    create_user: 'Create user',
    full_name: 'Full name',
    confirm_password: 'Confirm password',
    cancel: 'Cancel',
    write_full_name: 'Please write your full name',
    email_not_valid: 'Provided email is not valid',
    password_not_long_enough: 'Please choose a password with minimum 8 characters',
    passwords_not_matching: 'Your passwords does not match, please try again',
    wrong_email_or_password: 'Wrong e-mail or password!',
    network_error: 'Network error!',
    email_in_use: 'E-mail already in use',
    portfolio_right: 'Portfolio overview',
    //PROFILE
    my_account: 'My account',
  },
};
