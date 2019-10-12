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
    dialogVisible: false
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
   console.log(hora);
   dia = new Date().getDay();
   console.log(dia);
   console.log(uid3);
   console.log(aula);
   url =
    `http://abuch.ddns.net:3080/api/te-classe?` +
    `id=${encodeURIComponent(uid3)}`+
    `&aula=${encodeURIComponent(aula)}`+
    `&hora=${encodeURIComponent(hora)}`+
    `&dia_setmana=${encodeURIComponent(dia)}`

    fetch(url, {
        method: "GET",
        headers: {
            'Content-Type': 'application/json',
        }
      }).then(async(responseJson) => {
          console.log("response json: " + responseJson);
          const jsonresp = JSON.stringify(responseJson);
          console.log(jsonresp)
      }).catch((error) => {
          console.error(error);
      });


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
            <Text>Ara mateix estàs a {this.state.classe}</Text>
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
      this.setState({ classe: data })
      await this.sendAulaApi();
      this.setState({ dialogVisible: true });

    }
    this.setState({

      scanned: true
    });

  };
}
