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
    newEvent: {
      title: '',
      description: 'Lucky + 4 others      Public      0.3 mi',
      location1: '',
      location2: 'Stanford, CA 94305',
      time1: '',
      time2: '',
      image: 'https://images.unsplash.com/photo-1487222477894-8943e31ef7b2?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1326&q=80',
      horizontal: true,
      bookmarked: false,
    }
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
      this.saveEvent();
      this.props.navigation.navigate('Home');
    }
  };

  saveEvent = async() => {
    var newEvent = {...this.state.newEvent}
    newEvent.title = this.state.title;
    newEvent.location1 = this.state.location;
    newEvent.time1 = this.state.startButton;
    newEvent.time2 = this.state.durationButton;
    newEvent.description = 'Lucky + 4 others      '+ this.state.inviteButton+ '      0.3 mi';

    const item = newEvent;

    console.log(item);
    // var allEventsRef = firestore.doc('allEvents/' + item.title);
    // var myEventRef = firestore.doc('myEvent/' + item.title);
    // await allEventsRef.set(item);
    // await myEventRef.set(item);

  }
  //{ text: 'Yes', onPress: () => this.props.navigation.goBack() },
  //{ text: "Continue making my event" },

  render() {
    let nowText = "Now";
    let in10Text = "In 10 Minutes";
    let in30Text = "In 30 Minutes";
    let customTextStart = "Custom";
    let text30m = "30 Minutes";
    let text1h = "1 Hour";
    let text2h = "2 Hour";
    let customTextDuration = "Custom";
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
              value={this.state.title}
              onChangeText={(text) => this.setState({title: text})}
            />
          </View>
          <View style={styles.inputContainer}>
            <TextInput
              label='Location'
              value={this.state.location}
              onChangeText={(text) => this.setState({location: text})}
            />
          </View>
          <View style={styles.inputContainer}>
            <Text size={14}>Start Time</Text>
            <View style={styles.chips}>
              <Chip
              textStyle= {this.state.startButton === nowText ? styles.selectedText : null}
              style= {this.state.startButton === nowText ? styles.selected : null}
              onPress={() => this.state.startButton === nowText ?
                  this.setState({startButton: "", startButtonPressed: false}) :
                  this.setState({startButton: nowText, startButtonPressed: true})
                }
               >{nowText}</Chip>

              <Chip
              textStyle= {this.state.startButton === in10Text ? styles.selectedText : null}
              style= {this.state.startButton === in10Text ? styles.selected : null}
              onPress={() => this.state.startButton === in10Text ?
                  this.setState({startButton: "", startButtonPressed: false}) :
                  this.setState({startButton: in10Text, startButtonPressed: true})
                }
              >{in10Text}</Chip>

              <Chip
              textStyle= {this.state.startButton === in30Text ? styles.selectedText : null}
              style= {this.state.startButton === in30Text ? styles.selected : null}
              onPress={() => this.state.startButton === in30Text ?
                  this.setState({startButton: "", startButtonPressed: false}) :
                  this.setState({startButton: in30Text, startButtonPressed: true})
                }
              >{in30Text}</Chip>

              <Chip
              textStyle= {this.state.startButton === customTextStart ? styles.selectedText : null}
              style= {this.state.startButton === customTextStart ? styles.selected : null}
              onPress={() => this.state.startButton === customTextStart ?
                  this.setState({startButton: "", startButtonPressed: false}) :
                  this.setState({startButton: customTextStart, startButtonPressed: true})
                }
              >{customTextStart}</Chip>
            </View>
          </View>
          <View style={styles.inputContainer}>
            <Text size={14}>Estimate Duration</Text>
            <View style={styles.chips2}>
              <Chip
              textStyle= {this.state.durationButton === text30m ? styles.selectedText : null}
              style= {this.state.durationButton === text30m ? styles.selected : null}
              onPress={() => this.state.durationButton === text30m ?
                  this.setState({durationButton: "", durationButtonPressed: false}) :
                  this.setState({durationButton: text30m, durationButtonPressed: true})
                }
              >{text30m}</Chip>
              <Text>  </Text>

              <Chip
              textStyle= {this.state.durationButton === text1h ? styles.selectedText : null}
              style= {this.state.durationButton === text1h ? styles.selected : null}
              onPress={() => this.state.durationButton === text1h ?
                  this.setState({durationButton: "", durationButtonPressed: false}) :
                  this.setState({durationButton: text1h, durationButtonPressed: true})
                }
              >{text1h}</Chip>
              <Text>  </Text>

              <Chip
              textStyle= {this.state.durationButton === text2h ? styles.selectedText : null}
              style= {this.state.durationButton === text2h ? styles.selected : null}
              onPress={() => this.state.durationButton === text2h ?
                  this.setState({durationButton: "", durationButtonPressed: false}) :
                  this.setState({durationButton: text2h, durationButtonPressed: true})
                }
              >{text2h}</Chip>
              <Text>  </Text>

              <Chip
              textStyle= {this.state.durationButton === customTextDuration ? styles.selectedText : null}
              style= {this.state.durationButton === customTextDuration ? styles.selected : null}
              onPress={() => this.state.durationButton === customTextDuration ?
                  this.setState({durationButton: "", durationButtonPressed: false}) :
                  this.setState({durationButton: customTextDuration, durationButtonPressed: true})
                }
              >{customTextDuration}</Chip>
            </View>
          </View>
          <View style={styles.inputContainer}>
          <Text size={14} >Invite</Text>
            <View style={styles.chips2}>
              <Chip
              textStyle= {this.state.inviteButton === publicText ? styles.selectedText : null}
              style= {this.state.inviteButton === publicText ? styles.selected : null}
              onPress={() => this.state.inviteButton === publicText ?
                  this.setState({inviteButton: "", inviteButtonPressed: false}) :
                  this.setState({inviteButton: publicText, inviteButtonPressed: true})
                }
              >{publicText}</Chip>
              <Text>  </Text>

              <Chip
              textStyle= {this.state.inviteButton === friendsText ? styles.selectedText : null}
              style= {this.state.inviteButton === friendsText ? styles.selected : null}
              onPress={() => this.state.inviteButton === friendsText ?
                  this.setState({inviteButton: "", inviteButtonPressed: false}) :
                  this.setState({inviteButton: friendsText, inviteButtonPressed: true})
                }
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
                onPress={() => {
                  Alert.alert(
                    'Are you sure you want to go back and lose you event?',
                    '',
                    [
                      { text: 'Yes', onPress: () => this.props.navigation.goBack() },
                      { text: "No" },
                    ],
                    {cancelable: false},
                  );
                  }
                }
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
  selected:{
    backgroundColor: Colors.orange,
    color: "#FFFFFF"
  },
  selectedText:{
    color: "#FFFFFF"
  },
  notSelected: {

  },

});

export default Register;
