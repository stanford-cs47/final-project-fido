import React from 'react';
import { EventCard, Person } from '../components'
import articles from '../constants/articles';
import people from '../constants/people';
import { StyleSheet, Text, View, ScrollView, Dimensions, Image } from 'react-native';
import { Colors, Metrics } from '../Themes';
import { List, Checkbox } from 'react-native-paper';
import fidoTheme from "../constants/Theme";
import { Block, theme } from 'galio-framework';
import { Card, Title, Subheading, Paragraph, Button, Avatar, TextInput } from 'react-native-paper';
import { Images } from '../constants/';
import Icon from '../components/Icon';
const { width } = Dimensions.get('screen');

import firestore from '../firebase';
import firebase from 'firebase';


// TEMPORARY VARIABLES
var TEMP_ITEM = articles[3];

var sampleMessage = {
  image: 'https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/adorable-cavalier-king-charles-spaniel-puppy-royalty-free-image-523255012-1565106446.jpg?crop=0.448xw:1.00xh;0.370xw,0&resize=480:*',
  name: "Are you guys still there? I'm omw!",
  icon: false,
}

// MyEvents Page
class MyEvents extends React.Component {

  state = {
    unsubscribe: false,
    myEvent: [],
    myEventExistsTest: false,
  }

  componentDidMount() {
    let myEventsRef = firestore.collection('myEvent/');

    let unsubscribe = myEventsRef.onSnapshot(() => {
      this.reloadEvent();
    });
    this.setState({ unsubscribe });

    this.reloadEvent(); // Initial loading of page
  };

  componentWillUnmount() {
    this.state.unsubscribe();
  };

  reloadEvent = async () => {
    try {
      const test = await this.getMyEvent();

      this.setState({myEvent: test, myEventExistsTest: true});
    } catch (err) {
      console.log(err);
    }
  }

  deleteEvent = async () => {
    try {
      let item = this.state.myEvent;

      var allEventsRef = firestore.doc('allEvents/' + item.title);
      var myEventRef = firestore.doc('myEvent/' + item.title);
      await allEventsRef.delete();
      await myEventRef.delete();

    } catch (err) {
      console.log(err);
    }
  }

  getMyEvent = async() => {
    try {
      let myEvent = [];
      let myEventRef = firestore.collection('myEvent/');
      let all = await myEventRef.get();
      all.forEach((eve) => {
        myEvent.push(eve.data());
      });
      return (myEvent ? myEvent : []);
    } catch (error) {
      console.log(error);
    }
    return ([]);
  }

  renderPeople = () => {
    return (
      <ScrollView
       showsVerticalScrollIndicator={false}
       contentContainerStyle={styles.articles}>
        <List.Section>
          <Person person={people[0]} />
          <Person person={people[1]} />
          <Person person={people[2]} />
          <Person person={people[3]} />
        </List.Section>
      </ScrollView>
    );
  }

  render() {
    console.log("this.state.myEvent: ");
    console.log(this.state.myEvent[0]);
    if (this.state.myEvent[0] === undefined) {
      return (
        <View flex style={{justifyContent: 'center', alignItems: 'center', tintColor: Colors.orange}}>
        <Text> You have not created an event yet! </Text>
        </View>
      )
    } else {
    return (
      <View flex style={styles.main}>

        <View style={{height: 230, padding: 10}}>
          <Text style={styles.header}>Event Information</Text>
          <EventCard item={this.state.myEvent[0]} type={"my_event"}/>
        </View>

        <View style={styles.section1}>
          <Text style={styles.header}>Message Board</Text>
          <Person person={sampleMessage} />
          <View style={styles.inputContainer}>
            <Text>Reply</Text>
            <TextInput
              placeholder='Aa'
              dense={true}
              style={styles.input}
            />
           </View>
        </View>
        <View style={styles.section2}>
          <Text style={styles.header}>Attending</Text>
          {this.renderPeople()}
        </View>
      </View>
    );
  }
  }
}

const styles = StyleSheet.create({
  main: {
    justifyContent: 'center',
  },
  section1: {
    borderColor: fidoTheme.COLORS.BORDER,
    borderBottomWidth: 1,
    padding: 10,
    height: 200
  },
  section2: {
    borderColor: fidoTheme.COLORS.BORDER,
    borderBottomWidth: 1,
    padding: 10,
  },
  header: {
    fontSize: 16,
    padding: 10,
  },
  articles: {
    width: width - theme.SIZES.BASE,
  },
  inputContainer: {
    margin: 12,
  },
  input: {
    marginTop: 5
  },
});

export default MyEvents;
