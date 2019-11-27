import React from 'react';
import { withNavigation } from 'react-navigation';
import PropTypes from 'prop-types';
import { StyleSheet, Dimensions, Image, View, Animated } from 'react-native';
import { Block, Text, theme } from 'galio-framework';
import { Colors, Metrics } from '../Themes';
import { Card, Title, Subheading, Paragraph, Button, Avatar } from 'react-native-paper';
import { Images } from '../constants/';
import fidoTheme from "../constants/Theme";
import Icon from './Icon';
import {Collapse,CollapseHeader, CollapseBody, AccordionList} from 'accordion-collapse-react-native';


class EventCard extends React.Component {
  state = {
    expanded: false,
  }

  _handlePress = () => {
    this.setState({
      expanded: !this.state.expanded
    });
  }

  render() {
    const { item } = this.props;

    return (
      <Collapse style={styles.container}>
        <CollapseHeader flex style={styles.top}>
          <Avatar.Image size={45} source={{uri: item.image}} style={styles.img}/>
          <View>
            <View style={styles.header}>
              <Title style={styles.title} >{item.title}</Title>
              <Icon
                family="feather"
                size={15}
                name="bookmark"
                color= {Colors.orange}
                onPress={() => {console.log('Pressed')}}
              />
            </View>
            <Text style={styles.text}>{item.description}</Text>
          </View>
          <View flex column>
            <Icon
              family="feather"
              size={25}
              name= {this.state.expanded ? "chevron-up" : "chevron-down"}
              color= {fidoTheme.COLORS.GREY}
              style={{alignSelf: "flex-end"}}
              onPress={this._handlePress}
            />
          </View>
        </CollapseHeader>
        <CollapseBody flex style={styles.bottom}>
          <View flex style={styles.info} >
            <Text style={styles.text} >When: {item.activity}</Text>
            <Text style={styles.text} >Where: {item.location}</Text>
            <Text style={styles.text} >Who: {item.attending}</Text>
          </View>
          <View style={styles.buttonContainer}>
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
    paddingBottom: 20,
    padding: 10,
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
    marginRight: 16
  },
  title: {
    fontSize: 16,
    marginRight: 10
  },
  text: {
    fontSize: 14,
    color: fidoTheme.COLORS.GREY,
  },
  info: {
    marginTop: 10,
  },
  buttonContainer: {
    flexDirection: "row",
    alignItems: "flex-end",
  },
  buttonText: {
    color: "white",
    fontSize: 12,
  },
});

export default withNavigation(EventCard);
