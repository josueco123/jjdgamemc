import React, { useRef } from 'react';
import { Layout, Button, Card, Text,Modal } from '@ui-kitten/components';
import { ScrollView, StyleSheet, Animated, Easing, View, ImageBackground, TouchableWithoutFeedback } from 'react-native';
import * as Animatable from 'react-native-animatable';

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}
    

export default function GameScreen({ navigation }) {

  global.Position = 0;     
 
  const moveAnim = useRef(new Animated.Value(0)).current;

  const moveToPlace =()=>{
    Animated.timing(moveAnim, {
      toValue: 100,
      duration: 2000,
      useNativeDriver: true
    }).start();
  };

  const [visible, setVisible] = React.useState(false);
  
  
  var number = getRandomInt(1, 7);  
  
  const navigateAnimation = () => {
//crear la variable aleatoria aqui y pasarsela a la animacion 
    setVisible(false);
    global.Position = global.Position  + number;
    console.log("Posicion: " + global.Position);
    navigation.navigate('DadoAnimation',  {dadoResult: number});
  };

  return (
    
    <ScrollView>
      <ImageBackground source={require('../assets/back.png')} style={styles.image}> 

      <Modal
        visible={visible}
        backdropStyle={styles.backdrop}
        onBackdropPress={() => setVisible(false)}>
        <Card disabled={true}>
          <Text>Reto 😻</Text>
          <Button onPress={navigateAnimation}>
            Tirar Dado
          </Button>
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
      <Animatable.View style={styles.salida} animation="jello" iterationCount={2}>
         <Text>Inicio</Text>  
         </Animatable.View>

      <Animatable.View style={styles.button1}  animation="pulse" iterationDelay={5000} iterationCount="infinite"> 
        <Text> 1</Text>         
        </Animatable.View>     
        <Button style={styles.button1}>1</Button>
        
        <Button style={styles.button2} > 2 </Button>
        
        <Button style={styles.button3} > 3 </Button>
        <Button style={styles.button4}> 4 </Button>
        <Button style={styles.button3}> 5 </Button>
        <Button style={styles.button2}> 6 </Button>
        <Button style={styles.button1}> 7 </Button>
        <Button style={styles.button1}> 8 </Button>
        <Button style={styles.button1}> 8 </Button>
        <Button style={styles.button1}> 8 </Button>
        <Button style={styles.button1}> 8 </Button>
        <Button style={styles.button1}> 8 </Button>
        <Button style={styles.button1}> 8 </Button>

      </ImageBackground>
    </ScrollView>
    
  );
}

const styles = StyleSheet.create({
  container: {
      flex: 1,
      alignItems: 'center',        
  },
  card: {
    margin: 1,
  },
  image: {
    flex: 1,
    resizeMode: "cover",
    alignItems: 'center',    
  },
  salida:{
    height: 100,
    width: 200,
    borderRadius: 20,
    borderEndColor:'#000000',
    backgroundColor: '#000000',
    borderColor: '#ffffff'
    
  },
  button1: {
    height: 100,
    width: 100,
    borderRadius: 20,
    backgroundColor: '#FE6AB4',
    borderColor: '#ffffff',
    margin: 4,        
    borderWidth: 6,
   // right:100,     
  },  
  button2: {
    height: 100,
    width: 100,
    borderRadius: 20,
    backgroundColor: '#0080FF',
    borderColor: '#ffffff',
    margin: 4,        
    borderWidth: 6,    
    //right:40,        
  },  
  button3: {
    height: 100,
    width: 100,
    borderRadius: 20,
    backgroundColor: '#82059B',
    borderColor: '#ffffff',
    margin: 4,        
    borderWidth: 6,    
    //left: 30,      
  },   
  button4: {
    height: 100,
    width: 100,
    borderRadius: 20,
    backgroundColor: '#07EA0B',
    borderColor: '#ffffff',
    margin: 4,        
    borderWidth: 6,    
    //left: 100,      
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
    },
});