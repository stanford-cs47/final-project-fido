import React from "react";
import { Easing, Animated } from "react-native";
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
//import Icon from 'react-feather';
//import { Icon } from 'galio-framework';
import Icon from '../components/Icon';

// screens
import Home from "../screens/Home";
import Onboarding from "../screens/Onboarding";
import Pro from "../screens/Pro";
import Profile from "../screens/Profile";
import Register from "../screens/Register";
import Elements from "../screens/Elements";
import Articles from "../screens/Articles";
import Bookmarks from "../screens/Bookmarks"
import MyEvents from "../screens/MyEvents"
import HappeningLater from "../screens/HappeningLater"
// drawer
import Menu from "./Menu";
import DrawerItem from "../components/DrawerItem";

// header for screens
import Header from "../components/Header";

const transitionConfig = (transitionProps, prevTransitionProps) => ({
  transitionSpec: {
    duration: 400,
    easing: Easing.out(Easing.poly(4)),
    timing: Animated.timing
  },
  screenInterpolator: sceneProps => {
    const { layout, position, scene } = sceneProps;
    const thisSceneIndex = scene.index;
    const width = layout.initWidth;

    const scale = position.interpolate({
      inputRange: [thisSceneIndex - 1, thisSceneIndex, thisSceneIndex + 1],
      outputRange: [4, 1, 1]
    });
    const opacity = position.interpolate({
      inputRange: [thisSceneIndex - 1, thisSceneIndex, thisSceneIndex + 1],
      outputRange: [0, 1, 1]
    });
    const translateX = position.interpolate({
      inputRange: [thisSceneIndex - 1, thisSceneIndex],
      outputRange: [width, 0]
    });

    const scaleWithOpacity = { opacity };
    const screenName = "Search";

    if (
      screenName === transitionProps.scene.route.routeName ||
      (prevTransitionProps &&
        screenName === prevTransitionProps.scene.route.routeName)
    ) {
      return scaleWithOpacity;
    }
    return { transform: [{ translateX }] };
  }
});

const ElementsStack = createStackNavigator({
  Elements: {
    screen: Elements,
    navigationOptions: ({ navigation }) => ({
      header: <Header title="Elements" navigation={navigation} />
    })
  }
},{
  cardStyle: {
    backgroundColor: "#F8F9FE"
  },
  transitionConfig
});

const ArticlesStack = createStackNavigator({
  Articles: {
    screen: Articles,
    navigationOptions: ({ navigation }) => ({
      header: <Header title="Articles" navigation={navigation} />
    })
  }
},{
  cardStyle: {
    backgroundColor: "#F8F9FE"
  },
  transitionConfig
});

const ProfileStack = createStackNavigator(
  {
    Profile: {
      screen: Profile,
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
    transitionConfig
  }
);

const BookmarkStack = createStackNavigator({
  Bookmarks: {screen: Bookmarks},
  Meh2: {screen: MyEvents}
},
{
  headerMode: 'float',
  initialRouteName: 'Bookmarks',
})


const MyEventsStack = createStackNavigator({
  MyEvents: {screen: MyEvents},
  Meh: {screen: Bookmarks}
},
{
  headerMode: 'float',
  initialRouteName: 'MyEvents',
})

const HomeTab = createMaterialTopTabNavigator({
  Home: {screen: Home},
  HappeningLater: {screen: HappeningLater},
},
{
  headerMode: 'float',
  initialRouteName: 'Home',
  tabBarOptions: {activeTintColor: Colors.orange, inactiveTintColor: "black", style: {backgroundColor: '#FFFFFF'}},
})

const MainTab = createBottomTabNavigator({
  MyEventsStack: {screen: MyEventsStack},
  HomeTab: {screen: HomeTab},
  BookmarkStack: {screen: BookmarkStack},
},
{
  headerMode: 'float',
  initialRouteName: 'HomeTab',
  tabBarOptions: {activeTintColor: Colors.orange}
})

const HomeStack = createStackNavigator(
  {
    Home: {
      screen: MainTab,
      navigationOptions: ({ navigation }) => ({
        header: <Header search options title="Home" navigation={navigation} />,
      }),
    },
    Pro: {
      screen: Pro,
      navigationOptions: ({ navigation }) => ({
        header: (
          <Header left={<Block />} white transparent title="" navigation={navigation} />
        ),
        headerTransparent: true
      })
    },
    Register: {
      screen: Register,
      navigationOptions: ({ navigation }) => ({
      })
    }
  },
  {
    cardStyle: {
      backgroundColor: "#F8F9FE"
    },
    transitionConfig
  }
);

BookmarkStack.navigationOptions = ({ navigation }) => {
  return {
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

MyEventsStack.navigationOptions = ({ navigation }) => {
  return {
    tabBarLabel: 'MyEvents',
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

Home.navigationOptions = ({ navigation }) => {
  return {
    tabBarLabel: 'Happening Now',
  };
};

HomeTab.navigationOptions = ({ navigation }) => {
  return {
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

// divideru se baga ca si cum ar fi un ecrna dar nu-i nimic duh
const AppStack = createDrawerNavigator(
  {
    Onboarding: {
      screen: Onboarding,
      navigationOptions: {
        drawerLabel: () => {}
      }
    },
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
    Account: {
      screen: Register,
      navigationOptions: navOpt => ({
        drawerLabel: ({ focused }) => (
          <DrawerItem focused={focused} screen="Register" title="Account" />
        )
      })
    },
    Elements: {
      screen: ElementsStack,
      navigationOptions: navOpt => ({
        drawerLabel: ({ focused }) => (
          <DrawerItem focused={focused} screen="Elements" title="Elements" />
        )
      })
    },
    Articles: {
      screen: ArticlesStack,
      navigationOptions: navOpt => ({
        drawerLabel: ({ focused }) => (
          <DrawerItem focused={focused} screen="Articles" title="Articles" />
        )
      })
    }
  },
  Menu
);

const AppContainer = createAppContainer(AppStack);
export default AppContainer;
