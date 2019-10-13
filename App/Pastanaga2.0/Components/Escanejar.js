import * as React from 'react';
import {
  Text,
  View,
  StyleSheet,
  Button,
  TouchableOpacity,
  Image,
  AsyncStorage
} from 'react-native';
import Constants from 'expo-constants';
import * as Permissions from 'expo-permissions';
import { Dialog, ConfirmDialog } from 'react-native-simple-dialogs';


import {
  BarCodeScanner
} from 'expo-barcode-scanner';

export default class Escanejar extends React.Component {
  state = {
    hasCameraPermission: null,
    scanned: false,
    classe: "",
    dialogVisible: false,
    result:"",
  };

  async componentDidMount() {
    this.getPermissionsAsync();
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


      sendAulaApi= async()=>{
       uid = await this.getIdUsuari();
       uid2 = await uid.substr(1);
       uid3 = uid2.substring(0, uid2.length - 1);
       aula = await this.state.classe;
       hora = new Date().getHours();
       console.log("hora"+hora);
       dia = new Date().getDay();
       console.log("dia"+dia);
       console.log("id"+uid3);
       console.log("aula"+aula);
       if (aula == "A6103"){
           uid = await this.getIdUsuari();
           uid2 = uid.substr(1);
           uid3 = uid2.substring(0, uid2.length - 1);
           amount = -200
             fetch('http://abuch.ddns.net:3080/api/spend', {
                 method: 'POST',
                 headers: {
                     Accept: 'application/json',
                     'Content-Type': 'application/json',
                 },
                 body: JSON.stringify({
                     id: uid3,
                     amount: amount
                 }),
             }).then((response) => response.json())
               .then(async (responseJson) => {
                 const response = JSON.stringify(responseJson);
                 console.log( response);
                 await this.setState({result: true})

               }).catch((error) => {
                 console.error(error);
               });

       } else {
      return fetch('http://abuch.ddns.net:3080/api/te-classe', {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            id: uid3,
            aula: aula,
            hora: hora,
            diaSetmana: dia
          }),
        }).then((response) => response.json())
          .then(async (responseJson) => {
            const response = JSON.stringify(responseJson);
            console.log( response);
            await this.setState({result: response})

          }).catch((error) => {
            console.error(error);
          });
      }
    }

  getPermissionsAsync = async () => {
    const {
      status
    } = await Permissions.askAsync(Permissions.CAMERA);
    console.log("permission granted")
    this.setState({
      hasCameraPermission: status === 'granted'

    });
  };

  render() {
    const {
      hasCameraPermission,
      scanned
    } = this.state;

    if (hasCameraPermission === null) {
      console.log("no camera permission")
      return <Text> Requesting
      for camera permission </Text>;
    }
    if (hasCameraPermission === false) {
      console.log("no acces for camera");
      return <Text> No access to camera </Text>;
    }

    return (
      <View style={
        {
          width: '100%',
          height: '100%',
          padding: 40,
          backgroundColor: '#262626'
        }}>
        <Text style={{
          marginLeft: 40, fontSize: 30, color: '#6BDD5F',
          position: 'absolute', width: ('100%'), textAlign: 'center', top: '10%'
        }}>
          Escanejar
          </Text>
        <TouchableOpacity
          onPress={() => this.props.navigation.navigate("MainScreen")}
          style={{ width: 30, position: 'absolute', left: '5%', top: '12%' }}>
          <Image
            source={require('../assets/back.png')}
            style={{ height: 20, width: 20, resizeMode: 'contain' }}
          ></Image>
        </TouchableOpacity>
        <View style={
          {
            flex: 1,
            flexDirection: 'column',
            justifyContent: 'flex-end',
          }}>
          <BarCodeScanner onBarCodeScanned={
            scanned ? undefined : this.handleBarCodeScanned
          }
            style={
              StyleSheet.absoluteFillObject
            }
          />
        </View>

        <ConfirmDialog
          visible={this.state.dialogVisible}
          title="El saber no ocupa lloc!"
          animationType="slider"
          onTouchOutside={() => {
            this.setState({ dialogVisible: false })
            this.props.navigation.navigate("MainScreen")

          }}
          positiveButton={{
            title: "OK",
            onPress: () => {
              this.setState({ dialogVisible: false })
              this.props.navigation.navigate("MainScreen")
            }
          }} >

          <View>
            <Text>{this.state.text}</Text>
          </View>
        </ConfirmDialog>
        {
          scanned && (<
            Button title={
              'Tap to Scan Again'
            }
            onPress={
              () => this.setState({
                scanned: false
              })
            }
          />
          )
        }
      </View>
    );
  }




  handleBarCodeScanned = async ({
    type,
    data
  }) => {

    if (type != "256") {
      alert("codi QR no reconegut")
    } else {
      await this.setState({ classe: data })
      await this.sendAulaApi();
      if(this.state.result === "true"){
        await this.setState({text: "MOLT BÉ! El coneixement no ocupa lloc, aquí tens 20 monedes!"})
      } else {
        await this.setState({text: "Ens sap greu, però sembla que no tens classe aquí..."})
      }
      this.setState({ dialogVisible: true });

    }
    this.setState({

      scanned: true
    });

  };
}
