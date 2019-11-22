import React from 'react';
import { withNavigation } from 'react-navigation';
import PropTypes from 'prop-types';
import { StyleSheet, Dimensions, Image, TouchableWithoutFeedback } from 'react-native';
import { Block, Text, theme } from 'galio-framework';
import { Colors, Metrics } from '../Themes';
import { List, Button } from 'react-native-paper';
import { Images } from '../constants/';


class ListItem extends React.Component {
  render() {
    const { item } = this.props;

    return (
      <List.Accordion
        title={item.title}
        description={item.description}
        left={ props => <Image source={Images.Park} style={styles.image} />}
      >
        <Block flex space="between" style={styles.card} >
          <Block>
            <Text size={14} >Where: {item.location}</Text>
            <Text size={14} >When: {item.activity}</Text>
            <Text size={14} >Who: {item.attending}</Text>
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
    flexDirection: "row",
    alignItems: "flex-end",
  },
  buttons: {
    flexDirection: "column",
    alignItems: "flex-end",
    marginRight: theme.SIZES.BASE
  },
  buttonText: {
    color: "white",
  },
  cardSubDescription: {
    flexDirection: "row",
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 50/2,
    margin: 5,
  },
});

export default withNavigation(ListItem);
