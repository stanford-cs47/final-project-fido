import React from 'react';
import { StyleSheet, Dimensions, ScrollView, Image, FlatList, View } from 'react-native';
import { Block, theme } from 'galio-framework';

import { EventCard } from '../components';
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
    // We want our list of bookmarks to update in realtime (so the user doesn't have to
    // refresh the page to see any changes). This basically waits for a change in the
    // bookmarks collection and then tells the program to retrieve all of the bookmarks
    // again (it basically calls your code for getBookmarks).
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

  test = (item) => {
    console.log("item: " + item);
    return (
      <EventCard item={item} type={"bookmark"}/>
    )
  }

  renderArticles = () => {
    return (
      <ScrollView
       showsVerticalScrollIndicator={false}
       contentContainerStyle={styles.articles}>
       <FlatList
         data={this.state.bookmarks}
         renderItem={({item}) => this.test(item)}
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
