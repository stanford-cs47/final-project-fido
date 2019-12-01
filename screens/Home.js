import React from 'react';
import { StyleSheet, Dimensions, ScrollView, Image } from 'react-native';
import { Block, Text, theme } from 'galio-framework';

import { FloatingActionButton, ListItem, EventCard } from '../components';
import articles from '../constants/articles';
const { width } = Dimensions.get('screen');
import { List, Checkbox } from 'react-native-paper';
import { Colors, Metrics } from '../Themes';

import PouchDB from 'pouchdb-core';
PouchDB.plugin(require('pouchdb-adapter-asyncstorage').default);
const db = new PouchDB('mydb', {adapter: 'asyncstorage'});

class Home extends React.Component {

  renderArticles = () => {
    return (
      <ScrollView
       showsVerticalScrollIndicator={false}
       contentContainerStyle={styles.articles}>
        <List.Section>
          <EventCard item={articles[0]}/>
          <EventCard item={articles[1]}/>
          <EventCard item={articles[2]}/>
          <EventCard item={articles[3]}/>
          <EventCard item={articles[4]}/>
          <EventCard item={articles[0]}/>
          <EventCard item={articles[1]}/>
          <EventCard item={articles[2]}/>
          <EventCard item={articles[3]}/>
          <EventCard item={articles[4]}/>
        </List.Section>
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
