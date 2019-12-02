import React from "react";
import {
  Image,
  StyleSheet,
  ImageBackground,
  Dimensions,
  StatusBar,
  KeyboardAvoidingView,
  View,
  Alert,
} from "react-native";
import { Icon, EventForm } from "../components";
import { Images } from "../constants";
import { Block, Checkbox, Text, theme } from "galio-framework";

const { width, height } = Dimensions.get("screen");
import {TextInput, Chip, Button} from 'react-native-paper'
import { Colors, Metrics } from '../Themes';

import firestore from '../firebase';
import firebase from 'firebase';

class Register extends React.Component {

  state = {
    title: "",
    location: "",
    startButtonPressed: false,
    startButton: "",
    durationButtonPressed: false,
    durationButton: "",
    inviteButtonPressed: false,
    inviteButton: "",
  }

  handlePost = async() => {
    const {title, location, startButtonPressed, durationButtonPressed, inviteButtonPressed } = this.state;
    if(title === "" || location === "") {
      var titlemsg = title === "" ? "Title" : "";
      var locationmsg = location === "" ? "Location" : "";
      var two = (title === "" && location === "") ? true : false;
      var spacing = two ? ", " : "";
      var result = titlemsg + spacing + locationmsg;
      Alert.alert(
        'You have not filled out the following fields',
        result,
        [
          {text: 'Got It!'},
        ],
        {cancelable: false},
      );
    }
    else if( !startButtonPressed || !durationButtonPressed || !inviteButtonPressed){
      var start = startButtonPressed ? "" : "Start Time";
      var duration = durationButtonPressed ? "" : "Estimated Duration";
      var invite = inviteButtonPressed ? "" : "Invite";
      var result = start + ", " + duration + ", " + invite;
      Alert.alert(
        'You have not selected an entry for the following fields',
        result,
        [
          {text: 'Got It!'},
        ],
        {cancelable: false},
      );
    } else {
      this.props.navigation.navigate('Home');
    }
  };

  saveEvent = async() => {
    this.setState({ savingBookmark: true });

    this.setState({bookmarked: !this.state.bookmarked});
    const { item = {} } = this.props;

    var bookmarkRef = firestore.doc('bookmarkedEvents/' + item.title);
    await bookmarkRef.set(item);

    this.setState({ savingBookmark: false });
  }

  addEvent = () => {

  };

  render() {
    let nowText = "Now";
    let in10Text = "In 10 Minutes";
    let in30Text = "In 30 Minutes";
    let customText = "Custom";
    let text30m = "30 Minutes";
    let text1h = "1 Hour";
    let text2h = "2 Hour";
    let publicText = "Public";
    let friendsText = "Friends Only";

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
              <Chip
               onPress={() => console.log('Pressed')}
               >{nowText}</Chip>

              <Chip
              textStyle= {styles.textTemp}
              style= {styles.temp}
              onPress={() => console.log('Pressed')}
              >{in10Text}</Chip>

              <Chip
              onPress={() => console.log('Pressed')}
              >{in30Text}</Chip>

              <Chip
              onPress={() => console.log('Pressed')}
              >{customText}</Chip>
            </View>
          </View>
          <View style={styles.inputContainer}>
            <Text size={14}>Estimate Duration</Text>
            <View style={styles.chips2}>
              <Chip
              onPress={() => console.log('Pressed')}
              >{text30m}</Chip>
              <Text>  </Text>

              <Chip
              textStyle= {styles.textTemp}
              style= {styles.temp}
              onPress={() => console.log('Pressed')}
              >{text1h}</Chip>
              <Text>  </Text>

              <Chip
              onPress={() => console.log('Pressed')}
              >{text2h}</Chip>
              <Text>  </Text>

              <Chip
              onPress={() => console.log('Pressed')}
              >{customText}</Chip>
            </View>
          </View>
          <View style={styles.inputContainer}>
          <Text size={14} >Invite</Text>
            <View style={styles.chips2}>
              <Chip
              textStyle= {styles.textTemp}
              style= {styles.temp}
              onPress={() => console.log('Pressed')}
              >{publicText}</Chip>
              <Text>  </Text>

              <Chip
              onPress={() => console.log('Pressed')}
              >{friendsText}</Chip>
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
                  this.handlePost();
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
