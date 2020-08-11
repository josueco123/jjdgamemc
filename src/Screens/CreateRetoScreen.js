import React, { useState, useEffect} from 'react';
import { Layout, Text, Button, Input, Spinner, Icon } from '@ui-kitten/components';
import { ScrollView, StyleSheet, Alert, BackHandler } from 'react-native';
import CameraMenu from '../Managers/CameraMenu';
import AsyncStorage from '@react-native-community/async-storage';
import RNFetchBlob from 'rn-fetch-blob'



export default function CreateRetoScreen({ navigation }) {

  const [description, setDescription] = useState('');
  const [user_id,setUserId] = useState('');
  const [position,setPosition] = useState('');
  const [btnavalible, setBtnavalible] = useState(false);  

  const [data, setData] = useState('');
  
  const getData = async () => {
    try {
      const value = await AsyncStorage.getItem('email')
      if(value !== null) {
        // value previously stored
        setUserId(value);        
      } 
      const value1 = await AsyncStorage.getItem('pathimg')
      if(value1 !== null) {
        // value previously stored
        setData(value1);            
      } 
      const value2 = await AsyncStorage.getItem('position')
      if(value2 !== null) {
        // value previously stored
        setPosition(value2);            
      }         
      
    } catch(e) {
      // error reading value
    }
  }
  
  getData();


  useEffect(() => {
    BackHandler.addEventListener("hardwareBackPress", goToProfile);

    return () =>
      BackHandler.removeEventListener("hardwareBackPress", goToProfile);
  }, []);

  const uploadReto = async () => {

    if(description == ''){

      Alert.alert(
        "¡Hubo un error!",
        "no pusiste nada en la descripcion del reto",
        [        
          { text: "OK"}
        ],
        { cancelable: true });

    }else if(data == '') {

      Alert.alert(
        "¡Hubo un error!",
        "no subiste ninguna una imagen",
        [        
          { text: "OK"}
        ],
        { cancelable: true });

      }else {    
      
    setBtnavalible(true);

    await RNFetchBlob.fetch('POST', 'https://www.mincrix.com/saveretouser', {     
      'Content-Type' : 'multipart/form-data',
    }, [     
      // custom content type
      { name : 'image', filename : 'image.jpg', type:'image/jpg', data: RNFetchBlob.wrap(data)},      
      // elements without property `filename` will be sent as plain text
      { name : 'description', data : description},
      { name : 'user_id', data : user_id}, 
      { name : 'position', data : position},      
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
  }

  const goToProfile = async() =>{
    setBtnavalible(false);    
    await AsyncStorage.removeItem('pathimg');
    navigation.navigate('Profile');
  }

  const sendIcon = (props) => (
    <Icon {...props} name='paper-plane-outline' />
  );

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
        <Button disabled={btnavalible} accessoryLeft={sendIcon} appearance='ghost' onPress={uploadReto} > Enviar Reto</Button>
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