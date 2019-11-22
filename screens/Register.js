import React from "react";
import {
  Image,
  StyleSheet,
  ImageBackground,
  Dimensions,
  StatusBar,
  KeyboardAvoidingView,
  View
} from "react-native";
import { Icon, EventForm } from "../components";
import { Images } from "../constants";
import { Block, Checkbox, Text, theme } from "galio-framework";

const { width, height } = Dimensions.get("screen");
import {TextInput, Chip, Button} from 'react-native-paper'
import { Colors, Metrics } from '../Themes';

class Register extends React.Component {

  render() {
    return (
<<<<<<< HEAD
      <Block>
        <Image source={Images.Park} style={styles.image}/>
        <Block>
=======
      <View style = {styles.mainContainer}>
        <View style = {styles.container}>
          <Image source={Images.Park} style={styles.image}/>
        </View>
        <View style = {styles.container}>
>>>>>>> 17d4c990a6241bc0d1690c34944736fe8915e626
          <TextInput
            label='Title'
            value='Fetch at the Park'
          />
          <TextInput
            label='Location'
            value='Wilbur Field'
          />
          <Text size={14} >Time</Text>
          <View style={styles.chips}>
            <Chip onPress={() => console.log('Pressed')}>Now</Chip>
            <Chip onPress={() => console.log('Pressed')}>In 10 Minutes</Chip>
            <Chip onPress={() => console.log('Pressed')}>In 30 Minutes</Chip>
            <Chip onPress={() => console.log('Pressed')}>In 1 Hour</Chip>
          </View>
          <Text size={14} >Invite</Text>
          <View style={styles.chips}>
            <Chip onPress={() => console.log('Pressed')}>Public</Chip>
            <Chip onPress={() => console.log('Pressed')}>Friends Only</Chip>
          </View>
          <View
            mode="contained"
            compact={true}
            uppercase={false}
            color={Colors.orange}
            labelStyle={styles.buttonText}
            onPress={() => {console.log('Pressed')}}
          >
            Navigate
          </View>
          <View
            mode="contained"
            compact={true}
            uppercase={false}
            color={Colors.orange}
            labelStyle={styles.buttonText}
            onPress={() => {console.log('Pressed')}}
          >
            Cancel
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  mainContainer: {
    flex:1,
    flexDirection: "column",
    justifyContent: "flex-start",
    padding: 10,
  },
  container: {
    justifyContent: "space-around",
    padding: 10,
  },
  chips: {
    flexDirection: "row",
    justifyContent: "space-around"
  },
  image: {
    width: width,
    resizeMode: 'contain',
    marginTop: -120
  },
  inputContainerStyle: {
    margin: 8,
  },
  buttons: {
    flexDirection: "row"
  }
});

export default Register;
