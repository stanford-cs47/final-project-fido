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

// Expanded Event Page
class ExpandedEvent extends React.Component {

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
    let passedInArticle= this.props.navigation.getParam('item', null);
    let bookmarked= this.props.navigation.getParam('book', null);
    return (
      <View flex style={styles.main}>
        <View style={{height: 230, padding: 10}}>
          <Text style={styles.header}>Event Information</Text>
          <EventCard item={passedInArticle} type={"event"} book ={bookmarked}/>
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

export default ExpandedEvent;
