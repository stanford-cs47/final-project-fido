import React from 'react';
import { withNavigation } from 'react-navigation';
import PropTypes from 'prop-types';
import { StyleSheet, Dimensions, Image, View, Alert } from 'react-native';
import { Block, Text, theme } from 'galio-framework';
import { Colors, Metrics } from '../Themes';
import { Card, Title, Subheading, Paragraph, Button, Avatar } from 'react-native-paper';
import { Images } from '../constants/';
import fidoTheme from "../constants/Theme";
import Icon from './Icon';
import articles from '../constants/articles';

import firestore from '../firebase';
import firebase from 'firebase';

class EventCard extends React.Component {

  state = {
    bookmarked: false,
    savingBookmark: false,
    unsubscribe: false,
    unsubscribeTwo: false,
    myEventExists: false,
    myEvent: [],
  }

  componentDidMount = async () => {
    try {
      const { item = {} } = this.props;

      let bookmarkRef = firestore.doc('bookmarkedEvents/' + item.title);
      let myEventRef = firestore.doc('allEvents/' + item.title);

      let unsubscribe = bookmarkRef.onSnapshot(() => {
        this.reloadBookmarks();
        this.reloadMyEvent();
      });

      let unsubscribeTwo = myEventRef.onSnapshot(() => {
        this.reloadMyEvent();
      });

      this.setState({ unsubscribe });

      this.reloadBookmarks();
      this.reloadMyEvent();

    } catch (err) {
      console.log(err);
    }
  }

  componentWillUnmount() {
    this.state.unsubscribe();
  }

  reloadMyEvent = async() => {
    const { item = {} } = this.props;

    let myEventRef = firestore.doc('myEvent/' + item.title);
    let myEvent = await myEventRef.get();

    if(myEvent.exists) this.setState({myEventExists: true, myEvent: item});
  }

  reloadBookmarks = async () => {
    const { item = {} } = this.props;
    let bookmarkRef = firestore.doc('bookmarkedEvents/' + item.title);
    let bookmark = await bookmarkRef.get();

    if(bookmark.exists) this.setState({bookmarked: true});
    else this.setState({bookmarked: false});

  }

  getMyEvent = async() => {
    try {
      let myEvent = [];
      let myEventRef = firestore.collection('myEvent/');
      let all = await myEventRef.get();
      all.forEach((currEvent) => {
        myEvent.push(currEvent.data());
      });
      console.log("my event in event card:");
      console.log(myEvent);
      return (myEvent ? myEvent : []);
    } catch (error) {
      console.log(error);
    }
    return ([]);
  }

  removeBookmark = async () => {
    try {
      const { item = {} } = this.props;
      var bookmarkedEventsRef = firestore.doc('bookmarkedEvents/' + item.title);
      await bookmarkedEventsRef.delete();
      //this.setState({bookmarked: false});
    } catch (err) {
      console.log(err);
    }
  }

  deleteEvent= async () => {
    try {
      const { item = {} } = this.props;

      var allEventsRef = firestore.doc('allEvents/' + item.title);
      var myEventRef = firestore.doc('myEvent/' + item.title);
      await allEventsRef.delete();
      await myEventRef.delete();

      this.setState({myEventExists: false, myEvent: []})

    } catch (err) {
      console.log(err);
    }
  }

  render() {
    const { item, type, book } = this.props;

    if (item === undefined) {
      return (
        <View flex style={styles.container}>
        <Text> You do not have an event yet! </Text>
        </View>
      )
    } else {
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
              onPress={() => {
                Alert.alert(
                  'Remove from Bookmarks?',
                  '',
                  [
                    { text: "No" },
                    { text: 'Yes', onPress: () => this.removeBookmark()}
                  ],
                  {cancelable: false},
                );
                }
              }
            /> : null
          }
          {type === "event" ?
            <Icon
              family="feather"
              size={25}
              name="bookmark"
              color= {book ? Colors.orange : fidoTheme.COLORS.GREY}
              onPress={() => {
                Alert.alert(
                  'Remove from Bookmarks?',
                  '',
                  [
                    { text: "No" },
                    { text: 'Yes', onPress: () => {
                      this.removeBookmark();
                      this.props.navigation.navigate('Home');
                    }}
                  ],
                  {cancelable: false},
                );
                }
              }
            /> : null
          }
          {type === "my_event" ?
            <Icon
              family="feather"
              size={25}
              name="trash-2"
              color= {fidoTheme.COLORS.GREY}
              onPress={() => {
                Alert.alert(
                  'Delete Event?',
                  'Don\'t worry, we\'ll notify prospective attendees.',
                  [
                    { text: "No" },
                    { text: 'Yes', onPress: () => this.deleteEvent() },
                  ],
                  {cancelable: false},
                );
                }
              }
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
                onPress={() => {this.props.navigation.navigate('ExpandedEvent', {item: item, book: this.state.bookmarked})}}
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
              onPress={() => {this.props.navigation.navigate('Map')}}
            >
              Navigate
            </Button>
          </View>
        </View>
      </View>
    )}
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
