import React, { useRef,useEffect, } from 'react';
import { Layout, Button, Card, Text,Modal } from '@ui-kitten/components';
import { ScrollView, StyleSheet, Animated, Easing, View, ImageBackground, TouchableWithoutFeedback } from 'react-native';
import * as Animatable from 'react-native-animatable';

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

let Position = 0;  
let lastPosition = 0;
let test = true;

export default function GameScreen({ navigation }) {
  

  const cardHeader = (props) => (
    <View {...props}>
      <Text category='h6'>Reto 😻</Text>      
    </View>
  );   

  const cardFooter = (props) => (
    <View {...props} >
        <Button size='small' onPress={navigateAnimation}>
            Tirar Dado
          </Button>         
          </View>
  );
 
  const moveAnim = useRef(new Animated.Value(0)).current;
  const myScroll = React.useRef();
  const scrollAnimation = useRef(new Animated.Value(0));

  

  const moveToPlace =()=>{
    Animated.timing(moveAnim, {
      toValue: 100,
      duration: 2000,
      useNativeDriver: true
    }).start();
    
    //myScroll.current.scrollTo({ x: 0, y: 50 , animated: true})
  };

  const [visible, setVisible] = React.useState(false);    
  
  if(lastPosition < Position){

    scrollAnimation.current.addListener((animation) => {
      myScroll.current &&
      myScroll.current.scrollTo({
          y: animation.value,
          animated: false,
        })
    })

    Animated.timing(scrollAnimation.current, {
      toValue: 80* Position,
      duration: 10000,
      useNativeDriver: true,
      easing: Easing.linear,
    }).start()
    
    Animated.timing(moveAnim, {
      toValue: 100* Position,
      duration: 10000,
      useNativeDriver: true
    }).start();

    console.log("last: " + lastPosition);
    console.log("Posicion: " + Position);
    lastPosition = Position;
  }


  const navigateAnimation = () => {
//crear la variable aleatoria aqui y pasarsela a la animacion 
    setVisible(false);
    let number = getRandomInt(1, 7);  
    Position = Position  + number;
    //console.log("Posicion: " + Position);
    navigation.navigate('DadoAnimation',  {dadoResult: number});
  };

  return (
    
    <Animated.ScrollView ref={myScroll}>
      <ImageBackground source={require('../assets/back.png')} style={styles.image}> 

      <Modal
        visible={visible}
        backdropStyle={styles.backdrop}
        onBackdropPress={() => setVisible(false)}>
        <Card disabled={true} footer={cardFooter} header={cardHeader}>
          <Text>Hazlo sin llorar </Text>        
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
         <Text style={styles.text} category='h4'>Inicio</Text>  
         </Animatable.View>

      <Animatable.View style={styles.vPink}  animation="pulse" iterationDelay={5000} iterationCount="infinite"> 
        <Text style={styles.text} category='h5'> 1</Text>         
        </Animatable.View>     

        <Animatable.View style={styles.vBlue}  animation="shake" iterationDelay={3000} iterationCount="infinite"> 
        <Text style={styles.text} category='h5'> 2 </Text>         
        </Animatable.View>    

        <Animatable.View style={styles.vPurple}  animation="tada" iterationDelay={1000} iterationCount="infinite"> 
        <Text style={styles.text} category='h5'> 3 </Text>         
        </Animatable.View>  
        
        <Animatable.View style={styles.vGreen}  animation="bounce" iterationDelay={6000} iterationCount="infinite"> 
        <Text style={styles.text} category='h5'> 4 </Text>         
        </Animatable.View>  
        
        <Animatable.View style={styles.vBlack}  animation="wobble" iterationDelay={4000} iterationCount="infinite"> 
        <Text style={styles.text} category='h5'> 5 </Text>         
        </Animatable.View>  

        <Animatable.View style={styles.vOrange}  animation="swing" iterationDelay={8000} iterationCount="infinite"> 
        <Text style={styles.text} category='h5'> 6 </Text>         
        </Animatable.View>  

        <Animatable.View style={styles.vPink}  animation="pulse" iterationDelay={5000} iterationCount="infinite"> 
        <Text style={styles.text} category='h5'> 7</Text>         
        </Animatable.View>     

        <Animatable.View style={styles.vBlue}  animation="shake" iterationDelay={3000} iterationCount="infinite"> 
        <Text style={styles.text} category='h5'> 8 </Text>         
        </Animatable.View>    

        <Animatable.View style={styles.vPurple}  animation="tada" iterationDelay={1000} iterationCount="infinite"> 
        <Text style={styles.text} category='h5'> 9 </Text>         
        </Animatable.View>  
        
        <Animatable.View style={styles.vGreen}  animation="bounce" iterationDelay={6000} iterationCount="infinite"> 
        <Text style={styles.text} category='h5'> 10 </Text>         
        </Animatable.View>  
        
        <Animatable.View style={styles.vBlack}  animation="wobble" iterationDelay={4000} iterationCount="infinite"> 
        <Text style={styles.text} category='h5'> 11 </Text>         
        </Animatable.View>  

        <Animatable.View style={styles.vOrange}  animation="swing" iterationDelay={8000} iterationCount="infinite"> 
        <Text style={styles.text} category='h5'> 12 </Text>         
        </Animatable.View>  
                        
      </ImageBackground>
    </Animated.ScrollView>
    
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
    backgroundColor: '#000000',   
    
  },
  vPink: {
    height: 100,
    width: 100,
    borderRadius: 20,    
    backgroundColor: '#FE6AB4',
    borderColor: '#ffffff',
           
    borderWidth: 6,
   // right:100,     
  },  
  vBlue: {
    height: 100,
    width: 100,
    borderRadius: 20,
    backgroundColor: '#0080FF',
    borderColor: '#ffffff',            
    borderWidth: 6,    
    //right:40,        
  },  
  vPurple: {
    height: 100,
    width: 100,
    borderRadius: 20,
    backgroundColor: '#82059B',
    borderColor: '#ffffff',        
    borderWidth: 6,    
    //left: 30,      
  },   
  vGreen: {
    height: 100,
    width: 100,
    borderRadius: 20,
    backgroundColor: '#07EA0B',
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
});