import React, { Component } from 'react'; 
import { Text, View } from 'react-native';

class HomeScreen extends Component {
    render() {
        return( 
        <View>
            <Text>Home Screen</Text>


            <Button
                title="About Me"
                onPress={() => this.props.navigation.navigate('About')} 
            />

        </View>

    );}
}

export default HomeScreen;