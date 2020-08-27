import * as React from 'react';
import { Layout, Text, Button, Icon, Divider, Modal, Card } from '@ui-kitten/components';
import { ScrollView, StyleSheet, Image, TouchableOpacity, ImageBackground, View, ToastAndroid, BackHandler } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import { GoogleSignin } from '@react-native-community/google-signin';
import { useNetInfo } from "@react-native-community/netinfo";


export default function GameScreen({ navigation }) {

  const [modal, setModal] = React.useState(false);
  const net = useNetInfo().isConnected;

  const loggOut = async () => {

    try {
      await AsyncStorage.removeItem('token');
      await AsyncStorage.removeItem('username');
      await AsyncStorage.removeItem('email');
      await AsyncStorage.removeItem('avatar');
      await AsyncStorage.removeItem('nickname');
      await AsyncStorage.removeItem('estado');
      await AsyncStorage.removeItem('position');
      await AsyncStorage.removeItem('tokenfcm');
      global.firstExecute = true;

      const isSignedIn = await GoogleSignin.isSignedIn();

      if (isSignedIn) {
        await GoogleSignin.revokeAccess();
        await GoogleSignin.signOut();
      }

      //navigation.navigate('loggin');
      BackHandler.exitApp();
    } catch (error) {
      console.log('Mk2:' + error)
    }
  }

  const showToastWithGravity = () => {
    ToastAndroid.showWithGravity(
      "Has perdido la conexion a internet",
      ToastAndroid.SHORT,
      ToastAndroid.CENTER
    );
  };

  const gotoSearch = () => {
    if (net) {
      navigation.navigate('Buscar');
    } else {
      showToastWithGravity();
    }

  }

  const gotoRanking = () => {
    if (net) {
      navigation.navigate('Ranking');
    } else {
      showToastWithGravity();
    }
  }

  const gotoFriends = async () => {

    if (net) {

      try {
        const value = await AsyncStorage.getItem('email')
        if (value !== null) {
          // value previously stored
          navigation.navigate('Friends', { email: value });
        }
      } catch (error) {

      }
    } else {
      showToastWithGravity();
    }
  }

  return (

    <ScrollView>
      <ImageBackground source={require('../assets/back.png')} style={styles.container}>


        <Modal visible={modal}
          backdropStyle={styles.backdrop}
          onBackdropPress={() => setModal(false)}>
          <Card disabled={true} status='danger'>
            <Text category='h4'> ¿Estas Seguro? </Text>
            <Text category='h6'>¿Deseas salir y cerrar sesión?</Text>
            <View style={styles.close}>
              <Button size='medium' appearance='ghost' onPress={() => setModal(false)} >No</Button>
              <Button size='medium' appearance='ghost' onPress={loggOut} >Sí</Button>
            </View>
          </Card>
        </Modal>

        <Text category='h1'>MINCRIX</Text>
        <Image source={require('../assets/logo.png')} style={styles.images} />
        <Divider />
        <View style={styles.componets}>
          <TouchableOpacity style={styles.button} onPress={gotoFriends}>
            <Icon style={styles.icon} fill='#ff6699' name='people-outline' />
            <Text category='h5'>Amigos</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.button} onPress={gotoSearch} >
            <Icon style={styles.icon} fill='#ff6699' name='search-outline' />
            <Text category='h5'>Buscar</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.button} onPress={gotoRanking}>
            <Icon style={styles.icon} fill='#ff6699' name='globe-outline' />
            <Text category='h5'>Ranking</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.componets2}>
          <TouchableOpacity style={styles.button} >
            <Icon style={styles.icon} fill='#ff6699' name='info-outline' />
            <Text category='h5'>Instrucciones</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.button} >
            <Icon style={styles.icon} fill='#ff6699' name='link-2-outline' />
            <Text category='h5'>Blog</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.button} >
            <Icon style={styles.icon} fill='#ff6699' name='star-outline' />
            <Text category='h5'>Mas Juegos</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.button} >
            <Icon style={styles.icon} fill='#ff6699' name='gift-outline' />
            <Text category='h5'>Donaciones</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity style={styles.button} >
          <Text category='h5'>Sobre MINCRIX</Text>
        </TouchableOpacity>


        <TouchableOpacity style={styles.button} onPress={() => setModal(true)}>
          <Text category='h5'>Cerrar Sesión</Text>
        </TouchableOpacity>

      </ImageBackground>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10
  },
  componets: {
    top: 20,
    borderBottomWidth: 3,
    borderTopWidth: 3,
    borderBottomColor: '#ff6699',
    borderTopColor: '#ff6699',

  },
  close: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  componets2: {
    top: 10,
    borderBottomWidth: 3,
    borderBottomColor: '#ff6699',

  },
  btncontainer: {
    flex: 1,
    flexDirection: 'row',
  },
  icon: {
    right: 10,
    width: 24,
    height: 24,
  },
  button: {
    alignItems: "center",
    flexDirection: 'row',
    padding: 25,
    paddingVertical: 8,
    marginVertical: 5,
  },
  images: {
    width: 50,
    height: 75,
    marginHorizontal: 3
  },
  backdrop: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
})