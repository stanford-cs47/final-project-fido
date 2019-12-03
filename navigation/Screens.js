import React from "react";
import { Easing, Animated, StyleSheet } from "react-native";
import {
  createStackNavigator,
  createDrawerNavigator,
  createAppContainer,
  createBottomTabNavigator,
  createMaterialTopTabNavigator
} from "react-navigation";
import { Entypo } from '@expo/vector-icons';
import { Block } from "galio-framework";
import { Colors, Metrics } from '../Themes';
import Icon from '../components/Icon';

// screens
import Home from "../screens/Home";
import Onboarding from "../screens/Onboarding";
import Pro from "../screens/Pro";
import Profile from "../screens/Profile";
import Register from "../screens/Register";
import Elements from "../screens/Elements";
import Articles from "../screens/Articles";
import Bookmarks from "../screens/Bookmarks";
import MyEvents from "../screens/MyEvents";
import HappeningLater from "../screens/HappeningLater";
import NotImplemented from "../screens/NotImplemented";
import ExpandedEvent from "../screens/ExpandedEvent";
import Map from "../screens/Map";
// drawer
import Menu from "./Menu";
import DrawerItem from "../components/DrawerItem";

// header for screens
import Header from "../components/Header";

const HelpStack = createStackNavigator({
  Elements: {
    screen: NotImplemented,
    navigationOptions: ({ navigation }) => ({
      header: <Header title="Help" navigation={navigation} />
    })
  }
},{
  cardStyle: {
    backgroundColor: "#F8F9FE"
  },
  //transitionConfig
});

const SettingsStack = createStackNavigator({
  Settings: {
    screen: NotImplemented,
    navigationOptions: ({ navigation }) => ({
      header: <Header title="Settings" navigation={navigation} />
    })
  }
},{
  cardStyle: {
    backgroundColor: "#F8F9FE"
  },
  //transitionConfig
});

const ProfileStack = createStackNavigator(
  {
    Profile: {
      screen: NotImplemented,
      navigationOptions: ({ navigation }) => ({
        header: (
          <Header white transparent title="Profile" iconColor={'#FFF'} navigation={navigation} />
        ),
        headerTransparent: true
      })
    }
  },
  {
    cardStyle: { backgroundColor: "#FFFFFF" },
    //transitionConfig
  }
);

const BookmarkStack = createStackNavigator({
  Bookmarks: {screen: Bookmarks},
  ExpandedEvent: {screen: ExpandedEvent,
    navigationOptions: () => ({
      headerTintColor: "white",
      headerStyle:{backgroundColor: Colors.orange},
    }),
  },
  Map: {screen: Map}
},
{
  headerMode: 'float',
  initialRouteName: 'Bookmarks',
})

Bookmarks.navigationOptions = ({navigation}) => {
  return {
    header: (<Header title= "Bookmarks" navigation={navigation} />),
    headerMode: 'float',
  }
}

BookmarkStack.navigationOptions = ({ navigation, db }) => {
  let tabBarVisible = true;
  if (navigation.state.routes.length > 1) {
    navigation.state.routes.map(route => {
      if (route.routeName === "Map" || route.routeName === "ExpandedEvent") {
        tabBarVisible = false;
      }
    });
  }
  return {
    tabBarVisible,
    header: <Header title= "Bookmarks" navigation={navigation} />,
    tabBarLabel: 'Bookmarks',
    tabBarIcon: ({ tintColor }) => (
      <Icon
        family="feather"
        size={30}
        name="bookmark"
        color= {tintColor}
      />
    ),
  };
};

MyEvents.navigationOptions = ({navigation}) => {
  return {
    header: <Header title= "My Events" navigation={navigation} />,
  }
}

const MyEventsStack = createStackNavigator({
  MyEvents: {screen: MyEvents},
  Map: {screen: Map}
},
{
  headerMode: 'float',
  initialRouteName: 'MyEvents',
});

MyEventsStack.navigationOptions = ({ navigation, db }) => {
  let tabBarVisible = true;
  if (navigation.state.routes.length > 1) {
    navigation.state.routes.map(route => {
      if (route.routeName === "Map") {
        tabBarVisible = false;
      }
    });
  }
  return {
    tabBarVisible,
    tabBarLabel: 'My Events',
    tabBarIcon: ({ tintColor }) => (
      <Icon
        family="feather"
        size={30}
        name="user"
        color= {tintColor}
      />
    ),
  };
};


HappeningLater.navigationOptions = ({ navigation, db }) => {
  return {
    tabBarLabel: 'Happening Later',
  };
};

Home.navigationOptions = ({ navigation, db }) => {
  return {
    tabBarLabel: 'Active Now',
  };
};

const HomeTab = createMaterialTopTabNavigator({
  Home: {screen: Home},
  HappeningLater: {screen: HappeningLater},
},
{
  headerMode: 'float',
  initialRouteName: 'Home',
  tabBarOptions: {
    activeTintColor: Colors.orange,
    inactiveTintColor: "black",
    style: {backgroundColor: '#FFFFFF'},
    upperCaseLabel: false,
    activeTintColor: Colors.orange,
    indicatorStyle: {color: Colors.orange, backgroundColor: Colors.orange}
  },
})

