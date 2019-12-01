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


class BookmarkCard extends React.Component {
  state = {
    bookmarked: true
  }

  _handlePress = () =>
      this.setState({
        bookmarked: !this.state.bookmarked
      });



  render() {
    const { item } = this.props;

    return (
      <View flex style={styles.container}>
        <Avatar.Image size={45} source={{uri: item.image}} style={styles.img}/>
        <View>
          <Title style={styles.title} >{item.title}</Title>
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
            name="bookmark"
            color= {Colors.orange}
            onPress={() => {console.log('Pressed Bookmark')}}
          />
          <View style={styles.bottomButton}>
            <Button
              mode="contained"
              compact={true}
              uppercase={false}
              style={{marginRight: 5}}
              color={fidoTheme.COLORS.LIGHT_ORANGE}
              labelStyle={{color: Colors.orange, fontSize: 12}}
              onPress={() => {console.log('Pressed More')}}
            >
              More
            </Button>
            <Button
              mode="contained"
              compact={true}
              uppercase={false}
              color={Colors.orange}
              labelStyle={{color: "white", fontSize: 12}}
              onPress={() => {console.log('Pressed Navigate')}}
            >
              Navigate
            </Button>
          </View>
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
  img: {
    marginTop: 10,
    marginRight: 16
  },
  title: {
    fontSize: 16,
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
  bottomButton: {
    flexDirection: "row",
  },
  buttonText: {
    color: "white",
    fontSize: 12,
  },
});

export default withNavigation(BookmarkCard);
