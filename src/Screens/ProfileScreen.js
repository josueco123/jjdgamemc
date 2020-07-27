import React, { useState } from 'react';
import { Layout, Text, Card, Avatar, Button,  } from '@ui-kitten/components';
import { View, ScrollView, StyleSheet, Alert } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import GetMyRetos from '../Managers/GetMyRetos';



export default function ProfileScreen({ navigation }) {

  const [avatar, setAvatar] = useState(null);
  const [name, setName] = useState('');
  const [nickname, setNickname] = useState('');

  const getData = async () => {
    try {
      const valuename = await AsyncStorage.getItem('username')
      if (valuename !== null) {
        // value previously stored
        setName(valuename);
      }

      const valueavatar = await AsyncStorage.getItem('avatar')
      if (valueavatar !== null) {
        // value previously stored
        setAvatar(valueavatar);
      }

      const valueanickname = await AsyncStorage.getItem('nickname')
      if (valueanickname !== null) {
        // value previously stored
        setNickname(valueanickname);
      }


    } catch (e) {
      // error reading value
    }
  }

  getData();

  const goToCreateReto = async () => {

    try {

      const mail = await AsyncStorage.getItem('email');

      await fetch('https://mincrix.com/usergamestate/' + mail)
        .then((response) => response.json())
        .then((json) => {
          //que vamos hacer con el resultado despues de obtener el estado de usuario
          if (json.estado.toString() == "2") {
            
            navigation.navigate('CreateReto');
          }else{
            
            Alert.alert(
              "¡Espera!",
              "todavía no puedes subir el reto.",
              [
                  { text: "OK" }
              ],
              { cancelable: true });
          }
        })
        .catch((error) => console.log("err:  " + error))

    } catch (er) {
      console.log(er);
    }   
  }

  

  return (    

      <Layout style={styles.topContainer} level="1">
        <Layout style={styles.profile}>
        {avatar == null ? (
          <Avatar size='giant' source={require('../assets/comic.png')} />
        ) : (
            <Avatar size='giant' source={{ uri: avatar }} />
          )}
        <Text category='h6'>{name}</Text>
        <Text category='s1'>{nickname}</Text>
        <Layout style={styles.infolater}>
          <Layout style={styles.groupLater}>
            <Text category='s1'> Nivel </Text>
            <Text category='s1'> 0</Text>
          </Layout>
          <Layout style={styles.groupLater}>
            <Text category='s1'> Amigos</Text>
            <Text category='s1'> 15</Text>
          </Layout>
        </Layout>   
        </Layout>             
        <Button appearance='ghost' onPress={goToCreateReto}> Subir Reto</Button>


        <Layout style={styles.layouretos} >
          
          <GetMyRetos />
        </Layout>

      </Layout>   

  );
}

const styles = StyleSheet.create({
  topContainer: {
    flexDirection: 'column',
    justifyContent: 'space-between',    
  },
  card: {
    flex: 1,
    margin: 2,
  },
  layouretos: {
    justifyContent: 'center',
    alignItems: 'center',
    
  },
  infolater: {
    flexDirection: 'row',
    alignSelf: 'flex-end',
  },
  groupLater: {
    flexDirection: 'column',
  },
  profile:{
    padding:15,
  }
  
});