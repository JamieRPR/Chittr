import React from 'react';
import {
  Image,
  StyleSheet
} from 'react-native';

import FeedScreen from '../../../../screens/feed_screen';
import ProfScreen from '../../../../screens/profile_screen';
import DrftScreen from '../../../../screens/drafts_screen';
import SettingScreen from '../../../../screens/settings_screen';

import {
  createDrawerNavigator,
} from '@react-navigation/drawer';

import LoggedInDrawerContent from '../content/LoggedIn'
import LoggedOutDrawerContent from '../content/LoggedOut'
import {enableScreens} from 'react-native-screens';

enableScreens();

var styleGlobal = require('../../../../assets/constants/StyleSheet');
const Drawer = createDrawerNavigator();

const styles = StyleSheet.create({

});

class ChittrDrawerNav extends React.Component {

  render() {

    console.log(this.props.isLoggedIn)

    if(this.props.isLoggedIn) {
        return (
          <Drawer.Navigator
            drawerContent={(props) => <LoggedInDrawerContent {...props} setLoggedIn={this.props.setLoggedIn} user={this.props.user}/>}>
            <Drawer.Screen
              name="Feed"
              component={FeedScreen}
              options={{
                drawerIcon: () => (
                  <Image
                    source={require('../../../../assets/Images/chittrLogo.png')}
                    style={styleGlobal.drawerItemIcon}
                  />
                ),
              }}
            />
            <Drawer.Screen
              name="Profile"
              component={ProfScreen}
              options={{
                drawerIcon: () => (
                  <Image
                    source={require('../../../../assets/Images/profile.png')}
                    style={styleGlobal.drawerItemIcon}
                  />
                ),
              }}
            />
            <Drawer.Screen
              name="Drafts"
              component={DrftScreen}
              options={{
                drawerIcon: () => (
                  <Image
                    source={require('../../../../assets/Images/drafts.png')}
                    style={styleGlobal.drawerItemIcon}
                  />
                ),
              }}
            />
            <Drawer.Screen
              name="Settings"
              component={SettingScreen}
              options={{
                drawerIcon: () => (
                  <Image
                    source={require('../../../../assets/Images/settings.png')}
                    style={styleGlobal.drawerItemIcon}/>
                ),
              }}
            />
          </Drawer.Navigator>
        );
      } else {
        return (
          <Drawer.Navigator 
            drawerContent={ props => <LoggedOutDrawerContent {...props} setLoggedIn={this.props.setLoggedIn} user={this.props.user}/>}
            drawerContentOptions={{
              activeTintColor: "#FFFBF7",
              activeBackgroundColor:'#FFFBF7',
              inactiveTintColor:'#FFFBF7',
              inactiveBackgroundColor:'#FFFBF7'
            }}
          >
            <Drawer.Screen
              name="Jef"
              component={FeedScreen}
            />
          </Drawer.Navigator>
        );
      }
  }
}

export default ChittrDrawerNav