HomeTab.navigationOptions = ({ navigation, db }) => {
  return {
    header: <Header title= "Home" navigation={navigation} />,
    tabBarLabel: 'Home',
    tabBarIcon: ({ tintColor }) => (
      <Icon
        family="feather"
        size={30}
        name="home"
        color= {tintColor}
      />
    ),
  };
};

const MyHomeStack = createStackNavigator({
  HomeTab: {screen: HomeTab},
  NotImplemented: {screen: NotImplemented},
  Map: {screen: Map},
  ExpandedEvent: {screen: ExpandedEvent,
    navigationOptions: () => ({
      headerTintColor: "white",
      headerStyle:{backgroundColor: Colors.orange},
    }),
  }
},
{
  headerMode: 'float',
  initialRouteName: 'HomeTab',
});

MyHomeStack.navigationOptions = ({ navigation, db }) => {
  let tabBarVisible = true;
  if (navigation.state.routes.length > 1) {
    navigation.state.routes.map(route => {
      if (route.routeName === "Map" || route.routeName === "ExpandedEvent") {
        tabBarVisible = false;
      }
    });
  }
  return {
    tabBarVisible,
    tabBarLabel: 'Home',
    tabBarIcon: ({ tintColor }) => (
      <Icon
        family="feather"
        size={30}
        name="home"
        color= {tintColor}
      />
    ),
  };
};

const MainTab = createBottomTabNavigator({
  MyEventsStack2: {screen: MyEventsStack,},
  MyHomeStack: {screen: MyHomeStack},
  BookmarkStack: {screen: BookmarkStack},
},
{
  initialRouteName: 'MyHomeStack',
  tabBarOptions: {activeTintColor: Colors.orange}
})

Register.navigationOptions = ({navigation}) => {
  return {
    headerMode: 'float',
    header: <Header title= "Home" navigation={navigation} />,
    headerStyle: Styles.customHeader,
    headerTitle: "New Event",
    headerTintColor: "#FFFFFF"
  }
}

const HomeStack = createStackNavigator(
  {
    Home: {
      screen: MainTab,
      headerMode: 'none',
      navigationOptions: ({ navigation, db }) => ({
        //headerTransparent: true,
        //header: <Header search options title="Home" navigation={navigation} />,
      }),
    },
    Pro: {
      screen: Pro,
      navigationOptions: ({ navigation, db }) => ({
        // header: (
        //   {/*<Header left={<Block />} white transparent title="" navigation={navigation} />*/}
        // ),
        headerTransparent: true
      })
    },
    Register: {
      screen: Register,
      navigationOptions: ({ navigation, db }) => ({
        headerMode: 'float',
        headerStyle: Styles.customHeader,
        headerTitle: "New Event",
        headerTintColor: "#FFFFFF"
      }),
      headerMode: 'float',
    },
    NotImplemented: {
      screen: NotImplemented,
      navigationOptions: ({ navigation, db }) => ({
      }),
    },
  },
  {
    headerMode: 'none',
    cardStyle: {
      backgroundColor: "#F8F9FE"
    },
    //transitionConfig
  }
);

// divideru se baga ca si cum ar fi un ecrna dar nu-i nimic duh
const AppStack = createDrawerNavigator(
  {
    // Onboarding: {
    //   screen: Onboarding,
    //   navigationOptions: {
    //     drawerLabel: () => {}
    //   }
    // },
    Home: {
      screen: HomeStack,
      navigationOptions: navOpt => ({
        drawerLabel: ({ focused }) => (
          <DrawerItem focused={focused} title="Home" />
        )
      })
    },
    Profile: {
      screen: ProfileStack,
      navigationOptions: navOpt => ({
        drawerLabel: ({ focused }) => (
          <DrawerItem focused={focused} screen="Profile" title="Profile" />
        )
      })
    },
    Friends: {
      screen: SettingsStack,
      navigationOptions: navOpt => ({
        drawerLabel: ({ focused }) => (
          <DrawerItem focused={focused} screen="NotImplemented" title="Friends" />
        )
      })
    },
    History: {
      screen: SettingsStack,
      navigationOptions: navOpt => ({
        drawerLabel: ({ focused }) => (
          <DrawerItem focused={focused} screen="NotImplemented" title="History" />
        )
      })
    },
    Messages: {
      screen: SettingsStack,
      navigationOptions: navOpt => ({
        drawerLabel: ({ focused }) => (
          <DrawerItem focused={focused} screen="NotImplemented" title="Messages" />
        )
      })
    },
    Help: {
      screen: HelpStack,
      navigationOptions: navOpt => ({
        drawerLabel: ({ focused }) => (
          <DrawerItem focused={focused} screen="NotImplemented" title="Help" />
        )
      })
    },
    Settings: {
      screen: SettingsStack,
      navigationOptions: navOpt => ({
        drawerLabel: ({ focused }) => (
          <DrawerItem focused={focused} screen="NotImplemented" title="Settings" />
        )
      })
    },
  },
  Menu
);

const Styles = StyleSheet.create({
  customHeader: {
    backgroundColor: Colors.orange,
    color: "#FFFFFF",
  },
  temp: {
    color: Colors.orange,
    backgroundColor: Colors.orange
  }
});

const AppContainer = createAppContainer(AppStack);
export default AppContainer;
