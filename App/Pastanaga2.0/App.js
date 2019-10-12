import React from 'react';
import { StyleSheet, Text, View, AsyncStorage } from 'react-native';
import { createStackNavigator } from 'react-navigation-stack'
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import Login from './Components/Login';
import MainScreen from './Components/MainScreen';
import PowerUps from './Components/PowerUps';
import Escanejar from './Components/Escanejar';
import Disparar from './Components/Disparar'
import Tutorial from './Components/Tutorial';
import Perdut from './Components/Perdut';
import Guanyat from './Components/Guanyat';

class AuthLoadingScreen extends React.Component {

  constructor() {
    super();
    console.log("hola");
    this._bootstrapAsync();
  }

  // Fetch the token from storage then navigate to our appropriate place
  _bootstrapAsync = async () => {
    console.log("acc_token")
    const access_token = await AsyncStorage.getItem('access_token');
    console.log("access token: "+access_token)

    // This will switch to the App screen or Auth screen and this loading
    // screen will be unmounted and thrown away.

    this.props.navigation.navigate(access_token ? 'App' : 'Login');
  };

  render() {
    return (
      <View style={styles.containerb}>
        <Text>Authentication screen</Text>
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
const AppStack = createStackNavigator(
  {
  Login: {screen: Login},
  MainScreen: {screen: MainScreen},
  Escanejar: {screen: Escanejar},
  PowerUps: {screen: PowerUps},
  Disparar:{screen: Disparar},
  Tutorial:{screen: Tutorial},
  Perdut:{screen:Perdut},
  Guanyat:{screen:Guanyat}
  },
  {
    initialRouteName: 'MainScreen',
    headerMode: 'none',
    navigationOptions: {
        headerVisible: false,
    }
  }
)

const AuthStack = createStackNavigator({
  AuthLoadingScreen: {screen: AuthLoadingScreen},
  Login: {screen: Login},
  MainScreen: {screen: MainScreen},
 },  {
     initialRouteName: 'AuthLoadingScreen',
     headerMode: 'none',
     navigationOptions: {
         headerVisible: false
     }})




export default createAppContainer(createSwitchNavigator(
  {
    App: AppStack,
    Auth: AuthStack,
  },
  {
    initialRouteName: 'Auth',
  }
));
