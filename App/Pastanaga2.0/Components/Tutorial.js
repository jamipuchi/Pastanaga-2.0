import React, { Component } from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';

const tutorial = [{
    descripcio: "Aquest joc consisteix a eliminar els altres usuaris. Un cop estiguis a prop del teu objectiu pots apretar el botó de disparar per eliminar-lo. Però al tanto, només pots disparar un nombre limitat de cops. Si l'exedeixes quedaràs eliminat.",
    src: require("../assets/tutorial/1.png")
}, {
    descripcio: "Pots aconseguir crèdits escanejant els codis QR que trobaràs al campus. Com a més classes vagis més diners podràs aconseguir!",
    src: require("../assets/tutorial/2.png")
}, {
    descripcio: "Pots fer servir aquests crèdits per comprar power ups que et poden ajudar a trobar el teu objectiu o protegir-te del teu assassí.",
    src: require("../assets/tutorial/3.png")
},]

export default class Tutorial extends Component {
    constructor(props) {
        super(props);
        this.state = {
            num: 0
        };
    }

    _incrementCount = () => {
        this.setState(prevState => ({ num: prevState.num + 1 }));
    }

    _decreaseCount = () => {
        this.setState(prevState => ({ num: prevState.num - 1 }));
    }

    render() {
        return (
            <View style={{
                backgroundColor: '#262626',
                width: '100%',
                height: '100%',
                alignItems: 'center',
                justifyContent: 'center',
            }}>
                <TouchableOpacity
                    onPress={() => this.props.navigation.goBack()}
                    style={{ width: 30, position: 'absolute', right: '5%', top: '7%' }}>
                    <Image
                        source={require('../assets/close.png')}
                        style={{ height: 20, width: 20, resizeMode: 'contain' }}
                        rotation={180}
                    ></Image>
                </TouchableOpacity>
                <Image style={{ width: "80%", resizeMode: 'contain', height: "30%" }} source={tutorial[this.state.num].src} />
                <Text
                    style={{
                        color: 'white',
                        paddingLeft: '5%',
                        paddingRight: '5%',
                        textAlign: "center",
                        fontSize: 20
                    }}>
                    {tutorial[this.state.num].descripcio}
                </Text>
                {(this.state.num != 0) ?
                    <TouchableOpacity
                        onPress={this._decreaseCount}
                        style={{ width: 30, position: 'absolute', left: '5%', bottom: '5%' }}>
                        <Image
                            source={require('../assets/back.png')}
                            style={{ height: 20, width: 20, resizeMode: 'contain' }}
                        ></Image>
                    </TouchableOpacity>

                    : <View />
                }

                {(this.state.num != 2) ?

                    < TouchableOpacity
                        onPress={this._incrementCount}
                        style={{ width: 30, position: 'absolute', right: '5%', bottom: '5%' }}>
                        <Image
                            source={require('../assets/back.png')}
                            style={{ height: 20, width: 20, resizeMode: 'contain', rotation: 180 }}
                        ></Image>
                    </TouchableOpacity> :
                    (<View />)
                }

            </View >
        );
    }
}
