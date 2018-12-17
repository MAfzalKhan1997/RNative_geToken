import React from 'react';
import { AsyncStorage, View } from 'react-native';
import { Container, Content, Button, Text } from 'native-base';

export default class Home extends React.Component {

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