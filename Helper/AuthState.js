import firebase from '../Config/firebase';

const authState = () => {

    firebase.auth().onAuthStateChanged(user => {
        if (user) {
            console.log('User available')
        } else {
            console.log('User not available');
        }
    });
}

export default authState;