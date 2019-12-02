import React from "react";
import {
  ImageBackground,
  Image,
  StyleSheet,
  StatusBar,
  Dimensions,
  View
} from "react-native";
import { Colors, Metrics } from '../Themes';

const { height, width } = Dimensions.get("screen");

import argonTheme from "../constants/Theme";
import Images from "../constants/Images";

class Map extends React.Component {
  render() {
    return (
      <View flex style={styles.container}>
      <Image
          source={Images.Map}
          style= {styles.img}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    alignItems: "center"
  },
  img: {
    height: height,
    width: width
  }
});

export default Map;
