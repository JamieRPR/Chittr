import React from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';

var styleGlobal = require('../constants/StyleSheet');

export default function ChittrButton({ title, onPress, color } ) {
    return (
    <TouchableOpacity onPress = {() => {onPress()}}>
        <View style = {[styleGlobal.chittrButtonSingleTO, {borderColor: color}]}>
            <Text style = {[styleGlobal.chittrButtonSingleTxt, { color: color}]}>{title}</Text>
        </View>
    </TouchableOpacity>
    )
}