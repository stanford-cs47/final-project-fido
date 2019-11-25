import React from 'react';
import { StyleSheet, Dimensions, ScrollView, Image } from 'react-native';
import { Block, theme } from 'galio-framework';

import { BookmarkCard } from '../components';
import articles from '../constants/articles';
const { width } = Dimensions.get('screen');
import { List, Checkbox } from 'react-native-paper';
import { Colors, Metrics } from '../Themes';

class Bookmarks extends React.Component {
  state = {
    bookmarked: true
  }

  _handlePress = () =>
    this.setState({
      bookmarked: !this.state.expanded
    });

  renderArticles = () => {
    return (
      <ScrollView
       showsVerticalScrollIndicator={false}
       contentContainerStyle={styles.articles}>
       <BookmarkCard item={articles[0]}/>
       <BookmarkCard item={articles[1]}/>
       <BookmarkCard item={articles[2]}/>
       <BookmarkCard item={articles[3]}/>
       <BookmarkCard item={articles[4]}/>
      </ScrollView>
    );
  }

  render() {
    return (
      <Block flex>
        <Block style={styles.home}>
          {this.renderArticles()}
        </Block>
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

export default Bookmarks;
