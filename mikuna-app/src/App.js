import React, { Component, useEffect } from 'react';
import './App.css';
import ListaItems from './components/views/listaItems';
import { ThemeProvider as MuiThemeProvider } from '@material-ui/core/styles';
import theme from './theme/theme';
import { Grid } from '@material-ui/core';
import AppNavbar from './components/layout/appNavbar';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import RegistrarUsuario from "./components/seguridad/RegistrarUsuario";
import Login from "./components/seguridad/Login";
import { FirebaseContext } from "./server";

function App(props) {
  let firebase = React.useContext(FirebaseContext);
  const [autenticacionIniciada, setupFirebaseInicial] = React.useState(false);

  useEffect(() => {
    firebase.estaIniciado().then(val => {
      setupFirebaseInicial(val);
    })
  })
  //
  return autenticacionIniciada !== false ? (
    <Router>
      <MuiThemeProvider theme={theme}>
        <AppNavbar></AppNavbar>
        <Grid container>
          <Switch>
            <Route path="/" exact component={ListaItems}></Route>
          </Switch>
          <Route path="/auth/registrarUsuario" exact component={RegistrarUsuario}></Route>
          <Route path="/auth/login" exact component={Login}></Route>
        </Grid>
      </MuiThemeProvider>
    </Router>
  )
    : null;
}

export default App;
