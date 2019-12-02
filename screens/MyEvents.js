import React from 'react';
import { EventCard, Person } from '../components'
import articles from '../constants/articles';
import { StyleSheet, Text, View, ScrollView, Dimensions, Image } from 'react-native';
import { Colors, Metrics } from '../Themes';
import { List, Checkbox } from 'react-native-paper';
import fidoTheme from "../constants/Theme";
import { Block, theme } from 'galio-framework';
import { Card, Title, Subheading, Paragraph, Button, Avatar, TextInput } from 'react-native-paper';
import { Images } from '../constants/';
import Icon from '../components/Icon';
const { width } = Dimensions.get('screen');


// TEMPORARY VARIABLES
var TEMP_ITEM = articles[5];
var Jack = {
  image: 'https://images.unsplash.com/photo-1487222477894-8943e31ef7b2?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1326&q=80',
  name: 'Jack Nichols',
  icon: true,
};

var sampleMessage = {
  image: 'https://images.unsplash.com/photo-1500522144261-ea64433bbe27?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2102&q=80',
  name: "Are you guys still there? I'm omw!",
  icon: false,
}

// MyEvents Page
class MyEvents extends React.Component {

  deleteEvent = async () => {
    this.setState({ savingBookmark: true });

    this.setState({bookmarked: !this.state.bookmarked});
    const { item = {} } = this.props;

    var allEventsRef = firestore.doc('allEvents/' + item.title);
    var myEventsRef = firestore.doc('myEvents/' + item.title);
    await bookmarkRef.delete();

    this.setState({ savingBookmark: false });
  }

  getMyEvent = async() => {
    try {
      let myEventRef = firestore.collection('myEvent/');
      let myEvent = await myEventRef.get();


      return (myEvent ? myEvent : null);
    } catch (error) {
      console.log(error);
    }
    return (null);
  }

  renderPeople = () => {
    return (
      <ScrollView
       showsVerticalScrollIndicator={false}
       contentContainerStyle={styles.articles}>
        <List.Section>
          <Person person={Jack} />
          <Person person={Jack} />
          <Person person={Jack} />
          <Person person={Jack} />
        </List.Section>
      </ScrollView>
    );
  }

  render() {
    return (
      <View flex style={styles.main}>
        <View style={{height: 230, padding: 10}}>
          <Text style={styles.header}>Event Information</Text>
          <EventCard item={TEMP_ITEM} type={"my_event"}/>
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
          <Text style={styles.header}>Bookmarked By</Text>
          {this.renderPeople()}
        </View>
      </View>
    );
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
