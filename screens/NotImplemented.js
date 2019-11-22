import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Colors, Metrics } from '../Themes';

export default function NotImplemented() {
  return (
    <View style={styles.container}>
      <Text>Not implemented yet! Sorry :(</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    fontSize: 50,
    color: Colors.orange,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
