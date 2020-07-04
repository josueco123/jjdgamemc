import * as React from 'react';
import { Layout, Text, Button } from '@ui-kitten/components';
import AsyncStorage from '@react-native-community/async-storage';

const loggOut = async () =>{

  try {
    await AsyncStorage.removeItem('token');
  } catch (error) {
    console.log('Mk2:' + error)
  }
}


export default  function GameScreen({ navigation }) {
 
        
    return (
      <Layout style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }} level="3">
        <Text category='h1'>Menu Screen</Text>  
        <Button onPress={loggOut}>Cerrar Session</Button>             
      </Layout>
    );
  }
  