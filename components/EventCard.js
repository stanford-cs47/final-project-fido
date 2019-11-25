import React from 'react';
import { withNavigation } from 'react-navigation';
import PropTypes from 'prop-types';
import { StyleSheet, Dimensions, Image, View } from 'react-native';
import { Block, Text, theme } from 'galio-framework';
import { Colors, Metrics } from '../Themes';
import { Card, Title, Subheading, Paragraph, Button, Avatar } from 'react-native-paper';
import { Images } from '../constants/';
import fidoTheme from "../constants/Theme";
import Icon from './Icon';


class EventCard extends React.Component {
  state = {
    expanded: this.props.expanded || false,
  };

  _handlePress = () => {
    this.props.onPress && this.props.onPress();

    if (this.props.expanded === undefined) {
      // Only update state of the `expanded` prop was not passed
      // If it was passed, the component will act as a controlled component
      this.setState(state => ({
        expanded: !state.expanded,
      }));
    }
  };

  render() {
    const { item } = this.props;

    return (
      <View flex style={styles.container}>
        <Avatar.Image size={45} source={{uri: item.image}} style={styles.img}/>
        <View>
          <View style={styles.header}>
            <Title style={styles.title} >{item.title}</Title>
            <Icon
              family="feather"
              size={15}
              name="bookmark"
              color= {Colors.orange}
              onPress={() => {console.log('Pressed')}}
            />
          </View>
          <Text style={styles.text}>{item.description}</Text>
          <View flex style={styles.info} >
            <Text style={styles.text} >When: {item.activity}</Text>
            <Text style={styles.text} >Where: {item.location}</Text>
            <Text style={styles.text} >Who: {item.attending}</Text>
          </View>
        </View>
        <View style={styles.buttonContainer}>
          <Icon
            family="feather"
            size={25}
            name= {this.state.expanded ? "chevron-up" : "chevron-down"}
            color= {fidoTheme.COLORS.GREY}
            onPress={() => {console.log('Pressed')}}
          />
          <Button
            mode="contained"
            compact={true}
            uppercase={false}
            color={Colors.orange}
            labelStyle={styles.buttonText}
            onPress={() => {console.log('Pressed')}}
          >
            Navigate
          </Button>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 10,
    paddingBottom: 20,
    borderColor: fidoTheme.COLORS.BORDER,
    borderBottomWidth: 1,
  },
  header: {
    flexDirection: "row",
    alignItems: "center"
  },
  img: {
    marginTop: 10,
    marginRight: 16
  },
  title: {
    fontSize: 16,
    marginRight: 10
  },
  text: {
    fontSize: 14,
    color: fidoTheme.COLORS.GREY,
  },
  info: {
    marginTop: 10,
  },
  buttonContainer: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "flex-end",
  },
  expandableButtons: {
    alignItems: "flex-end",
    flexDirection: "row",
  },
  buttonText: {
    color: "white",
    fontSize: 12,
  },
});

export default withNavigation(EventCard);
