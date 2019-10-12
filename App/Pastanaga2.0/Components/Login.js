import React, { Component } from 'react';
import { Alert, Button, Text, TouchableOpacity, TextInput, View, StyleSheet, AsyncStorage } from 'react-native';
import { AuthSession } from 'expo';

const FIB_APP_ID = '6XzThAtJTyA1VtLKHarEeQ8jVsoaUuslG55qBjDQ';

export default class Login extends Component {

    state = {
      nom: '',
      password: '',
    };



  render() {
    return (
      <View style={styles.container}>


        <Button title="Login amb FIB" onPress={this._handlePressAsync} />
             {this.state.result ? (
               <Text>HOLA! {this.state.nom}</Text>
             ) : null}


      </View>
    );
  }

  _handlePressAsync = async () => {
    let redirectUrl = AuthSession.getRedirectUrl();
    let result = await AuthSession.startAsync({
      authUrl:
        `https://api.fib.upc.edu/v2/o/authorize/?` +
        `client_id=${encodeURIComponent(FIB_APP_ID)}` +
        `&redirect_uri=${encodeURIComponent(redirectUrl)}`+
        `&response_type=token&state=random_string`,
      });
      await this.setState({ result });
      this.comprovaResultat()

  };

  comprovaResultat = () => {
    console.log("comprovant resultat")
    let resultat = this.state.result;
    console.log(resultat)
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
        AsyncStorage.setItem('nom',nom)
        AsyncStorage.setItem('cognoms',cognoms)
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
           console.log(results.dia_setmana)
           AsyncStorage.setItem('access_token',resultat.params.access_token)


         })
         this.props.navigation.navigate("app")
    }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});