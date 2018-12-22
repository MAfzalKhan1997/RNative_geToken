import React from 'react';
import { AsyncStorage, View } from 'react-native';
import { Container, Content, Button, Text } from 'native-base';
// import { Drawer } from 'native-base';

import AuthState from '../../Helper/AuthState'
import firebase from '../../Config/firebase';

export default class Home extends React.Component {

    static navigationOptions = {
        title: 'Home',
    };

    componentWillMount() {
        AuthState()
        // this.check()
    }

    // check = async () => {
    //     const userObject = JSON.parse(await AsyncStorage.getItem('userObject'));
    //     console.log('Home userObject', userObject)
    // }

    logOut = async () => {

        firebase.auth().signOut().then(function () {

            console.log("SignedOut")
            AsyncStorage.removeItem('userObject');

        }).catch(function (error) {
            console.log('Error:', error.message)
        });
        AsyncStorage.removeItem('userToken');
        this.props.navigation.navigate('Auth');
    }


    render() {
        return (
            <Container>
                <Content padder>
                    <Button block onPress={() => this.logOut()}>
                        <Text>Sign Out</Text>
                    </Button>
                    <Button block info onPress={() => this.props.navigation.navigate('Companies')} >
                        <Text>Im a Company</Text>
                    </Button>
                    <Text>or</Text>
                    <Button block success >
                        <Text>Get token</Text>
                    </Button>
                </Content>
            </Container>
        );
    }
}