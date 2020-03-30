import React, { Component } from 'react';
import { Container, Typography, Grid, TextField, Avatar, Button } from '@material-ui/core';
import LockOutLineIcon from '@material-ui/icons/LockOutlined';
import { compose } from "recompose";
import { consumerFirebase } from '../../server';

const style = {
    paper: {
        margimTop: 8,
        display: "flex",
        flexDirection: "column",
        alignItems: "center"
    },
    avatar: {
        margin: 8,
        backgroundColor: "#e53935"
    },
    form: {
        width: "100%",
        marginTop: 10
    },
    submit: {
        marginTop: 15,
        marginBottom: 20
    }
}

const usuarioInicial = {
    nombre: "",
    apellido: "",
    email: "",
    password: ""
}

class RegistrarUsuario extends Component {
    state = {
        firebase: null,
        usuario: {
            nombre: "",
            apellido: "",
            email: "",
            password: ""
        }
    }

    static getDerivedStateFromProps(nextProps, prevState) {
        if (nextProps.firebase === prevState.firebase) {
            return null;
        }
        return {
            firebase: nextProps.firebase,
        }
    }

    onChange = e => {
        let usuario = Object.assign({}, this.state.usuario);
        usuario[e.target.name] = e.target.value;
        let apellido = Object.assign({}, this.state.apellido);
        apellido[e.target.name] = e.target.value;
        let email = Object.assign({}, this.state.email);
        email[e.target.name] = e.target.value;
        let password = Object.assign({}, this.state.password);
        password[e.target.name] = e.target.value;

        this.setState({
            usuario: usuario
        })
    }

    registrarUsuario = e => {
        e.preventDefault();
        console.log("imprimir objeto", this.state.usuario);
        const { usuario, firebase } = this.state;
        firebase.db.collection("Users").add(usuario).
            then(usuarioAfter => {
                console.log("guardado con exito usuario", usuarioAfter);
                this.setState({
                    usuario:usuarioInicial
                })
            }).catch(error => {
                console.log("error", error);
            })

    }
    render() {
        return (
            <Container maxWidth="md">
                <div style={style.paper}>
                    <Avatar style={style.avatar}>
                        <LockOutLineIcon></LockOutLineIcon>
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Registra tu Cuenta
                    </Typography>
                    <form style={style.form}>
                        <Grid container spacing={2}>
                            <Grid item md={6} xs={12}>
                                <TextField name="nombre" onChange={this.onChange} value={this.state.usuario.nombre} fullWidth label="Nombre"></TextField>
                            </Grid>
                            <Grid item md={6} xs={12}>
                                <TextField name="apellido" onChange={this.onChange} value={this.state.usuario.apellido} fullWidth label="Apellido"></TextField>
                            </Grid>
                            <Grid item md={6} xs={12}>
                                <TextField type="email" onChange={this.onChange} value={this.state.usuario.email} name="email" fullWidth label="Email"></TextField>
                            </Grid>
                            <Grid item md={6} xs={12}>
                                <TextField type="password" onChange={this.onChange} value={this.state.usuario.password} name="password" fullWidth label="Password"></TextField>
                            </Grid>
                        </Grid>
                        <Grid container justify="center">
                            <Grid item xs={12} md={6}>
                                <Button type="submit" onClick={this.registrarUsuario} variant="contained" fullWidth size="large" color="primary" style={style.submit}>
                                    Registrar
                                 </Button>
                            </Grid>
                        </Grid>
                    </form>
                </div>
            </Container>
        )
    }
}

export default compose(consumerFirebase)(RegistrarUsuario);