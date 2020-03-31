import React, { Component } from 'react';
import { Container, Avatar, Typography, TextField, Button } from '@material-ui/core';
import LockOutlinedIcon from '@material-ui/icons/LockOpenOutlined';
import { compose } from "recompose";
import { consumerFirebase } from '../../server';
import { iniciarSesion } from '../../sesion/actions/sesionAction';
import { StateContext } from '../../sesion/store';
import { openMessajeShow } from '../../sesion/actions/snackbarAction';


const style = {
    paper: {
        marginTop: 9,
        display: "flex",
        flexDirection: "column",
        alignItems: "center"
    },
    avatar: {
        margin: 5,
        backgroundColor: "red"
    },
    form: {
        widht: "100%",
        marginTop: 8
    }

}

class Login extends Component {
    static contextType = StateContext;

    state = {
        firebase: null,
        usuario: {
            email: "",
            password: ""
        }
    }
    static getDerivedStateFromProps(nextProps, prevState) {
        if (nextProps.firebase === prevState.firebase) {
            return null;
        }
        return {
            firebase: nextProps.firebase
        }
    }
    onChange = e => {
        let usuario = Object.assign({}, this.state.usuario);
        usuario[e.target.name] = e.target.value;
        this.setState({
            usuario: usuario
        })
    }
    login = async e => {
        e.preventDefault();
        const [{ sesion }, dispatch] = this.context;
        const { firebase, usuario } = this.state;
        const { email, password } = usuario;
        let callback = await iniciarSesion(dispatch, firebase, email, password);
        if (callback.status) {
            this.props.history.push("/");
        } else {
            openMessajeShow(dispatch, {
                open: true,
                mensaje: callback.mensaje.message
            });
        }
    }

    render() {
        return (
            <Container maxWidth="xs">
                <div style={style.paper}>
                    <Avatar style={style.avatar}>
                        <LockOutlinedIcon></LockOutlinedIcon>
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Ingrese usuario
                    </Typography>
                    <form style={style.form}>
                        <TextField variant="outlined" label="Email" name="email" fullWidth margin="normal" onChange={this.onChange} value={this.state.usuario.email}></TextField>
                        <TextField variant="outlined" label="Password" type="Password" name="password" fullWidth margin="normal" onChange={this.onChange} value={this.state.usuario.password}></TextField>
                        <Button type="submit" variant="contained" color="primary" fullWidth margin="normal" onClick={this.login}>Login</Button>
                    </form>
                </div>
            </Container>
        )
    }
}
export default compose(consumerFirebase)(Login);