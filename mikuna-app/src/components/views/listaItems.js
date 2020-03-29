import React, { Component } from 'react';
import Button from '@material-ui/core/Button';

class listaItems extends Component {
    render() {
        return (
            <div>
                <Button variant="contained" color="primary">
                primario
                </Button>
                <Button variant="contained" color="secondary">
                secondario
                </Button>
            </div>
        )
    }
}
export default listaItems;