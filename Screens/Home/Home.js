import React from 'react';
import { AsyncStorage, View } from 'react-native';
import { Container, Content, Button, Text } from 'native-base';

import AuthState from '../../Helper/AuthState'

export default class Home extends React.Component {

    static getDerivedStateFromProps() {

        AuthState()
        return null
    }

    logOut = async () => {
        await AsyncStorage.removeItem('userToken');
        this.props.navigation.navigate('Auth');
    };

    render() {
        return (
            <Container>
                <Content padder>
                    <Button onPress={() => this.logOut()}>
                        <Text>logout</Text>
                    </Button>
                </Content>
            </Container>
        );
    }
}