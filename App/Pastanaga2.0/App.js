import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Login from './Login';
import MainScreen from './Components/MainScreen';

export default function App() {
  return (
    <MainScreen />
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
