import React, { Component } from 'react';
import { View, Image, TouchableOpacity, Text, ImageBackground, AsyncStorage } from 'react-native';
import { NavigationActions, StackActions } from 'react-navigation';



export default class MainScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
          objectiu:'',
          id:'',
          monedes:'0',
          disparus:'4',
          disparar: true,
          disparusAvui: 0
        };
        this.getInfoUsuari()

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

        getInfoUsuari = async () => {
        //  this.comprovarDisparus();
          uid = await this.getIdUsuari();
          uid2 = uid.substr(1);
          uid3 = uid2.substring(0, uid2.length - 1);

          console.log("ENTRANT");
            console.log("IDIDIDIDIDIDII   "+uid3)
          fetch(`http://abuch.ddns.net:3080/api/user/${encodeURIComponent(uid3)}`, {
            method: "GET",
            headers: {
              Accept: 'application/json',
            },
          }).then((response) => response.json())
            .then(async (responseJson) => {
              let nameobjectiu = ""
              if(responseJson.objectiu != null){
                const nameobjectiu = JSON.stringify(responseJson.objectiu.name);
              }

              const diners = JSON.stringify(responseJson.monedes);
              console.log("DINERETSSSSSSSSSSSSSSSSSS:" + JSON.stringify(responseJson.monedes));

              //AQUI FALTA IMPLEMENTAR EL CANVI D'ESTAT SEGONS LA RESPOSTA
              await this.setState({objectiu: nameobjectiu})
              await this.setState({monedes: diners})
            }).catch(async (error) => {
              console.error(error);

            });


        }
    async comprovarDisparus(){
        dia = new Date().getDay()
        dia = parseInt(dia)
        diaAhir = await AsyncStorage.getItem("ahir")
        console.log(diaAhir);

        if (diaAhir!= null || dia != diaAhir){
          diaString = dia.toString();
          await AsyncStorage.setItem("ahir", diaString);
          await AsyncStorage.setItem("dispars", 0);
          this.setState({disparusAvui: 0})

          return true
        }else
        {
          disparsAvui = await AsyncStorage.getItem("dispars")
          if( disparsAvui > 4){
            await this.setState({disparar: false})
            return false
          }
          return true
        }
    }
    async handleDispar(){
    disparar = await this.comprovarDisparus();
    if (disparar){
      dis = await AsyncStorage.getItem("dispars")
      dis = dis+1;
      await AsyncStorage.setItem("dispars", dis);
      this.setState({disparusAvui: dis})
      this.props.navigation.navigate("Disparar")
    }else{
      Alert("NO TENS PROUS PASTANAGUES! Torna demà")
    }
    }

    render() {
        let text = ''
        if(this.state.objectiu == ""){
          text = "Ho sentim, no tens cap objectiu a hores d'ara"
        } else{
          text = `El teu objectiu és en/na ${this.state.objectiu}`
        }

        return (
            <View style={{ backgroundColor: "#262626", height: '100%' }}>
                <View style={{height:'7.5%'}}></View>
                <TouchableOpacity
                    style={{ width: '100%', height: '25%', marginBottom: '5%' }}
                    onPress={() => this.getInfoUsuari()
}
                >
                    <Image
                        style={{ width: '100%', height:'100%' }}
                        resizeMode="contain"
                        source={require('../assets/Logo.png')}
                    />
                </TouchableOpacity>
                <Text style={{ width: '100%', color: 'white', textAlign: 'center', fontSize:20 }}>{text}</Text>
                <TouchableOpacity
                    onPress={() => this.props.navigation.navigate("Tutorial")}
                    style={{ height: '12%', width: '100%' }}
                    activeOpacity={0.5}>
                    <Image
                        style={{ width: '90%', height: '100%', marginLeft: '5%' }}
                        resizeMode="contain"
                        source={require('../assets/tutorialButton.png')}
                    />
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => this.props.navigation.navigate("Escanejar")}
                    activeOpacity={0.5}
                    style={{ height: '12%', width: '100%' }}
                >

                    <Image

                        style={{ width: '90%', height: '100%', marginLeft: '5%' }}
                        resizeMode="contain"
                        source={require('../assets/obtenirMonedesButton.png')}
                    />
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => this.props.navigation.navigate("PowerUps")}
                    activeOpacity={0.5}
                    style={{ height: '12%', width: '100%' }}>
                    <Image
                        style={{ width: '90%', height: '100%', marginLeft: '5%' }}
                        resizeMode="contain"
                        source={require('../assets/powerUpsButton.png')}
                    />
                </TouchableOpacity>

                <View
                    style={{ height: '12%', width: '100%', flexDirection: 'row' }}>
                    <TouchableOpacity
                        activeOpacity={0.5}
                        style={{ height: '100%', width: '70%' }}
                        onPress={() => this.handleDispar()}
                    >
                        <Image
                            style={{ height: '100%', width: '100%', marginLeft: '7%' }}
                            resizeMode="contain"
                            source={require('../assets/dispararButton.png')}
                        />
                    </TouchableOpacity>
                    <Text
                        style={{
                            fontSize: 30,
                            width: '20%',
                            height: '100%',
                            textAlign: 'center',
                            textAlignVertical: 'center',
                            color: 'white',
                        }}>
                        0/4
                    </Text>
                </View>
                <View
                    style={{ height: '10%', flexDirection: 'row', alignItems: "center" }}>
                    <View
                        style={{
                            backgroundColor: '#555555',
                            height: '50%',
                            width: '30%',
                            marginLeft: "10%",
                            borderRadius: 4,
                            shadowColor: '#6BDD5F',
                            shadowOffset: { width: 10, height: 10 },
                            shadowOpacity: 0.8,
                            shadowRadius: 10,
                            flexDirection: 'row'
                        }}>
                        <View
                            style={{
                                borderColor: "#6BDD5F",
                                borderWidth: 1,
                                backgroundColor: '#262626',
                                height: '100%',
                                width: '70%',
                                borderRadius: 4
                            }}
                        >
                            <View
                                style={{
                                    height: '100%',
                                    width: '40%',//this.state.levelProgress
                                    backgroundColor: '#6BDD5F',
                                }}
                            />
                        </View>
                        <Text
                            style={{
                                width: '30%',
                                height: '100%',
                                textAlign: 'center',
                                textAlignVertical: 'center',
                                fontSize: 30,
                                color: 'white'
                            }}>3</Text>
                    </View>
                    <View
                        style={{
                            width: '25%',
                            height: '50%',
                            borderWidth: 1,
                            borderColor: 'yellow',
                            borderRadius: 4,
                            alignItems: "center",
                            justifyContent: 'center',
                            marginLeft: '7%',
                        }}
                        source={require('../assets/CoinContainer.png')}
                    >
                        <View
                            style={{
                                flexDirection: 'row',
                                alignItems: "center",
                                justifyContent: 'center',
                            }}>
                            <Text style={{
                                color: 'white',
                                fontSize: 20
                            }}>
                                {this.state.monedes}{' '}
                            </Text>
                            <Image
                                style={{ height: 20, width: 20 }}
                                source={require('../assets/coin.png')}
                            />

                        </View>
                    </View>
                    <TouchableOpacity
                        activeOpacity={0.5}
                        style={{ height: '50%', width: '15%', marginLeft: '2%' }}
                        onPress={() => this.logout()}>

                        <Image
                            style={{ height: '100%', width: '100%', marginLeft: '20%' }}
                            resizeMode="contain"
                            source={require('../assets/Logout.png')}
                        />
                    </TouchableOpacity>
                </View>

            </View>
        );
    }

    logout = () => {
        AsyncStorage.removeItem('access_token');
        const resetAction = StackActions.reset({
            index: 0,
            actions: [NavigationActions.navigate({ routeName: 'Login' })],
        });
        this.props.navigation.dispatch(resetAction);
    }
}
