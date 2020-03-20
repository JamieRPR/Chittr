// import * as Constants from '../assets/constants/index'
import React, { Component } from 'react';
import { Text, View, Button, Image, StyleSheet, ActivityIndicator, Alert } from 'react-native';

import { TextInput, FlatList } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';
import Constants from 'expo-constants';
import UserInputField from '../assets/UIComponents/UserInputField'

var styleGlobal = require('../assets/constants/StyleSheet');

const styles = StyleSheet.create({
  topPageText: {
    alignSelf: 'baseline',
    fontSize: 45,
    textDecorationLine: 'none',
    paddingTop: 80,
  }
});

export default class UserScreen extends Component {

  state={
    isLoading: false,
    given_name: '',
    family_name: '',
    email: '',
    password: ''
  }

  _signUp = () => {
    this.setState({isLoading: true})

    var proceed = false;
    fetch('http://10.0.2.2:3333/api/v0.0.5/user',
      {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          given_name: this.state.given_name,
          family_name: this.state.family_name,
          email: this.state.email,
          password: this.state.password,
      })
    })
      .then((response) => response.json())
      .then((response) => {
          if (response.status==200) proceed = true;
          // else this.setState({ message: response.message });
      })
      .then(() => {
          this.setState({ isLoading: false })
          // if (proceed) this.props.onLoginPress();
      })
      .catch(error => {
        console.log("Error fetching data-----------", error);
        this.setState({ isLoading: false })
        Alert.alert("Error signing up, please try again.")
    });
  }

  render() {

    const { isLoading } = this.state;

    if(!isLoading) {
      return (
        <SafeAreaView style={styleGlobal.container}>
        <View style={{ display: 'flex', justifyContent: "center", alignItems: "center"}}>
          <View style={{
              flexDirection:'row', 
              alignItems:'baseline',
              marginTop: Constants.statusBarHeight,
              // backgroundColor: 'green',
              marginVertical: 8,
              marginHorizontal: 16,
            }}>
            <Image 
              source={require('../assets/Images/profile.png')}  
              style={styleGlobal.topPageIcon} 
            />
            <Text style={{flex:1}}>
              <Text style={[styleGlobal.userInputFieldText, styles.topPageText]}>Sign Up</Text>
            </Text>
          </View>

          <View style={styleGlobal.userInputField}>
            <Text style={styleGlobal.userInputFieldText}>First Name</Text>
            <TextInput 
              style={styleGlobal.userInputFieldTextInput}
              onChangeText={given_name => this.setState({given_name})}
              placeholder="Enter here..."
            />
          </View>
            
          <View style={styleGlobal.userInputField}>
            <Text style={styleGlobal.userInputFieldText}>Last Name</Text>
            <TextInput 
              style={styleGlobal.userInputFieldTextInput}
              onChangeText={family_name => this.setState({family_name})}
              placeholder="Enter here..."
            />
          </View>

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

          <View style={styleGlobal.userInputField}>
            <Text style={styleGlobal.userInputFieldText}>Confirm Password</Text>
            <TextInput 
              style={styleGlobal.userInputFieldTextInput}
              onChangeText={password => this.setState({password})}
              placeholder="Enter here..."
            />
          </View>

          <Button
                onPress={this._signUp}
                style={{
                  width: 80,
                  height:40,
                  margin: 20
                }}
                title="UPDATE"
                color="red"
              />
        </View>
      </SafeAreaView>
      );
        
    } else {
      return <ActivityIndicator />
    }
  }
}