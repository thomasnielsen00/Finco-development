import React, { useState } from 'react';
import { LanguageContext, UserContext } from './context';
import { HashRouter, Route } from 'react-router-dom';
import NavBar from './components/navbar';
import LogIn from './components/login-form';
import Register from './components/register-user';
import Market from './components/market';
import CompanyDetails from './components/company-details';
import Home from './components/homepage';
import { Portfolio } from './components/portfolio';
import { languageText, LanguageTextInfo } from './language';
import { UserProfile, LogInNeeded } from './components/userDetails';
import { User } from './user-service';

export default function App() {
  const [user, setUser] = useState<User | boolean>(false);
  const [language, setLanguage] = useState<LanguageTextInfo>(languageText.norwegian);

  return (
    //@ts-ignore
    <LanguageContext.Provider value={{ language, setLanguage }}>
      {/* @ts-ignore */}
      <UserContext.Provider value={{ user, setUser }}>
        <NavBar />
        <Route exact path="/" component={Home} />
        {/* Må kanskje være :user_id, men funker ikke ends mtp teststien i finco-components */}
        <Route exact path="/users/:user_id" component={UserProfile} />
        <Route exact path="/portfolio/:user_id" component={Portfolio} />
        {/* This component is rendered when a user tries to open a portfolio but is not logged in */}
        <Route exact path="/log_in_needed" component={LogInNeeded} />
        <Route exact path="/log_in" component={LogIn} />
        <Route exact path="/register" component={Register} />
        <Route exact path="/market" component={Market} />
        <Route exact path="/company/:company_id" component={CompanyDetails} />
      </UserContext.Provider>
    </LanguageContext.Provider>
  );
}
