import React, { Component, useEffect } from 'react';
import './App.css';
import ListaItems from './components/views/listaItems';
import { ThemeProvider as MuiThemeProvider } from '@material-ui/core/styles';
import theme from './theme/theme';
import { Grid, Snackbar } from '@material-ui/core';
import AppNavbar from './components/layout/appNavbar';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import RegistrarUsuario from "./components/seguridad/RegistrarUsuario";
import Login from "./components/seguridad/Login";
import { FirebaseContext } from "./server";
import { useStateValue } from "./sesion/store";
import openSnackbarReducer from "./sesion/reducers/openSnackbarReducer";

function App(props) {
  let firebase = React.useContext(FirebaseContext);
  const [autenticacionIniciada, setupFirebaseInicial] = React.useState(false);
  const [{ openSnackbar }, dispatch] = useStateValue();

  useEffect(() => {
    firebase.estaIniciado().then(val => {
      setupFirebaseInicial(val);
    })
  })
  //
  return autenticacionIniciada !== false ? (
    <React.Fragment>
      <Snackbar anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        open={openSnackbar ? openSnackbar.open : false}
        autoHideDuration={3000}
        ContentProps={{
          "aria-describedby": "message-id"
        }}
        message={
          <span id="message-id">
            {openSnackbar ? openSnackbar.mensaje : ""}
          </span>
        }
        onClose={() =>
          dispatch({
            type: "OPEN_SNACKBAR",
            openMensaje: {
              open: false,
              mensaje: ""
            }
          })
        }
      >

      </Snackbar>
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
    </React.Fragment >
  )
    : null;
}

export default App;
