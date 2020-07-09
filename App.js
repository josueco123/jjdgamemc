/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { Component } from 'react';
import * as eva from '@eva-design/eva';
import { ApplicationProvider, IconRegistry } from '@ui-kitten/components';
import { default as theme } from './theme.json';
import SplashScreen from 'react-native-splash-screen'
import { EvaIconsPack } from '@ui-kitten/eva-icons';
import IndexNavigator from './src/Screens/IndexNavigator'


export default class App extends Component {

  constructor(props) {
    super(props);
    //Setting the state for the data after login
   
  }

  componentDidMount() {
    // do stuff while splash screen is shown
    // After having done stuff (such as async tasks) hide the splash screen
    SplashScreen.hide();
  }
  

  render() {
    
      return (
      <>      
        <IconRegistry icons={EvaIconsPack} />
        <ApplicationProvider {...eva} theme={{ ...eva.dark, ...theme }}>
          <IndexNavigator />
        </ApplicationProvider>
      </>
      );    
    }

  }



