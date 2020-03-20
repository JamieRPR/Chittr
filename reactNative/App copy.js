// import * as Constants from './assets/constants'
import React, {Component, useState, setState} from 'react';
import {
  Alert,
  Button,
  Image,
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
  Modal,
} from 'react-native';
import {
  NavigationContainer,
  DrawerActions,
  StackActions,
} from '@react-navigation/native';
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from '@react-navigation/drawer';
import {createStackNavigator} from '@react-navigation/stack';

import FeedScreen from './screens/feed_screen';
import ProfScreen from './screens/profile_screen';
import DrftScreen from './screens/drafts_screen';
import SettingScreen from './screens/settings_screen';
import SignUpScreen from './screens/sign_up_screen';
import ViewFollowers from './screens/view_followers_screen';
import ViewFollowing from './screens/view_following_screen';

import { Icon } from 'react-native-elements'
import {enableScreens} from 'react-native-screens';
import {TextInput} from 'react-native-gesture-handler';

import {FAB} from 'react-native-paper';
import {SearchBar} from 'react-native-elements';
import {SafeAreaView} from 'react-native-safe-area-context';

enableScreens();
var styleGlobal = require('./assets/constants/StyleSheet');
const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

const styles = StyleSheet.create({
  customUserInputField: {
    paddingStart: 25,
    paddingEnd: 25,
    backgroundColor: 'red',
  },
  header1: {
    fontFamily: 'Roboto-Black',
    color: 'red',
  },
  logoTopBarImageView: {
    width: 40,
    height: 40,
  },

  topBarUserIcon: {
    width: 50,
    height: 50,
    borderRadius: 50 / 2,
    marginStart: 8,
  },
  chittrTitle: {
    alignSelf: 'flex-end',
    paddingLeft: 5,
    fontSize: 18,
    color: '#3A3F3A',
  },
  fab: {
    position: 'absolute',
    backgroundColor: '#E26A6A',
    margin: 16,
    right: 0,
    bottom: 0,
  },
});

class DrawerContentLoggedOut extends React.Component {

  // constructor(props) {
  //   super(props);
  // }

  _login = () => {

    this.setState({isLoading: true})
    var proceed = false;
    fetch('http://10.0.2.2:3333/api/v0.0.5/login',
      {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          // email: this.state.email,
          // password: this.state.password,
          email: 'test@gmail.com',
          password: 'password',
      })
    })
      .then((response) => response.json())
      .then((response) => {
          if (response.status==200) proceed = true;
          // else this.setState({ message: response.message });
      })
      .then(() => {
        this.setState({ isLoading: false, isLoggedIn: true }, () => {
          this.props.navigation.dispatch(DrawerActions.toggleDrawer());
          console.log("isLoggedIn: " + this.state.isLoggedIn)
        })



        // this.props.setLoggedIn(true)
        // console.log("isLoggedIn: " + this.state.isLoggedIn)
      })
      .catch(error => {
        console.log("Error fetching data-----------", error);
        this.setState({ isLoading: false })
        // Alert.alert("Error logging in, please try again.")
    });
  }

  // const { email, password } = this.state;
  render() {
    return (
      <DrawerContentScrollView props={this.props}>
        <View style={{flex: 1, flexDirection: 'column', alignItems: 'center', padding: 10}}>
          <Image
            source={require('./assets/Images/peopleTalking.jpg')}
            style={styleGlobal.drawerLargeBox}
          />
          <Text style={styleGlobal.drawerBody}>No user account was found here... Login or Sign Up to unlock all of Chittrs features!</Text>
  
          <View style={styleGlobal.userInputField}>
            <Text style={styleGlobal.userInputFieldText}>Email</Text>
            <TextInput 
              style={styleGlobal.userInputFieldTextInput}
              onChangeText={email => this.setState({email})}
              placeholder="Enter here..."
            />
          </View>
  
          <View style={styleGlobal.userInputField}>
            <Text style={styleGlobal.userInputFieldText}>Password</Text>
            <TextInput 
              style={styleGlobal.userInputFieldTextInput}
              onChangeText={password => this.setState({password})}
              placeholder="Enter here..."
            />
          </View>
  
          <View style={{
            flex: 1,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            marginTop: 10,
          }}>
  
            <View style={{
              flex: 1,
              paddingStart: 25,
              paddingEnd: 12.5,
            }}>
              <Button
                onPress={() => this.props.navigation.navigate('Sign Up')}
                title="SIGN UP"
                color="#CC7F66"
              />
            </View>
  
            <View style={{
              flex: 1,
              paddingStart: 12.5,
              paddingEnd: 25,
            }}>
              <Button
                onPress={() => this._login(this.props)}
                style={{
                  borderColor: 'red'
                  // flexBasis:'auto',
                  // margin: 20
                }}
                title="LOGIN"
                color="#99CC66"
              />
            </View>
          </View>
        </View>
      </DrawerContentScrollView>
    );
  }
}

