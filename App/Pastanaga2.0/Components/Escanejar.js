import * as React from 'react';
import {
  Text,
  View,
  StyleSheet,
  Button
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

  getPermissionsAsync = async() => {
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
      return <Text > Requesting
      for camera permission < /Text>;
    }
    if (hasCameraPermission === false) {
      console.log("no acces for camera");
      return <Text > No access to camera < /Text>;
    }

    return (
      <View style = {
        {
          flex: 1,
          flexDirection: 'column',
          justifyContent: 'flex-end',
        }}>
        <BarCodeScanner onBarCodeScanned = {
          scanned ? undefined : this.handleBarCodeScanned
        }
        style = {
          StyleSheet.absoluteFillObject
        }
        />
        <ConfirmDialog
            visible={this.state.dialogVisible}
            title="El saber no ocupa lloc!"
            animationType="slider"
            onTouchOutside={() => this.setState({dialogVisible: false})}
            positiveButton={{
              title: "OK",
              onPress: () => {this.props.navigation.goBack}
            }} >

            <View>
                <Text>Ara mateix estàs a{this.state.classe}< /Text>
            </View>
        </ConfirmDialog>
        {
          scanned && ( <
            Button title = {
              'Tap to Scan Again'
            }
            onPress = {
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

  comprovaResultat = () => {

  }


  handleBarCodeScanned = ({
    type,
    data
  }) => {
    this.setState({
      scanned: true
    });
    if(type != "256"){
      alert("codi QR no reconegut")
    } else {
      this.comprovaAula
      this.setState({classe: data})
      this.setState({dialogVisible: true})
    }

  };
}
