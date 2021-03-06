import React, { Component } from 'react';
import { SafeAreaView, TouchableHighlight, View, Image, FlatList, StyleSheet, Text } from 'react-native';

var styleGlobal = require('../assets/constants/StyleSheet');

const styles = StyleSheet.create({
  userProfile: {
    flexDirection: 'column', 
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#FFFBF7'
  },
  item: {
    backgroundColor: '#DCDCDD',
    padding: 4,
    marginVertical: 4,
    marginHorizontal: 0,
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
  },
  drawerUserIcon: {
    // flex: 1,
    width: 90, 
    height: 90, 
    borderRadius: 90/ 2,
  }
});

const DATA = [
  {
    id: 'bd7acbea-c1b1-46c2-aed5-3ad53asbba',
    userName: '@420KushMan',
    body: "🐠🦀🐙🦑🐡 It's 4:20 AM PT kush nugs for Mass. marijuana OK Patients can officially apply for 4:20 PM MT?"
  },
  {
    id: 'bd7acbea-c12b1-46c2-aed5-3ad5g3abba',
    userName: '@420KushMan',
    body: "Legal Marijuana Board Citizens seek to know it has medical… Walsh Names Five To Cope With Coronavirus!"
  },
  {
    id: 'bd7acbea-c141-46c2-aed5-3ad53abba',
    userName: '@420KushMan',
    body: "🌲's OG Kush smalls for 4:20 Colorado time Mendocino herb ready only lazy stoners smoke pot. ish... Ice!"
  },
  {
    id: 'bd7acbea-c141-46c2-aaed5-3ad53abba',
    userName: '@420KushMan',
    body: "🌲's OG Kush smalls for 4:20 Colorado time Mendocino herb ready only lazy stoners smoke pot. ish... Ice!"
  },
  {
    id: 'bd7acbea-c141-46c2-aefd5-3ad53abba',
    userName: '@420KushMan',
    body: "🌲's OG Kush smalls for 4:20 Colorado time Mendocino herb ready only lazy stoners smoke pot. ish... Ice!"
  },
  {
    id: 'bd7acbea-c141-416c2-aed5-3ad53abba',
    userName: '@420KushMan',
    body: "🌲's OG Kush smalls for 4:20 Colorado time Mendocino herb ready only lazy stoners smoke pot. ish... Ice!"
  },
];

function Item({ userName, body}) {
  return (
    <View style={styles.item}>
      <View style={{flex: 1, flexDirection: 'row', padding: 10}}>
        <Image 
          source={require('../assets/Images/defaultUserIcon.jpg')}  
          style={styles.topBarUserIcon} 
        />
        <Text style={styles.chittrTitle}>{userName}</Text>
      </View>
      <Text style={styles.chittrBody}>
        {body}
      </Text>
    </View>
  );
}

export default class ProfScreen extends Component {

  constructor(props) {
    super(props);
    // this.state = { /* initial state */ };
  }

  render() {
    return (
      <SafeAreaView style={styleGlobal.container}>
        <View style={styles.userProfile}>
          <Image
            source={require('../assets/Images/defaultUserIcon.jpg')}  
            style={styles.drawerUserIcon} 
          />
          <Text>Blaze and Raze</Text>
          <Text>@420KushMan</Text>
          <View style={{flexDirection: 'row', padding: 10}}>
            <TouchableHighlight onPress={() => { this.props.navigation.navigate('Followers');}}>
              <Text>420 Followers |</Text>
            </TouchableHighlight>
            <TouchableHighlight onPress={() => { this.props.navigation.navigate('Following');}}>
            <Text>| 69 Following</Text>
          </TouchableHighlight>  
          </View>

        </View>
        <FlatList
          data={DATA}
          renderItem={({ item }) => <Item userName={item.userName} body={item.body} />}
          keyExtractor={item => item.id}
        />
      </SafeAreaView>
    );
  }
}