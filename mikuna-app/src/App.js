import React, { Component, useEffect } from "react";
import Grid from "@material-ui/core/Grid";
import { Snackbar } from "@material-ui/core";
import "./App.css";
import Lista from "./components/views/Lista";
import AppNavbar from "./components/layout/appNavbar";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { MuiThemeProvider } from '@material-ui/core';
// import MuiThemeProvider from "@material-ui/core/styles/MuiThemeProvider";
import theme from "./theme/theme";
import RegistrarUsuario from "./components/seguridad/RegistrarUsuario";
import Login from "./components/seguridad/Login";
import { FirebaseContext } from "./server";

import { useStateValue } from "./sesion/store";
import openSnackbarReducer from "./sesion/reducers/openSnackbarReducer";
import RutaAutenticada from "./components/seguridad/RutaAutenticada";
import PerfilUsuario from "./components/seguridad/PerfilUsuario";
import NuevoInmueble from "./components/views/Nuevo";
import EditarItem from "./components/views/EditarItem";
import LoginTelefono from "./components/seguridad/LoginTelefono";
import ListaUsuarios from "./components/views/ListaUsuarios";
import NuevoColegio from "./components/views/NuevoColegio";

import store from "./redux/store";
import { Provider } from "react-redux";

import { openMensajePantalla } from './sesion/actions/snackbarAction';


function App(props) {
  let firebase = React.useContext(FirebaseContext);
  const [autenticacionIniciada, setupFirebaseInicial] = React.useState(false);

  const [{ openSnackbar }, dispatch] = useStateValue();

  useEffect(() => {
    firebase.estaIniciado().then(val => {
      setupFirebaseInicial(val);
    });

    if (firebase.messagingValidation.isSupported()) {
      firebase.messaging.onMessage((payload) => {
        openMensajePantalla(dispatch, {
          open: true,
          mensaje: payload.notification.title + ". " + payload.notification.body
        })
      })
    }



  });

  return autenticacionIniciada !== false ? (
    <Provider store={store}>
      <React.Fragment>
        <Snackbar
          anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
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
        ></Snackbar>
        <Router>
          <MuiThemeProvider theme={theme}>
            <AppNavbar />

            <Grid container>
              <Switch>
                <RutaAutenticada
                  exact
                  path="/"
                  autenticadoFirebase={firebase.auth.currentUser}
                  component={Lista}
                />
                <RutaAutenticada
                  exact
                  path="/auth/perfil"
                  autenticadoFirebase={firebase.auth.currentUser}
                  component={PerfilUsuario}
                />
                <RutaAutenticada
                  exact
                  path="/proveedor/nuevo"
                  autenticadoFirebase={firebase.auth.currentUser}
                  component={NuevoInmueble}
                />
                <RutaAutenticada
                  exact
                  path="/colegio/nuevo"
                  autenticadoFirebase={firebase.auth.currentUser}
                  component={NuevoColegio}
                />
                <RutaAutenticada
                  exact
                  path="/proveedor/:id"
                  autenticadoFirebase={firebase.auth.currentUser}
                  component={EditarItem}
                />

                <RutaAutenticada
                  exact
                  path="/listaUsuarios"
                  autenticadoFirebase={firebase.auth.currentUser}
                  component={ListaUsuarios}
                />

                <Route
                  path="/auth/registrarUsuario"
                  exact
                  component={RegistrarUsuario}
                />
                <Route path="/auth/login" exact component={Login} />
                <Route
                  path="/auth/loginTelefono"
                  exact
                  component={LoginTelefono}
                />
              </Switch>
            </Grid>
          </MuiThemeProvider>
        </Router>
      </React.Fragment>
    </Provider>
  ) : null;
}

export default App;
