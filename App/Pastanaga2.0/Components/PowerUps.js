import React, { Component } from 'react';
import { View, Text, Image, TouchableOpacity, ImageBackground, Alert, AsyncStorage } from 'react-native';
import { AccordionList } from "accordion-collapse-react-native";
import { Separator, Icon } from 'native-base';
import { ScrollView } from 'react-native-gesture-handler';
import { hasStartedLocationUpdatesAsync } from 'expo-location';


export default class PowerUps extends Component {
    constructor(props) {
        super(props);
        this.state = {
            list: [
                {
                    id: 1,
                    name: 'Brújola',
                    price: 100,
                    description: 'T`indica cap a quina direcció està el teu objectiu en el cas que estigui dintre el recinte de joc durant una hora.',
                    link: require("../assets/powerUps/1.png"),
                    pantalla: "Brujola",
                },
                {
                    id: 2,
                    name: 'Distància',
                    price: 100,
                    description: 'T`indica La distància que hi ha entre tu i el teu objectiu durant 1 hora.',
                    link: require("../assets/powerUps/2.png"),
                    pantalla: "Distancia",
                },
                {
                    id: 3,
                    name: 'Rang Matar',
                    price: 100,
                    description: 'Augmenta el teu rang d\'ús del botó disparar durant 24 hores.',
                    link: require("../assets/powerUps/3.png"),
                    pantalla: "Rang"
                },
                {
                    id: 4,
                    name: 'Avís',
                    price: 100,
                    description: 'El següent cop que el teu assassí estigui en rang de matar-te t`avisarà',
                    link: require("../assets/powerUps/4.png")
                },
                {
                    id: 5,
                    name: 'Invisibilitat',
                    description: 'El teu assassí no podrà utilitzar els power ups per saber on estàs',
                    price: 100,
                    link: require("../assets/powerUps/5.png")
                },
                {
                    id: 6,
                    name: 'Invulnerabilitat',
                    price: 100,
                    description: 'El teu assassí no et podrà matar durant 1h',
                    link: require("../assets/powerUps/6.png")
                },
                {
                    id: 7,
                    name: 'Està?',
                    price: 100,
                    description: 'Getting Started',
                    link: require("../assets/powerUps/7.png"),
                    pantalla: "Esta"

                },
                {
                    id: 8,
                    name: 'Nom',
                    price: 10,
                    description: 'T`indica si el teu objectiu està dintre el recinte del joc.',
                    link: require("../assets/powerUps/8.png"),
                    pantalla: "Nom"
                },
                {
                    id: 9,
                    name: 'Foto',
                    price: 100,
                    description: 'T`ensenya la foto del teu objectiu perquè sàpigues qui has de disparar',
                    link: require("../assets/powerUps/9.png"),
                    pantalla: "Foto"

                }
            ],
            monedes:0

        }

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
      fetch(`http://abuch.ddns.net:3080/api/user/${encodeURIComponent(uid3)}`, {
        method: "GET",
        headers: {
          Accept: 'application/json',
        },
      }).then((response) => response.json())
        .then(async (responseJson) => {
          const diners = JSON.stringify(responseJson.monedes);
          console.log(diners);
          await this.setState({monedes: diners})
        }).catch(async (error) => {
          console.error(error)
        });


    }

    componentDidMount(){
        console.log(this.state.monedes);
        this.getInfoUsuari();
    }

