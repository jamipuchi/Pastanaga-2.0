import React, { Component } from 'react';
import { Alert, Button, Text, TouchableOpacity, TextInput, View, StyleSheet, AsyncStorage } from 'react-native';
import { AuthSession } from 'expo';
import { NavigationActions, StackActions } from 'react-navigation';


const FIB_APP_ID = '6XzThAtJTyA1VtLKHarEeQ8jVsoaUuslG55qBjDQ';

export default class Login extends Component {

    state = {
      nom: '',
      mail:''
    };


  async boto(){
    m = await this._handlePressAsync()
    this.props.navigation.navigate("MainScreen")
  }

  async registerToApiAsync() {
        return fetch('http://abuch.ddns.net:3080/api/create-user', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                nom: this.state.mail,
                mail: this.state.nom,
            }),
        }).then((response) => response.json())
            .then((responseJson) => {
                console.log(responseJson.msg);
                return responseJson;
            }).catch((error) => {
                console.error(error);
            });
    }

  render() {

    return (
      <View style={styles.container}>

        <Button title="Login amb FIB" onPress={() => {
          this.boto()

        }} />

      </View>
    );
  }

  _handlePressAsync = async () => {
    let redirectUrl = await AuthSession.getRedirectUrl();
    let result = await AuthSession.startAsync({
      authUrl:
        `https://api.fib.upc.edu/v2/o/authorize/?` +
        `client_id=${encodeURIComponent(FIB_APP_ID)}` +
        `&redirect_uri=${encodeURIComponent(redirectUrl)}`+
        `&response_type=token&state=random_string`,
      });
      await this.setState({ result });
      console.log("result ===" + this.state.result);
      await this.comprovaResultat()
      //await this.registerToApiAsync()
      console.log("------NAVEGANT..................");

  };

  comprovaResultat = async () => {
    console.log("comprovant resultat")
    let resultat = this.state.result;
    console.log("resultat:"+resultat)
    console.log(resultat.params.access_token)
    AsyncStorage.setItem('access_token',resultat.params.access_token)
    this.setState({ access_token : resultat.params.access_token})
    this.getParamsFromApi()

  }


  getParamsFromApi = () => {

   fetch('https://api.fib.upc.edu/v2/jo/', {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Authorization': `Bearer ${this.state.access_token}`
      },
      })
      .then((response) => response.json())
      .then((responseJson) => {

        let nom = responseJson.nom
        this.setState({ nom : nom})

        let cognoms = responseJson.responseJson
        let mail = responseJson.email
        console.log(nom)
        console.log(cognoms)
        console.log(mail)
        AsyncStorage.setItem('nom',nom + cognoms)
        AsyncStorage.setItem('mail',mail)


      })

      fetch('https://api.fib.upc.edu/v2/jo/classes/', {
         method: 'GET',
         headers: {
           Accept: 'application/json',
           'Authorization': `Bearer ${this.state.access_token}`
         },
         })
         .then((response) => response.json())
         .then((responseJson) => {

           console.log(responseJson)
           let results = responseJson.results
         })
         console.log("AQUI NAVEGUEM DE VERITAT");


    }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
