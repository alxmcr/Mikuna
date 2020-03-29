import React, { Component } from 'react';
import './App.css';
import ListaItems from './components/views/listaItems';
import { ThemeProvider as MuiThemeProvider } from '@material-ui/core/styles';
import theme from './theme/theme';
import { Grid } from '@material-ui/core';
import AppNavbar from './components/layout/appNavbar';
import { BrowserRouter as Router ,Switch,Route} from 'react-router-dom';

class App extends Component {
  render() {
    return (
      <Router>
        <MuiThemeProvider theme={theme}>
          <AppNavbar></AppNavbar>
          <Grid container>
            {/* <Switch>
              <Route path="/" exact component={ListaItems}></Route>
            </Switch> */}
          </Grid>
        </MuiThemeProvider>
      </Router>
    )
  }
}


export default App;
