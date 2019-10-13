import React, { Component } from 'react';
import { View, Text } from 'react-native';
import LottieView from 'lottie-react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

export default class Guanyat extends Component {

    render() {
        return <TouchableOpacity style={{ height: '100%', width: '100%' }}
            onPress={() => this.props.navigation.navigate("MainLoader")}
        >
            <View style={{ height: '100%', width: '100%', backgroundColor: "#262626" }}>
                <Text style={{ fontWeight: "bold", marginTop: 80, width: '100%', textAlign: 'center', color: 'white', fontSize: 50 }}> HAS GUANYAT! </Text>
                <LottieView source={require('../assets/data.json')} autoPlay loop />
                <Text style={{ marginTop: 10, width: '100%', textAlign: 'center', color: 'white', fontSize: 20, padding: 10 }}> Ara t'hauràs d'esperar a la següent ronda per seguir jugant</Text>
            </View>
        </TouchableOpacity>;
    }

}