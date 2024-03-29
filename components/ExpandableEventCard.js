import React from 'react';
import { withNavigation } from 'react-navigation';
import PropTypes from 'prop-types';
import { StyleSheet, Dimensions, Image, View, Animated, Alert } from 'react-native';
import { Block, Text, theme } from 'galio-framework';
import { Colors, Metrics } from '../Themes';
import { Card, Title, Subheading, Paragraph, Button, Avatar } from 'react-native-paper';
import { Images } from '../constants/';
import fidoTheme from "../constants/Theme";
import Icon from './Icon';
import {Collapse,CollapseHeader, CollapseBody, AccordionList} from 'accordion-collapse-react-native';
import articles from '../constants/articles';

import firestore from '../firebase';
import firebase from 'firebase';

class ExpandableEventCard extends React.Component {
  state = {
    collapsed: false,
    bookmarked: false,
    myEvent: false,
    savingBookmark: false,
    unsubscribe: null,
    unsubscribeTwo: null,
    isRefreshing:false,
  }

  componentDidMount = async () => {
    try {
      const { item = {} } = this.props;
      let bookmarkRef = firestore.doc('bookmarkedEvents/' + item.title);
      let myEventRef = firestore.doc('myEvent/' + item.title);

      let unsubscribe = bookmarkRef.onSnapshot(() => {
        this.reloadBookmarks();
        this.reloadMine();
      });
      let unsubscribeTwo = myEventRef.onSnapshot(() => {
        this.reloadBookmarks();
        this.reloadMine();
      });
      this.setState({ unsubscribe });

      this.reloadBookmarks();
      this.reloadMine();
    } catch (err) {
      console.log(err);
    }
  }

  componentWillUnmount() {
    this.state.unsubscribe();
  }

  reloadMine = async() => {
    const { item = {} } = this.props;

    let allRef = firestore.doc('allEvents/' + item.title);
    let ev = await allRef.get();
    if(ev.exists) this.setState({myEvent: item.mine});
  }

  reloadBookmarks = async () => {
    const { item = {} } = this.props;

    let bookmarkRef = firestore.doc('bookmarkedEvents/' + item.title);
    let bookmark = await bookmarkRef.get();
    let allRef = firestore.doc('allEvents/' + item.title);
    let ev = await allRef.get();
    if(ev.exists) this.setState({myEvent: item.mine});
    if(bookmark.exists) this.setState({bookmarked: true});
    else this.setState({bookmarked: false});
    //if(ev.exists) this.setState({myEvent: item.mine});
  }

  saveBookmark = async() => {
    this.setState({ savingBookmark: true });

    this.setState({bookmarked: !this.state.bookmarked});
    const { item = {} } = this.props;
    var bookmarkRef = firestore.doc('bookmarkedEvents/' + item.title);
    await bookmarkRef.set(item);

    this.setState({ savingBookmark: false });
  }

  deleteBookmark = async () => {
    this.setState({ savingBookmark: true });

    this.setState({bookmarked: !this.state.bookmarked});
    const { item = {} } = this.props;

    var bookmarkRef = firestore.doc('bookmarkedEvents/' + item.title);
    await bookmarkRef.delete();

    this.setState({ savingBookmark: false});
    //this.reloadBookmarks();
  }

  bookmarkPressed = async () => {
    if (this.state.savingBookmark) return; //stop if already saving

    if (!this.state.bookmarked) {
      this.saveBookmark();
    } else {
      this.deleteBookmark();
    }

    this.setState({ bookmarked: !this.state.bookmarked });
  }

  getIcon = () => {
    if (this.state.myEvent) {
      return (
        <Icon
          family="feather"
          size={20}
          name="user"
          color= {Colors.orange}
        />
      );
    } else {
      if (this.state.bookmarked) {
        return (
          <Icon
            family="feather"
            size={20}
            name="bookmark"
            color= {Colors.orange}
            onPress = {this.bookmarkPressed}
          />
        );
      } else {
        return (
          <Icon
            family="feather"
            size={20}
            name="bookmark"
            color= {"#A5A5A5"}
            onPress = {this.bookmarkPressed}
          />
        );
      }
    }
  }

  render() {
    const { item } = this.props;

    return (
      <Collapse
          style={styles.container}
          isCollapsed={this.state.collapsed}
	        onToggle={(isCollapsed)=>this.setState({collapsed:isCollapsed})}>
        <CollapseHeader flex style={styles.top}>
          <Avatar.Image size={45} source={{uri: item.image}} style={styles.img}/>
          <View>
            <View style={styles.header}>
              <Title style={styles.title} >{item.title}</Title>
              {this.getIcon()}
            </View>
            <Text style={styles.text1}>{item.description}</Text>
          </View>
          <View flex column>
            <Icon
              family="feather"
              size={25}
              name= {this.state.collapsed  ? "chevron-up" : "chevron-down"}
              color= {fidoTheme.COLORS.GREY}
              style={{alignSelf: "flex-end"}}
            />
          </View>
        </CollapseHeader>
        <CollapseBody flex style={styles.bottom}>
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
          <View style={styles.buttonContainer}>
            <Button
              mode="contained"
              compact={true}
              uppercase={false}
              style={{marginRight: 5}}
              color={fidoTheme.COLORS.LIGHT_ORANGE}
              labelStyle={{color: Colors.orange, fontSize: 12}}
              onPress={() => {
                this.state.myEvent ?  this.props.navigation.navigate('MyEvents', {item: item})
                : this.props.navigation.navigate('ExpandedEvent', {item: item, book: this.state.bookmarked})}
              }
            >
              More
            </Button>
            <Button
              mode="contained"
              compact={true}
              dark = {true}
              uppercase={false}
              color={Colors.orange}
              labelStyle={styles.buttonText}
              onPress={() => {
                this.props.navigation.navigate('Map');
                Alert.alert(
                  'Check in to this event?',
                  '',
                  [
                    { text: "No" },
                    { text: 'Yes'}
                  ],
                  {cancelable: false},
                );
              }}
            >
              Navigate
            </Button>
          </View>
        </CollapseBody>
      </Collapse>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    borderColor: fidoTheme.COLORS.BORDER,
    borderBottomWidth: 1,
    padding: 10,
    paddingBottom: 20,
  },
  top: {
    flexDirection: "row",
  },
  bottom: {
    flexDirection: "row",
    marginLeft: 60,
  },
  header: {
    flexDirection: "row",
    alignItems: "center"
  },
  img: {
    marginTop: 10,
    marginRight: 15
  },
  title: {
    fontSize: 16,
    marginRight: 10
  },
  text: {
    fontSize: 14,
    color: fidoTheme.COLORS.GREY,
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
    flexDirection: "row",
    alignItems: "flex-end",
  },
  buttonText: {
    fontSize: 12,
  },
});

export default withNavigation(ExpandableEventCard);
