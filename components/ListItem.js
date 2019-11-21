import React from 'react';
import { withNavigation } from 'react-navigation';
import PropTypes from 'prop-types';
import { StyleSheet, Dimensions, Image, TouchableWithoutFeedback } from 'react-native';
import { Block, Text, theme } from 'galio-framework';
import { Colors, Metrics } from '../Themes';
import { List } from 'react-native-paper';


class ListItem extends React.Component {
  render() {
    const { item } = this.props;

    return (
      <List.Accordion
        title={item.title}
        description={item.description}
        left={ props => <Image source={{uri: item.image}} style={styles.image} />}
      >
        <Block style={styles.card}>
          <Text size={14} >Where: {item.location}</Text>
          <Text size={14} >When: {item.activity}</Text>
          <Text size={14} >Who: {item.attending}</Text>
        </Block>
      </List.Accordion>
    );
  }
}

const styles = StyleSheet.create({
  card: {
    marginBottom: theme.SIZES.BASE
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
