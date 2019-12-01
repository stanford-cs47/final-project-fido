import React from 'react';
import { StyleSheet, Dimensions, ScrollView, Image, FlatList, View } from 'react-native';
import { Block, Text, theme } from 'galio-framework';

import { FloatingActionButton, ListItem, EventCard } from '../components';
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
    events: [{
      event: articles[0],
    },
    {
      event: articles[1],
    }],
    title: "",
    description: "",
    location: "",
    activity: "",
    attending: "",
    image: "",
    horizontal: true,
  }

  _handlePress = () =>
    this.setState({
      expanded: !this.state.expanded
    });

  componentDidMount() {
    db.allDocs().then(doc => console.log(doc.rows[0].doc.events));
  }

  contentDisplayed = () => {
    let data = [];
    db.get('events').then(function (doc) {
      console.log("before: ");
      console.log(doc.events);
      temp = doc.events;
      console.log("temp" + temp);
      temp.forEach((contact)  => {
        data.push(contact);
      })
      console.log("data after:" + data);
    }).catch(function (err) {
      console.log("error");
      console.log(err);
    });
    console.log("data :" + data);
    return (
      this.state.events
    )
  };

  _keyExtractor = (item, index) => { return item.event.title + index};

  listItemRenderer = (item, index) => {
    console.log("item: " + "index: " + index)
    console.log(item.event.title);
    return (
      <EventCard item={item.event}/>
    );
  }

  renderArticles = () => {
    return (
      <ScrollView
       showsVerticalScrollIndicator={false}
       contentContainerStyle={styles.articles}>
       <FlatList
         data={this.contentDisplayed()}
         renderItem={({item, index}) => this.listItemRenderer(item, index)}
         keyExtractor={this._keyExtractor}
         ItemSeparatorComponent = {() => (<View style={{height: 10}}/>)}
         renderSectionHeader={({section}) =>
           <View style={styles.header}>
             <Text style={styles.title}>{section.title}</Text>
           </View>
         }
       />
      </ScrollView>
    );
  }

  render() {
    return (
      <Block flex>
        <Block style={styles.home}>
          {this.renderArticles()}
        </Block>
        <FloatingActionButton navigation= {this.props.navigation} db = {db}/>
      </Block>
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
