import React from 'react';
import { AsyncStorage, View } from 'react-native';
import { Container, Content, Button, Text } from 'native-base';

import AuthState from '../../Helper/AuthState'
import firebase from '../../Config/firebase';

export default class Home extends React.Component {

    componentWillMount() {
        AuthState()
    }


    logOut = async () => {

        firebase.auth().signOut().then(function () {

            console.log("SignedOut")
            // AuthState()

        }).catch(function (error) {
            console.log('Error:', error.message)
        });
        // AsyncStorage.removeItem('userToken');
        this.props.navigation.navigate('Auth');
    }

    // logOut = async () => {
    //     await AsyncStorage.removeItem('userToken');
    //     this.props.navigation.navigate('Auth');
    // };

    render() {
        return (
            <Container>
                <Content padder>
                    <Button onPress={() => this.logOut()}>
                        <Text>Sign Out</Text>
                    </Button>
                </Content>
            </Container>
        );
    }
}