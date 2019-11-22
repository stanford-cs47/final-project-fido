import React from 'react';
import { StyleSheet, Dimensions, ScrollView, Image } from 'react-native';
import { Block, Text, theme } from 'galio-framework';

import { Card, FloatingActionButton, ListItem } from '../components';
import articles from '../constants/articles';
const { width } = Dimensions.get('screen');
import { List, Checkbox } from 'react-native-paper';

class Home extends React.Component {
  state = {
    expanded: true
  }

  _handlePress = () =>
    this.setState({
      expanded: !this.state.expanded
    });

  renderArticles = () => {
    return (
      <ScrollView
       showsVerticalScrollIndicator={false}
       contentContainerStyle={styles.articles}>
        <List.Section>
          <ListItem item={articles[0]}/>
          <ListItem item={articles[1]}/>
          <ListItem item={articles[2]}/>
          <ListItem item={articles[3]}/>
          <ListItem item={articles[4]}/>
          <ListItem item={articles[0]}/>
          <ListItem item={articles[1]}/>
          <ListItem item={articles[2]}/>
          <ListItem item={articles[3]}/>
          <ListItem item={articles[4]}/>
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
        <FloatingActionButton navigation= {this.props.navigation}/>
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
