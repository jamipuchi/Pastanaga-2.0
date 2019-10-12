import React, { Component } from 'react';
import { Alert, Button, Text, TouchableOpacity, TextInput, View, StyleSheet, AsyncStorage, Image } from 'react-native';
import { AuthSession } from 'expo';
import { NavigationActions, StackActions } from 'react-navigation';


const FIB_APP_ID = '6XzThAtJTyA1VtLKHarEeQ8jVsoaUuslG55qBjDQ';

export default class Login extends Component {

  state = {
    nom: '',
    mail: '',
    horari: [],
  };


  async boto() {
    m = await this._handlePressAsync()
    this.props.navigation.navigate("MainScreen")
  }

  async registerToApiAsync() {
    const { nom, mail, horari } = this.state;
    console.log("nom: " + nom)
    console.log("mail: " + mail)

    return fetch('http://abuch.ddns.net:3080/api/create-user', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: nom,
        email: mail,
        horari: horari
      }),
    }).then((response) => response.json())
      .then(async (responseJson) => {
        console.log("response json: " + responseJson);
        const id = JSON.stringify(responseJson.id);
        console.log("ID USUARI ES" + id)
        await AsyncStorage.setItem('id_user', id)
        console.log((await AsyncStorage.getItem('id_user')))
        return responseJson;
      }).catch((error) => {
        console.error(error);
      });
  }

  render() {

    return (
      <View style={[styles.container, { backgroundColor: '#262626' }]}>
        <Image
          style={{ width: '100%', height: '25%', marginBottom: '20%' }}
          resizeMode="contain"
          source={require('../assets/Logo.png')}
        />
        <TouchableOpacity
          style={{width:'90%', marginLeft:'5%',}}
          onPress={() => {
            this.boto()
          }}        >
          <Image
            style={{ width: '100%', height: '25%'}}
            resizeMode="contain"
            source={require('../assets/fib.png')}
          />
        </TouchableOpacity>


      </View>
    );
  }

  _handlePressAsync = async () => {
    let redirectUrl = await AuthSession.getRedirectUrl();
    console.log(redirectUrl);
    let result = await AuthSession.startAsync({
      authUrl:
        `https://api.fib.upc.edu/v2/o/authorize/?` +
        `client_id=${encodeURIComponent(FIB_APP_ID)}` +
        `&redirect_uri=${encodeURIComponent(redirectUrl)}` +
        `&response_type=token&state=random_string`,
    });
    await this.setState({ result });
    console.log("result ===" + this.state.result);
    await this.comprovaResultat()
    await this.registerToApiAsync()

  };

  comprovaResultat = async () => {
    console.log("comprovant resultat")
    let resultat = this.state.result;
    console.log("resultat:" + resultat)
    console.log(resultat.params.access_token)

    this.setState({ access_token: resultat.params.access_token })
    params = await this.getParamsFromApi()
    return params;

  }


  getParamsFromApi = async () => {

    await fetch('https://api.fib.upc.edu/v2/jo/', {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Authorization': `Bearer ${this.state.access_token}`
      },
    })
      .then((response) => response.json())
      .then((responseJson) => {

        let nom = responseJson.nom
        this.setState({ nom: nom })

        let cognoms = responseJson.responseJson
        let mail = responseJson.email
        console.log(nom)
        console.log(cognoms)
        console.log(mail)
        this.setState({ mail, nom })
        AsyncStorage.setItem('nom', nom + cognoms)
        AsyncStorage.setItem('mail', mail)
        AsyncStorage.setItem('access_token', this.state.access_token)

      })

    await fetch('https://api.fib.upc.edu/v2/jo/classes/', {
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

        const ar1 = results.map(({ codi_assig, ...rest }) => rest)
        const ar2 = ar1.map(({ grup, ...rest }) => rest)
        const ar3 = ar2.map(({ tipus, ...rest }) => rest)
        for (i = 0; i < ar3.length; i++) {
          string = ar3[i].inici.split(':')[0].trim();
          ar3[i].inici = parseInt(string)
        }

        this.setState({ "horari": ar3 })
        console.log(ar3)

      })
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
