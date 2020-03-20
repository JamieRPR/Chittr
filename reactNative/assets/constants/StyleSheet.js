'use strict';

import Constants from 'expo-constants';
var React = require('react-native');

var {
  StyleSheet,
} = React;

module.exports = StyleSheet.create({
  // Top Bar
  topBarUserIcon: {
    width: 40, 
    height: 40,
    borderRadius: 40/ 2,
    marginStart: 20
  },
  topPageIcon: {
    width: 80, 
    height: 80,
    borderRadius: 40/ 2,
    marginBottom: 8,
  },
  topBarNewChit: {
    width: 40, 
    height: 40,
    marginEnd: 20,
  },

  // SearchBar

  searchBarIcon: {
    width: 20, 
    height: 20,
    borderRadius: 20/ 2,
  },

  // Drawer

    // Images
    drawerItemIcon: {
      width: 20, 
      height: 20,
      borderRadius: 20/ 2,
      marginStart: 5
    },
    drawerLargeIcon: {
      flex: 1,
      width: 90, 
      height: 90, 
      borderRadius: 90/ 2,
    },
    drawerLargeBox: {
      flex: 1,
      marginTop: 4,
      height: 160,
      resizeMode: 'contain' 
    },
    
    // Text
    drawerBody: {
      textAlign: 'center',
      fontSize: 14,
      paddingTop: 6,
      paddingStart: 10,
      paddingEnd: 10,
      color: '#3A3F3A',
    },

  // Button
  chittrButtonSingleTO: {
    paddingHorizontal: 40,
    paddingVertical: 12,
    backgroundColor:'transparent',
    borderRadius:1,
    borderWidth: 1,
  }, 

  chittrButtonSingleTxt: {
    textAlign:'center',
  }, 

  // User input
    userInputField: {
      flex: 1,
      flexDirection:'row', 
      alignItems:'center',
      marginVertical: 25,
      marginHorizontal: 20,
      paddingVertical: 2,
    },
    userInputFieldText: {
      flex: 1,
      textAlign: 'left',
      fontSize: 20,
      color: '#3A3F3A',
      marginEnd: 6,
    },
    // userInputFieldTextInput: {
    //   flex: 1,
    //   textAlign: 'center',
    //   fontSize: 14,
    //   lineHeight: 14,
    //   backgroundColor: '#DCDCDD',
    //   color: 'green',
    //   borderRadius: 2,
    //   marginStart: 6,
    //   paddingVertical: 16,
    // },

    userInputFieldTextInput: {
      flex: 1,
      height: 40, 
      borderColor: 'gray',
      borderWidth: 1
    },

    // Containers
    container: {
      flex: 1,
      flexDirection: 'column', 
      backgroundColor: '#FFFBF7'
    },
    modalContainer: {
      backgroundColor: 'rgba(39, 37, 37, 0.6)',
      alignItems: 'center',
      justifyContent: 'center',
      flex: 1
    }

});