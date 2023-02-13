export type LanguageTextInfo = {
  portfolio: string;
  marked: string;
  about: string;
  log_in: string;
  choose_language: string;
  welcome_text: string;
};

export const languageText = {
  norwegian: {
    portfolio: 'Portefølje',
    marked: 'Marked',
    about: 'Om oss',
    log_in: 'Logg inn',
    choose_language: 'Velg språk',
    welcome_text:
      'Velkommen til FINCO-inverstering, ikke la inflasjonen spise opp dine sparepenger',
  },
  english: {
    portfolio: 'Portfoilo',
    marked: 'Market',
    about: 'About us',
    log_in: 'Log in',
    choose_language: 'Choose language',
    welcome_text: 'Welcome to FINCO-investement, dont let the inflation eat your savings',
  },
};

export let selectedLanguage = languageText.norwegian;
