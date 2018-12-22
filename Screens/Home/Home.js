import React from 'react';
import { AsyncStorage, View } from 'react-native';
import { Container, Content, Button, Text } from 'native-base';
import { Drawer } from 'native-base';

import AuthState from '../../Helper/AuthState'
import firebase from '../../Config/firebase';

export default class Home extends React.Component {

    componentWillMount() {
        AuthState()
        this.check()
    }

    check = async () => {
        const userObject = JSON.parse(await AsyncStorage.getItem('userObject'));
        console.log('Home userObject', userObject)
    }

    logOut = async () => {

        firebase.auth().signOut().then(function () {

            console.log("SignedOut")
            AsyncStorage.removeItem('userObject');
            // AuthState()

        }).catch(function (error) {
            console.log('Error:', error.message)
        });
        AsyncStorage.removeItem('userToken');
        this.props.navigation.navigate('Auth');
    }


    render() {
        closeDrawer = () => {
            this.drawer._root.close()
        };
        openDrawer = () => {
            this.drawer._root.open()
        };
        return (
            // <Drawer
            //     ref={(ref) => { this.drawer = ref; }}
            //     // content={<SideBar navigator={this.navigator} />}
            //     onClose={() => this.closeDrawer()} >
            //     {/* // Main View */}
            // </Drawer>
            <Container>
                <Content padder>
                    <Button onPress={() => this.logOut()}>
                        <Text>Sign  Out</Text>
                    </Button>
                </Content>
            </Container>
        );
    }
}