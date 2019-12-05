import React from "react";
import { DrawerItems } from "react-navigation";
import {
  ScrollView,
  StyleSheet,
  Dimensions,
  Image,
  Text,
  View
} from "react-native";
import { theme } from "galio-framework";
import { Colors, Metrics } from '../Themes'
import fidoTheme from "../constants/Theme";

import Images from "../constants/Images";

const { width } = Dimensions.get("screen");

const Drawer = props => (
  <View style={styles.container} forceInset={{ top: 'always', horizontal: 'never' }}>
    <View flex={0.5} style={styles.header}>
      <Image source={Images.Profile}/>
      <Text style={styles.text1}>Doug</Text>
      <Text style={styles.text2}>@doug-the-dog</Text>
       <Text style={styles.text3}>Owner: Eddie Arreola</Text>
    </View>
    <View flex>
      <ScrollView showsVerticalScrollIndicator={false} style={{ flex: 1 }}>
        <DrawerItems {...props} />
      </ScrollView>
    </View>
    <Text style={styles.finePrint}>FIDO        Privacy Policy      Terms and Conditions</Text>
  </View>
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
    resizeMode: 'contain',
  },
  header: {
    paddingHorizontal: 28,
    paddingBottom: theme.SIZES.BASE,
    paddingTop: theme.SIZES.BASE * 4,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    resizeMode: 'contain'
  },
  text1:{
    fontSize: 20,
    marginBottom: 5,
    fontWeight: 'bold'
  },
  text2:{
    fontSize: 16,
    marginBottom: 5
  },
  text3:{
    fontSize: 16,
    marginBottom: 5
  },
  finePrint: {
    fontSize: 10,
    alignSelf: "flex-end",
    marginBottom: 20,
    paddingHorizontal: 40,
  }
});

export default Menu;
