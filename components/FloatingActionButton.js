import { StyleSheet, View, Image, TouchableOpacity, Alert} from 'react-native';
import React from "react";
import { Colors, Metrics } from '../Themes'
import { Entypo } from '@expo/vector-icons';
import { Images } from '../constants/'


//{uri : 'https://reactnativecode.com/wp-content/uploads/2017/11/Floating_Button.png'}
class FloatingActionButton extends React.Component {
  SampleFunction=()=>{
      Alert.alert("Plus Button Clicked");
  }

  render() {
    return (
      <View style={styles.MainContainer}>
        <TouchableOpacity activeOpacity={0.5} onPress={this.SampleFunction} style={styles.TouchableOpacityStyle} >
        <Image source = {{uri : 'https://reactnativecode.com/wp-content/uploads/2017/11/Floating_Button.png'}}
               style={styles.FloatingButtonStyle} />
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  MainContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor : '#F5F5F5'
  },

  TouchableOpacityStyle:{
    position: 'absolute',
    width: 50,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    right: 30,
    bottom: 30,
  },

  FloatingButtonStyle: {
    resizeMode: 'contain',
    width: 50,
    height: 50,
  },

  PlusStyle: {
    width: 50,
    height: 50,
    color: "#FFFFFF",
    position: "relative"
  }
});

export default FloatingActionButton;
