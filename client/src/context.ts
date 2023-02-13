import { createContext } from 'react';
import { languageText } from './language';

export const UserContext = createContext(null);
// her legge man i startverdi (der det står tom) bør sikkert være et objekt med ingen verdier

export const LanguageContext = createContext(languageText.norwegian);
//sets norwegian as standard language
