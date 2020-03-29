import React, { Component } from 'react';
import './App.css';
import ListaItems from './components/views/listaItems';
import MuiThemeProvider from "@material-ui/core/styles/MuiThemeProvider";
import theme from './theme/theme';
import { Container, Box } from '@material-ui/core';

class App extends Component {
  render() {
    return (
      <MuiThemeProvider theme={theme}>
        {/* <ListaItems /> */}
        <Container>
          <Box textAlign="center">
            welcome a MIKUNA
          </Box>
        </Container>
      </MuiThemeProvider>

    )
  }
}


export default App;
