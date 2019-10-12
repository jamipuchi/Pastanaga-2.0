import React, { Component } from 'react';
import { View, Text, TouchableOpacity, Image, AsyncStorage } from 'react-native';

export default class Distancia extends Component {
    constructor(props) {
        super(props);
        this.state = {
            distance: 0
        };
        this.getDistancia()
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

    getDistancia = async () => {
      uid = await this.getIdUsuari();
      uid2 = uid.substr(1);
      uid3 = uid2.substring(0, uid2.length - 1);
      fetch(`http://abuch.ddns.net:3080/api/distance-objective?id=${encodeURIComponent(uid3)}`, {
        method: "GET",
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      }).then((response) => response.json())
        .then(async (responseJson) => {
          const jsonresp = JSON.stringify(responseJson);
          console.log(jsonresp);
          //AQUI FALTA IMPLEMENTAR EL CANVI D'ESTAT SEGONS LA RESPOSTA
          await this.setState({distance: jsonresp})
        }).catch((error) => {
          console.log("HOLAAA NO TENS A NINGU A LA DISTÀNCIA");
        });

    }

    render() {
        return (
            <View style={{ backgroundColor: "#262626", height: '100%', width: '100%', alignContent: "center", alignItems: "center", justifyContent: "center" }}>
                <TouchableOpacity
                    onPress={() => this.props.navigation.goBack()}
                    style={{ width: 30, position: 'absolute', right: '5%', top: '7%' }}>
                    <Image
                        source={require('../../assets/close.png')}
                        style={{ height: 20, width: 20, resizeMode: 'contain' }}
                        rotation={180}
                    ></Image>
                </TouchableOpacity>

                <Text style={{ color: 'white', fontSize: 20, padding:'5%', textAlign:'center' }}> Estàs a: {this.state.distance}m del teu objectiu, ÀNIMS! </Text>
            </View>
        );
    }
}
