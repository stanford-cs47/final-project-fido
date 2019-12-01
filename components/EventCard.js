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
    collapsed: false,
    bookmarked: true,
    myEvent: false,
  }

  render() {
    const { item } = this.props;

    return (
      <Collapse
          style={styles.container}
          isCollapsed={this.state.collapsed}
	        onToggle={(isCollapsed)=>this.setState({collapsed:isCollapsed})}>
        <CollapseHeader flex style={styles.top}>
          <Avatar.Image size={45} source={{uri: item.image}} style={styles.img}/>
          <View>
            <View style={styles.header}>
              <Title style={styles.title} >{item.title}</Title>
              {this.state.bookmarked ?
                <Icon
                  family="feather"
                  size={15}
                  name="bookmark"
                  color= {Colors.orange}
                />
                : null}
              {this.state.myEvent ?
                <Icon
                  family="feather"
                  size={15}
                  name="user"
                  color= {Colors.orange}
                />
                : null}
            </View>
            <Text style={styles.text1}>{item.description}</Text>
          </View>
          <View flex column>
            <Icon
              family="feather"
              size={25}
              name= {this.state.collapsed  ? "chevron-up" : "chevron-down"}
              color= {fidoTheme.COLORS.GREY}
              style={{alignSelf: "flex-end"}}
            />
          </View>
        </CollapseHeader>
        <CollapseBody flex style={styles.bottom}>
          <View flex style={styles.infoContainer} >
            <View>
              <Text style={styles.text1} >Where:</Text>
              <Text style={styles.text1} > </Text>
              <Text style={styles.text1} >When:</Text>
            </View>
            <View style={styles.info}>
              <Text style={styles.text1} >{item.location1}</Text>
              <Text style={styles.text2} >{item.location2}</Text>
              <Text style={styles.text1} >{item.time1}</Text>
              <Text style={styles.text2} >{item.time2}</Text>
            </View>
          </View>
          <View style={styles.buttonContainer}>
            <Button
              mode="contained"
              compact={true}
              uppercase={false}
              style={{marginRight: 5}}
              color={fidoTheme.COLORS.LIGHT_ORANGE}
              labelStyle={{color: Colors.orange, fontSize: 12}}
              onPress={() => {console.log('Pressed More')}}
            >
              More
            </Button>
            <Button
              mode="contained"
              compact={true}
              dark = {true}
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
    padding: 10,
    paddingBottom: 20,
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
  text1: {
    fontSize: 14,
    color: fidoTheme.COLORS.GREY,
    marginBottom: 2,
  },
  text2: {
    fontSize: 14,
    color: fidoTheme.COLORS.LIGHT_GREY,
    marginBottom: 2
  },
  infoContainer: {
    marginTop: 10,
    flexDirection: "row"
  },
  info: {
    marginLeft: 5
  },
  buttonContainer: {
    flexDirection: "row",
    alignItems: "flex-end",
  },
  buttonText: {
    fontSize: 12,
  },
});

export default withNavigation(EventCard);
