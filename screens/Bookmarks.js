import React from 'react';
import { StyleSheet, Dimensions, ScrollView, Image, FlatList, View, Text } from 'react-native';
import { Block, theme } from 'galio-framework';

import { BookmarkCard } from '../components';
import articles from '../constants/articles';
const { width } = Dimensions.get('screen');
import { List, Checkbox } from 'react-native-paper';
import { Colors, Metrics } from '../Themes';

import firestore from '../firebase';
import firebase from 'firebase';

class Bookmarks extends React.Component {
  state = {
    bookmarked: true,
    isRefreshing: false,
    unsubscribe: null,
    bookmarks: [],
  }

  componentDidMount() {
    const user = firebase.auth().currentUser;
    let bookmarksRef = firestore.collection('bookmarkedEvents/');
    let unsubscribe = bookmarksRef.onSnapshot(() => {
      this.reloadBookmarks();
    });
    this.setState({ unsubscribe });

    this.reloadBookmarks(); // Initial loading of bookmarks
  }

  componentWillUnmount() {
    this.state.unsubscribe();
  }

  reloadBookmarks = async () => {
    this.setState({isRefreshing: true});
    const bookmarks = await this.getBookmarks();
    this.setState({bookmarks: bookmarks, isRefreshing: false});
  }

  getBookmarks = async() => {
    try {
      let bookmarks = [];

      let bookmarkColletionRef = firestore.collection('bookmarkedEvents/');
      let allBookmarks = await bookmarkColletionRef.get();
      allBookmarks.forEach((bookmark) => {
        bookmarks.push(bookmark.data());
      })

      return (bookmarks ? bookmarks : []);
    } catch (error) {
      console.log(error);
    }
    return ([]);
  }

  _keyExtractor = (item, index) => { return item + index};

  renderBookmarks = (item) => {
    return (
      <BookmarkCard item={item}/>
    )
  }

  renderArticles = () => {
    return (
      <ScrollView
       showsVerticalScrollIndicator={false}
       contentContainerStyle={styles.articles}>
       <FlatList
         data={this.state.bookmarks}
         renderItem={({item}) => this.renderBookmarks(item)}
         keyExtractor={this._keyExtractor}
         ItemSeparatorComponent = {() => (<View style={{height: 10}}/>)}
       />
       {/*<BookmarkCard item={articles[0]}/>
       <BookmarkCard item={articles[1]}/>
       <BookmarkCard item={articles[2]}/>
       <BookmarkCard item={articles[3]}/>
       <BookmarkCard item={articles[4]}/>*/}
      </ScrollView>
    );
  }

  render() {
    let emptyList = null;
    if (!this.state.bookmarks[0]) {
      emptyList = (<Text style={{marginTop: Metrics.navBarHeight}}>No bookmarks exist yet!</Text>);
    }
    return (
      <Block flex>
        <Block style={styles.home}>
          {emptyList}
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
