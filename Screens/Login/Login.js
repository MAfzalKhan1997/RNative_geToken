import React from 'react';
import { AsyncStorage, View } from 'react-native';
import { Container, Content, Button, Text } from 'native-base';

import AuthState from '../../Helper/AuthState'
import firebase from '../../Config/firebase';

export default class Login extends React.Component {

    static navigationOptions = {
        title: 'SignIn',
    };

    constructor() {
        super()

        this.state = {

        }
    }

    componentWillMount() {
        AuthState()
    }

    logIn = async () => {
        const {
            type,
            token,
            // expires,
            // permissions,
            // declinedPermissions,
        } = await Expo.Facebook.logInWithReadPermissionsAsync(
            '508728699640531',
            { permissions: ['public_profile', 'email'] }
        );

        if (type === 'success') {

            // await AsyncStorage.setItem('userToken', token);
            console.log('loginToken', token)
            const response = await fetch(`https://graph.facebook.com/me?fields=id,name,email,birthday&access_token=${token}`);
            console.log(await response.json())
            // Build Firebase credential with the Facebook access token.
            const credential = firebase.auth.FacebookAuthProvider.credential(token);
            // Sign in with credential from the Facebook user.
            firebase.auth().signInAndRetrieveDataWithCredential(credential)
                .catch((error) => {
                    alert('error', error)
                });
            // this.props.navigation.navigate('App');
        }
        // else {
        //     // type === 'cancel'
        // }
    }

    render() {
        return (
            <Container>
                <Content padder>
                    <Text>Get Started with Facebook</Text>
                    <Button block
                        onPress={() => this.logIn()} >
                        <Text>Sign In</Text>
                    </Button>
                </Content>
            </Container>
        );
    }
}