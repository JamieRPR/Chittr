import React from 'react';
import {
  Image,
  StyleSheet,
  TouchableHighlight,
  Alert,
} from 'react-native';

import SignUpScreen from '../../screens/sign_up_screen';
import ViewFollowers from '../../screens/view_followers_screen';
import ViewFollowing from '../../screens/view_following_screen';
import ChittrDrawerNav from '../nav/Drawer/nav/ChittrDrawerNav'

import {
    NavigationContainer,
    DrawerActions,
} from '@react-navigation/native';

import {
    createDrawerNavigator,
  } from '@react-navigation/drawer';

import {createStackNavigator} from '@react-navigation/stack';
import {enableScreens} from 'react-native-screens';
enableScreens();

var styleGlobal = require('../../assets/constants/StyleSheet');
const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

const styles = StyleSheet.create({
    logoTopBarImageView: {
        width: 40,
        height: 40,
      },
});

class ChittrStackNav extends React.Component {
  
    render() {

        return (
            <NavigationContainer>
                <Stack.Navigator
                    initialRouteName="Home"
                    headerMode={
                        this.props.headerMode
                    }
                    options={{
                        headerTitleAlign: 'center'
                    }}
                    screenOptions={{
                        headerTintColor: 'white',
                        headerStyle: {backgroundColor: '#3A3F3A'}
                    }}
                >
                    <Stack.Screen
                        name="Feed Screen"
                        children={props =>  <ChittrDrawerNav isLoggedIn={this.props.isLoggedIn} setLoggedIn={this.props.setLoggedIn} user={this.props.user}/> }
                        options={({navigation}) => ({
                            headerTitleAlign: 'center',
                            headerLeft: () => (
                                <TouchableHighlight
                                    onPress={() => {
                                        navigation.dispatch(DrawerActions.toggleDrawer());
                                    }}
                                >
                                    <Image
                                        source={require('../../assets/Images/defaultUserIcon.jpg')}
                                        style={styleGlobal.topBarUserIcon}
                                    />
                                </TouchableHighlight>
                            ),
                            headerTitle: () => (
                                <TouchableHighlight
                                    onPress={() => {
                                        // TODO return to home
                                    }}
                                >
                                    <Image
                                        source={require('../../assets/Images/chittrLogo.png')}
                                        style={styles.logoTopBarImageView}
                                    />
                                </TouchableHighlight>
                            ),
                            headerRight: () => (
                                <TouchableHighlight 
                                    onPress={() => {
                                        if (this.props.isLoggedIn) {
                                            this.props.setModalOpen(true)
                                        } else {
                                            Alert.alert('Please login before creating a new chit.')
                                        }
                                    }}
                                >
                                    <Image
                                        source={require('../../assets/Images/newChit.png')}
                                        style={styleGlobal.topBarNewChit}
                                    />
                                </TouchableHighlight>
                            ),
                        })}
                    />
                    <Drawer.Screen 
                        name="Sign Up" 
                        component={SignUpScreen} 
                    />
                    <Drawer.Screen 
                        name="Followers" 
                        component={ViewFollowers} 
                    />
                    <Drawer.Screen 
                        name="Following" 
                        component={ViewFollowing} 
                    />
                </Stack.Navigator>
        </NavigationContainer>
        )
    }
}

export default ChittrStackNav