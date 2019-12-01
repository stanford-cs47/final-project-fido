import React from 'react';
import { BookmarkCard, Person } from '../components'
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
var TEMP_ITEM = articles[0];
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
export default function MyEvents() {
    return (
      <View flex style={styles.main}>
        <View style={{height: 230, padding: 10}}>
          <Text style={styles.header}>Event Information</Text>
          <BookmarkCard item={TEMP_ITEM} />
        </View>

        <View style={[styles.section, {height: 200}]}>
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
            </List.Section>
          </ScrollView>
        </View>
      </View>
    );
}

const styles = StyleSheet.create({
  main: {
    justifyContent: 'center',
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
