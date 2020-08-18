import React from 'react';
import { ImageBackground, StyleSheet, Alert } from 'react-native';
import { Layout, Button, Icon } from '@ui-kitten/components';
import AsyncStorage from '@react-native-community/async-storage';
import { GoogleSignin, GoogleSigninButton, statusCodes } from '@react-native-community/google-signin';
import {
  LoginManager,
  AccessToken,
  GraphRequest,
  GraphRequestManager,
} from 'react-native-fbsdk';


export default function LoginScreen({ navigation }) {

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
            //alert(data.accessToken.toString());

            const responseInfoCallback = async (error, result) => {
              if (error) {
                //Alert for the Error
                Alert.alert('Error fetching data: ' + error.toString());
              } else {

                //Busqueda del usuario en la base de Datos

                await fetch('https://www.mincrix.com/userbyemail/' + result.email.toString(), {
                  method: 'GET'
                })
                  .then((response) => response.json())
                  .then((responseJson) => {
                    console.log(responseJson);

                    if (responseJson == null) {

                      navigation.navigate('Welcome', {
                        token: result.id.toString(),
                        name: result.name.toString(),
                        email: result.email.toString(),
                        avatar: result.picture.data.url.toString()
                      });
                    } else {

                      storeData(responseJson);                     

                    }

                  }).catch((error) => {
                    console.error("what: "+error);
                  });
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

  const saveFCMtoken = async () => {

    try {

      const fcmtoken = await AsyncStorage.getItem('tokenfcm');
      const email = await AsyncStorage.getItem('email');

      await fetch('https://www.mincrix.com/savereuserfcmtoken', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          email: email,
          fcmtoken: fcmtoken,
        })
      }).then((response) => response.json())
        //If response is in json then in success
        .then((responseJson) => {
          //alert(JSON.stringify(responseJson));
          console.log(responseJson);
        })
        //If response is not in json then in error
        .catch((error) => {
          //alert(JSON.stringify(error));
          console.log("mistake: " + error);
        });


    } catch (error) {
      console.log('Failed to save the data to the storage ' + error.toString());
    }

  }


  //guardar datos se session localmente si el usuario ya se encuentra registrado 
  const storeData = async (value) => {

    try {

      await AsyncStorage.setItem('token', value.id.toString())
      await AsyncStorage.setItem('username', value.name)
      await AsyncStorage.setItem('email', value.email)
      await AsyncStorage.setItem('avatar', value.avatar)
      await AsyncStorage.setItem('nickname', value.nickname)
      await AsyncStorage.setItem('position', value.position)
      await AsyncStorage.setItem('estado', value.estado)

      global.id = value.email;
      saveFCMtoken();
      navigation.navigate('Game');

    } catch (error) {
      console.log("tell me: " + error)
    }
  }


  //google sign in
  const startGoogleSession = async () =>{
    
    try {
      await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });
      const userInfo = await GoogleSignin.signIn();
      //console.log(JSON.stringify(userInfo));

      //Busqueda del usuario en la base de Datos
       await fetch('https://www.mincrix.com/userbyemail/' + userInfo.user.email.toString(), {
        method: 'GET'
      })
        .then((response) => response.json())
        .then((responseJson) => {
          console.log(responseJson);

          if (responseJson == null) {

            navigation.navigate('Welcome', {
              token:  userInfo.user.id.toString(),
              name:  userInfo.user.name.toString(),
              email:  userInfo.user.email.toString(),
              avatar:  userInfo.user.photo.toString()
            });
          } else {

            storeData(responseJson);            

          }

        }).catch((error) => {
          console.error(error);
        });



    } catch (error) {
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        // user cancelled the login flow
        console.log('login cancelled');
      } else if (error.code === statusCodes.IN_PROGRESS) {
        // operation (e.g. sign in) is in progress already
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        // play services not available or outdated       
      } else {
        // some other error happened
        console.log('login was unsuscesfull ' + error);
      }
    }
  }


  const FacebookIcon = (props) => (
    <Icon name='facebook' {...props} />
  ); 

  return (
    <Layout style={styles.container}>
      <ImageBackground source={require('../assets/inicio.png')} style={styles.image}>
        <Button onPress={startSession} style={styles.btnfb} accessoryLeft={FacebookIcon}>Acceder con Facebook</Button>
        <GoogleSigninButton
          style={styles.btnstaf}
          size={GoogleSigninButton.Size.Wide}
          color={GoogleSigninButton.Color.Light}
          onPress={startGoogleSession}
           />
      </ImageBackground>
    </Layout>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
  },
  image: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center",
    alignItems: 'center',
  },
  btnfb: {
    backgroundColor: '#1877F2',
    borderColor: '#1877F2',    
    width: 225,
    height: 38,
    top: 100,
  },
  btnstaf: {    
    width: 230,
    height: 48,    
    top: 120,
  }
});

