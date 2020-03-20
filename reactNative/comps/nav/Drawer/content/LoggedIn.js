import React from 'react';
import {
  StyleSheet,
  View,
  Image,
  Text,
  Alert
} from 'react-native';

import {
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from '@react-navigation/drawer';

import {enableScreens} from 'react-native-screens';
enableScreens();

import {
  DrawerActions,
} from '@react-navigation/native';

var styleGlobal = require('../../../../assets/constants/StyleSheet');

const styles = StyleSheet.create({

});

class LoggedInDrawerContent extends React.Component {

  constructor(props) {
    super(props)
    this.state={
      
    }
  }

  _logout = () => {
    this.setState({isLoading: true})
    var proceed = false;
    fetch('http://10.0.2.2:3333/api/v0.0.5/logout',
      {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
    })

      .then((response) => {
          if (response.status==200) proceed = true;
      })
      .then(() => {
        this.props.navigation.dispatch(DrawerActions.toggleDrawer());
        this.props.setLoggedIn(false)
      })
      .catch(error => {
        console.log("Error fetching data-----------", error);
        this.setState({ isLoading: false })
        Alert.alert("Error logging out, please try again.")
    });
  }

  render() {
    return (
      <DrawerContentScrollView {...this.props}>
        <View
          style={{
            flex: 1,
            flexDirection: 'column',
            alignItems: 'center',
            padding: 10,
          }}>
          <Image
            source={require('../../../../assets/Images/defaultUserIcon.jpg')}
            style={styleGlobal.drawerLargeIcon}
          />
          <Text style={styles.header1}>{this.props.user.givenName} {this.props.user.familyName}</Text>
          <Text>@UID</Text>
          <Text>420 Followers | 69 Following</Text>
        </View>
        <DrawerItemList {...this.props} />
        <DrawerItem
          label="Log out"
          onPress={() => this._logout(this.props)}
          icon={() => (
            <Image
              source={require('../../../../assets/Images/logout.png')}
              style={styleGlobal.drawerItemIcon}
            />
          )}
        />
      </DrawerContentScrollView>
    );
  }
}

export default LoggedInDrawerContent