import React, { Component } from 'react';
import { View, Text } from 'react-native';

export default class Tutorial extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
      <View style={{backgroundColor: '#262626'}}>
        <Text> Tutorial </Text>
      </View>
    );
  }
}
