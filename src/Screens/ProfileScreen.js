import React, { useState } from 'react';
import { Text, Icon, Avatar, Button, Card, Modal } from '@ui-kitten/components';
import { View, ImageBackground, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import GetMyRetos from '../Managers/GetMyRetos';
import { useNetInfo } from "@react-native-community/netinfo";
import { useIsFocused } from '@react-navigation/native';

export default function ProfileScreen({ navigation }) {

  const [avatar, setAvatar] = useState(null);
  const [nickname, setNickname] = useState('');
  const [position, setPosition] = useState('');
  const [friends, setFriends] = useState(0);
  const [modal, setModal] = useState(false);

  const net = useNetInfo().isConnected;
  const isFocused = useIsFocused();

  const getData = async () => {
    try {

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

      const valuepos = await AsyncStorage.getItem('position')
      if (valuepos !== null) {
        // value previously stored
        setPosition(valuepos);
      }

    } catch (e) {
      // error reading value
    }
  }


  if (isFocused) {

    getData();

    if (net) {
      fetch('https://mincrix.com/lasñjpoaw4rqwlur4orijqkwjñkejrq939rk3jr3irlkaj4oir23/getfriendsmail/' + global.id, {
        method: 'GET'
      })
        .then((response) => response.json())
        .then((responseJson) => {
          //console.log(responseJson);

          setFriends(responseJson);

        }).catch((error) => {
          console.error(error);
        });
    }
  }

  const goToCreateReto = async () => {

    const estado = await AsyncStorage.getItem('estado');

    if (estado == "2") {

      navigation.navigate('CreateReto');
    } else {

      setModal(true);
    }
  }


  const imgIcon = (props) => (
    <Icon {...props} name='image-outline' />
  );

  return (

    <ImageBackground source={require('./imgs/back.png')} style={styles.topContainer}>

      {net ? (
        <>
          <Avatar style={styles.avatar} size='giant' source={{ uri: avatar }} />
          
          <View style={{ backgroundColor: '#ff6699', width: 400, alignItems: 'center', }}>
            <Text category='h4'>{nickname}</Text>
          </View>          
            <View style={styles.infolater}>
              <View style={styles.groupLater}>
                <Text category='h6'> Nivel </Text>
                <View style={styles.number}>
                  <Text category='h6'> {position}</Text>
                </View>
              </View>
              <View style={styles.groupLater}>
                <Text category='h6'> Amigos</Text>
                <View style={styles.number}>
                  <Text category='h6'> {friends}</Text>
                </View>
              </View>
            </View>
            
            
            <Button accessoryLeft={imgIcon} appearance='ghost' onPress={goToCreateReto}> Subir Reto</Button>
            <Text category='h5'> Retos Completados</Text>
            <GetMyRetos />         
            

          <Modal visible={modal}
            backdropStyle={styles.backdrop}
            onBackdropPress={() => setModal(false)}>
            <Card disabled={true} style={styles.card}>
              <Text category='h4'> ¡Espera! </Text>
              <Text category='h6'>Todavía no puedes subir un reto.</Text>
              <Button size='small' appearance='ghost' onPress={() => setModal(false)} >Ok</Button>
            </Card>
          </Modal>
        </>
      ) : (
          <Text category='h3'> No tienes conexion a Internet </Text>
        )}
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  topContainer: {    
    flex: 1,    
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  avatar: {        
    borderColor: '#ffffff',
    borderWidth: 1,
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
  layouretos: {
    justifyContent: 'center',
    alignItems: 'center',

  },
  backdrop: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  infolater: {  
    flexDirection: 'row',
    alignSelf: 'center',
    justifyContent: 'space-between',
  },
  groupLater: {
    flexDirection: 'column',
  },
  number: {
    backgroundColor: '#ff0000',
    width: 42,
    borderRadius: 5,
    alignItems: 'center',
  }
});