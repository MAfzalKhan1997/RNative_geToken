import React from 'react';
import { AsyncStorage, View } from 'react-native';
import { Container, Content, Button, Text } from 'native-base';

import AuthState from '../../Helper/AuthState'
import firebase from '../../Config/firebase';

// ****************This code just remove the warning from display screen not from the console****************
// import { YellowBox } from 'react-native';
// import _ from 'lodash';

// YellowBox.ignoreWarnings(['Setting a timer']);
// const _console = _.clone(console);
// console.warn = message => {
//     if (message.indexOf('Setting a timer') <= -1) {
//         _console.warn(message);
//     }
// };

import { Platform, InteractionManager } from 'react-native';

const _setTimeout = global.setTimeout;
const _clearTimeout = global.clearTimeout;
const MAX_TIMER_DURATION_MS = 60 * 1000;
if (Platform.OS === 'android') {
    // Work around issue `Setting a timer for long time`
    // see: https://github.com/firebase/firebase-js-sdk/issues/97
    const timerFix = {};
    const runTask = (id, fn, ttl, args) => {
        const waitingTime = ttl - Date.now();
        if (waitingTime <= 1) {
            InteractionManager.runAfterInteractions(() => {
                if (!timerFix[id]) {
                    return;
                }
                delete timerFix[id];
                fn(...args);
            });
            return;
        }

        const afterTime = Math.min(waitingTime, MAX_TIMER_DURATION_MS);
        timerFix[id] = _setTimeout(() => runTask(id, fn, ttl, args), afterTime);
    };

    global.setTimeout = (fn, time, ...args) => {
        if (MAX_TIMER_DURATION_MS < time) {
            const ttl = Date.now() + time;
            const id = '_lt_' + Object.keys(timerFix).length;
            runTask(id, fn, ttl, args);
            return id;
        }
        return _setTimeout(fn, time, ...args);
    };

    global.clearTimeout = id => {
        if (typeof id === 'string' && id.startWith('_lt_')) {
            _clearTimeout(timerFix[id]);
            delete timerFix[id];
            return;
        }
        _clearTimeout(id);
    };
}



export default class Login extends React.Component {

    static navigationOptions = {
        // title: 'SignIn',
        header: null,
    };

    // constructor() {
    //     super()

    //     this.state = {

    //     }
    // }

    componentWillMount() {
        AuthState()
        // this.check()
    }

    // check = async () => {
    //     const userObject = JSON.parse(await AsyncStorage.getItem('userObject'));
    //     console.log('Login userObject', userObject)
    // }

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

            await AsyncStorage.setItem('userToken', token);

            // console.log('loginToken', token)
            // const response = await fetch(`https://graph.facebook.com/me?fields=id,name,email,birthday&access_token=${token}`);
            // console.log(await response.json())

            const credential = firebase.auth.FacebookAuthProvider.credential(token);
            firebase.auth().signInAndRetrieveDataWithCredential(credential)
                .then((result) => {
                    let user = result.user.toJSON()
                    // console.log('user json', user)
                    let userData = user.providerData[0]
                    // console.log('login user', userData) 

                    var userObject = {
                        displayName: userData.displayName,
                        email: userData.email,
                        photoURL: userData.photoURL,
                        uid: user.uid
                    };

                    console.log('Login userObject', userObject)

                    firebase.database().ref("/").child("users/" + user.uid).set(userObject)
                        .then(() => {
                            console.log("User added to DataBase.");
                            AsyncStorage.setItem('userObject', JSON.stringify(userObject));
                            this.props.navigation.navigate('App');
                        })
                        .catch(function (error) {
                            console.log('Error:', error.message)
                        });

                })
                .catch((error) => {
                    console.log('Error:', error.message)
                });
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