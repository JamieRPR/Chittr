import React, {Component} from 'react';
import {
  StyleSheet,
  TouchableHighlight,
  Image,
  View, 
  FlatList, 
  ActivityIndicator 
} from 'react-native';
import { ListItem, SearchBar} from 'react-native-elements';



import {enableScreens} from 'react-native-screens';
enableScreens();

var styleGlobal = require('../../assets/constants/StyleSheet');

const styles = StyleSheet.create({

});

// TODO: query functional button instead

class ChittrSearchBar extends Component {

    constructor(props) {
        super(props);
    
        this.state = {
            search: 'a',
            loading: false,
            data: [],
            error: null,
        };
    
        this.arrayholder = [];
    }

    componentDidMount() {
        this.makeRemoteRequest();
    }

    makeRemoteRequest = () => {
        const url = `http://10.0.2.2:3333/api/v0.0.5/search_user?q=`+this.state.search;
        this.setState({ loading: true });
        console.log(url)
    
        fetch(url)
            .then(res => res.json())
            .then(res => {
            this.setState({
                data: res,
                loading: false,
            });
              this.arrayholder = res.results;
            })
            .catch(error => {
              this.setState({ error, loading: false });
            });
    };

    renderSeparator = () => {
        return (
        <View
            style={{
            height: 1,
            width: '86%',
            backgroundColor: '#CED0CE',
            marginLeft: '14%',
            }}
        />
        );
    };

    searchFilterFunction = text => {
        this.setState({
            search: text,
            value: text,
        }, () => {
            this.makeRemoteRequest();
        });
        
    };

    renderHeader = () => {
        return (
          <SearchBar
            placeholder="Type Here..."
            lightTheme
            round
            onChangeText={text => this.searchFilterFunction(text)}
            autoCorrect={false}
            value={this.state.value}

            searchIcon={() => 
                <TouchableHighlight
                    onPress={() => {
                        this.props.isSearching(false)
                    }}
                >
                    <Image
                        source={require('../../assets/Images/back.png')}
                        style={styleGlobal.searchBarIcon}
                    />
                </TouchableHighlight>
            }
            clearIcon={false}
          />
        );
      };

    render() {

        return (
        <View style={{ flex: 1 }}>
            <FlatList
            data={this.state.data}
            renderItem={({ item }) => (
                <ListItem
                // leftAvatar={{ source: { uri: item.picture.thumbnail } }}
                title={`${item.given_name} ${item.family_name}`}
                subtitle={item.email}
                />
            )}
            keyExtractor={item => item.email}
            ItemSeparatorComponent={this.renderSeparator}
            ListHeaderComponent={this.renderHeader}
            />
        </View>
        );
    }
}

export default ChittrSearchBar