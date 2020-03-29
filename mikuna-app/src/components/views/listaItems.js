import React, { Component } from 'react';
import Button from '@material-ui/core/Button';

class listaItems extends Component {
    render() {
        return (
            <div>
                <Button variant="contained" color="primary">
                primari
                </Button>
                <Button variant="contained" color="segundary">
                secondario
                </Button>
            </div>
        )
    }
}
export default listaItems;