import React from 'react';
import { AsyncStorage, View } from 'react-native';
import { Container, Content, Button, Text } from 'native-base';

import AuthState from '../../Helper/AuthState'
import firebase from '../../Config/firebase';

export default class Login extends React.Component {

    static navigationOptions = {
        title: 'SignIn',
    };

    // static getDerivedStateFromProps() {
    // componentDidMount() {
    //     AuthState()
    //     //     return null
    // }

    componentDidMount() {

        firebase.auth().onAuthStateChanged(user => {
            if (user) {

                console.log('user available', user)
                // firebase.database().ref(`/profiles/${user.uid}/`).once('value', (data) => {
                // console.log('profile value', data.val());
                // localStorage.setItem("userProfile", JSON.stringify(data.val()));
                // })

                // localStorage.setItem("user", JSON.stringify(user));
                // console.log("User available", user.email);

            } else {
                // localStorage.setItem("user", null);
                // localStorage.setItem("userProfile", null);
                console.log('User not available');
            }
        });
    }


    logIn = async () => {
        const { type, token } = await Expo.Facebook.logInWithReadPermissionsAsync(
            '508728699640531',
            { permissions: ['public_profile'] }
        );

        if (type === 'success') {

            // await AsyncStorage.setItem('userToken', token);
            console.log('loginToken', token)
            // Build Firebase credential with the Facebook access token.
            // this.props.navigation.navigate('App');
            const credential = firebase.auth.FacebookAuthProvider.credential(token);
            // console.log('credential', credential)
            // Sign in with credential from the Facebook user.
            firebase.auth().signInAndRetrieveDataWithCredential(credential)
                // .then(function (result) {
                //     console.log(result)
                // })
                .catch((error) => {
                    alert('error', error)
                });
        }
    }

    // logIn = async () => {
    //     try {
    //         const {
    //             type,
    //             token,
    //             expires,
    //             permissions,
    //             declinedPermissions,
    //         } = await Expo.Facebook.logInWithReadPermissionsAsync('508728699640531', {
    //             permissions: ['public_profile'],
    //         });
    //         if (type === 'success') {
    //             await AsyncStorage.setItem('userToken', token);
    //             console.log('loginuserToken', token)
    //             // Get the user's name using Facebook's Graph API
    //             const response = await fetch(`https://graph.facebook.com/me?access_token=${token}`);
    //             console.log(await response.json())
    //             // alert('Logged in!', `Hi ${(await response.json()).name}!`);
    //             this.props.navigation.navigate('App');
    //         } else {
    //             // type === 'cancel'
    //         }
    //     } catch ({ message }) {
    //         alert(`Facebook Login Error: ${message}`);
    //     }
    // }


    render() {
        return (
            <Container>
                <Content padder>
                    <Button onPress={() => this.logIn()} >
                        <Text>Login</Text>
                    </Button>
                </Content>
            </Container>
        );
    }
}