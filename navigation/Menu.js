import React from "react";
import { DrawerItems } from "react-navigation";
import {
  ScrollView,
  StyleSheet,
  Dimensions,
  Image,
  Text
} from "react-native";
import { Block, theme } from "galio-framework";
import { Colors, Metrics } from '../Themes'

import Images from "../constants/Images";

const { width } = Dimensions.get("screen");
//<Image source={Images.Paw} styles={styles.photo} />
const Drawer = props => (
  <Block style={styles.container} forceInset={{ top: 'always', horizontal: 'never' }}>
    <Block flex={0.05} style={styles.header}>
      <Text style ={styles.text}>
       FIDO
       </Text>
    </Block>
    <Block flex>
      <ScrollView showsVerticalScrollIndicator={false} style={{ flex: 1 }}>
        <DrawerItems {...props} />
      </ScrollView>
    </Block>
  </Block>
);

const Menu = {
  contentComponent: props => <Drawer {...props} />,
  drawerBackgroundColor: "white",
  drawerWidth: width * 0.8,
  contentOptions: {
    activeTintColor: "white",
    inactiveTintColor: "#000",
    activeBackgroundColor: "transparent",
    resizeMode: 'contain',
    itemStyle: {
      width: width * 0.75,
      resizeMode: 'contain',
      backgroundColor: "transparent"
    },
    labelStyle: {
      fontSize: 18,
      marginLeft: 12,
      fontWeight: "normal"
    },
    itemsContainerStyle: {
      resizeMode: 'contain',
      paddingVertical: 16,
      paddingHorizonal: 12,
      justifyContent: "center",
      alignContent: "center",
      alignItems: "center",
      overflow: "hidden"
    }
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    resizeMode: 'contain'
  },
  header: {
    paddingHorizontal: 28,
    paddingBottom: theme.SIZES.BASE,
    paddingTop: theme.SIZES.BASE * 3,
    flexDirection: 'row',
    justifyContent: 'center',
    resizeMode: 'contain'
  },
  photo:{
    width: 40,
    height: 40,
    resizeMode: 'contain',
  },
  text:{
    fontSize: 40,
    color: Colors.orange,
    fontWeight: 'bold'
  }
});

export default Menu;
