import React from "react";
import {
  ImageBackground,
  Image,
  StyleSheet,
  StatusBar,
  Dimensions
} from "react-native";
import { Block, Button, Text, theme } from "galio-framework";
import { Colors, Metrics } from '../Themes';

const { height, width } = Dimensions.get("screen");

import fidoTheme from "../constants/Theme";
import Images from "../constants/Images";

class Onboarding extends React.Component {
  render() {
    const { navigation } = this.props;

    return (
      <Block flex style={styles.container}>
        <StatusBar hidden />
        <Block flex center>
        <Image
            source={Images.Onboarding}
            style= {styles.bg}
          />
        </Block>
        <Block center>
          <Image source={Images.NewPaw} style={styles.logo} />
        </Block>
        <Block flex space="between" style={styles.padded}>
            <Block flex space="around" style={{ zIndex: 2 }}>
              <Block style={styles.title}>
                <Block>
                  <Text color="#FF5722" size={60} fontWeight= 'bold'>
                    FIDO
                  </Text>
                </Block>
                <Block style={styles.subTitle}>
                  <Text color="#FF5722" size={16} fontWeight= 'bold'>
                    Team 3 Hi-Fi Prototype
                  </Text>
                </Block>
              </Block>
              <Block center>
                <Button
                  style={styles.button}
                  color={Colors.orange}
                  onPress={() => navigation.navigate("Home")}
                  textStyle={{ color: "#FFFFFF"}}
                >
                  Get Started
                </Button>
              </Block>
          </Block>
        </Block>
      </Block>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.COLORS.BLACK
  },
  bg:{
     height,
     width,
     zIndex: 1,
     tintColor: "#FFFFFF",
     backgroundColor: "#FF5722",
  },
  padded: {
    paddingHorizontal: theme.SIZES.BASE * 2,
    position: "relative",
    bottom: theme.SIZES.BASE,
    zIndex: 2,
  },
  button: {
    width: width - theme.SIZES.BASE * 4,
    height: theme.SIZES.BASE * 3,
    shadowRadius: 0,
    shadowOpacity: 0
  },
  logo: {
    resizeMode: 'contain',
    width: 200,
    height: 200,
    zIndex: 2,
    position: 'relative',
    marginTop: '-50%'
  },
  title: {
    marginTop:'-5%'
  },
  subTitle: {
    marginTop: 20
  }
});

export default Onboarding;
