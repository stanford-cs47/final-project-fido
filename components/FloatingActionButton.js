import { StyleSheet, View, Image, TouchableOpacity, Alert} from 'react-native';
import React from "react";
import { withNavigation } from 'react-navigation';
import { Colors, Metrics } from '../Themes'
import { Entypo } from '@expo/vector-icons';
import { Images } from '../constants/';
import Icon from './Icon';


const PlusButton = ({navigation, db}) => (
  <View style={styles.MainContainer}>
    <TouchableOpacity activeOpacity={0.5} onPress={() =>
      navigation.navigate('Register', {db: db})} style={styles.TouchableOpacityStyle} >
    <View style={styles.PlusStyle}>
      <Icon
       family="feather"
       size={30}
       name="plus"
       color= "#FFFFFF"
       />
    </View>
    </TouchableOpacity>
  </View>
);

//{uri : 'https://reactnativecode.com/wp-content/uploads/2017/11/Floating_Button.png'}
class FloatingActionButton extends React.Component {

  SampleFunction=()=>{
      Alert.alert("Plus Button Clicked");
  }

  handleLeftPress = () => {
    const { back, navigation } = this.props;
    return (back ? navigation.goBack() : navigation.openDrawer());
  }
  renderRight = () => {
    const { navigation } = this.props;
    const { routeName } = navigation.state;

    return [
      <SearchButton key='chat-title' navigation={navigation} isWhite={white} />,
      <FilterButton key='basket-title' navigation={navigation} isWhite={white} />
    ]
  }

  render() {
    const { back, navigation, db } = this.props;
    return (
      <PlusButton navigation = {this.props.navigation} db = {this.props.navigation}/>
    );
  }
}

const styles = StyleSheet.create({
  MainContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor : '#F5F5F5'
  },

  TouchableOpacityStyle:{
    position: 'absolute',
    width: 50,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    right: 30,
    bottom: 30,
  },

  FloatingButtonStyle: {
    resizeMode: 'contain',
    width: 50,
    height: 50,
  },

  PlusStyle: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 50,
    height: 50,
    backgroundColor: Colors.orange,
    borderRadius: 25,
  }
});

export default withNavigation(FloatingActionButton);
