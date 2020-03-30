import React from 'react';
import Firebase from './firebase';

const FirebaseContext = React.createContext();

export default FirebaseContext;

export const consumerFirebase = Component => props => (
    <FirebaseContext.Consumer>
        {Firebase => <Component{...props} firebase={firebase}/>}
    </FirebaseContext.Consumer>
)

