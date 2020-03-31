import app from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
import 'firebase/storage';
import 'firebase/messaging';

const config = {
    apiKey: "AIzaSyCvc4szAps4sbLE55R4SaRjoZPzbMSFHKA",
    authDomain: "sipaceapp.firebaseapp.com",
    databaseURL: "https://sipaceapp.firebaseio.com",
    projectId: "sipaceapp",
    storageBucket: "sipaceapp.appspot.com",
    messagingSenderId: "1047986504832",
    appId: "1:1047986504832:web:7bbe54fab05e42b0625265",
    measurementId: "G-3W599WZWFL"
};

class Firebase {

    constructor() {
        app.initializeApp(config);
        this.db = app.firestore();
        this.auth = app.auth();
        this.storage = app.storage();
        this.authorization = app.auth;

        this.messagingValidation = app.messaging;
        if (this.messagingValidation.isSupported()) {
            this.messaging = app.messaging();
            this.messaging.usePublicVapidKey("BEMqhasXOJxGjAy9kQ5qHelBNJ-FFNa6K7Ht-Ndk7Mo44bM5-x_aVeUw3SkLqPhM-jMsBqC6wZssvEasqxpJKLY");
        }

        this.storage.ref().constructor.prototype.guardarDocumentos = function (documentos) {
            var ref = this;
            return Promise.all(documentos.map(function (file) {
                return ref.child(file.alias).put(file).then(snapshot => {
                    return ref.child(file.alias).getDownloadURL();
                })
            }))
        }

    }

    estaIniciado() {
        return new Promise(resolve => {
            this.auth.onAuthStateChanged(resolve)
        })
    }

    guardarDocumento = (nombreDocumento, documento) => this.storage.ref().child(nombreDocumento).put(documento);

    devolverDocumento = (documentoUrl) => this.storage.ref().child(documentoUrl).getDownloadURL();

    guardarDocumentos = (documentos) => this.storage.ref().guardarDocumentos(documentos);

    eliminarDocumento = documento => this.storage.ref().child(documento).delete();

}

export default Firebase;
