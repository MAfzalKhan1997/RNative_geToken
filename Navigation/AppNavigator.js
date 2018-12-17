import HomeScreen from '../Screens/Home/Home'
import LogInScreen from '../Screens/Login/Login'
import AuthLoadingScreen from '../Screens/AuthLoader/AuthLoader'

import { createSwitchNavigator, createStackNavigator, createAppContainer } from 'react-navigation';

const AppStack = createStackNavigator({ Home: HomeScreen });
const AuthStack = createStackNavigator({ LogIn: LogInScreen });


export default createAppContainer(createSwitchNavigator(
    {
        AuthLoading: AuthLoadingScreen,
        App: AppStack,
        Auth: AuthStack,
    },
    {
        initialRouteName: 'AuthLoading',
    }
));



                    // Home: {
                    //     screen: HomeScreen,
                    //     navigationOptions: () => ({
                    //         title: 'Home',
                    //         headerStyle: {
                    //             backgroundColor: '#3f51b5',
                    //         },
                    //         headerTintColor: '#fff',
                    //         headerTitleStyle: {
                    //             fontWeight: 'bold',
                    //         },
                    //     })
                    // }, 