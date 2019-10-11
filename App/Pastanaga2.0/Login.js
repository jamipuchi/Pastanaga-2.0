import React, { Component } from 'react';
import { Alert, Button, Text, TouchableOpacity, TextInput, View, StyleSheet } from 'react-native';
import { AuthSession } from 'expo';

const FIB_APP_ID = '6XzThAtJTyA1VtLKHarEeQ8jVsoaUuslG55qBjDQ';

export default class Login extends Component {

    state = {
      email: '',
      password: '',
    };


  onLogin() {
    const { email, password } = this.state;

    Alert.alert('Credentials', `email: ${email} + password: ${password}`);
  }

  render() {
    return (
      <View style={styles.container}>


        <Button title="Open FB Auth" onPress={this._handlePressAsync} />
             {this.state.result ? (
               <Text>{JSON.stringify(this.state.result)}</Text>
             ) : null}

         <Text> Sign Up / Login </Text>

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
    this.setState({ result });
  };


}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