    async gasta(diners, pantalla) {
      uid = await this.getIdUsuari();
      uid2 = uid.substr(1);
      uid3 = uid2.substring(0, uid2.length - 1);
        fetch('http://abuch.ddns.net:3080/api/spend', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                id: uid3,
                amount: diners
            }),
        })
            .then(res => res.json())
            .then(
                (result) => {
                    this.componentDidMount();
                    this.props.navigation.navigate(pantalla)
                },
                (error) => {
                    console.log(error)
                }
            )
    }

    _head(item) {
        return (
            <View style={[{
                backgroundColor: 'white',
                padding: 20,
                borderTopWidth: 0.5,
                borderTopColor: '#DDDDDD',
                flexDirection: 'row',


            }, (item.id == 1) ? { borderTopLeftRadius: 8, borderTopRightRadius: 8 } : {}
                , (item.id == 9) ? {
                    borderBottomLeftRadius: 8, borderBottomRightRadius: 8
                } : {}]}>
                <Image
                    style={{ width: 40, height: 40, resizeMode: 'contain' }}
                    source={item.link}
                />
                <Text
                    style={{
                        marginLeft: '5%',
                        width: '50%',
                        textAlign: 'left',
                        textAlignVertical: 'center',
                        fontSize: 20,
                        overflow: 'hidden'
                    }}>
                    {item.name}
                </Text>
                <Text
                    style={{
                        width: '15%',
                        textAlign: 'right',
                        textAlignVertical: 'center',
                        fontSize: 15
                    }}>
                    {item.price + " "}
                </Text>
                <Image
                    style={{ height: 20, width: 20, marginTop: 10 }}
                    source={require('../assets/coin.png')}
                />
                <Image
                    style={{ height: 20, width: 20, marginTop: 10, resizeMode: 'contain', marginLeft: '5%' }}
                    source={require('../assets/Dropdown.png')}
                />

            </View>

        );
    }

    async onPress(item){
      await this.gasta(item.price, item.pantalla)
      await this.componentDidMount()
    }
    _body(item) {
        return (
            <View style={[{ padding: 10, backgroundColor: 'white', width: '100%' },
            (item.id == 9) ? {
                borderBottomLeftRadius: 8, borderBottomRightRadius: 8,
                marginTop: -10, paddingTop: 10
            } : {}
            ]
            }>
                <Text style={{ textAlign: 'center' }}>{item.description}</Text>

                {(this.state.monedes-item.price>=0) ? //condició que diu si ja el tens comprat o no
                    <TouchableOpacity
                        onPress={() => Alert.alert(
                            'Compra',
                            'Et vols gastar ' + item.price + ' dels ' + this.state.monedes+ ' que tens?',
                            [
                                { text: 'No' },
                                { text: 'Si', onPress: () => this.onPress(item) },
                            ],
                            { cancelable: false },
                        )

                        }
                        activeOpacity={0.5}
                        style={{ height: 100, width: '100%' }}>
                        <Image
                            style={{ height: '100%', width: '100%' }}
                            resizeMode="contain"
                            source={require('../assets/activarButton.png')}
                        />
                    </TouchableOpacity>

                    :
                    <Text style={{ width: '100%', textAlign: 'center', fontSize: 20, color: 'red' }}>No tens prous diners</Text>
                }
            </View>
        );
    }


    render() {
        return (
            <View style={{ width: '100%', height: '112%', paddingTop: '30%', paddingLeft: '5%', paddingRight: '5%', backgroundColor: '#262626' }} >
                <Text style={{
                    marginLeft: '5%', fontSize: 30, color: '#6BDD5F',
                    position: 'absolute', width: '100%', textAlign: 'center', top: '10%'
                }}>
                    Power Ups
                </Text>
                <TouchableOpacity
                    onPress={() => this.props.navigation.navigate("MainScreen")}
                    style={{ width: 30, position: 'absolute', left: '5%', top: '12%' }}>
                    <Image
                        source={require('../assets/back.png')}
                        style={{ height: 20, width: 20, resizeMode: 'contain' }}
                    ></Image>
                </TouchableOpacity>
                <ScrollView >
                    <AccordionList
                        style={{ width: '90%', marginLeft: '5%', borderRadius: 10 }}
                        list={this.state.list}
                        header={this._head}
                        body={this._body.bind(this)}
                    />
                </ScrollView>

            </View>
        );
    }
}
