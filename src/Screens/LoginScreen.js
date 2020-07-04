import React from 'react';
import { ImageBackground, StyleSheet, Alert } from 'react-native';
import { Layout, Button, Icon } from '@ui-kitten/components';
import AsyncStorage from '@react-native-community/async-storage';
import {
    LoginManager,
    AccessToken,
    GraphRequest,
    GraphRequestManager,
  } from 'react-native-fbsdk';

  const storeData = async () => {
    try {
      await AsyncStorage.setItem('token', 'dummy-auth-token');
      console.log('Data successfully saved');
    } catch (e) {
      console.log('Failed to save the data to the storage');
    }
  }         

export default  function LoginScreen({ navigation }) {

const startSession = async () => {

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
                 
                storeData();
                navigation.navigate('Game');
            };
          }

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
    
    const FacebookIcon = (props) => (
        <Icon name='facebook' {...props} />
      );  

    return(
        <Layout style={styles.container}>
              <ImageBackground source={require('../assets/inicio.png')} style={styles.image}>
                <Button onPress={startSession} style={styles.btnfb} accessoryLeft={FacebookIcon}>Entra con Facebook</Button>
                <Button style={styles.btnstaf} >Ingreso de Staff</Button>
              </ImageBackground>
        </Layout>
    );
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
  
