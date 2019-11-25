import React from 'react';
import { withNavigation } from 'react-navigation';
import PropTypes from 'prop-types';
import { StyleSheet, Dimensions, Image, TouchableWithoutFeedback } from 'react-native';
import { Block, Text, theme } from 'galio-framework';
import { Colors, Metrics } from '../Themes';
import { List, Button } from 'react-native-paper';
import { Images } from '../constants/';
import fidoTheme from "../constants/Theme";


class ListItem extends React.Component {
  state = {
    expanded: false
  }

  _handlePress = () =>
      this.setState({
        expanded: !this.state.expanded
      });

  render() {
    const { item, style, image } = this.props;

    return (
      <List.Accordion
        title={item.title}
        expanded={this.state.expanded}
        titleStyle = {{color : this.state.expanded ? Colors.orange : 'black'}}
        description={item.description}
        left={ props => <Image source={Images.Park} style={styles.image} />}
        onPress={this._handlePress}
        style= {style}
      >
        <Block flex space="between" style={styles.card} >
          <Block>
            <Text style={styles.text} >Where: {item.location}</Text>
            <Text style={styles.text} >When: {item.activity}</Text>
            <Text style={styles.text} >Who: {item.attending}</Text>
          </Block>
          <Block flex style={styles.buttons}>
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
          </Block>
        </Block>
      </List.Accordion>
    );
  }
}

const styles = StyleSheet.create({
  card: {
    marginBottom: theme.SIZES.BASE,
    marginLeft: 10, 
    flexDirection: "row",
    alignItems: "flex-end",
  },
  cardSubDescription: {
    flexDirection: "row",
  },
  text: {
    fontSize: 14,
    color: fidoTheme.COLORS.GREY,
  },
  buttons: {
    flexDirection: "column",
    alignItems: "flex-end",
    marginRight: theme.SIZES.BASE
  },
  buttonText: {
    color: "white",
    fontSize: 12,
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 50/2,
    margin: 5,
  },
});

export default withNavigation(ListItem);
