import React, { useState } from 'react';
import { LanguageContext, UserContext } from './context';
import { HashRouter, Route } from 'react-router-dom';
import NavBar from './finco-components';
import LogIn from './login-component';
import Marked from './marked-components';
import CompanyDetails from './company-component';
import { Home } from './finco-components';
import Portfolio from './portfolio-component';
import { languageText, LanguageTextInfo } from './language';
import UserDetails from './userDetails-components';

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
        {/* Må kanskje være :user_id, men funker ikke ends mtp teststien i finco-components */}
        <Route exact path="/users/:user_id" component={UserDetails} />
        <Route exact path="/users/:user_id/investments" component={Portfolio} />
        <Route exact path="/Logg inn" component={LogIn} />
        <Route exact path="/Marked" component={Marked} />
        <Route exact path="/company/:company_id" component={CompanyDetails} />
      </UserContext.Provider>
    </LanguageContext.Provider>
  );
}
