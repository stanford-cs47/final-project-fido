import React from 'react';
import { StyleSheet, Text, View, ScrollView, Dimensions, Image } from 'react-native';
import { Title, Avatar } from 'react-native-paper';
import { Colors, Metrics } from '../Themes';
import { Images } from '../constants/';
import Icon from './Icon';
import fidoTheme from "../constants/Theme";

// PERSON COMPONENT (used in MyEvents)
class Person extends React.Component {
  render() {
    const { person } = this.props;
    return (
      <View flex style={styles.container}>
        <Avatar.Image size={35} source={{uri: person.image}} style={styles.img}/>
        <View>
          {person.icon ?
            <Title style={[styles.text, {fontSize: 16}]} >{person.name}</Title>
          :
            <Title style={[styles.text, {fontSize: 14}]} >{person.name}</Title>}
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

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
  },
  text: {
    paddingTop: 10,
    color: fidoTheme.COLORS.GREY
  },
  buttonContainer: {
    flex: 1,
    flexDirection: "column",
    alignItems: "flex-end",
    paddingTop: 10,
  },
  img: {
    margin: 10,
    marginRight: 15,
    marginTop: 10,
  },
});

export default Person;
