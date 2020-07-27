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
                    //console.log(responseJson);

                    if (responseJson == null) {

                      navigation.navigate('Welcome', {
                        token: result.id.toString(),
                        name: result.name.toString(),
                        email: result.email.toString(),
                        avatar: result.picture.data.url.toString()
                      });
                    } else {

                      storeData(responseJson);
                      saveFCMtoken();
                      navigation.navigate('Game');

                    }

                  }).catch((error) => {
                    console.error(error);
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

  const saveFCMtoken = async () =>{

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
                email:email,
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
                console.log("mistake: " + error);;
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

    } catch (error) {
      console.log("tell me: " + error)
    }
  }
  const FacebookIcon = (props) => (
    <Icon name='facebook' {...props} />
  );

  return (
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
    borderRadius: 32,
    width: 220,
    height: 28,
    margin: 0,
    
    top: 130,
  },
  btnstaf: {
    borderRadius: 32,
    width: 220,
    height: 28,
    margin: 0,    
    top: 150,
  }
});

