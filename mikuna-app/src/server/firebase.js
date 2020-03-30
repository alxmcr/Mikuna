import app from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
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
        this.auth=app.auth();
    }

}
export default Firebase;
