import React, { Component } from "react";
import {
  Container,
  Paper,
  Grid,
  Breadcrumbs,
  Link,
  Typography,
  TextField,
  Button,
  Table,
  TableBody,
  TableRow,
  TableCell,
  FormControlLabel,
  Checkbox
} from "@material-ui/core";
import HomeIcon from "@material-ui/icons/Home";
import { consumerFirebase } from "../../server";
import { openMensajePantalla } from "../../sesion/actions/snackbarAction";
import ImageUploader from "react-images-upload";
import uuid from "react-uuid";
import { crearKeyword } from "../../sesion/actions/Keyword";
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

const style = {
  container: {
    paddingTop: "8px"
  },
  paper: {
    marginTop: 8,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: "20px",
    backgroundColor: "#f5f5f5"
  },
  link: {
    display: "flex"
  },
  homeIcon: {
    width: 20,
    height: 20,
    marginRight: "4px"
  },
  submit: {
    marginTop: 15,
    marginBottom: 10
  },
  foto: {
    height: "100px"
  }
};


const products = [
  { name: 'Product 1', desc: 'A nice thing', price: '$9.99' },
  { name: 'Product 2', desc: 'Another thing', price: '$3.45' },
  { name: 'Product 3', desc: 'Something else', price: '$6.51' },
  { name: 'Product 4', desc: 'Best thing of all', price: '$14.11' },
  { name: 'Shipping', desc: '', price: 'Free' },
];
const addresses = ['1 Material-UI Drive', 'Reactville', 'Anytown', '99999', 'USA'];
const payments = [
  { name: 'Card type', detail: 'Visa' },
  { name: 'Card holder', detail: 'Mr John Smith' },
  { name: 'Card number', detail: 'xxxx-xxxx-xxxx-1234' },
  { name: 'Expiry date', detail: '04/2024' },
];

const useStyles = makeStyles((theme) => ({
  listItem: {
    padding: theme.spacing(1, 0),
  },
  total: {
    fontWeight: 700,
  },
  title: {
    marginTop: theme.spacing(2),
  },
}));

class Entregas extends Component {
  
  state = {
    inmueble: {
      direccion: "",
      ciudad: "",
      pais: "",
      descripcion: "",
      interior: "",
      fotos: []
    },
    archivos: []
  };

  entraDatoEnEstado = e => {
    let inmueble_ = Object.assign({}, this.state.inmueble);
    inmueble_[e.target.name] = e.target.value;
    this.setState({
      inmueble: inmueble_
    });
  };

  subirFotos = documentos => {
    Object.keys(documentos).forEach(function (key) {
      documentos[key].urlTemp = URL.createObjectURL(documentos[key]);
    });

    this.setState({
      archivos: this.state.archivos.concat(documentos)
    });
  };

  guardarInmueble = () => {
    const { archivos, inmueble } = this.state;

    //Crearle a cada image(archivo) un alias, ese alias es la referencia con la cual posteriormente lo invocaras
    //Ademas ese alias sera almacenado en la base de datos(firestore/firebase)

    Object.keys(archivos).forEach(function (key) {
      let valorDinamico = Math.floor(new Date().getTime() / 1000);
      let nombre = archivos[key].name;
      let extension = nombre.split(".").pop();
      archivos[key].alias = (
        nombre.split(".")[0] +
        "_" +
        valorDinamico +
        "." +
        extension
      )
        .replace(/\s/g, "_")
        .toLowerCase();
    });

    const textoBusqueda =
      inmueble.direccion + " " + inmueble.ciudad + " " + inmueble.pais;
    let keywords = crearKeyword(textoBusqueda);

    this.props.firebase.guardarDocumentos(archivos).then(arregloUrls => {
      inmueble.fotos = arregloUrls;
      inmueble.keywords = keywords;
      inmueble.propietario = this.props.firebase.auth.currentUser.uid;

      this.props.firebase.db
        .collection("Inmuebles")
        .add(inmueble)
        .then(success => {
          this.props.history.push("/");
        })
        .catch(error => {
          openMensajePantalla({
            open: true,
            mensaje: error
          });
        });


    });
  };

  eliminarFoto = nombreFoto => () => {
    this.setState({
      archivos: this.state.archivos.filter(archivo => {
        return archivo.name !== nombreFoto;
      })
    });
  };


  render() {
    let imagenKey = uuid();

    return (
      <Container style={style.container}>
        <Paper style={style.paper}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={8}>
              <Breadcrumbs aria-label="breadcrumb">
                <Link color="inherit" style={style.link} href="/">
                  <HomeIcon style={style.homeIcon} />
                  Home
                </Link>
                <Typography color="textPrimary">Entregas</Typography>
              </Breadcrumbs>
            </Grid>
            <Typography variant="h6" gutterBottom>
              Payment method
      </Typography>
            <Typography variant="h6" gutterBottom>
              Order summary
      </Typography>
            <List disablePadding>
              {products.map((product) => (
                <ListItem className={style.listItem} key={product.name}>
                  <ListItemText primary={product.name} secondary={product.desc} />
                  <Typography variant="body2">{product.price}</Typography>
                </ListItem>
              ))}
              <ListItem className={style.listItem}>
                <ListItemText primary="Total" />
                <Typography variant="subtitle1" className={style.total}>
                  $34.06
          </Typography>
              </ListItem>
            </List>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <Typography variant="h6" gutterBottom className={style.title}>
                  Shipping
          </Typography>
                <Typography gutterBottom>John Smith</Typography>
                <Typography gutterBottom>{addresses.join(', ')}</Typography>
              </Grid>
              <Grid item container direction="column" xs={12} sm={6}>
                <Typography variant="h6" gutterBottom className={style.title}>
                  Payment details
          </Typography>
                <Grid container>
                  {payments.map((payment) => (
                    <React.Fragment key={payment.name}>
                      <Grid item xs={6}>
                        <Typography gutterBottom>{payment.name}</Typography>
                      </Grid>
                      <Grid item xs={6}>
                        <Typography gutterBottom>{payment.detail}</Typography>
                      </Grid>
                    </React.Fragment>
                  ))}
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Paper>
      </Container >
    );
  }
}

export default consumerFirebase(Entregas);
