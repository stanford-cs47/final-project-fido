import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Colors, Metrics } from '../Themes';

export default function MyEvents() {
  return (
    <View style={styles.container}>
      <Text>Events!</Text>
    </View>
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
