import React from 'react';
import { Text, View } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';

var styleGlobal = require('../constants/StyleSheet');

export default function UserInputField({ field, input } ) {
    return (
      <View style={styleGlobal.userInputField}>
        <Text style={styleGlobal.userInputFieldText}>{field}</Text>
        <TextInput style={styleGlobal.userInputFieldTextInput}>{input}</TextInput>
      </View>
    )
}