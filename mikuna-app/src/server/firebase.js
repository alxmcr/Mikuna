import app from 'firebase/app';

const firebaseConfig = {
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
        app.initializeApp(firebaseConfig);
        this.db = app.Firebase();
    }

}
export default Firebase;
