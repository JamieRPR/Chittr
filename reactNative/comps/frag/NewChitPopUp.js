import React from 'react';
import {
  View,
  Image, 
  Text,
  TextInput,
  Button,
  StyleSheet,
  Modal,
} from 'react-native';

import {enableScreens} from 'react-native-screens';
enableScreens();

var styleGlobal = require('../../assets/constants/StyleSheet');

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#C3DFE0',
        marginStart: 20,
        marginEnd: 20,
        marginTop: 80,
        marginBottom: 80,
    },
    textBox: {
        margin: 10,
        flex: 0,
        minHeight: 100,
        textAlign: 'left',
        backgroundColor: '#FFFBF7',
        borderRadius: 5,
        marginStart: 6,
        marginEnd: 6,
        textAlignVertical: 'top',
    },
    // TODO: review this style name
    rowContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        alignSelf: 'baseline',
        backgroundColor: 'red',
    },
    rowCell: {
        flex: 1
    },
    chittrTitle: {
      alignSelf: 'flex-end',
      paddingLeft: 5,
      fontSize: 18,
      color: '#3A3F3A',
    },

});

class NewChitPopUp extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
    };
  }

  _newChit = () => {
    this.setState({isLoading: true})
    var proceed = false;
    fetch('http://10.0.2.2:3333/api/v0.0.5/chits',
      {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'X-Authorization': this.props.user.token
        },
        body: JSON.stringify({
          chit_id: this.state.chit_id, 
          timestamp: timestamp, 
          chit_content: this.state.chit_content,
          user_id: this.state.UserData.user_id,
          given_name: this.state.UserData.given_name, 
          family_name: this.state.UserData.family_name,
          email: this.state.UserData.email,
          location:{
              longitude: longitude !=null ? longitude: 0 , 
              latitude: latitude !=null ? longitude: 0,
          },
        })
      })
      .then((response) => {
          if (response.status==200) proceed = true;
      })
      .then(() => {
        this.props.navigation.dispatch(DrawerActions.toggleDrawer());
        this.props.setLoggedIn(false)
      })
      .catch(error => {
        console.log("Error fetching data-----------", error);
        this.setState({ isLoading: false })
        Alert.alert("Error logging out, please try again.")
    });
  }

  render() {
    console.log("Ye: " + this.props.user.givenName)
    return (
        <Modal animationType="fade" transparent={true} visible={this.props.modalOpen}>
          <View style={styleGlobal.modalContainer}>
            <View style={styles.container}>
              <View style={{flexDirection: 'row', padding: 10}}>
                <Image
                  source={require('../../assets/Images/defaultUserIcon.jpg')}
                  style={styleGlobal.topBarUserIcon}
                />
                <Text style={styles.chittrTitle}>{this.props.user.givenName} {this.props.user.familyName}</Text>
              </View>
              {/* TODO:
                - Post Button
                - Word Limit
                - Tap outside dismiss
                */}
              <TextInput
                style={styles.textBox}
                multiline={true}
                maxLength={141}
                placeholder="Spread the word with chittr... with 141 character... "
                placeholderTextColor="grey"
              />
    
              <View
                style={styles.rowContainer}>
                <View style={styles.rowCell}>
                  <Button
                    title={'CANCEL'}
                    color="#E26A6A"
                    onPress={() => {
                      this.props.setModalOpen(false);
                    }}
                  />
                </View>
                <View style={styles.rowCell}>
                  <Button title={'POST'} color="#99CC66" />
                </View>
              </View>
            </View>
          </View>
        </Modal>
      );
  }


}

export default NewChitPopUp