import React, { Component } from 'react';
import { SafeAreaView, View, Image, FlatList, StyleSheet, Text } from 'react-native';
// import Constants from '../assets/constants';
import Constants from 'expo-constants';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: Constants.statusBarHeight,
  },
  item: {
    backgroundColor: '#DCDCDD',
    padding: 4,
    marginVertical: 8,
    marginHorizontal: 12,
  },
  topBarUserIcon: {
    width: 50, 
    height: 50,
    borderRadius: 50/ 2,
    marginStart: 8
  },
  chittrTitle: {
    alignSelf:'flex-end',
    paddingLeft: 5,
    fontSize: 18,
    color: '#3A3F3A'
  },
  chittrBody: {
    marginTop: 0,
    margin: 8,
    padding: 8,
    fontSize: 14,
    color: '#3A3F3A'
  }
});

const DATA = [
  {
    id: 'bd7acbea-c1b1-46c2-a5-3ad53abb28ba',
    userName: '@Italian',
  },
  {
    id: 'bdacbea-c1b1-46c2-aed5-3ad53abb28ba',
    userName: '@Brexit',
  },
  {
    id: 'bd7acbea-c1b1-4c2-aed5-3ad53abb28ba',
    userName: '@wrestler',
  },
  {
    id: 'bd7acbea-c1b1-46c2-aed5-3ad53ab28ba',
    userName: '@johndarby',
  },
  {
    id: 'bd7acbea-c1b1-46c2-aed5-3ad53abba',
    userName: '@420KushMan',
  },
];

function Item({ userName}) {
  return (
    <View style={styles.item}>
      <View style={{flex: 1, flexDirection: 'row', padding: 10}}>
        <Image 
          source={require('../assets/Images/defaultUserIcon.jpg')}  
          style={styles.topBarUserIcon} 
        />
        <Text style={styles.chittrTitle}>{userName}</Text>
      </View>
    </View>
  );
}

export default class ViewFollowers extends Component {

    render() {
        return (
            <SafeAreaView style={styles.container}>
                <FlatList
                data={DATA}
                renderItem={({ item }) => <Item userName={item.userName} body={item.body} />}
                keyExtractor={item => item.id}
                />
            </SafeAreaView>
        );
    }
}

