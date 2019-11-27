import React from 'react';
import { BookmarkCard } from '../components'
import articles from '../constants/articles';
import { StyleSheet, Text, View, ScrollView, Dimensions, Image } from 'react-native';
import { Colors, Metrics } from '../Themes';
import { List, Checkbox } from 'react-native-paper';
import { FloatingActionButton, ListItem, EventCard } from '../components';
import fidoTheme from "../constants/Theme";
import { Block, theme } from 'galio-framework';
import { Card, Title, Subheading, Paragraph, Button, Avatar } from 'react-native-paper';
import { Images } from '../constants/';
import Icon from '../components/Icon';


// TEMPORARY VARIABLES
var TEMP_ITEM = articles[2];
var Jack = {
  image: 'https://images.unsplash.com/photo-1516559828984-fb3b99548b21?ixlib=rb-1.2.1&auto=format&fit=crop&w=2100&q=80',
  name: 'Jack Nichols',
};


// PERSON COMPONENT (used in MyEvents)
class Person extends React.Component {
  render() {
    const { person } = this.props;
    return (
      <View flex style={styles.container}>
        <Avatar.Image size={35} source={{uri: person.image}} style={styles.img}/>
        <View>
          <Title style={styles.title} >{person.name}</Title>
        </View>
        <View style={styles.buttonContainer}>
          <Icon
            family="feather"
            size={25}
            name="plus"
            color= {Colors.orange}
            onPress={() => {console.log("PRESSED")}}
          />
        </View>
      </View>
    );
  }
}

// MyEvents Page
export default function MyEvents() {
    return (
      <View style={styles.main}>

        <Block style={styles.block}>
          <Text style={styles.header}>Event Information</Text>
          <BookmarkCard item={TEMP_ITEM} />
        </Block>

        <Block style={styles.section}>
          <Text style={styles.header}>Message Board</Text>
        </Block>

        <Text style={styles.headerA}>Attending</Text>
        <ScrollView
         showsVerticalScrollIndicator={false}
         contentContainerStyle={styles.articles}>
          <List.Section>
            <Person person={Jack} />
            <Person person={Jack} />
            <Person person={Jack} />
            <Person person={Jack} />
            <Person person={Jack} />
            <Person person={Jack} />
            <Person person={Jack} />
            <Person person={Jack} />
            <Person person={Jack} />
            <Person person={Jack} />
            <Person person={Jack} />
            <Person person={Jack} />
          </List.Section>
        </ScrollView>

      </View>
    );
}

const styles = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
  },
  section: {
    borderColor: fidoTheme.COLORS.BORDER,
    borderBottomWidth: 1,
    height: 200,
    width: '100%',
  },
  block: {
    height: 200,
    width: '100%',
  },
  header: {
    fontSize: 18,
    padding: 10,
  },
  headerA: {
    fontSize: 18,
    padding: 10,
    paddingBottom: 0
  },
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 10,
  },
  img: {
    marginTop: 10,
    marginRight: 16,
    marginLeft: 8,
  },
  title: {
    fontSize: 16,
    paddingTop: 10,
  },
  buttonContainer: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "flex-end",
    paddingTop: 10,
  }
});