function DrawerContentLoggedIn(props) {
  return (
    <DrawerContentScrollView {...props}>
      <View
        style={{
          flex: 1,
          flexDirection: 'column',
          alignItems: 'center',
          padding: 10,
        }}>
        <Image
          source={require('./assets/Images/defaultUserIcon.jpg')}
          style={styleGlobal.drawerLargeIcon}
        />
        <Text style={styles.header1}>Username</Text>
        <Text>@UID</Text>
        <Text>420 Followers | 69 Following</Text>
      </View>
      <DrawerItemList {...props} />
      <DrawerItem
        label="Log out"
        onPress={() => {
          Alert.alert('Logged out');
        }}
        icon={() => (
          <Image
            source={require('./assets/Images/logout.png')}
            style={styleGlobal.drawerItemIcon}
          />
        )}
      />
    </DrawerContentScrollView>
  );
}

function AppDrawerContainer(state, setLoggedIn) {

  if(state.isLoggedIn) {
    return (
      <Drawer.Navigator
        drawerContent={props => <DrawerContentLoggedIn {...props} />}>
        <Drawer.Screen
          name="Feed"
          component={FeedScreen}
          options={{
            drawerIcon: () => (
              <Image
                source={require('./assets/Images/chittrLogo.png')}
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
                source={require('./assets/Images/profile.png')}
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
                source={require('./assets/Images/drafts.png')}
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
                source={require('./assets/Images/settings.png')}
                style={styleGlobal.drawerItemIcon}/>
            ),
          }}
        />
      </Drawer.Navigator>
    );
  } else {
    return (
      <Drawer.Navigator 
        drawerContent={ props => <DrawerContentLoggedOut {...props} setLoggedIn={setLoggedIn}/>}
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

function AppStackNavigator({headerMode, state, setModalOpen, navigation, setLoggedIn}) {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Home"
        headerMode={headerMode}
        options={{
          headerTitleAlign: 'center',
        }}
        screenOptions={{
          headerTintColor: 'white',
          headerStyle: {backgroundColor: '#3A3F3A'},
      }}>
        <Stack.Screen
          name="Feed Screen"
          children={() => ( <AppDrawerContainer navigation={navigation} setLoggedIn={setLoggedIn}/> )}
          options={({navigation}) => ({
            headerTitleAlign: 'center',
            headerLeft: () => (
              <TouchableHighlight
                onPress={() => {
                  navigation.dispatch(DrawerActions.toggleDrawer());
                  console.log("isLoggedIn: " + state.isLoggedIn)
                }}>
                <Image
                  source={require('./assets/Images/defaultUserIcon.jpg')}
                  style={styleGlobal.topBarUserIcon}
                />
              </TouchableHighlight>
            ),
            headerTitle: () => (
              <TouchableHighlight
                onPress={() => {
                  // TODO return to home
                }}>
                <Image
                  source={require('./assets/Images/chittrLogo.png')}
                  style={styles.logoTopBarImageView}
                />
              </TouchableHighlight>
            ),
            headerRight: () => (
              <TouchableHighlight onPress={() => setModalOpen(true)}>
                <Image
                  source={require('./assets/Images/newChit.png')}
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
  );
}

function NewChitPopUp({modalOpen, setModalOpen}) {
  return (
    <Modal animationType="fade" transparent={true} visible={modalOpen}>
      <View style={styleGlobal.modalContainer}>
        <View
          style={{
            backgroundColor: '#C3DFE0',
            marginStart: 20,
            marginEnd: 20,
            marginTop: 80,
            marginBottom: 80,
          }}>
          <View style={{flexDirection: 'row', padding: 10}}>
            <Image
              source={require('./assets/Images/defaultUserIcon.jpg')}
              style={styles.topBarUserIcon}
            />
            <Text style={styles.chittrTitle}>@userName</Text>
          </View>
          {/* TODO:
            - Post Button
            - Word Limit
            - Tap outside dismiss
            */}
          <TextInput
            style={{
              margin: 10,
              flex: 0,
              minHeight: 100,
              textAlign: 'left',
              backgroundColor: '#FFFBF7',
              borderRadius: 5,
              marginStart: 6,
              marginEnd: 6,
              textAlignVertical: 'top',
            }}
            multiline={true}
            placeholder="Spread the word with chittr..."
            placeholderTextColor="grey"
          />

          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              alignSelf: 'baseline',
              backgroundColor: 'red',
            }}>
            <View style={{flex: 1}}>
              <Button
                title={'CANCEL'}
                color="#E26A6A"
                onPress={() => {
                  setModalOpen(false);
                }}
              />
            </View>
            <View style={{flex: 1}}>
              <Button title={'POST'} color="#99CC66" />
            </View>
          </View>
        </View>
      </View>
    </Modal>
  );
}

function StackRef({headerMode, state, navigation, setModalOpen,setLoggedIn}) {
  return (
    <AppStackNavigator
      headerMode={headerMode}
      state={state}
      navigation={navigation}
      setModalOpen={setModalOpen}
      setLoggedIn={setLoggedIn}
    />
  );
}

export default class App extends Component {
  state = {
    isLoading: false,

    search: '',
    modalOpen: false,
    isLoggedIn: false,
    isSearching: false,
    headerMode: 'screen',

    email: '',
    password: '',
  };
  // isSearchingBool: isSearching

  isSearching = bool => {
    if (bool) {
      this.setState({
        headerMode: 'none'
      })
      this.setState({
        isSearching: bool
      })
    } else {
      this.setState({
        headerMode: 'screen'
      })
      this.setState({
        isSearching: bool
      })
    }
  } 

  updateSearch = search => {
    this.setState({search});
  };

  setModalOpen = visible => {
    this.setState({
      modalOpen: visible,
    });
  };

  setLoggedIn = bool => {
    this.setState({
      isLoggedIn: bool
    })
  }

  

  render() {
    if (this.state.isSearching) {
      return (
        <View style={styleGlobal.container}>
          <View>
            <SearchBar
              // ref={search => this.search = search}
              placeholder="Type Here..."
              onChangeText={this.updateSearch}
              value={this.state.search}

              clearIcon={() => 
                <Image
                  source={require('./assets/Images/defaultUserIcon.jpg')}
                  style={styleGlobal.searchBarIcon}
                />
              }

              // cancelIcon={() => 
              //   <Image
              //   source={require('./assets/Images/search.png')}
              //   style={styleGlobal.searchBarIcon}
              //   />
              // }
              onCancel={() => this.isSearching(false)}
              showsCancelButton={true}

              // searchIcon={() => 
              //   <Image
              //     source={require('./assets/Images/search.png')}
              //     style={styleGlobal.searchBarIcon}
              //   />
              // }
              
              searchIcon={() => 
                <TouchableHighlight
                  onPress={() => {
                  this.isSearching(false)
                }}>
                  <Image
                    source={require('./assets/Images/defaultUserIcon.jpg')}
                    style={styleGlobal.searchBarIcon}
                  />
              </TouchableHighlight>
              }



            />
          </View>
          <StackRef
            headerMode={this.state.headerMode}
            state={this.state}
            navigation={this.props.navigation}
            setModalOpen={this.setModalOpen}
            setLoggedIn={this.setLoggedIn}
          />
        </View>
      );
    } else {
      return (
        <View style={styleGlobal.container}>
          <NewChitPopUp
            modalOpen={this.state.modalOpen}
            setModalOpen={this.setModalOpen}
          />
          <StackRef
            headerMode={this.state.headerMode}
            state={this.state}
            navigation={this.props.navigation}
            setModalOpen={this.setModalOpen}
            setLoggedIn={this.setLoggedIn}
          />
          <FAB
            style={styles.fab}
            icon={require('./assets/Images/search.png')}
            onPress={() => this.isSearching(true)}
          />
        </View>
      );
    }
  }
}
