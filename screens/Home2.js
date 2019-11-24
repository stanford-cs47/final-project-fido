import React from 'react';
import { StyleSheet, Dimensions, ScrollView, Image, Alert } from 'react-native';
import { Block, Text, theme } from 'galio-framework';

import { Card, FloatingActionButton, ListItem } from '../components';
import articles from '../constants/articles';
const { width } = Dimensions.get('screen');
import { List, Checkbox } from 'react-native-paper';
import { Colors, Metrics } from '../Themes';
import { Images } from '../constants/';
//style={{ borderColor: "#FF5722", borderWidth: 1, backgroundColor: Colors.orange, opacity: .5 }}
//style={{ borderColor: "#FF5722", borderWidth:1}}
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
          <ListItem item={articles[5]}/>
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
      Alert.alert(
        'Event Posted!',
        'You can view it in My Events',
        [
          {text: 'Got it!'},
        ],
        {cancelable: false},
      ),
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
