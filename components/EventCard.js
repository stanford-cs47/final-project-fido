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


import firestore from '../firebase';
import firebase from 'firebase';

class EventCard extends React.Component {
  state = {
    bookmarked: true,
    savingBookmark: false,
  }

  _handlePress = () => {
    this.setState({
      bookmarked: !this.state.bookmarked
    });
  }

  deleteBookmark = async () => {
    this.setState({ savingBookmark: true });

    this.setState({bookmarked: !this.state.bookmarked});
    const { content = {} } = this.props;
    var bookmarkRef = firestore.doc('bookmarkedEvents/' + content.id);
    await bookmarkRef.delete();

    this.setState({ savingBookmark: false });
  }

  render() {
    const { item, type } = this.props;

    return (
      <View flex style={styles.container}>
        <Avatar.Image size={45} source={{uri: item.image}} style={styles.img}/>
        <View>
          <Title style={styles.title} >{item.title}</Title>
          <Text style={styles.text1}>{item.description}</Text>
          <View flex style={styles.infoContainer} >
            <View>
              <Text style={styles.text1} >Where:</Text>
              <Text style={styles.text1} > </Text>
              <Text style={styles.text1} >When:</Text>
            </View>
            <View style={styles.info}>
              <Text style={styles.text1} >{item.location1}</Text>
              <Text style={styles.text2} >{item.location2}</Text>
              <Text style={styles.text1} >{item.time1}</Text>
              <Text style={styles.text2} >{item.time2}</Text>
            </View>
          </View>
        </View>
        <View style={styles.buttonContainer}>
          {type === "bookmark" ?
            <Icon
              family="feather"
              size={25}
              name="bookmark"
              color= {Colors.orange}
              onPress={() => {console.log('Pressed Bookmark')}}
            /> : null
          }
          {type === "event" ?
            <Icon
              family="feather"
              size={25}
              name="bookmark"
              color= {fidoTheme.COLORS.GREY}
              onPress={() => {console.log('Pressed Bookmark')}}
            /> : null
          }
          {type === "my_event" ?
            <Icon
              family="feather"
              size={25}
              name="trash-2"
              color= {fidoTheme.COLORS.GREY}
              onPress={() => {console.log('Pressed Bookmark')}}
            /> : null
          }
          <View style={styles.bottomButton}>
            {type === "bookmark" ?
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
              </Button> : null
            }
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
    height: 170,
  },
  img: {
    marginTop: 10,
    marginRight: 15
  },
  title: {
    fontSize: 16,
  },
  text1: {
    fontSize: 14,
    color: fidoTheme.COLORS.GREY,
    marginBottom: 2,
  },
  text2: {
    fontSize: 14,
    color: fidoTheme.COLORS.LIGHT_GREY,
    marginBottom: 2
  },
  infoContainer: {
    marginTop: 10,
    flexDirection: "row"
  },
  info: {
    marginLeft: 5
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

export default withNavigation(EventCard);
