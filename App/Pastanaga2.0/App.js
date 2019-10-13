import React from 'react';
import { StyleSheet, Text, View, AsyncStorage, Alert } from 'react-native';
import { createStackNavigator } from 'react-navigation-stack'
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import Login from './Components/Login';
import MainScreen from './Components/MainScreen';
import PowerUps from './Components/PowerUps';
import Escanejar from './Components/Escanejar';
import Disparar from './Components/Disparar'
import Tutorial from './Components/Tutorial';
import * as TaskManager from 'expo-task-manager';
import * as Location from 'expo-location';
import Perdut from './Components/Perdut';
import Guanyat from './Components/Guanyat';
import Brujola from './Components/PowerUps/Brujola';
import Distancia from './Components/PowerUps/Distancia';
import Esta from './Components/PowerUps/Esta';
import Nom from './Components/PowerUps/Nom';
import Foto from './Components/PowerUps/Foto';
import Rang from './Components/PowerUps/Rang';
import * as Permissions from 'expo-permissions';

class AuthLoadingScreen extends React.Component {

  constructor() {
    super();

    this._bootstrapAsync();
  }
  componentDidMount = async () => {
    let { status } = await Permissions.askAsync(Permissions.LOCATION);
    console.log("status: " + status);
    if (status !== 'granted') {
      this.setState({
        errorMessage: 'Permission to access location was denied',
      });
    }
    await Location.startLocationUpdatesAsync("firstTask", {
      accuracy: Location.Accuracy.Balanced,
      timeInterval: 5000,
    });
  }
  // Fetch the token from storage then navigate to our appropriate place
  _bootstrapAsync = async () => {
    console.log("acc_token")
    const access_token = await AsyncStorage.getItem('access_token');
    console.log("access token: " + access_token)

    // This will switch to the App screen or Auth screen and this loading
    // screen will be unmounted and thrown away.

    this.props.navigation.navigate(access_token ? 'App' : 'Login');
  };

  static updateLocation = async (location) => {

    uid = await this.getIdUsuari();
    uid2 = uid.substr(1);
    uid3 = uid2.substring(0, uid2.length - 1);
    let latitude = location.latitude;
    let longitude = location.longitude;


    if (uid != '') {
      return fetch('http://abuch.ddns.net:3080/api/update-last-known', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          latitude: latitude,
          longitude: longitude,
          id: uid3
        }),
      }).then((response) => response.json())
        .then(async (responseJson) => {
          console.log("response json: " + responseJson);

        }).catch((error) => {
          console.error(error);
        });
    }
    else {

    }
  }

  static getIdUsuari = async () => {
    const currentUser = await AsyncStorage.getItem('id_user')
    console.log("USUARI CORENT  " + currentUser)
    if (currentUser != null) {
      return (currentUser);
    } else {
      return '';
    }
  }
  render() {
    return (
      <View style={styles.containerb}>
        <Text>Authentication screen</Text>
      </View>
    );
  }
}


class MainLoader extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
    this.getStatusAsync();
  }

  getIdUsuari = async () => {
    const currentUser = await AsyncStorage.getItem('id_user')
    console.log("USUARI CORENT  " + currentUser)
    if (currentUser != null) {
      return (currentUser);
    } else {
      return '';
    }
  }

  getStatusAsync = async () => {
    uid = await this.getIdUsuari();
    uid2 = uid.substr(1);
    uid3 = uid2.substring(0, uid2.length - 1);
    var status = ""
    fetch(`http://abuch.ddns.net:3080/api/status?id=${encodeURIComponent(uid3)}`, {
      method: "GET",
      headers: {
        Accept: 'application/json',
      },
    }).then((response) => response.json())
      .then(async (responseJson) => {
        status = JSON.stringify(responseJson);
        console.log("ESAQUI!!!!!!!!!!"+status);

        switch (status) {
          case '"Alive"':
            this.props.navigation.navigate("AppStack");
            break;
          case '"Winner"':
            this.props.navigation.navigate("Guanyat");

            break;
          case '"Loser"':
            this.props.navigation.navigate("Perdut");
            break;
          case '"Idle"':
            this.props.navigation.navigate("Perdut");
            break;
          default:
            Alert.alert("aixo no puto hauria de passar")
            break;
        }
      }).catch(async (error) => {
        console.error(error)
      });


  };


  render() {
    return (
      <View style={{ width: '100%', height: '100%', backgroundColor: '#262626', }}>
        <Text style={{
          width: '100%',
          height: '100%',
          textAlign: 'center',
          textAlignVertical: 'center',
          color: 'white',
          fontSize: 30
        }}> Loading... </Text>
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

const PowerUpStack = createStackNavigator({
    PowerUps: {screen: PowerUps},
    Brujola: {screen: Brujola},
    Distancia: {screen: Distancia},
    Rang: {screen: Rang},
    Esta: {screen: Esta},
    Nom: {screen: Nom},
    Foto: {screen: Foto}
    },
    {
      initialRouteName: 'PowerUps',
      headerMode: 'none',
      navigationOptions: {
          headerVisible: false,
      }
    }
)


const AppStack = createStackNavigator(
  {
    Login: { screen: Login },
    MainScreen: { screen: MainScreen },
    Escanejar: { screen: Escanejar },
    PowerUps: { screen: PowerUpStack },
    Disparar: { screen: Disparar },
    Tutorial: { screen: Tutorial },
  },
  {
    initialRouteName: 'MainScreen',
    headerMode: 'none',
    navigationOptions: {
      headerVisible: false,
    }
  }
)

const Mainstack = createSwitchNavigator({
  MainLoader: { screen: MainLoader },
  AppStack: { screen: AppStack },
  Perdut: { screen: Perdut },
  Guanyat: { screen: Guanyat }
},
  {
    initialRouteName: 'MainLoader',
  }
)


const AuthStack = createStackNavigator({
  AuthLoadingScreen: { screen: AuthLoadingScreen },
  Login: { screen: Login },
  MainScreen: { screen: MainScreen },
}, {
  initialRouteName: 'AuthLoadingScreen',
  headerMode: 'none',
  navigationOptions: {
    headerVisible: false
  }
})




export default createAppContainer(createSwitchNavigator(
  {
    App: Mainstack,
    Auth: AuthStack,
  },
  {
    initialRouteName: 'Auth',
  }
));



TaskManager.defineTask("firstTask", async ({ data, error }) => {
  if (error) {
    alert(error)
    // Error occurred - check `error.message` for more details.
    return;
  }
  if (data) {
    const { locations } = data;
    console.log("locations", locations)
    AuthLoadingScreen.updateLocation(locations[0].coords);

    //will show you the location object
    //lat is locations[0].coords.latitude & long is locations[0].coords.longitude
    // do something with the locations captured in the background, possibly post to your server with axios or fetch API
  }
});
