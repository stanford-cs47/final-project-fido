import React from "react";
import { StyleSheet } from "react-native";
import { Block, Text, theme } from "galio-framework";

import Icon from "./Icon";
import argonTheme from "../constants/Theme";
import { Colors, Metrics } from '../Themes'

class DrawerItem extends React.Component {
  renderIcon = () => {
    const { title, focused } = this.props;

    switch (title) {
      case "Home":
        return (
          <Icon
            name="home"
            family="feather"
            size={15}
            color={focused ? "white" : Colors.orange}
          />
        );
      case "Profile":
        return (
          <Icon
            name="user"
            family="feather"
            size={15}
            color={focused ? "white" : Colors.orange}
          />
        );
      case "Settings":
        return (
          <Icon
            name="settings"
            family="feather"
            size={16}
            color={focused ? "white" : Colors.orange}
          />
        );
      case "Help":
        return (
          <Icon
            name="help-circle"
            family="feather"
            size={16}
            color={focused ? "white" : Colors.orange}
          />
        );
      case "Account":
        return (
          <Icon
            name="calendar-date"
            family="ArgonExtra"
            size={12}
            color={focused ? "white" : Colors.orange}
          />
        );
      case "Getting Started":
        return <Icon />;
      case "Log out":
        return <Icon />;
      default:
        return null;
    }
  };

  render() {
    const { focused, title } = this.props;

    const containerStyles = [
      styles.defaultStyle,
      focused ? [styles.activeStyle, styles.shadow] : null
    ];

    return (
      <Block flex row style={containerStyles}>
        <Block middle flex={0.1} style={{ marginRight: 5 }}>
          {this.renderIcon()}
        </Block>
        <Block row center flex={0.9}>
          <Text
            size={15}
            bold={focused ? true : false}
            color={focused ? "white" : "rgba(0,0,0,0.75)"}
          >
            {title}
          </Text>
        </Block>
      </Block>
    );
  }
}

const styles = StyleSheet.create({
  defaultStyle: {
    paddingVertical: 15,
    paddingHorizontal: 14
  },
  activeStyle: {
    backgroundColor: Colors.orange,
    borderRadius: 4
  },
  shadow: {
    shadowColor: theme.COLORS.BLACK,
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowRadius: 8,
    shadowOpacity: 0.1
  }
});

export default DrawerItem;
