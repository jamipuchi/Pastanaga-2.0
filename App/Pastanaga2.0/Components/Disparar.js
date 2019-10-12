import React, { Component } from 'react';
import { Alert, Image, Button, Text, TouchableOpacity, TextInput, View, StyleSheet, AsyncStorage } from 'react-native';
import { AuthSession } from 'expo';
import Constants from 'expo-constants';
import * as Location from 'expo-location';
import * as Permissions from 'expo-permissions';
import LottieView from 'lottie-react-native';


export default class Disparar extends Component {
  state = {
    location: null,
    errorMessage: null,
    longitude: null,
    latitude: null,
    resultat: "waiting",
  };

  componentWillMount() {

    this.handleDisparar();

  }

  handleDisparar = async () => {
    m = await this._getLocationAsync();
    l = await this.updateCoords();
    f = await this.disparar();
  }

  updateCoords = async () => {
    uid = await this.getIdUsuari();
    uid2 = uid.substr(1);
    uid3 = uid2.substring(0, uid2.length - 1);
    let latitude = this.state.latitude;
    let longitude = this.state.longitude;

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
        return responseJson;

      }).catch((error) => {
        console.error(error);
        return error;
      });

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

  disparar = async () => {
    uid = await this.getIdUsuari();
    uid2 = uid.substr(1);
    uid3 = uid2.substring(0, uid2.length - 1);
    console.log(uid3);
    return fetch('http://abuch.ddns.net:3080/api/matar', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        id: uid3
      }),
    }).then((response) => response.json())
      .then(async (responseJson) => {
        const jsonresp = JSON.stringify(responseJson);
        console.log("RESPOSTA JSONA+0"+responseJson);
        if(responseJson === true){
          await this.setState({resultat: "encerta"})
        }else{
          await this.setState({resultat: "falla"})

        }
        //AQUI FALTA IMPLEMENTAR EL CANVI D'ESTAT SEGONS LA RESPOSTA
      }).catch((error) => {
        console.error(error);
        this.setState({resultat: "falla"})
      });
  }

  _getLocationAsync = async () => {
    console.log("getting location");
    let { status } = await Permissions.askAsync(Permissions.LOCATION);
    console.log("status: " + status);
    if (status !== 'granted') {
      this.setState({
        errorMessage: 'Permission to access location was denied',
      });
    }
    let location = await Location.getCurrentPositionAsync({});
    await this.setState({ location });
    await this.setState({ longitude: location.coords.longitude });
    await this.setState({ latitude: location.coords.latitude });
    return location;
  };

  render() {

    var resultat;

    if (this.state.resultat === "waiting") {
      resultat=(
      <Text style={styles.paragraph}>Calculant la trajectòria...</Text>);
    }
    else if (this.state.resultat === "falla"){
      resultat = (
        <View>
      <Text style={styles.paragraph}> </Text>
      <LottieView source={require('../assets/fallat.json')} autoPlay loop={false} />
      <TouchableOpacity
        onPress={() => this.props.navigation.navigate("MainScreen")}
        activeOpacity={0.5}
        style={{ position:'absolute', bottom:40, height: '12%', width: '100%' }}>
        <Image
          style={{ width: '90%', height: '100%', marginLeft: '5%' }}
          resizeMode="contain"
          source={require('../assets/Dacord.png')}
        />
      </TouchableOpacity></View>);
    }
    else {
      resultat = (
      <View>
      <Text style={styles.paragraph}> Felicitats! Has encertat de ple! </Text>
      <LottieView source={require('../assets/tocat.json')} autoPlay loop={false} />
      <TouchableOpacity
        onPress={() => this.props.navigation.navigate("MainScreen")}
        activeOpacity={0.5}
        style={{ position:'absolute', bottom:40, height: '12%', width: '100%' }}>
        <Image
          style={{ width: '90%', height: '100%', marginLeft: '5%' }}
          resizeMode="contain"
          source={require('../assets/Dacord.png')}
        />
      </TouchableOpacity>
      </View>
    );
    }

    return (


      <View style={styles.container}>
        {resultat}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Constants.statusBarHeight,
    backgroundColor: '#262626',
    color: 'white'
  },
  paragraph: {
    margin: 24,
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    color: 'white'
  },
});
