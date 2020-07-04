/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { Component } from 'react';
import * as eva from '@eva-design/eva';
import { ImageBackground, StyleSheet, Alert, StatusBar } from 'react-native';
import { ApplicationProvider, IconRegistry, Layout, Button, Icon } from '@ui-kitten/components';
import { default as theme } from './theme.json';
import SplashScreen from 'react-native-splash-screen'
import { EvaIconsPack } from '@ui-kitten/eva-icons';
import IndexNavigator from './src/Screens/IndexNavigator'
import {
  LoginManager,
  AccessToken,
  GraphRequest,
  GraphRequestManager,
} from 'react-native-fbsdk';

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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  image: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center"
  },
  btnfb: {
    backgroundColor: '#1877F2',
    borderColor: '#1877F2',
    borderRadius: 32,
    width: 200,
    height: 28,
    margin: 0,
    left: 80,
    top: 130,
  },
  btnstaf: {
    borderRadius: 32,
    width: 200,
    height: 28,
    margin: 0,
    left: 80,
    top: 150,
  }
});


