import React, { Component } from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { AccordionList } from "accordion-collapse-react-native";
import { Separator, Icon } from 'native-base';
import { ScrollView } from 'react-native-gesture-handler';


export default class PowerUps extends Component {
    constructor(props) {
        super(props);
        this.state = {
            list: [
                {
                    id: 1,
                    name: 'Brújola',
                    price: 100,
                    description: 'Getting Started',
                    link: require("../assets/powerUps/1.png")
                },
                {
                    id: 2,
                    name: 'Distància',
                    price: 100,
                    description: 'Getting Started',
                    link: require("../assets/powerUps/2.png")
                },
                {
                    id: 3,
                    name: 'Rang Matar',
                    price: 100,
                    description: 'Getting Started',
                    link: require("../assets/powerUps/3.png")
                },
                {
                    id: 4,
                    name: 'Avís',
                    price: 100,
                    description: 'Getting Started',
                    link: require("../assets/powerUps/4.png")
                },
                {
                    id: 5,
                    name: 'Invisibilitat',
                    price: 100,
                    link: require("../assets/powerUps/5.png")
                },
                {
                    id: 6,
                    name: 'Invulnerabilitat',
                    price: 100,
                    description: 'Getting Started',
                    link: require("../assets/powerUps/6.png")
                },
                {
                    id: 7,
                    name: 'Està?',
                    price: 100,
                    description: 'Getting Started',
                    link: require("../assets/powerUps/7.png")
                },
                {
                    id: 8,
                    name: 'Nom',
                    price: 100,
                    description: 'Getting Started',
                    link: require("../assets/powerUps/8.png")
                },
                {
                    id: 9,
                    name: 'Foto',
                    price: 100,
                    description: 'Getting Started',
                    link: require("../assets/powerUps/9.png")
                }
            ],
        }

    }

    _head(item) {
        var link = "../assets/powerUps/" + item.id + ".png";
        return (
            <View style={[{
                backgroundColor: 'white',
                padding: 20,
                borderTopWidth: 0.5,
                borderTopColor: '#DDDDDD',
                flexDirection: 'row',


            }, (item.id == 1) ? { borderTopLeftRadius: 8, borderTopRightRadius: 8 } : {}
                , (item.id == 9) ? { borderBottomLeftRadius: 8, borderBottomRightRadius: 8 } : {}]}>
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
                    300{" "}
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

    _body(item) {
        return (
            <View style={{ padding: 10, backgroundColor: 'white', width: '100%' }}>
                <Text style={{ textAlign: 'center' }}>{item.description}</Text>
                <TouchableOpacity
                    activeOpacity={0.5}
                    style={{ height: 100, width: '100%' }}>
                    <Image
                        style={{ height: '100%', width: '100%' }}
                        resizeMode="contain"
                        source={require('../assets/activarButton.png')}
                    />
                </TouchableOpacity>

            </View>
        );
    }


    render() {
        return (
            <View style={{ width: '100%', height: '100%', paddingTop: '30%', paddingLeft: '5%', paddingRight: '5%', borderRadius: 10, backgroundColor: '#262626' }} >
                <Text style={{
                    marginLeft: '5%', fontSize: 30, color: '#6BDD5F',
                    position: 'absolute', width: '100%', textAlign: 'center', top: '10%'
                }}>
                    Power Ups
                </Text>
                <TouchableOpacity
                    onPress={() => this.props.navigation.goBack()}
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
                            body={this._body}
                        />
                    </ScrollView>

            </View>
        );
    }
}
