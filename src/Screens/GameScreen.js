import React, { useRef, useState, useEffect } from 'react';
import { Layout, Button, Card, Text, Modal, Icon, Divider } from '@ui-kitten/components';
import { StyleSheet, Animated, Easing, View, ImageBackground, TouchableWithoutFeedback, ToastAndroid } from 'react-native';
import * as Animatable from 'react-native-animatable';
import messaging from '@react-native-firebase/messaging';
import AsyncStorage from '@react-native-community/async-storage';
import PushNotification from 'react-native-push-notification';
import { useIsFocused } from '@react-navigation/native';
import GetRetos from '../Managers/GetRetos';
import { useNetInfo } from "@react-native-community/netinfo";

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

let Position;
let lastPosition = 0;
global.firstExecute = true;

export default function GameScreen({ navigation }) {


  const net = useNetInfo().isConnected;
  const isFocused = useIsFocused();
  
  //se trae el estado y la posicion del usuario
  const askUserState = async () => {
    try {

      const mail = await AsyncStorage.getItem('email');

       
        await fetch('https://mincrix.com/usergamestate/' + mail)
        .then((response) => response.json())
        .then((json) => {

          storeState(json)
          console.log("es: " + json.estado)

        })
        .catch((error) => console.log("err:  " + error))
        

    } catch (er) {
      console.log(er);
    }
  }
  

  if (isFocused) { 
    
    if(net)
    askUserState();
  }

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
        console.log(JSON.stringify(remoteMessage))

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

  //  el card que contiene los retos
  const [visible, setVisible] = useState(false);
  const [modalestado, setModalestado] = useState(false);


  const cardFooter = (props) => (
    <View {...props} style={[props.style, styles.footerContainer]}>
      <Button size='small' onPress={getUserState}>
        Tirar Dado
        </Button>

    </View>
  );

  const moveAnim = useRef(new Animated.Value(0)).current;
  const myScroll = useRef();
  const scrollAnimation = useRef(new Animated.Value(0));

  //mover la ficha a una posision determinada
  const moveFicha = () => {

    if (lastPosition < Position) {

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

      Animated.timing(moveAnim, {
        toValue: 100 * Position,
        duration: 10000,
        useNativeDriver: true
      }).start();

      console.log("last: " + lastPosition);
      console.log("Posicion: " + Position);
      lastPosition = Position;
      updateUserPosition(Position);
    }
  }

  //mover ficha cuando se inicia el juego
  const initPosition = async () => {

    const pos = await AsyncStorage.getItem('position');
    const mail = await AsyncStorage.getItem('email');

    global.pos = pos;
    global.id = mail;

    if (global.firstExecute) {

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

      Animated.timing(moveAnim, {
        toValue: 100 * Number(pos),
        duration: 3000,
        useNativeDriver: true
      }).start();

      Position = Number(pos);
      lastPosition = Number(pos);
      console.log("execution test ");
      global.firstExecute = false;
    }
  }
  initPosition();


  //hacer el numero aletorio y mostrar el dado 
  const getUserState = async () => {

    const estado = await AsyncStorage.getItem('estado');

    if (estado == "1") {

      if(net){
        setVisible(false);
        let number = getRandomInt(1, 7);
        Position = Number(Position) + number;
        console.log("Pos3: " + Position);
        navigation.navigate('DadoAnimation', { dadoResult: number });
        await AsyncStorage.setItem('estado', "2");
        await AsyncStorage.setItem('position', Position.toString());
        updataUserState();
        moveFicha();
      }else{
        showToastWithGravity();
      }
     

    } else {
      setModalestado(true);      
    }

  }

  //actualizar el estado de jugador
  const updataUserState = async () => {

    try {

      const mail = await AsyncStorage.getItem('email');

      if(net){

        await fetch('https://mincrix.com/setusergamestate/' + mail + '/2')
        .then((response) => response.json())
        .then((json) => {

        })
        .catch((error) => console.log("err:  " + error))
      }else{
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

      if(net){
        await fetch('https://mincrix.com/setuseposition/' + mail + '/' + value)
        .then((response) => response.json())
        .then((json) => {

        })
        .catch((error) => console.log("err:  " + error))
      } else{
        showToastWithGravity()
      }     

    } catch (er) {
      console.log(er);
    }
  }

  return (
    <>
      <Animated.ScrollView ref={myScroll}>

        <ImageBackground source={require('../assets/back.png')} style={styles.image}>

          <Modal
            visible={visible}
            backdropStyle={styles.backdrop}
            onBackdropPress={() => setVisible(false)}>
            <Card disabled={true} footer={cardFooter}  status='success' >
              <GetRetos />
            </Card>
          </Modal>

          <Modal
            visible={modalestado}
            backdropStyle={styles.backdrop}
            onBackdropPress={() => setModalestado(false)}>
            <Card disabled={true} status='warning' style={styles.card}  >
              <Text category='h4'> ¡Espera! </Text>
              <Text category='h6'>No puedes tirar el dado hasta que te aprueben este reto.</Text>              
              <Button size='small' appearance='ghost' onPress={() => setModalestado(false)} >Ok</Button>
            </Card>
          </Modal>

          <TouchableWithoutFeedback onPress={() => setVisible(true)}>
            <Animatable.View style={[
              styles.ficha,
              {
                transform: [
                  {
                    translateX: 0,
                    translateY: moveAnim,
                  },
                ],
              },
            ]}>

            </Animatable.View>
          </TouchableWithoutFeedback>


          <Animatable.Image style={{ position: 'absolute', height: 5, width: 5, top: 150, right: 30 }} source={require('../assets/296.png')} animation="flash" iterationCount="infinite" delay={3000} duration={3000} >
          </Animatable.Image>

          <Animatable.Image style={{ position: 'absolute', height: 7, width: 7, top: 350, right: 60 }} source={require('../assets/296.png')} animation="flash" iterationCount="infinite" delay={3000} duration={4000} >
          </Animatable.Image>

          <Animatable.Image style={{ position: 'absolute', height: 6, width: 6, top: 450, left: 60 }} source={require('../assets/296.png')} animation="flash" iterationCount="infinite" delay={3000} duration={5000} >
          </Animatable.Image>

          <Animatable.View style={styles.salida} animation="flash" >
            <Text style={styles.text} category='h4'>Inicio</Text>
          </Animatable.View>

          <Animatable.View style={styles.vPink} animation="pulse" iterationCount={4}>
            <Text style={styles.text} category='h5'> 1</Text>
          </Animatable.View>

          <Animatable.View style={styles.vBlue} animation="shake" iterationCount={3}>
            <Text style={styles.text} category='h5'> 2 </Text>
          </Animatable.View>

          <Animatable.View style={styles.vPurple} animation="tada" iterationCount={5}>
            <Text style={styles.text} category='h5'> 3 </Text>
          </Animatable.View>

          <Animatable.View style={styles.vGreen} animation="bounce" iterationCount={4}>
            <Text style={styles.text} category='h5'> 4 </Text>
          </Animatable.View>

          <Animatable.View style={styles.vBlack} animation="wobble" iterationCount={4}>
            <Text style={styles.text} category='h5'> 5 </Text>
          </Animatable.View>

          <Animatable.View style={styles.vOrange} animation="swing" iterationCount={3}>
            <Text style={styles.text} category='h5'> 6 </Text>
          </Animatable.View>

          <Animatable.View style={styles.vPink} animation="pulse" iterationCount={3}>
            <Text style={styles.text} category='h5'> 7</Text>
          </Animatable.View>

          <Animatable.View style={styles.vBlue} animation="shake" iterationCount={5}>
            <Text style={styles.text} category='h5'> 8 </Text>
          </Animatable.View>

          <Animatable.View style={styles.vPurple} animation="tada" iterationCount={4}>
            <Text style={styles.text} category='h5'> 9 </Text>
          </Animatable.View>

          <Animatable.View style={styles.vGreen} animation="bounce" iterationCount={3}>
            <Text style={styles.text} category='h5'> 10 </Text>
          </Animatable.View>

          <Animatable.View style={styles.vBlack} animation="wobble" iterationCount={5}>
            <Text style={styles.text} category='h5'> 11 </Text>
          </Animatable.View>

          <Animatable.View style={styles.vOrange} animation="swing" iterationCount={4}>
            <Text style={styles.text} category='h5'> 12 </Text>
          </Animatable.View>

          <Animatable.View style={styles.vPink} animation="pulse" iterationCount={3}>
            <Text style={styles.text} category='h5'> 13</Text>
          </Animatable.View>

          <Animatable.View style={styles.vBlue} animation="shake" iterationCount={4}>
            <Text style={styles.text} category='h5'> 14 </Text>
          </Animatable.View>

          <Animatable.View style={styles.vPurple} animation="tada" iterationCount={3}>
            <Text style={styles.text} category='h5'> 15 </Text>
          </Animatable.View>

          <Animatable.View style={styles.vGreen} animation="bounce" iterationCount={6}>
            <Text style={styles.text} category='h5'> 16 </Text>
          </Animatable.View>

          <Animatable.View style={styles.vBlack} animation="wobble" iterationCount={5}>
            <Text style={styles.text} category='h5'> 17 </Text>
          </Animatable.View>

          <Animatable.View style={styles.vOrange} animation="swing" iterationCount={4}>
            <Text style={styles.text} category='h5'> 18 </Text>
          </Animatable.View>
          <Animatable.View style={styles.vPink} animation="pulse" iterationCount={3}>
            <Text style={styles.text} category='h5'> 19</Text>
          </Animatable.View>

          <Animatable.View style={styles.vBlue} animation="shake" iterationCount={4}>
            <Text style={styles.text} category='h5'> 20 </Text>
          </Animatable.View>

          <Animatable.View style={styles.vPurple} animation="tada" iterationCount={5}>
            <Text style={styles.text} category='h5'> 21 </Text>
          </Animatable.View>

          <Animatable.View style={styles.vGreen} animation="bounce" iterationCount={4}>
            <Text style={styles.text} category='h5'> 22 </Text>
          </Animatable.View>

          <Animatable.View style={styles.vBlack} animation="wobble" iterationCount={5}>
            <Text style={styles.text} category='h5'> 23 </Text>
          </Animatable.View>

          <Animatable.View style={styles.vOrange} animation="swing" iterationCount={3}>
            <Text style={styles.text} category='h5'> 24 </Text>
          </Animatable.View>

        </ImageBackground>
      </Animated.ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  footerContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  card:{   
    margin: 1,
    alignItems: 'center',
  }, 
  text: {
    alignSelf: 'flex-start',    
  },  
  image: {
    flex: 1,
    resizeMode: "cover",
    alignItems: 'center',
  },
  salida: {
    height: 100,
    width: 200,
    borderRadius: 20,
    backgroundColor: '#000000',

  },
  vPink: {
    height: 100,
    width: 100,
    borderRadius: 20,
    backgroundColor: '#ff6699',
    borderColor: '#ffffff',

    borderWidth: 6,
    // right:100,     
  },
  vBlue: {
    height: 100,
    width: 100,
    borderRadius: 20,
    backgroundColor: '#00ffff',
    borderColor: '#ffffff',
    borderWidth: 6,
    //right:40,        
  },
  vPurple: {
    height: 100,
    width: 100,
    borderRadius: 20,
    backgroundColor: '#9900ff',
    borderColor: '#ffffff',
    borderWidth: 6,
    //left: 30,      
  },
  vRed: {
    height: 100,
    width: 100,
    borderRadius: 20,
    backgroundColor: '#ff0000',
    borderColor: '#ffffff',
    borderWidth: 6,
    //left: 30,      
  },
  vGreen: {
    height: 100,
    width: 100,
    borderRadius: 20,
    backgroundColor: '#00ff00',
    borderColor: '#ffffff',
    borderWidth: 6,
    //left: 100,      
  },
  vBlack: {
    height: 100,
    width: 100,
    borderRadius: 20,
    backgroundColor: '#000000',
    borderColor: '#ffffff',
    borderWidth: 6,
    //left: 100,      
  },
  vOrange: {
    height: 100,
    width: 100,
    borderRadius: 20,
    backgroundColor: '#F8750F',
    borderColor: '#ffffff',
    borderWidth: 6,
    //left: 100,      
  },
  text: {
    margin: 2,
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
});