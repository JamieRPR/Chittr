import React, {Component} from 'react';
import {
  StyleSheet,
  View,
  SafeAreaView,
} from 'react-native';

import {enableScreens} from 'react-native-screens';
import {TextInput} from 'react-native-gesture-handler';
import {FAB} from 'react-native-paper';
import ChittrStackNav from './comps/nav/ChittrStackNav'
import NewChitPopUp from './comps/frag/NewChitPopUp'
import ChittrSearchBar from './comps/nav/ChittrSearchBar';

enableScreens();
var styleGlobal = require('./assets/constants/StyleSheet');

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
  

  topBarUserIcon: {
    width: 50,
    height: 50,
    borderRadius: 50 / 2,
    marginStart: 8,
  },

  fab: {
    position: 'absolute',
    backgroundColor: '#E26A6A',
    margin: 16,
    right: 0,
    bottom: 0,
  },
});

export default class App extends Component {
  constructor() {
    super()
    this.state = {
      
      user: {
        id: 0,
        token: '',
        photo: '',
        givenName: '',
        familyName: '',
        email: '',
      },

      isLoading: false,
  
      search: '',
      isSearching: false,
      headerMode: 'screen',

      modalOpen: false,
      isLoggedIn: false,
    };  
  }
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
          <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
            <ChittrSearchBar 
              search={this.state.search}
              updateSearch={this.updateSearch}
              isSearching={this.isSearching}
            />
          </SafeAreaView>
        </View>
      );
    } else {
      return (
        <View style={styleGlobal.container}>
          <NewChitPopUp 
            user={this.state.user}
            modalOpen={this.state.modalOpen}
            setModalOpen={this.setModalOpen}
          />
          <ChittrStackNav 
            user={this.state.user}
            headerMode={this.state.headerMode} 
            isLoggedIn={this.state.isLoggedIn}
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
