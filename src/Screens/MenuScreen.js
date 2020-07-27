import * as React from 'react';
import { Layout, Text, Button } from '@ui-kitten/components';
import AsyncStorage from '@react-native-community/async-storage';



export default  function GameScreen({ navigation }) {
 
  const loggOut = async () =>{

    try {
      await AsyncStorage.removeItem('token');
      await AsyncStorage.removeItem('username');
      await AsyncStorage.removeItem('email');
      await AsyncStorage.removeItem('avatar');
      await AsyncStorage.removeItem('nickname');
      await AsyncStorage.removeItem('position');
      await AsyncStorage.removeItem('tokenfcm');
      
      navigation.navigate('loggin');
    } catch (error) {
      console.log('Mk2:' + error)
    }
  }
  
        
    return (
      <Layout style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }} level="3">
        <Text category='h1'>Menu Screen</Text>  
        <Button onPress={loggOut}>Cerrar Session</Button>             
      </Layout>
    );
  }
  