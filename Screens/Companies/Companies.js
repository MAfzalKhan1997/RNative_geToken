import React from 'react';
// import { AsyncStorage, View } from 'react-native';
import { Container, Content, Button, Text } from 'native-base';
// import { Drawer } from 'native-base';

// import AuthState from '../../Helper/AuthState'
// import firebase from '../../Config/firebase';

export default class Companies extends React.Component {

    static navigationOptions = {
        title: 'All Companies',
    };

    // componentWillMount() {
    //     AuthState()
    //     // this.check()
    // }

    // check = async () => {
    //     const userObject = JSON.parse(await AsyncStorage.getItem('userObject'));
    //     console.log('Home userObject', userObject)
    // }

    addCompany() {

    }

    render() {
        return (
            <Container>
                <Content padder>
                    <Button block onPress={() => this.addCompany()}>
                        <Text>add</Text>
                    </Button>
                </Content>
            </Container>
        );
    }
}