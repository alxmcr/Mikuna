import React, { Component } from 'react'
import AppBar from '@material-ui/core/AppBar';
import BarSession from './bar/barSession';

class AppNavbar extends Component {
    render() {
        return (
            <div>
                <AppBar position="static">
                   <BarSession></BarSession>
                </AppBar>
                
            </div>
        )
    }
}

export default AppNavbar;