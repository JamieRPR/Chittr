import * as Constants from './assets/constants'
import React, { Component } from 'react';
import { Text, View, Button, Image } from 'react-native';

import { TextInput } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';

var styleGlobal = require('./style');

function UserInputField() {
  return (
    <View style={{flexDirection:'row', alignItems:'center'}}>
      <Text>foo</Text>
      <TextInput />
    </View>
  )
}

export default class UserScreen extends Component {
  render() {
    return (
      <SafeAreaView>
        <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
          <Text>Settings Screen!</Text>
          <UserInputField/>
        </View>
      </SafeAreaView>
    );
  }
}