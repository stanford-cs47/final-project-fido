import React from 'react';
import { withNavigation } from 'react-navigation';
import PropTypes from 'prop-types';
import { StyleSheet, Dimensions, Image, View } from 'react-native';
import { Block, Text, theme } from 'galio-framework';
import { Colors, Metrics } from '../Themes';
import { Card, Title, Subheading, Paragraph, Button, Avatar } from 'react-native-paper';
import { Images } from '../constants/';
import Icon from './Icon';


class BookmarkCard extends React.Component {
  state = {
    bookmarked: false
  }

  _handlePress = () =>
      this.setState({
        bookmarked: !this.state.bookmarked
      });

  render() {
    const { item } = this.props;

    return (
      <View flex style={styles.container}>
        <Avatar.Image size={40} source={{uri: item.image}} style={styles.img}/>
        <View>
          <Title>{item.title}</Title>
          <Text>{item.description}</Text>
          <View flex style={styles.card} >
            <Text size={14} >When: {item.activity}</Text>
            <Text size={14} >Where: {item.location}</Text>
            <Text size={14} >Who: {item.attending}</Text>
          </View>
        </View>
        <View style={styles.buttonContainer}>
          <Icon
            family="feather"
            size={20}
            name="bookmark"
            color= {Colors.orange}
            onPress={() => {console.log('Pressed')}}
          />
          <Button
            mode="contained"
            compact={true}
            uppercase={false}
            color={Colors.orange}
            labelStyle={styles.buttonText}
            onPress={() => {console.log('Pressed')}}
          >
            Navigate
          </Button>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 10,
  },
  img: {
    marginTop: 10,
    marginRight: 10
  },
  buttonContainer: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "flex-end",
    paddingTop: 10
  },
  buttonText: {
    color: "white",
  },
});

export default withNavigation(BookmarkCard);
