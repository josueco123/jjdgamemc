/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { Component } from 'react';
import { Vibration } from "react-native";
import * as eva from '@eva-design/eva';
import { ApplicationProvider, IconRegistry } from '@ui-kitten/components';
import { default as theme } from './theme.json';
import { default as mapping } from './mapping.json';
import SplashScreen from 'react-native-splash-screen'
import { EvaIconsPack } from '@ui-kitten/eva-icons';
import IndexNavigator from './src/Screens/IndexNavigator';
import PushNotification from 'react-native-push-notification';
import messaging from '@react-native-firebase/messaging';
import AsyncStorage from '@react-native-community/async-storage';
import { GoogleSignin } from '@react-native-community/google-signin';



messaging().setBackgroundMessageHandler(async remoteMessage => {
  //console.log('Message handled in the background!', JSON.stringify(remoteMessage));
  Vibration.vibrate(1000);   
});

export default class App extends Component {

  constructor(props) {
    super(props);
    //Setting the state for the data after login
    this.notificationConfig();
    this.googleConfig();

  }

  componentDidMount() {
    // do stuff while splash screen is shown
    // After having done stuff (such as async tasks) hide the splash screen
    SplashScreen.hide();
    
  }

  notificationConfig() {

    PushNotification.configure({

      // (optional) Called when Token is generated (iOS and Android)
      onRegister: async function (token) {
        //console.log('TOKEN:', token);

        try {
          await AsyncStorage.setItem('tokenfcm', token.token);         
        } catch (error) {
          console.log('msj ' + error)
        }
      },

      // (required) Called when a remote or local notification is opened or received
      onNotification: function (notification) {
        //console.log('NOTIFICATION:', notification);
        // process the notification
      },

      // ANDROID ONLY: GCM or FCM Sender ID (product_number) (optional - not required for local notifications, but is need to receive remote push notifications)
      senderID: "503884796565",

      // IOS ONLY (optional): default: all - Permissions to register.
      permissions: {
        alert: true,
        badge: true,
        sound: true
      },

      // Should the initial notification be popped automatically
      // default: true
      popInitialNotification: true,

      /**
       * (optional) default: true
       * - Specified if permissions (ios) and token (android and ios) will requested or not,
       * - if not, you must call PushNotificationsHandler.requestPermissions() later
       */
      requestPermissions: true,
    });
  }

  googleConfig(){

    GoogleSignin.configure({       
        
      webClientId: '503884796565-sgh2k794guc60sigkcvh7b53mgjrrq79.apps.googleusercontent.com', // client ID of type WEB for your server (needed to verify user ID and offline access)
      offlineAccess: true, // if you want to access Google API on behalf of the user FROM YOUR SERVER     
    });
  }

  render() {

    return (
      <>
        <IconRegistry icons={EvaIconsPack} />
        <ApplicationProvider {...eva} theme={{ ...eva.dark, ...theme }} customMapping={mapping}>
          <IndexNavigator />
        </ApplicationProvider>
      </>
    );
  }

}



