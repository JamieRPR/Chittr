

import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

import HomeScreen from './screens/HomeScreen';
import AboutScreen from './screens/AboutScreen';

const AppStackNav = createStackNavigator({ 
  Home: {
    screen: HomeScreen 
  },
  About: {
    screen: AboutScreen
    }
});

const AppContainer = createAppContainer(AppStackNav)

export default AppContainer;