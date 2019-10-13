import React, { Component } from 'react';
import { View, Text, TouchableOpacity, Image, AsyncStorage } from 'react-native';

export default class Distancia extends Component {
    constructor(props) {
        super(props);
        this.state = {
          rang:
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

    async canviRang() {
      uid = await this.getIdUsuari();
      uid2 = uid.substr(1);
      uid3 = uid2.substring(0, uid2.length - 1);

      amount = 5

      return fetch('http://abuch.ddns.net:3080/api/change-range', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id: uid3,
          amount: amount,
        }),
      }).then((response) => response.json())
        .then(async (responseJson) => {
          console.log("response json: " + responseJson);
          const nouRang = await JSON.stringify(responseJson.rang);
          await this.setState({rang: nouRang})
        }).catch((error) => {
          console.error(error);
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

                <Text style={{ color: 'white', fontSize: 20, padding:'5%', textAlign:'center' }}> Ara el teu Rang és de {this.state.distance}!! ÀNIMS! </Text>
            </View>
        );
    }
}
