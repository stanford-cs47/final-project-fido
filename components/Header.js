import React from 'react';
import { withNavigation } from 'react-navigation';
import { TouchableOpacity, StyleSheet, Platform, Dimensions } from 'react-native';
import { Button, Block, NavBar, Text, theme } from 'galio-framework';

import Icon from './Icon';
import Input from './Input';
import Tabs from './Tabs';
import fidoTheme from '../constants/Theme';
import { Colors, Metrics } from '../Themes'

const { height, width } = Dimensions.get('window');
const iPhoneX = () => Platform.OS === 'ios' && (height === 812 || width === 812 || height === 896 || width === 896);

const BellButton = ({isWhite, style, navigation}) => (
  <TouchableOpacity style={[styles.button, style]} onPress={() => navigation.navigate('NotImplemented')}>
    <Icon
      family="feather"
      size={20}
      name="search"
      color= "#FFFFFF"
    />
  </TouchableOpacity>
);

const FilterButton = ({isWhite, style, navigation}) => (
  <TouchableOpacity style={[styles.button, style]} onPress={() => navigation.navigate('NotImplemented')}>
    <Icon
      family="feather"
      size={20}
      name="filter"
      color= "#FFFFFF"
    />
  </TouchableOpacity>
);

const BasketButton = ({isWhite, style, navigation}) => (
  <TouchableOpacity style={[styles.button, style]} onPress={() => navigation.navigate('NotImplemented')}>
    <Icon
      family="feather"
      size={20}
      name="filter"
      color= "#FFFFFF"
    />
  </TouchableOpacity>
);

const SearchButton = ({isWhite, style, navigation}) => (
  <TouchableOpacity style={[styles.button, style]} onPress={() => navigation.navigate('Pro')}>
    <Icon
      size={16}
      family="feather"
      name="search"
      color= 'WHITE'
    />
  </TouchableOpacity>
);

class Header extends React.Component {
  handleLeftPress = () => {
    const { back, navigation } = this.props;
    return (back ? navigation.goBack() : navigation.openDrawer());
  }
  renderRight = () => {
    const { white, title, navigation } = this.props;
    const { routeName } = navigation.state;

    if (title === 'Title') {
      return [
        <SearchButton key='chat-title' navigation={navigation} isWhite={white} />,
        <FilterButton key='basket-title' navigation={navigation} isWhite={white} />
      ]
    }
    switch (routeName) {
      case 'HomeTab':
        return ([
          <BellButton key='chat-home' navigation={navigation} isWhite={white} />,
          <BasketButton key='basket-home' navigation={navigation} isWhite={white} />
        ]);
      case 'MyEventsStack':
        return ([
          <BellButton navigation={navigation} />,
          <BasketButton navigation={navigation} />,
        ]);
      case 'Bookmarks':
        return ([
          <BellButton key='chat-categories' navigation={navigation} isWhite={white} />,
          <BasketButton key='basket-categories' navigation={navigation} isWhite={white} />
        ]);
      case 'BookmarkStack':
        return ([
          <BellButton key='chat-deals' navigation={navigation} isWhite={white} />,
          <BasketButton key='basket-deals' navigation={navigation} isWhite={white} />
        ]);
      case 'Profile':
        return ([
          // <BellButton key='chat-profile' navigation={navigation} isWhite={white} />,
          // <BasketButton key='basket-deals' navigation={navigation} isWhite={white} />
        ]);
      case 'Product':
        return ([
          <SearchButton key='search-product' navigation={navigation} isWhite={white} />,
          <BasketButton key='basket-product' navigation={navigation} isWhite={white} />
        ]);
      case 'Search':
        return ([
          <BellButton key='chat-search' navigation={navigation} isWhite={white} />,
          <BasketButton key='basket-search' navigation={navigation} isWhite={white} />
        ]);
      case 'Settings':
        return ([
          // <BellButton key='chat-search' navigation={navigation} isWhite={white} />,
          // <BasketButton key='basket-search' navigation={navigation} isWhite={white} />
        ]);
      default:
        break;
    }
  }

  renderTabs = () => {
    const { tabs, tabIndex, navigation } = this.props;
    const defaultTab = tabs && tabs[0] && tabs[0].id;

    if (!tabs) return null;

    return (
      <Tabs
        data={tabs || []}
        initialIndex={tabIndex || defaultTab}
        onChange={id => navigation.setParams({ tabId: id })} />
    )
  }
  renderHeader = () => {
    const { options, tabs } = this.props;
    if (tabs || options) {
      return (
        <Block center>
          {tabs ? this.renderTabs() : null}
        </Block>
      );
    }
  }
  render() {
    const { back, title, white, transparent, bgColor, iconColor, titleColor, navigation, ...props } = this.props;
    const { routeName } = navigation.state;
    const noShadow = ['Search', 'Categories', 'Deals', 'Pro', 'Profile'].includes(routeName);
    const headerStyles = [
      !noShadow ? styles.shadow : null,
      transparent ? { backgroundColor: 'rgba(0,0,0,0)' } : null, //rgba(0,0,0,0)
    ];

    const navbarStyles = [
      styles.navbar,
      bgColor && { backgroundColor: Colors.ember }
    ];

    return (
      <Block style={headerStyles}>
        <NavBar
          back={back}
          title={title}
          style={navbarStyles}
          transparent={transparent}
          right={this.renderRight()}
          rightStyle={{ alignItems: 'center' }}
          left={
            <Icon
              name={back ? 'nav-left' : "menu-8"} family="ArgonExtra"
              size={14} onPress={this.handleLeftPress}
              color="#FFFFFF"/>
          }
          leftStyle={{ paddingVertical: 12, flex: 0.2 }}
          titleStyle={[
            styles.title,
            { color: Colors.snow}, //fidoTheme.COLORS[white ? 'WHITE' : 'HEADER']
            titleColor && { color: titleColor }
          ]}
          {...props}
        />
        {this.renderHeader()}
      </Block>
    );
  }
}

const styles = StyleSheet.create({
  button: {
    padding: 12,
    position: 'relative',
  },
  title: {
    width: '100%',
    fontSize: 16,
    fontWeight: 'bold',
  },
  navbar: {
    paddingVertical: 0,
    backgroundColor: Colors.orange,
    paddingBottom: theme.SIZES.BASE * 1.5,
    paddingTop: iPhoneX ? theme.SIZES.BASE * 4 : theme.SIZES.BASE,
    zIndex: 5,
  },
  shadow: {
    backgroundColor: Colors.ember,
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
    shadowOpacity: 0.2,
    elevation: 3,
  },
  notify: {
    backgroundColor: Colors.black,
    borderRadius: 4,
    height: theme.SIZES.BASE / 2,
    width: theme.SIZES.BASE / 2,
    position: 'absolute',
    top: 9,
    right: 12,
  },
  header: {
    backgroundColor: Colors.ember //theme.COLORS.WHITE,
  },
  divider: {
    borderRightWidth: 0.3,
    borderRightColor: Colors.ember
  },
  options: {
    marginBottom: 24,
    marginTop: 10,
    elevation: 4,
  },
  tab: {
    backgroundColor: Colors.ember,
    width: width * 0.35,
    borderRadius: 0,
    borderWidth: 0,
    height: 24,
    elevation: 0,
  },
  tabTitle: {
    lineHeight: 19,
    fontWeight: '400',
    color: Colors.ember
  },
});

export default withNavigation(Header);
