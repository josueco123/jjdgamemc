import React, { useState, useCallback } from 'react';
import { ImageBackground, StyleSheet, Alert, View, Linking } from 'react-native';
import { Layout, Button, Icon, Modal, Card, Text, CheckBox } from '@ui-kitten/components';
import AsyncStorage from '@react-native-community/async-storage';
import { GoogleSignin, GoogleSigninButton, statusCodes } from '@react-native-community/google-signin';
import {
  LoginManager,
  AccessToken,
  GraphRequest,
  GraphRequestManager,
} from 'react-native-fbsdk';
import { useNetInfo } from "@react-native-community/netinfo";

export default function LoginScreen({ navigation }) {

  const [modal, setModal] = useState(false);
  const net = useNetInfo().isConnected;
  const [checked, setChecked] = useState(true);
  const [policy, setPolicy] = useState(false);

  const policies = "https://mincrix.com/politicasdedatos";
  const terms = "https://mincrix.com/terminosycondiciones";


  const startSession = async () => {

    if(net){

      if (checked) {
        LoginManager.logInWithPermissions(['public_profile', 'email']).then(
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
  
                    await fetch('https://www.mincrix.com/lasñjpoaw4rqwlur4orijqkwjñkejrq939rk3jr3irlkaj4oir23/userbyemail/' + result.email.toString(), {
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
  
                        }
  
                      }).catch((error) => {
                        console.error("what: " + error);
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
  
      } else {
        setPolicy(true);
      }
  
    }else{
      setModal(true);
    }    

  }

  const saveFCMtoken = async () => {

    try {

      const fcmtoken = await AsyncStorage.getItem('tokenfcm');
      const email = await AsyncStorage.getItem('email');

      await fetch('https://www.mincrix.com/lasjpoaw4rqwlur4orijqkwjkejrq939rk3jr3irlkaj4oir23/savereuserfcmtoken', {
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
          //console.log(responseJson);
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
      await AsyncStorage.setItem('position', value.position.toString())
      await AsyncStorage.setItem('estado', value.estado)

      global.id = value.email;
      saveFCMtoken();
      navigation.navigate('Game');

    } catch (error) {
      console.log("tell me: " + error)
    }
  }


  //google sign in
  const startGoogleSession = async () => {

    if(net){

      if (checked) {

        try {
          await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });
          const userInfo = await GoogleSignin.signIn();
          //console.log(JSON.stringify(userInfo));
  
          //Busqueda del usuario en la base de Datos
          await fetch('https://www.mincrix.com/lasñjpoaw4rqwlur4orijqkwjñkejrq939rk3jr3irlkaj4oir23/userbyemail/' + userInfo.user.email.toString(), {
            method: 'GET'
          })
            .then((response) => response.json())
            .then((responseJson) => {
              //console.log(responseJson);
  
              if (responseJson == null) {
  
                navigation.navigate('Welcome', {
                  token: userInfo.user.id.toString(),
                  name: userInfo.user.name.toString(),
                  email: userInfo.user.email.toString(),
                  avatar: userInfo.user.photo.toString()
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
  
      } else {
        setPolicy(true);
      }

    }else{
      setModal(true);
    }    
  }

  const accepted = (isChecked) => {
    setChecked(isChecked);

    if (isChecked == false)
      setPolicy(true);
  }

  const FacebookIcon = (props) => (
    <Icon name='facebook' {...props} />
  );

  const OpenURLButton = ({ url, children }) => {
    const handlePress = useCallback(async () => {
      // Checking if the link is supported for links with custom URL scheme.
      const supported = await Linking.canOpenURL(url);
  
      if (supported) {
        // Opening the link with some app, if the URL scheme is "http" the web link should be opened
        // by some browser in the mobile
        await Linking.openURL(url);
      } else {
        Alert.alert(`Don't know how to open this URL: ${url}`);
      }
    }, [url]);
  
    return <Button style={styles.policy} appearance='ghost' size='small' onPress={handlePress} > {children} </Button>;
  };

  return (

    <ImageBackground source={require('./imgs/inicio.png')} style={styles.image}>
      <Button onPress={startSession} style={styles.btnfb} accessoryLeft={FacebookIcon}>Acceder con Facebook</Button>
      <GoogleSigninButton
        style={styles.btnstaf}
        size={GoogleSigninButton.Size.Wide}
        color={GoogleSigninButton.Color.Light}
        onPress={startGoogleSession}
      />
      <CheckBox
        checked={checked}
        onChange={accepted}
        style={styles.check}
        status='primary'>
        al acceder confirmas que aceptas nuestras condiciones y políticas de datos.
        </CheckBox>

        <View style={styles.viewpoly}>
        <OpenURLButton url={policies}>ver políticas</OpenURLButton>
        <OpenURLButton url={terms}>ver terminos</OpenURLButton>
        </View>
        <Modal visible={modal}
            backdropStyle={styles.backdrop}
            onBackdropPress={() => setModal(false)}>
            <Card disabled={true} style={styles.card}>
              <Text category='h4'> ¡Espera! </Text>
              <Text category='h6'>No puedes entrar sin conexion internet</Text>
              <Button size='small' appearance='ghost' onPress={() => setModal(false)} >Ok</Button>
            </Card>
          </Modal>

      <Modal visible={policy}
        backdropStyle={styles.backdrop}
        onBackdropPress={() => setPolicy(false)}>
        <Card disabled={true} style={styles.card}>
          <Text category='h4'> ¡Espera! </Text>
          <Text category='h6'>Debes aceptar nuestros terminos y políticas para continuar</Text>
          <Button size='small' appearance='ghost' onPress={() => setPolicy(false)} >Ok</Button>
        </Card>
      </Modal>
    </ImageBackground>

  );
}

const styles = StyleSheet.create({
  image: {
    flex: 1,
    flexDirection: 'column',
    resizeMode: "cover",
    justifyContent: "center",
    alignItems: 'center',
    padding: 35,
  },
  btnfb: {
    backgroundColor: '#1877F2',
    borderColor: '#1877F2',
    width: 225,
    height: 38,
    top: 80,
  },
  btnstaf: {
    width: 230,
    height: 48,
    top: 100,
  },
  card: {
    margin: 5,
    borderRadius: 20,
    backgroundColor: "#000000",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    borderTopColor: '#ff6699',
    borderTopWidth: 3,
  },
  backdrop: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  check: {
    top: 150,
  },
  policy: {
    top: 170,
  },
  viewpoly:{
    flexDirection: 'row',
    alignSelf: 'center',
    justifyContent: 'space-between',
  }
});

