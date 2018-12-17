import React from 'react';
// import { View } from 'react-native';
import { Container, Content, Button, Text } from 'native-base';

export default class Login extends React.Component {

    static navigationOptions = {
        title: 'SignIn',
    };

    logIn = async () => {
        try {
            const {
                type,
                token,
                expires,
                permissions,
                declinedPermissions,
            } = await Expo.Facebook.logInWithReadPermissionsAsync('<APP_ID>', {
                permissions: ['public_profile'],
            });
            if (type === 'success') {
                await AsyncStorage.setItem('userToken', token);
                // Get the user's name using Facebook's Graph API
                const response = await fetch(`https://graph.facebook.com/me?access_token=${token}`);
                Alert.alert('Logged in!', `Hi ${(await response.json()).name}!`);
                this.props.navigation.navigate('App');
            } else {
                // type === 'cancel'
            }
        } catch ({ message }) {
            alert(`Facebook Login Error: ${message}`);
        }
    }


    render() {
        return (
            <Container>
                <Content padder>
                    <Button onPress={this._LogInAsync} >
                        <Text>Login!</Text>
                    </Button>
                </Content>
            </Container>
        );
    }
}