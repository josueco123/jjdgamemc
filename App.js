/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { Component } from 'react';
import * as eva from '@eva-design/eva';
import { ImageBackground, StyleSheet, Alert } from 'react-native';
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
    this.state = {
      loggedIn: true
    }
    global.isLogged = true;
  }

  componentDidMount() {
    // do stuff while splash screen is shown
    // After having done stuff (such as async tasks) hide the splash screen
    SplashScreen.hide();
  }


  startSession = () => {

    LoginManager.logInWithPermissions(['public_profile', 'email', 'user_friends']).then(
      function (result) {
        if (result.isCancelled) {
          console.log("Login cancelled");
        } else {
          console.log(
            "Login success with permissions: " +
            result.grantedPermissions.toString()
          );
          AccessToken.getCurrentAccessToken().then(data => {
            alert(data.accessToken.toString());

            const responseInfoCallback = (error, result) => {
              if (error) {
                //Alert for the Error
                Alert.alert('Error fetching data: ' + error.toString());
              } else {
                //response alert
                alert('good ' + JSON.stringify(result));


              }
            };

            const infoRequest = new GraphRequest(
              '/me?fields=name,email,picture.type(large)',
              null,
              responseInfoCallback
            );
            // Start the graph request.
            new GraphRequestManager().addRequest(infoRequest).start();
          });
        }
      },
      function (error) {
        console.log("Login fail with error: " + error);
      }
    );
  }

  onLogout = () => {
    //Clear the state after logout
    this.setState({
      loggedIn: false,
    })
  };

  render() {

    const FacebookIcon = (props) => (
      <Icon name='facebook' {...props} />
    );

    if (global.isLogged) {
      return (
      <>
        <IconRegistry icons={EvaIconsPack} />
        <ApplicationProvider {...eva} theme={{ ...eva.dark, ...theme }}>
          <IndexNavigator />
        </ApplicationProvider>
      </>
      );
    } else {
      return (
        <>
          <IconRegistry icons={EvaIconsPack} />
          <ApplicationProvider {...eva} theme={{ ...eva.dark, ...theme }}>
            <Layout style={styles.container}>
              <ImageBackground source={require('./src/assets/LoginScreen.png')} style={styles.image}>
                <Button onPress={this.startSession} style={styles.btnfb} accessoryLeft={FacebookIcon}>Entra con Facebook</Button>
                <Button style={styles.btnstaf} >Ingreso de Staff</Button>
              </ImageBackground>
            </Layout>
            <IndexNavigator />
          </ApplicationProvider>
        </>
      );

    }

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


