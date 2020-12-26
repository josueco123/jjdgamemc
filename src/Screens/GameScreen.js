import React, { useRef, useState, useEffect } from 'react';
import { Button, Card, Text, Divider, Modal } from '@ui-kitten/components';
import { StyleSheet, Animated, Easing, View, TouchableWithoutFeedback, ToastAndroid, AppState, BackHandler, Dimensions } from 'react-native';
import * as Animatable from 'react-native-animatable';
import LottieView from 'lottie-react-native';
import messaging from '@react-native-firebase/messaging';
import AsyncStorage from '@react-native-community/async-storage';
import PushNotification from 'react-native-push-notification';
import { useIsFocused } from '@react-navigation/native';
import GetRetos from '../Managers/GetRetos';
import { useNetInfo } from "@react-native-community/netinfo";
import StarsAnimations from '../Resources/StarsAnimations';
import BoxAnimations from '../Resources/BoxAnimations';
import SoundPlayer from 'react-native-sound-player';
import { useFocusEffect } from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

let Position;
global.firstExecute = true;

export default function GameScreen({ navigation }) {

  const window = Dimensions.get("window");

  const net = useNetInfo().isConnected;
  const isFocused = useIsFocused();

  const [leave, setLeave] = useState(false);
  const [posit, setPosit] = useState(0);
  const [bonus, setBonus] = useState(false);

  const [modalb, setModalb] = useState(false);
  const [modalb2, setModalb2] = useState(false);

  const [completed, setCompleted] = useState(false);

  //se trae el estado y la posicion del usuario
  const askUserState = async () => {
    try {

      const mail = await AsyncStorage.getItem('email');


      await fetch('https://mincrix.com/lasñjpoaw4rqwlur4orijqkwjñkejrq939rk3jr3irlkaj4oir23/usergamestate/' + mail)
        .then((response) => response.json())
        .then((json) => {

          storeState(json);

          //console.log("es: " + json.estado)
          //console.log("pos: " + json.position)
        })
        .catch((error) => console.log("err:  " + error))


    } catch (er) {
      console.log(er);
    }
  }


  if (isFocused) {

    if (net)
      askUserState();

  }

  //para la reproducion de sonidos si la app esta en background
  const appState = useRef(AppState.currentState);

  useEffect(() => {

    AppState.addEventListener("change", _handleAppStateChange);

    return () => {
      AppState.removeEventListener("change", _handleAppStateChange);
    };
  }, []);

  const _handleAppStateChange = (nextAppState) => {
    if (
      appState.current.match(/inactive|background/) &&
      nextAppState === "active"
    ) {
      SoundPlayer.resume();

    } else {
      SoundPlayer.pause();
    }

    appState.current = nextAppState;
  };


  //almacenar el estado traido del backend
  const storeState = async (value) => {

    try {
      await AsyncStorage.setItem('estado', value.estado);
    } catch (error) {
      console.log("e: " + error);
    }
  }

  //servicion de notificaciones en backgrond
  const mesaginpush = () => {


    useEffect(() => {
      messaging().onMessage(async remoteMessage => {

        PushNotification.localNotification({
          /* Android Only Properties */
          id: remoteMessage.id,
          ignoreInForeground: false,
          //smallIcon: "ic_notification", // (optional) default: "ic_notification" with fallback for "ic_launcher"     
          vibrate: true, // (optional) default: true
          vibration: 1000, // vibration length in milliseconds, ignored if vibrate=false, default: 1000

          invokeApp: true, // (optional) This enable click on actions to bring back the application to foreground or stay in background, default: true

          /* iOS and Android properties */
          title: remoteMessage.title, // (optional)
          message: remoteMessage.body, // (required)
          playSound: true,// (optional) default: true
          soundName: "default", // (optional) Sound to play when the notification is shown. Value of 'default' plays the default sound. It can be set to a custom sound such as 'android.resource://com.xyz/raw/my_sound'. It will look for the 'my_sound' audio file in 'res/raw' directory and play it. default: 'default' (default sound is played)

        });

      });

    });
  }
  mesaginpush();

  const showToastWithGravity = () => {
    ToastAndroid.showWithGravity(
      "Has perdido la conexion a internet",
      ToastAndroid.SHORT,
      ToastAndroid.CENTER
    );
  };

  //los modals de la intro explicativa
  const [intro1, setIntro1] = useState(false);

  //  el card que contiene los retos
  const [visible, setVisible] = useState(false);
  const [modalestado, setModalestado] = useState(false);


  const cardFooter = (props) => (
    <View {...props} style={[props.style, styles.footerContainer]}>

      {bonus ? (
        <Button size='small' status='success' style={{ marginRight: 20 }} onPress={omitRetoTouch} >Omitir Reto</Button>
      ) : (<></>)}


      {(posit == 5 || posit == 10 || posit == 24 || posit == 35 || posit == 47 || posit == 87 || posit == 101 || posit == 124 || posit == 137) ? (
        <Button size='small' onPress={changePosition} >
          Desplazarse
        </Button>
      ) : (
          <Button size='small' onPress={getUserState}>
            Tirar Dado
          </Button>
        )}
    </View>
  );

  const omitRetoTouch = () => {

    setVisible(false);
    setModalb(true);
  }

  const moveAnim = useRef(new Animated.ValueXY({ x: 0, y: 0 })).current;
  const myScroll = useRef();
  const scrollAnimation = useRef(new Animated.Value(0));

  //mover la ficha a una posision determinada
  const moveFicha = () => {


    if (posit <= 132) {
      scrollAnimation.current.addListener((animation) => {
        myScroll.current &&
          myScroll.current.scrollTo({
            y: animation.value,
            animated: false,
          })
      })

      Animated.timing(scrollAnimation.current, {
        toValue: 100 * Position,
        duration: 10000,
        useNativeDriver: true,
        easing: Easing.linear,
      }).start();

    }

    Animated.timing(moveAnim, {
      toValue: { x: 0, y: 100 * Position },
      duration: 10000,
      useNativeDriver: true
    }).start();

    if (Position == 46)
      setBonus(true);

    if (Position > 140)
      setCompleted(true);

    updateUserPosition(Position);
  }

  //mover ficha cuando se inicia el juego EDITAAARRRRR
  const initPosition = async () => {

    const pos = await AsyncStorage.getItem('position');
    const mail = await AsyncStorage.getItem('email');

    global.pos = pos;
    global.id = mail;

    if (global.firstExecute) {

      if (Number(pos) != 0) {
        setIntro1(false);
      } else {
        setIntro1(true);
      }

      if (Number(pos) <= 132) {

        scrollAnimation.current.addListener((animation) => {
          myScroll.current &&
            myScroll.current.scrollTo({
              y: animation.value,
              animated: false,
            })
        })

        Animated.timing(scrollAnimation.current, {
          toValue: 100 * Number(pos),
          duration: 3000,
          useNativeDriver: true,
          easing: Easing.linear,
        }).start();

      }


      Animated.timing(moveAnim, {
        toValue: { x: 0, y: 100 * Number(pos) },
        duration: 3000,
        useNativeDriver: true
      }).start();

      Position = Number(pos);
      setPosit(Position);

      if (Position == 46)
        setBonus(true);

      if (Position > 140)
        setCompleted(true);


      saveFCMtoken();
      global.firstExecute = false;

    }
  }
  initPosition();

  //actualiza el token por si hay cambios
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

  //castigo o premio de cambiar de posicion
  const changePosition = async () => {

    setVisible(false);
    if (net) {

      switch (posit) {
        case 5: Position = posit + 3;
          break;

        case 10: Position = posit - 2;
          break;

        case 24: Position = posit + 6;
          break;

        case 35: Position = posit - 15;
          break;

        case 47: Position = posit - 12;
          break;

        case 87: Position = posit + 14;
          break;

        case 101: Position = posit + 2;
          break;

        case 124: Position = posit - 7;
          break;

        case 137: Position = posit - 39;
          break;

      }

      await AsyncStorage.setItem('estado', "2");
      await AsyncStorage.setItem('position', Position.toString());
      global.pos = Position;
      setPosit(Position);
      updataUserState("2");
      moveFicha();

    } else {
      showToastWithGravity();
    }
  }

  //hacer el numero aletorio y mostrar el dado 
  const getUserState = async () => {

    const estado = await AsyncStorage.getItem('estado');
    const pos = await AsyncStorage.getItem('position');

    setVisible(false);
    setIntro1(false)


    if (estado == "1") {

      if (net) {

        let number = getRandomInt(1, 7);
        Position = Number(pos) + number;
        //console.log("Pos3: " + Position);
        navigation.navigate('DadoAnimation', { dadoResult: number });
        await AsyncStorage.setItem('position', Position.toString());
        global.pos = Position;
        setPosit(Position);
        if (Position != 46 || Position != 61) {
          updataUserState("2");
          await AsyncStorage.setItem('estado', "2");
        }
        moveFicha();

      } else {
        showToastWithGravity();
      }

    } else {
      setVisible(false);
      setModalestado(true);
    }

  }

  //actualizar el estado de jugador
  const updataUserState = async (value) => {

    try {

      const mail = await AsyncStorage.getItem('email');

      if (net) {

        await fetch('https://mincrix.com/lasñjpoaw4rqwlur4orijqkwjñkejrq939rk3jr3irlkaj4oir23/setusergamestate/' + mail + '/' + value)
          .then((response) => response.json())
          .then((json) => {

          })
          .catch((error) => console.log("err:  " + error))
      } else {
        showToastWithGravity();
      }

    } catch (er) {
      console.log(er);
    }
  }
  //actualizar la posicion
  const updateUserPosition = async (value) => {

    try {

      const mail = await AsyncStorage.getItem('email');

      if (net) {
        await fetch('https://mincrix.com/lasñjpoaw4rqwlur4orijqkwjñkejrq939rk3jr3irlkaj4oir23/setuseposition/' + mail + '/' + value)
          .then((response) => response.json())
          .then((json) => {

          })
          .catch((error) => console.log("err:  " + error))
      } else {
        showToastWithGravity()
      }

    } catch (er) {
      console.log(er);
    }
  }

  //omitir reto
  const valeReto = () => {

    setModalb(false);
    setBonus(false);
    setModalb2(true);
    updataUserState("1");
  }

  //backhandler
  useFocusEffect(
    React.useCallback(() => {
      const onBackPress = () => {

        setVisible(false);
        setIntro1(false);
        setLeave(true);
        return true;
      };

      BackHandler.addEventListener('hardwareBackPress', onBackPress);

      return () =>
        BackHandler.removeEventListener('hardwareBackPress', onBackPress);
    }, [])
  );

  const closeApp = () => {
    BackHandler.exitApp();
  }

  const showReto = () => {
    if (net) {
      setVisible(true);
    } else {
      showToastWithGravity()
    }
  }

  const showTuto = () => {
    if (net) {
      setIntro1(false);
      global.sounds = false;
      navigation.navigate('Tutorial');
    } else {
      showToastWithGravity()
    }
  }

  return (
    
    <LinearGradient colors={['#170F36', '#2F0837', '#5F2D13']} style={styles.container}>
      <Animated.ScrollView ref={myScroll} contentContainerStyle={styles.contentContainer} centerContent={true} showsVerticalScrollIndicator={false} >

        


          <Modal
            visible={visible}
            onBackdropPress={() => setVisible(false)}>
            <View style={styles.centeredView}>
              <Card disabled={true} footer={cardFooter} style={styles.card} >
                <GetRetos />
              </Card>
            </View>
          </Modal>

          <Modal
            visible={modalestado}
            onBackdropPress={() => setModalestado(false)}>
            <View style={styles.centeredView}>
              <Card disabled={true} style={styles.card} >
                <Text category='h4'> ¡Espera! </Text>
                <Text category='h6'>No puedes tirar el dado hasta que te aprueben este reto.</Text>
                <Button size='small' appearance='ghost' onPress={() => setModalestado(false)} >Ok</Button>
              </Card>
            </View>
          </Modal>

          <Modal
            visible={intro1}
            onBackdropPress={() => setIntro1(true)}>
            <View style={styles.centeredView}>
              <Card disabled={true} style={styles.card}>
                <Text category='h2'> Bienvenido a MINCRIX</Text>
                <LottieView
                  autoPlay={true}
                  source={require('../animations/17252-colorful-confetti.json')}
                  loop={true} />
                <Divider />
                <Text category='h6'>Explora tus dones, descubre tu llamado y encuentra tu ministerio mientras juegas y haces estos retos.</Text>
                <Divider />
                <Text category='s2'>Nota: siempre toca tu ficha para ver el reto o tirar el dado.</Text>
                <View style={styles.close}>
                  <Button style={styles.button} size='small' appearance='ghost' onPress={showTuto} >Ver Tutorial</Button>
                  <Button style={styles.button} size='small' appearance='ghost' onPress={() => setIntro1(false)} >Omitir Tutorial</Button>
                </View>
              </Card>
            </View>
          </Modal>

          <Modal
            visible={leave}
            onBackdropPress={() => setLeave(false)}>
            <View style={styles.centeredView}>
              <Card disabled={true} style={styles.card}>
                <Text category='h2'> ¿Estas Seguro?</Text>
                <Text category='h6'>¿Deseas salir del juego?</Text>
                <View style={styles.close}>
                  <Button size='medium' appearance='ghost' onPress={() => setLeave(false)} >No</Button>
                  <Button size='medium' appearance='ghost' onPress={closeApp} >Sí</Button>
                </View>

              </Card>
            </View>
          </Modal>


          <Modal
            visible={modalb}
            onBackdropPress={() => setModalb(false)}>
            <View style={styles.centeredView}>
              <Card disabled={true} style={styles.card}>
                <Text category='h2'> ¿Estas Seguro?</Text>
                <Text category='h6'>¿Deseas utilizar tu vale y omitir este reto?</Text>
                <View style={styles.close}>
                  <Button size='medium' appearance='ghost' onPress={() => setModalb(false)} >No</Button>
                  <Button size='medium' appearance='ghost' onPress={valeReto}>Sí</Button>
                </View>

              </Card>
            </View>
          </Modal>


          <Modal
            visible={modalb2}
            onBackdropPress={() => setModalb2(false)}>
            <View style={styles.centeredView}>
              <Card disabled={true} style={styles.card}>
                <Text category='h2'> Perfecto</Text>
                <Text category='h6'>Ya puedes volver a tirar el dado</Text>
                <Button size='medium' appearance='ghost' onPress={() => setModalb2(false)}>ok</Button>
              </Card>
            </View>
          </Modal>

          <Modal
            visible={completed}
            onBackdropPress={() => setCompleted(false)}>
            <View style={styles.centeredView}>
              <Card disabled={true} style={styles.card}>
                <LottieView
                  autoPlay={true}
                  source={require('../animations/17252-colorful-confetti.json')}
                  loop={true} />
                <Text category='h2'> Felicitaciones</Text>
                <Text category='s1'>Has completado todos los retos que te tocaron, esperamos que hayas tenido una buena experiencia con el juego, pronto volvermos con más retos</Text>
                <Button size='medium' appearance='ghost' onPress={() => setCompleted(false)}>ok</Button>
              </Card>
            </View>
          </Modal>

          <TouchableWithoutFeedback onPress={showReto}>
            <Animatable.View style={[
              styles.ficha,
              {
                transform: moveAnim.getTranslateTransform(),
              },
            ]}>

            </Animatable.View>
          </TouchableWithoutFeedback>

          <StarsAnimations />

          <BoxAnimations />


       
      </Animated.ScrollView>
      </LinearGradient>
    
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",       
  },
  contentContainer: {
    alignItems: 'center',
  },
  button: {
    margin: 2,
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22
  },
  footerContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
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
  text: {
    alignSelf: 'flex-start',
  },
  image: {
    flex: 1,
    resizeMode: "cover",
    alignItems: 'center',
    justifyContent: 'center',
  },
  backdrop: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },

  ficha: {
    height: 75,
    width: 75,
    backgroundColor: "black",
    borderColor: '#ffffff',
    borderRadius: 64,
    borderWidth: 4,
    position: 'absolute',
    zIndex: 20,
    top: 20,
  },
  imgs: {
    height: 75,
    width: 75,
    position: 'absolute',
    zIndex: 20,
    top: 20,
  },
  close: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
});