import React from 'react';
import {
  StyleSheet,
  View,
  Image,
  Text,
  TextInput,
  Button
} from 'react-native';

import {
  DrawerContentScrollView,
} from '@react-navigation/drawer';

import {enableScreens} from 'react-native-screens';
enableScreens();

import {
  DrawerActions,
} from '@react-navigation/native';

var styleGlobal = require('../../../../assets/constants/StyleSheet');

const styles = StyleSheet.create({
    EqualHalfRowContainer: {
      flex: 1, 
      flexDirection: 'column', 
      alignItems: 'center', 
      padding: 10
    },

    EqualHalfRowCell: {

    },
});


class LoggedOutDrawerContent extends React.Component {

    // constructor(props) {
  //   super(props);
  //   this.state = {
  //   };
  // }
  
  _login = () => {
    this.setState({isLoading: true})
    var proceed = false;
    fetch('http://10.0.2.2:3333/api/v0.0.5/login',
      {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          // email: this.state.email,
          // password: this.state.password,
          email: 'test@gmail.com',
          password: 'password',
      })
    })
      .then((response) => response.json())
      .then((response) => {
          if (response.status==200) proceed = true;
          this.props.user.id = response.id
          this.props.user.token = response.token
      })
      .then(() => {
        this.setState({ isLoading: false, isLoggedIn: true }, () => {
          this.props.navigation.dispatch(DrawerActions.toggleDrawer());
          this.props.setLoggedIn(true)
          this._getUserInfo()
        })
      })
      .catch(error => {
        console.log("Error fetching data-----------", error);
        this.setState({ isLoading: false })
        Alert.alert("Error logging in, please try again.")
    });
  }

  _getUserInfo = () => {
    this.setState({isLoading: true})
    var proceed = false;
    var url = ('http://10.0.2.2:3333/api/v0.0.5/user/'+this.state.id)

    fetch(url,
      {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
    })
    .then((response) => response.json())
    .then((response) => {
      if (response.status==200) proceed = true;
      this.props.user.givenName = response.given_name
      this.props.user.familyName = response.family_name
      this.props.user.email = response.email
    })
    .catch(error => {
      console.log("Error fetching data-----------", error);
      this.setState({ isLoading: false })
    });
  }

  _getUserPhoto = () => {
    this.setState({isLoading: true})
    var proceed = false;
    var url = ('http://10.0.2.2:3333/api/v0.0.5/user/'+this.state.id+"/photo")

    fetch(url,
      {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
      //   body: JSON.stringify({
      //     id: this.state.id,
      // })
    })
    .then((response) => response.json())
    .then((response) => {
      if (response.status==200) proceed = true;
      this.props.user.photo = response
      console.log(response)
    })
    .catch(error => {
      console.log("Error fetching data-----------", error);
      this.setState({ isLoading: false })
    });
  }

  render() {
    return (
      <DrawerContentScrollView props={this.props}>
        <View style={styles.EqualHalfRowContainer}>
          <Image
            source={require('../../../../assets/Images/peopleTalking.jpg')}
            style={styleGlobal.drawerLargeBox}
          />
          <Text style={styleGlobal.drawerBody}>No user account was found here... Login or Sign Up to unlock all of Chittrs features!</Text>

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

          <View style={{
            flex: 1,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            marginTop: 10,
          }}>

            <View style={{
              flex: 1,
              paddingStart: 25,
              paddingEnd: 12.5,
            }}>
              <Button
                onPress={() => this.props.navigation.navigate('Sign Up')}
                title="SIGN UP"
                color="#CC7F66"
              />
            </View>

            <View style={{
              flex: 1,
              paddingStart: 12.5,
              paddingEnd: 25,
            }}>
              <Button
                onPress={() => this._login(this.props)}
                style={{
                  borderColor: 'red'
                  // flexBasis:'auto',
                  // margin: 20
                }}
                title="LOGIN"
                color="#99CC66"
              />
            </View>
          </View>
        </View>
      </DrawerContentScrollView>
    );
  }
}


export default LoggedOutDrawerContent