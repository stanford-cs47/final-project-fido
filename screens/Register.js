import React from "react";
import {
  Image,
  StyleSheet,
  ImageBackground,
  Dimensions,
  StatusBar,
  KeyboardAvoidingView
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
      <Block>
        <Image source={Images.Park} style={styles.image}/>
        <Block>
          <TextInput
            label='Title'
            value='Fetch at the Park'
          />
          <TextInput
            label='Location'
            value='Wilbur Field'
          />
          <Text size={14} >Time</Text>
          <Block style={styles.chips}>
            <Chip onPress={() => console.log('Pressed')}>Now</Chip>
            <Chip onPress={() => console.log('Pressed')}>In 10 Minutes</Chip>
            <Chip onPress={() => console.log('Pressed')}>In 30 Minutes</Chip>
            <Chip onPress={() => console.log('Pressed')}>In 1 Hour</Chip>
          </Block>
          <Text size={14} >Invite</Text>
          <Block style={styles.chips}>
            <Chip onPress={() => console.log('Pressed')}>Public</Chip>
            <Chip onPress={() => console.log('Pressed')}>Friends Only</Chip>
          </Block>
          <Button
            mode="contained"
            compact={true}
            uppercase={false}
            color={Colors.orange}
            labelStyle={styles.buttonText}
            onPress={() => {console.log('Pressed')}}
          >
            Navigate
          </Button>
          <Button
            mode="contained"
            compact={true}
            uppercase={false}
            color={Colors.orange}
            labelStyle={styles.buttonText}
            onPress={() => {console.log('Pressed')}}
          >
            Cancel
          </Button>
        </Block>
      </Block>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    alignItems: "flex-start",
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
