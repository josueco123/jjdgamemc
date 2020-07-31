import React, { useState } from 'react';
import { Layout, Text, Icon, Avatar, Button,  } from '@ui-kitten/components';
import { View, ImageBackground, StyleSheet, Alert } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import GetMyRetos from '../Managers/GetMyRetos';



export default function ProfileScreen({ navigation }) {

  const [avatar, setAvatar] = useState(null);
  const [name, setName] = useState('');
  const [nickname, setNickname] = useState('');
  const [position, setPosition] = useState('');

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

      const valuepos  = await AsyncStorage.getItem('position')
      if (valuepos !== null) {
        // value previously stored
        setPosition(valuepos);
      }

    } catch (e) {
      // error reading value
    }
  }

  getData();

  const goToCreateReto = async () => {

    const estado = await AsyncStorage.getItem('estado');

    if (estado == "2") {
            
      navigation.navigate('CreateReto');
    }else{
      
      Alert.alert(
        "¡Espera!",
        "Todavía no puedes subir el reto.",
        [
            { text: "OK" }
        ],
        { cancelable: true });
    }  
  } 
  
  
  const imgIcon = (props) => (
    <Icon {...props} name='image-outline' />
);

  return (    

    <ImageBackground source={require('../assets/corona_rt.png')} style={styles.topContainer}>
       
       
        {avatar == null ? (
          <Avatar size='giant' source={require('../assets/comic.png')} />
        ) : (
            <Avatar size='giant' source={{ uri: avatar }} />
          )}
        
        <Text category='h6'>{nickname}</Text>
        <View style={styles.infolater}>
          <View style={styles.groupLater}>
            <Text category='h6'> Nivel </Text>
            <Text category='s1'> {position}</Text>
          </View>
          <View style={styles.groupLater}>
            <Text category='h6'> Amigos</Text>
            <Text category='s1'> 15</Text>
          </View>
        </View>                       
        <Button accessoryLeft={imgIcon} appearance='ghost' onPress={goToCreateReto}> Subir Reto</Button>
        <Text category='h5'> Retos Aprobados</Text>

        
          
          <GetMyRetos />
       

        </ImageBackground>
  );
}

const styles = StyleSheet.create({
  topContainer: {    
    padding:10,
    flex: 1,
    resizeMode: "cover",    
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',    
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
    alignSelf: 'center',
    justifyContent: 'space-between',
  },
  groupLater: {
    flexDirection: 'column',
  },
 
  
});