import React, { Component } from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';

export default class Nom extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: "Pau Mateu"
        };
    }

    render() {
        return (
            <View style={{ backgroundColor: "#262626", height: '100%', width: '100%', alignContent: "center", alignItems: "center", justifyContent: "center" }}>
                <TouchableOpacity
                    onPress={() => this.props.navigation.goBack()}
                    style={{ width: 30, position: 'absolute', right: '5%', top: '7%' }}>
                    <Image
                        source={require('../../assets/close.png')}
                        style={{ height: 20, width: 20, resizeMode: 'contain' }}
                        rotation={180}
                    ></Image>
                </TouchableOpacity>

                <Text style={{ color: 'white', fontSize: 20 }}> Nom del que has d'eliminar: {this.state.name} </Text>
            </View>
        );
    }
}
