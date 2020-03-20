import * as Constants from './assets/constants'
import React, { Component } from 'react';
import { 
  Alert ,
  Button,
  Image,
  StyleSheet,
  Text,
  TouchableHighlight,
  View
}
from 'react-native';
import {
  NavigationContainer,
  DrawerActions
} 
from '@react-navigation/native';
import { 
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem}
from '@react-navigation/drawer';
import { createStackNavigator } from '@react-navigation/stack';
import FeedScreen from './screens/feed_screen';
import ProfScreen from './screens/profile_screen';
import DrftScreen from './screens/drafts_screen';
import SettingScreen from './screens/settings_screen';
import { enableScreens } from 'react-native-screens';

enableScreens();
const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

const styles = StyleSheet.create({
  header1: {
    fontFamily: "Roboto-Black",
    color: "red"
  },
  logoTopBarImageView: {
    width: 40, 
    height: 40
  },
  drawerScreenIcon: {
    width: 20, 
    height: 20,
    borderRadius: 20/ 2,
    marginStart: 5
  },
  topBarUserIcon: {
    width: 40, 
    height: 40,
    borderRadius: 40/ 2,
    marginStart: 20
  },
  drawerUserIcon: {
    flex: 1,
    width: 90, 
    height: 90, 
    borderRadius: 90/ 2,
  }
});



function CustomDrawerContent(props) {
  return (
    <DrawerContentScrollView {...props}>
      <View style={{flex: 1, flexDirection: 'column', alignItems: 'center', padding: 10}}>
        <Image
          source={require('./Images/defaultUserIcon.jpg')}  
          style={styles.drawerUserIcon} 
        />
        <Text style={styles.header1}>Username</Text>
        <Text>@UID</Text>
        <Text>420 Followers | 69 Following</Text>
      </View>
      <DrawerItemList {...props}/>
      <DrawerItem
        label="Log out"
        onPress={() => {
          Alert.alert("Logged out") 
        }}
        icon={() => (
          <Image 
            source={require('./Images/logout.png')}
            style={styles.drawerScreenIcon} 
          />
        )}
      /> 
    </DrawerContentScrollView>
  );
}

function AppDrawerContainer() {
    return (
      <Drawer.Navigator drawerContent={props => <CustomDrawerContent {...props} />}>
        <Drawer.Screen 
          name="Feed"
          component={SettingScreen}
          options={{
            drawerIcon: () => (
              <Image 
                source={require('./Images/chittrLogo.png')}  
                style={styles.drawerScreenIcon} 
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
                source={require('./Images/profile.png')}  
                style={styles.drawerScreenIcon} 
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
                source={require('./Images/drafts.png')}  
                style={styles.drawerScreenIcon} 
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
                source={require('./Images/settings.png')}  
                style={styles.drawerScreenIcon} 
              />
            ),
          }}
        />
      </Drawer.Navigator>
    );
}

function AppStackNavigator() {
  
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Home"
        headerMode="screen"
        options={{
          headerTitleAlign: "center"
        }}
        screenOptions={{
          headerTintColor: 'white',
          headerStyle: { backgroundColor: '#3A3F3A' },
        }}
        >
        <Stack.Screen
          name="a b c"
          component={AppDrawerContainer}
          // component={{AppDrawerContainer: () => (<AppDrawerContainer {...props}/>)}}
          
          options={({ navigation }) => ( {
            headerTitleAlign: "center",

            headerLeft: () => (
              <TouchableHighlight onPress={() => { navigation.dispatch(DrawerActions.toggleDrawer()); }}>
                <Image 
                  source={require('./Images/defaultUserIcon.jpg')}  
                  style={styles.topBarUserIcon} 
                />
              </TouchableHighlight>
            ),

            headerTitle: () => (
              <Image 
                source={require('./Images/chittrLogo.png')}  
                style={styles.logoTopBarImageView} 
              />
            ),
            
            headerRight: () => (
              <Button
                onPress={() => alert('This is a button!')}
                title="Info"
                color="#fff"
              />
            )
          })}          
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default class App extends Component {
  
  render() {
    const { navigation } = this.props;
    return (
      <AppStackNavigator navigation={navigation}/>
    );
  }
}