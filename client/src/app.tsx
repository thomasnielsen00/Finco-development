import React, { useState } from 'react';
import { LanguageContext, UserContext } from './context';
import { HashRouter, Route } from 'react-router-dom';
import NavBar from './components/navbar';
import LogIn from './components/login-form';
import Marked from './components/marked';
import CompanyDetails from './components/company-details';
import Home from './components/homepage';
import { languageText, LanguageTextInfo } from './language';

export default function App() {
  const [user, setUser] = useState({ username: '', password: '' });
  const [language, setLanguage] = useState(languageText.norwegian);

  return (
    //@ts-ignore
    <LanguageContext.Provider value={{ language, setLanguage }}>
      {/* @ts-ignore */}
      <UserContext.Provider value={{ user, setUser }}>
        <NavBar />
        <Route exact path="/" component={Home} />
        <Route exact path="/log_in" component={LogIn} />
        <Route exact path="/marked" component={Marked} />
        <Route exact path="/company/:company_id" component={CompanyDetails} />
      </UserContext.Provider>
    </LanguageContext.Provider>
  );
}
