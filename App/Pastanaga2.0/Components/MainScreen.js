import React, { Component } from 'react';
import { View, Image, TouchableOpacity, Text, ImageBackground, AsyncStorage } from 'react-native';
import { NavigationActions, StackActions } from 'react-navigation';



export default class MainScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    render() {
        return (
            <View style={{ backgroundColor: "#262626", height: '100%' }}>
                <View style={{height:'7.5%'}}></View>
                <TouchableOpacity
                    style={{ width: '100%', height: '25%', marginBottom: '5%' }}
                    onPress={() => this.props.navigation.navigate("Guanyat")}
                >
                    <Image
                        style={{ width: '100%', height:'100%' }}
                        resizeMode="contain"
                        source={require('../assets/Logo.png')}
                    />
                </TouchableOpacity>
                <Text style={{ width: '100%', color: 'white', textAlign: 'center', fontSize:20 }}>Objectiu:</Text>
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
                        onPress={() => this.props.navigation.navigate("Disparar")}
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
                                300{' '}
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
