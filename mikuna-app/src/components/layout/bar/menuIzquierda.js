import React from 'react';
import { List, ListItemText, Divider, ListItem } from "@material-ui/core";
import { Link } from 'react-router-dom';


export const MenuIzquierda = ({ classes, permisoParaObtenerNotification }) => (
    <div className={classes.list}>
        <List>
            <ListItem component={Link} button to="/auth/perfil">
                <i className="material-icons">account_box</i>
                <ListItemText classes={{ primary: classes.listItemText }} primary="Perfil" />
            </ListItem>
        </List>
        <Divider />
        <List>
            <ListItem component={Link} button to="/proveedor/nuevo">
                <i className="material-icons">add_box</i>
                <ListItemText classes={{ primary: classes.listItemText }} primary="Nuevo Proveedor" />
            </ListItem>
            <ListItem component={Link} button to="">
                <i className="material-icons">business</i>
                <ListItemText classes={{ primary: classes.listItemText }} primary="Proveedores" />
            </ListItem>

            <ListItem component={Link} button to="/colegio/nuevo">
                <i className="material-icons">add_box</i>
                <ListItemText classes={{ primary: classes.listItemText }} primary="Nuevo Colegio" />
            </ListItem>
            <ListItem component={Link} button to="/colegios">
                <i className="material-icons">chrome_reader_mode</i>
                <ListItemText classes={{ primary: classes.listItemText }} primary="Colegios" />
            </ListItem>

            <ListItem component={Link} button to="/entregas">
                <i className="material-icons">attachment</i>
                <ListItemText classes={{ primary: classes.listItemText }} primary="Entregas" />
            </ListItem>
            <ListItem component={Link} button to="">
                <i className="material-icons">post_add</i>
                <ListItemText classes={{ primary: classes.listItemText }} primary="Solicitudes" />
            </ListItem>
            <ListItem component={Link} button to="/entregas">
                <i className="material-icons">list_alt</i>
                <ListItemText classes={{ primary: classes.listItemText }} primary="Actas" />
            </ListItem>
            <ListItem component={Link} button to="/entregas">
                <i className="material-icons">description</i>
                <ListItemText classes={{ primary: classes.listItemText }} primary="Reportes" />
            </ListItem>
            <ListItem component={Link} button to="/listaUsuarios">
                <i className="material-icons">group</i>
                <ListItemText classes={{ primary: classes.listItemText }} primary="Usuarios" />
            </ListItem>
            <ListItem button onClick={permisoParaObtenerNotification}>
                <i className="material-icons">notifications_none</i>
                <ListItemText
                    classes={{ primary: classes.listItemText }}
                    primary="Recibir Notificaciones"
                />
            </ListItem>
        </List>

    </div>

)