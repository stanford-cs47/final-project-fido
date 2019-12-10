import React from 'react';
import { StyleSheet, Dimensions, ScrollView, Image, FlatList, View, StatusBar } from 'react-native';
import { Block, Text, theme } from 'galio-framework';

import { FloatingActionButton, ListItem, ExpandableEventCard } from '../components';
import articles from '../constants/articles';
const { width } = Dimensions.get('screen');
import { List, Checkbox } from 'react-native-paper';
import { Colors, Metrics } from '../Themes';

import PouchDB from 'pouchdb-core';
PouchDB.plugin(require('pouchdb-adapter-asyncstorage').default);
const db = new PouchDB('mydb', {adapter: 'asyncstorage'});

import firestore from '../firebase';
import firebase from 'firebase';

class Home extends React.Component {

  state = {
    expanded: true,
    events: [],

    title: "",
    description: "",
    location: "",
    activity: "",
    attending: "",
    image: "",
    horizontal: true,
    isRefreshing: false,
  }

  _handlePress = () => {
    this.setState({
      expanded: !this.state.expanded
    });
  }

  componentDidMount() {
    let eventsRef = firestore.collection('allEvents/');

    let unsubscribe = eventsRef.onSnapshot(() => {
      this.reloadEvents();
    });
    this.setState({ unsubscribe });

    this.reloadEvents(); // Initial loading of events
  }

  componentWillUnmount() {
    this.state.unsubscribe();
  }

  contentDisplayed = () => {
    return (
      this.state.events
    )
  };

  _keyExtractor = (item, index) => { return item + index};

  listItemRenderer = (item, index) => {
    return (
      <ExpandableEventCard item={item}/>
    );
  }

  reloadEvents = async () => {
    this.setState({isRefreshing: true});
    const events = await this.getEvents();
    this.setState({events: events, isRefreshing: false});
  }

  getEvents = async () => {
    try {
      let allEvents = [];

      let eventsColletionRef = firestore.collection('allEvents/');
      let all = await eventsColletionRef.get();
      all.forEach((currEvent) => {
        allEvents.push(currEvent.data());
      });

      return (allEvents ? allEvents : []);
    } catch (error) {
      console.log(error);
    }
    return ([]);
  }

  renderArticles = () => {
    return (
      <ScrollView
       showsVerticalScrollIndicator={false}
       contentContainerStyle={styles.articles}>
       <FlatList
         data={this.state.events}
         renderItem={({item, index}) => this.listItemRenderer(item, index)}
         keyExtractor={this._keyExtractor}
         ItemSeparatorComponent = {() => (<View style={{height: 10}}/>)}

       />
      </ScrollView>
    );
  }

  render() {
    return (
      //<View>

        <Block flex>
        <StatusBar backgroundColor={Colors.orange} barStyle="light-content" />
          <Block style={styles.home}>
            {this.renderArticles()}
          </Block>
          <FloatingActionButton navigation= {this.props.navigation} db = {db}/>
        </Block>
      //</View>

    );
  }
}

const styles = StyleSheet.create({
  home: {
    width: width,
    alignItems: "center"
  },
  articles: {
    width: width - theme.SIZES.BASE,
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 50/2,
  },
});

export default Home;
