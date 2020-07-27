import React, { useState } from 'react';
import { Layout, Text, Button, Input, Spinner, Divider } from '@ui-kitten/components';
import { ScrollView, StyleSheet, Alert } from 'react-native';
import CameraMenu from '../Managers/CameraMenu';
import AsyncStorage from '@react-native-community/async-storage';
import RNFetchBlob from 'rn-fetch-blob'


export default function CreateRetoScreen({ navigation }) {

  const [description, setDescription] = useState('');
  const [user_id,setUserId] = useState('');
  const [btnavalible, setBtnavalible] = useState(false);  

  const [data, setData] = useState('');
  
  const getData = async () => {
    try {
      const value = await AsyncStorage.getItem('token')
      if(value !== null) {
        // value previously stored
        setUserId(value);        
      } 
      const value1 = await AsyncStorage.getItem('pathimg')
      if(value1 !== null) {
        // value previously stored
        setData(value1);            
      }          
      
    } catch(e) {
      // error reading value
    }
  }
  
  getData();

  const uploadReto = async () => {
      
    setBtnavalible(true);

    await RNFetchBlob.fetch('POST', 'https://www.mincrix.com/saveretouser', {     
      'Content-Type' : 'multipart/form-data',
    }, [     
      // custom content type
      { name : 'image', filename : 'image.jpg', type:'image/jpg', data: RNFetchBlob.wrap(data)},      
      // elements without property `filename` will be sent as plain text
      { name : 'description', data : description},
      { name : 'user_id', data : user_id},      
    ]).then(response => response.text())            
    .then((responseJson) => {
        //alert(JSON.stringify(responseJson));
        console.log(responseJson);
        
        Alert.alert(
          "¡Excelente!",
          "Gracias por enviarnos tu reto, espera un poco por nuestra aprobación",
          [        
            { text: "OK", onPress: goToProfile}
          ],
          { cancelable: false });
          
      })
    .catch((err) => {
      // ...
      console.log("mistake: "+ err);
    });
  }

  const goToProfile = async() =>{
    setBtnavalible(false);    
    await AsyncStorage.removeItem('pathimg');
    navigation.navigate('Profile');
  }

  

  return (

    <ScrollView>
      <Layout style={styles.layout} level="3">
        

        <Layout style={styles.layout} level="1">

          <CameraMenu />
          <Input
            multiline={true}
            style={styles.input}
            textStyle={{ minHeight: 64 }}
            placeholder='Habla un poco de lo que hiciste...'
            value={description}
            onChangeText={nextValue => setDescription(nextValue)}
          />
        </Layout>
        {btnavalible ? <Spinner />: 
        <Button disabled={btnavalible} appearance='ghost' onPress={uploadReto} > Enviar Reto</Button>
        }
      </Layout>
    </ScrollView>
  )

}

const styles = StyleSheet.create({
  layout: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',    
  },
  input: {
    width: 350,
  }
})