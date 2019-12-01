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

  state = {
    title: "",
    location: "",
  }

  addEvent = () => {
    let eventsCopy = JSON.parse(JSON.stringify(this.state.events));
    eventsCopy.push({
      title: this.state.title,
      location: this.state.location,
    });
    this.props.db.get('events').then(function(doc) {
      return db.put({
        _id: 'events',
        _rev: doc._rev,
        contacts: eventsCopy,
      });
    }).then(function(response) {
      console.log("added event");
    }).catch(function (err) {
      console.log(err);
    });
  };

  render() {
    return (
      <View>
        <Image source={Images.Park} style={styles.image}/>
        <View style={styles.mainContainer}>
          <Text size={18}>New Event</Text>
          <View style={styles.inputContainer}>
            <TextInput
              label='Title'
              //value='Fetch at the Park'
              value={this.state.title}
              onChangeText={(text) => this.setState({title: text})}
            />
          </View>
          <View style={styles.inputContainer}>
            <TextInput
              label='Location'
              //value='Wilbur Field'
              value={this.state.location}
              onChangeText={(text) => this.setState({location: text})}
            />
          </View>
          <View style={styles.inputContainer}>
            <Text size={14}>Start Time</Text>
            <View style={styles.chips}>
              <Chip onPress={() => console.log('Pressed')}  >Now</Chip>
              <Chip textStyle= {styles.textTemp} style= {styles.temp} onPress={() => console.log('Pressed')}>In 10 Minutes</Chip>
              <Chip onPress={() => console.log('Pressed')}>In 30 Minutes</Chip>
              <Chip onPress={() => console.log('Pressed')}>Custom</Chip>
            </View>
          </View>
          <View style={styles.inputContainer}>
            <Text size={14}>Estimate Duration</Text>
            <View style={styles.chips2}>
              <Chip onPress={() => console.log('Pressed')}  >30 Minutes</Chip>
              <Text>  </Text>
              <Chip textStyle= {styles.textTemp} style= {styles.temp} onPress={() => console.log('Pressed')}>1 Hour</Chip>
              <Text>  </Text>
              <Chip onPress={() => console.log('Pressed')}>2 Hours</Chip>
              <Text>  </Text>
              <Chip onPress={() => console.log('Pressed')}>Custom</Chip>
            </View>
          </View>
          <View style={styles.inputContainer}>
          <Text size={14} >Invite</Text>
            <View style={styles.chips2}>
              <Chip textStyle= {styles.textTemp} style= {styles.temp}  onPress={() => console.log('Pressed')}>Public</Chip>
              <Text>  </Text>
              <Chip onPress={() => console.log('Pressed')}>Friends Only</Chip>
            </View>
          </View>
          <View style={styles.buttonContainer}>
            <View style={styles.buttons}>
              <Button
                mode="outlined"
                style={{ width: 130 }}
                compact={false}
                uppercase={false}
                color={Colors.orange}
                onPress={() => this.props.navigation.goBack()}
              >
                Cancel
              </Button>
              <Button
                mode="contained"
                style={{ width: 230 }}
                compact={false}
                uppercase={false}
                color={Colors.orange}
                labelStyle={styles.buttonText}
                onPress={() => {
                  this.addEvent();
                  this.props.navigation.navigate('Home')
                }}
              >
                Post
              </Button>
            </View>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  mainContainer: {
    padding: 10,
    marginTop: -50
  },
  container: {
    justifyContent: "space-around",
    padding: 10,
  },
  chips: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 5,
  },
  chips2: {
    flexDirection: "row",
    marginTop: 5,
  },
  image: {
    width: width,
    resizeMode: 'contain',
    marginTop: -120
  },
  inputContainer: {
    margin: 8,
  },
  buttonContainer: {
    justifyContent: "flex-end",
    marginTop: 80
  },
  buttonText: {
    color: "white"
  },
  buttons: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 40,
  },
  temp:{
    backgroundColor: Colors.orange,
    color: "#FFFFFF"
  },
  textTemp:{
    color: "#FFFFFF"
  }
});

export default Register;
