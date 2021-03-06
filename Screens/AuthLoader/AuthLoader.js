import React from 'react';

import {
    ActivityIndicator,
    AsyncStorage,
    StatusBar,
    StyleSheet,
    View,
} from 'react-native';

// import AuthState from '../../Helper/AuthState'

export default class AuthLoader extends React.Component {
    constructor(props) {
        super(props);
        // this._bootstrapAsync();
    }


    // _bootstrapAsync = async () => {
    // };

    async componentWillMount() {

        await Expo.Font.loadAsync({
            'Roboto': require('native-base/Fonts/Roboto.ttf'),
            'Roboto_medium': require('native-base/Fonts/Roboto_medium.ttf')
        });

        // Fetch the token from storage then navigate to our appropriate place
        const userToken = await AsyncStorage.getItem('userToken');
        const userObject = JSON.parse(await AsyncStorage.getItem('userObject'));
        console.log('userObject', userObject)
        // This will switch to the App screen or Auth screen and this loading
        // screen will be unmounted and thrown away.
        this.props.navigation.navigate(userToken ? 'App' : 'Auth');
    }

    render() {
        return (
            <View style={styles.container}>
                <ActivityIndicator />
                <StatusBar barStyle="default" />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});
