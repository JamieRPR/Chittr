import React, { Component } from 'react';
import { SafeAreaView, View, Image, FlatList, StyleSheet, Text, ActivityIndicator } from 'react-native';
import Constants from 'expo-constants';
// import getChits from '../APICalls/Chits'

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

// function Item({ userName, body}) {
//   return (
//     <View style={styles.item}>
//       <View style={{flex: 1, flexDirection: 'row', padding: 10}}>
//         <Image 
//           source={require('../assets/Images/defaultUserIcon.jpg')}  
//           style={styles.topBarUserIcon} 
//         />
//         <Text style={styles.chittrTitle}>{userName}</Text>
//       </View>
//       <Text style={styles.chittrBody}>
//         {body}
//       </Text>
//     </View>
//   );
// }

export default class FeedScreen extends Component {

  state = {
    chitsList: [],
    isLoading: true
  }

  async componentDidMount() {
    try {
      const getChits = await fetch('http://10.0.2.2:3333/api/v0.0.5/chits')
      const chits = await getChits.json();
      this.setState({chitsList: chits, isLoading: false})
    } catch(err) {
      console.log("Error fetching data-----------", err);
    }
  }

  renderItem(data) {
    return (
      <View style={styles.item}>
        <View style={{flex: 1, flexDirection: 'row', padding: 10}}>
          <Image 
            source={require('../assets/Images/defaultUserIcon.jpg')}  
            style={styles.topBarUserIcon} 
          />
          <Text style={styles.chittrTitle}>{data.item.user.given_name}</Text>
        </View>
        <Text style={styles.chittrBody}>
          {data.item.chit_content}
        </Text>
      </View>
    );
  }

  render() {

    const { chitsList, isLoading } = this.state;

    if(!isLoading) {
      return (
        <SafeAreaView style={styles.container}>
          <FlatList
            data={chitsList}
            renderItem={this.renderItem}
            keyExtractor={item => item.id}
          />
        </SafeAreaView>
      );
    } else {
      return <ActivityIndicator />
    }
  }
}

