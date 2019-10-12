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

      this._getLocationAsync();

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
    this.setState({ location });
    this.setState({ longitude: location.coords.longitude});
    this.setState({latitude: location.coords.latitude});
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
