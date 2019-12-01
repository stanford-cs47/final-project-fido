import React from 'react';
import { BookmarkCard } from '../components'
import articles from '../constants/articles';
import { StyleSheet, Text, View, ScrollView, Dimensions, Image } from 'react-native';
import { Colors, Metrics } from '../Themes';
import { List, Checkbox } from 'react-native-paper';
import { FloatingActionButton, ListItem, EventCard } from '../components';
import fidoTheme from "../constants/Theme";
import { Block, theme } from 'galio-framework';
import { Card, Title, Subheading, Paragraph, Button, Avatar, TextInput } from 'react-native-paper';
import { Images } from '../constants/';
import Icon from '../components/Icon';
const { width } = Dimensions.get('screen');


// TEMPORARY VARIABLES
var TEMP_ITEM = articles[0];
var Jack = {
  image: 'https://images.unsplash.com/photo-1487222477894-8943e31ef7b2?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1326&q=80',
  name: 'Jack Nichols',
  icon: true,
};


// PERSON COMPONENT (used in MyEvents)
class Person extends React.Component {
  render() {
    const { person } = this.props;
    return (
      <View flex style={styles.container}>
        <Avatar.Image size={45} source={{uri: person.image}} style={styles.img}/>
        <View>
          {person.icon ?
            <Title style={styles.title} >{person.name}</Title>
          :
            <Title style={styles.message} >{person.name}</Title>}
        </View>
        <View style={styles.buttonContainer}>
        {person.icon ?
          <Icon
            family="feather"
            size={25}
            name="user-plus"
            color= {fidoTheme.COLORS.GREY}
            style= {{marginRight: 20}}
            onPress={() => {console.log("PRESSED")}}
          />
        : <View></View>}
        </View>
      </View>
    );
  }
}

var sampleMessage = {
  image: 'https://images.unsplash.com/photo-1500522144261-ea64433bbe27?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2102&q=80',
  name: "Are you guys still there? I'm omw!",
  icon: false,
}

// MyEvents Page
export default function MyEvents() {
    return (
      <View flex style={styles.main}>
        <View flex>
          <Text style={styles.header}>Event Information</Text>
          <BookmarkCard item={TEMP_ITEM} />
        </View>

        <View flex style={styles.section}>
          <Text style={styles.header}>Message Board</Text>
          <ScrollView
           showsVerticalScrollIndicator={false}
           contentContainerStyle={styles.articles}>
           <Person person={sampleMessage} />
          </ScrollView>
          <View style={styles.inputContainer}>
            <Text>Reply</Text>
            <TextInput
              placeholder='Aa'
              dense={true}
              style={styles.input}
            />
           </View>
        </View>
        <View flex style={styles.section}>
          <Text style={styles.header}>Attending</Text>
          <ScrollView
           showsVerticalScrollIndicator={false}
           contentContainerStyle={styles.articles}>
            <List.Section>
              <Person person={Jack} />
              <Person person={Jack} />
              <Person person={Jack} />
              <Person person={Jack} />
              <Person person={Jack} />
            </List.Section>
          </ScrollView>
        </View>
      </View>
    );
}

const styles = StyleSheet.create({
  main: {
    justifyContent: 'center',
    width: width - theme.SIZES.BASE,
  },
  section: {
    borderColor: fidoTheme.COLORS.BORDER,
    borderBottomWidth: 1,
    padding: 10,
  },
  header: {
    fontSize: 16,
    padding: 10,
  },
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  img: {
    marginTop: 10,
    marginRight: 16,
    marginLeft: 8,
  },
  title: {
    fontSize: 14,
    paddingTop: 10,
  },
  message: {
    fontSize: 14,
    paddingTop: 10,
    color: "grey",
  },
  buttonContainer: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "flex-end",
    paddingTop: 10,
  },
  articles: {
    width: width - theme.SIZES.BASE,
  },
  inputContainer: {
    marginBottom: 12,
    marginLeft: 12,
    marginRight: 12
  },
  input: {
    marginTop: 5
  },
});
