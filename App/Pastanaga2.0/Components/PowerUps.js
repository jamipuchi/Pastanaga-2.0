import React, { Component } from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { AccordionList } from "accordion-collapse-react-native";
import { Separator, Icon } from 'native-base';


export default class PowerUps extends Component {
    constructor(props) {
        super(props);
        this.state = {
            list: [
                {
                    id: 1,
                    name: 'Getting Started',
                    price: 'Getting Started',
                    description: 'Getting Started',
                    link: require("../assets/powerUps/1.png")
                },
                {
                    id: 2,
                    name: 'Getting Started',
                    price: 'Getting Started',
                    description: 'Getting Started',
                    link: require("../assets/powerUps/2.png")
                },
                {
                    id: 3,
                    name: 'Getting Started',
                    price: 'Getting Started',
                    description: 'Getting Started',
                    link: require("../assets/powerUps/3.png")
                },
                {
                    id: 4,
                    name: 'Getting Started',
                    price: 'Getting Started',
                    description: 'Getting Started',
                    link: require("../assets/powerUps/4.png")
                },
                {
                    id: 5,
                    name: 'Getting Started',
                    price: 'Getting Started',
                    link: require("../assets/powerUps/5.png")
                },
                {
                    id: 6,
                    name: 'Getting Started',
                    price: 'Getting Started',
                    description: 'Getting Started',
                    link: require("../assets/powerUps/6.png")
                },
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
                , (item.id == 6) ? { borderBottomLeftRadius: 8, borderBottomRightRadius: 8 } : {}]}>
                <Image
                    style={{ width: 40, height: 40 }}
                    source={item.link}
                />
                <Text
                    style={{
                        marginLeft: '5%',
                        width: '50%',
                        textAlign: 'left',
                        textAlignVertical: 'center',
                        backgroundColor: 'blue',
                        fontSize: 20,
                        overflow: 'hidden'
                    }}>
                    {item.id}
                </Text>
                <Text
                    style={{
                        width: '15%',
                        textAlign: 'right',
                        textAlignVertical: 'center',
                        backgroundColor: 'red'
                    }}>
                    300
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
                <Text style={{ textAlign: 'center' }}>{item.body}</Text>
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
            <View style={{ width: '100%', height: '100%', paddingTop: '20%', paddingLeft: '5%', paddingRight: '5%', borderRadius: 10, backgroundColor: '#262626' }} >
                <TouchableOpacity
                    style={{ width: 30 }}>
                    <Image
                        source={require('../assets/back.png')}
                        style={{ height: 20, width: 20, resizeMode: 'contain' }}
                    ></Image>
                </TouchableOpacity>
                <Text style={{ fontSize: 30, color: '#6BDD5F' }}>
                    Power Ups
                    </Text>
                <AccordionList
                    style={{ marginTop: 100, width: '90%', marginLeft: '5%', borderRadius: 10 }}
                    list={this.state.list}
                    header={this._head}
                    body={this._body}
                />

            </View>
        );
    }
}
