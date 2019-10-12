import React, { Component } from 'react';
import { Alert, Button, Text, TouchableOpacity, TextInput, View, StyleSheet, AsyncStorage } from 'react-native';
import { AuthSession } from 'expo';
import Constants from 'expo-constants';
import * as Location from 'expo-location';
import * as Permissions from 'expo-permissions';



export default class Disparar extends Component {
  state = {
    location: null,
    errorMessage: null,
    longitude: null,
    latitude: null,
  };

  componentWillMount() {

      this.handleDisparar();

  }
   handleDisparar = async()=>{
    m = await this._getLocationAsync();
    l = await this.updateCoords();
    f = await this.disparar();
  }

     updateCoords= async()=>{
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
          .then(async(responseJson) => {
              console.log("response json: " + responseJson);
              return responseJson;

          }).catch((error) => {
              console.error(error);
              return error;
          });

    }

     getIdUsuari = async () =>{
      const currentUser = await AsyncStorage.getItem('id_user')
      console.log("USUARI CORENT  "+ currentUser)
      if(currentUser != null){
        return (currentUser);
      }else{
        return '';
      }
    }

     disparar= async()=> {
      uid = await this.getIdUsuari();
      uid2 = uid.substr(1);
      uid3 = uid2.substring(0, uid2.length - 1);
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
              .then(async(responseJson) => {
                  console.log("response json: " + responseJson);

              }).catch((error) => {
                  console.error(error);
              });
      }

  _getLocationAsync = async () => {
    console.log("getting location");
    let { status } = await Permissions.askAsync(Permissions.LOCATION);
    console.log("status: "+status);
    if (status !== 'granted') {
      this.setState({
        errorMessage: 'Permission to access location was denied',
      });
    }
    let location = await Location.getCurrentPositionAsync({});
    await this.setState({ location });
    await this.setState({ longitude: location.coords.longitude});
    await this.setState({ latitude: location.coords.latitude});
    return location;
  };

  render() {
    let text = 'Waiting..';
    if (this.state.errorMessage) {
      text = this.state.errorMessage;
    } else if (this.state.location) {
      text = "longitude: " + JSON.stringify(this.state.longitude) +"/ latitude "+JSON.stringify(this.state.latitude);

    }

    return (
      <View style={styles.container}>
        <Text style={styles.paragraph}>{text}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: Constants.statusBarHeight,
    backgroundColor: '#ecf0f1',
  },
  paragraph: {
    margin: 24,
    fontSize: 18,
    textAlign: 'center',
  },
});
