import React, { Component } from 'react';
import { Text, View, Button, Image, StyleSheet } from 'react-native';
import { TextInput, FlatList } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';
import Constants from 'expo-constants';
import UserInputField from '../assets/UIComponents/UserInputField'
import ChittrButton from '../assets/UIComponents/ChittrButton'

var styleGlobal = require('../assets/constants/StyleSheet');

const styles = StyleSheet.create({
  topPageText: {
    alignSelf: 'baseline',
    fontSize: 45,
    textDecorationLine: 'none',
  }
});

const DATA = [
  {
    id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
    fieldName: 'First Name',
    fieldValue: 'Jamie'
  },
  {
    id: '3avc68afc-c605-48d3-a4f8-fbd91aa97f63',
    fieldName: 'Last Name',
    fieldValue: 'Reynolds'
  },
  {
    id: '58694a0f-3da1-47c1f-bd96-145571e29d72',
    fieldName: 'Email',
    fieldValue: 'jamie.rpr@gmail.com'
  },
  {
    id: '58694xa0f-3da1-471f-bd96-145571e29d72',
    fieldName: 'Password',
    fieldValue: 'Password'
  },
  {
    id: '58694sa0f-3da1-471f-bd96-145571e29d72',
    fieldName: 'Password',
    fieldValue: 'Password'
  }
];

export default class UserScreen extends Component {
  render() {
    return (
      <SafeAreaView style={styleGlobal.container}>
        <View style={{ display: 'flex', justifyContent: "center", alignItems: "center"}}>
          <View style={{
              flexDirection:'row', 
              alignItems:'baseline',
              marginTop: Constants.statusBarHeight,
              marginVertical: 8,
              marginHorizontal: 16,
            }}>
            <Image 
              source={require('../assets/Images/settings.png')}  
              style={styleGlobal.topPageIcon} 
            />
            <Text style={{flex:1, marginStart: 5}}>
              <Text style={styles.topPageText}>Settings</Text>
            </Text>
          </View>

          <FlatList
            style={{
              alignSelf: 'stretch',
            }} 
            data={DATA}
            renderItem={({item}) => <UserInputField field={item.fieldName} input={item.fieldValue}/>}
          /> 
          <View style={{marginTop: 30}}>
            <ChittrButton title={"UPDATE"} onPress={(() => alert('this is a button'))} color={'#99CC66'}/>
          </View>
        </View>
      </SafeAreaView>
    );
  }
}