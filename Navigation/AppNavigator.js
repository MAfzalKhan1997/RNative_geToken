import HomeScreen from '../Screens/Home/Home'
import LoginScreen from '../Screens/Login/Login'

import { createStackNavigator, createAppContainer } from "react-navigation";

const StackNavigator = createStackNavigator(
    {
        Home: {
            screen: HomeScreen,
            navigationOptions: () => ({
                title: 'Home',
                headerStyle: {
                    backgroundColor: '#3f51b5',
                },
                headerTintColor: '#fff',
                headerTitleStyle: {
                    fontWeight: 'bold',
                },
            })
        },
        Login: {
            screen: LoginScreen,
            header: null,
        },
    },
    {
        initialRouteName: "Home"
    }
)

const Navigator = createAppContainer(StackNavigator)

export default Navigator