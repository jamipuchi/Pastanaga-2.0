import React from 'react';
import { StyleSheet, Text, View, AsyncStorage } from 'react-native';
import { createStackNavigator } from 'react-navigation-stack'
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import Login from './Login';
import MainScreen from './Components/MainScreen';
import Escanejar from './Escanejar';
import PowerUps from './Components/PowerUps';


class AuthLoadingScreen extends React.Component {
  constructor() {
    super();
    this._bootstrapAsync();
  }

  // Fetch the token from storage then navigate to our appropriate place
  _bootstrapAsync = async () => {
    const userToken = await AsyncStorage.getItem('userToken');

    // This will switch to the App screen or Auth screen and this loading
    // screen will be unmounted and thrown away.

    this.props.navigation.navigate(!userToken ? 'App' : 'Auth');
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

const AuthStack = createStackNavigator({ SignIn: Login }, {headerMode: 'none'});

const AppStack = createStackNavigator(
  {
  MainScreen: {screen: MainScreen},
  Escanejar: {screen: Escanejar},
  PowerUps: {screen: PowerUps}
  },
  {
    initialRouteName: 'MainScreen',
    headerMode: 'none',
    navigationOptions: {
        headerVisible: false,
    }
  }
)

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
