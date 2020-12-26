import * as React from 'react';
import { Text, Button, Icon, Modal, Card } from '@ui-kitten/components';
import { ScrollView, StyleSheet, Image, TouchableOpacity, ImageBackground, View, ToastAndroid, BackHandler } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import { GoogleSignin } from '@react-native-community/google-signin';
import { useNetInfo } from "@react-native-community/netinfo";


export default function MenuScreen({ navigation }) {

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

  const gotoRanking = async () => {
    if (net) {

      try{
        const value = await AsyncStorage.getItem('email');
        if (value != null) {
          navigation.navigate('Ranking',{ email: value });
        }

      }catch(error){

      }
      
    } else {
      showToastWithGravity();
    }
  }

  const gotoFriends = async () => {

    if (net) {

      try {
        const value = await AsyncStorage.getItem('email');
        if (value != null) {
          // value previously stored
          navigation.navigate('Friends', { email: value });
        }
      } catch (error) {

      }
    } else {
      showToastWithGravity();
    }
  }

  const goToSettins = () => {

    navigation.navigate('Settings');
  }

  return (

    <ImageBackground source={require('./imgs/back.png')} style={styles.backimg} >
      <ScrollView contentContainerStyle={styles.contentContainer} centerContent={true} showsVerticalScrollIndicator={false}>
        <Modal visible={modal}
          onBackdropPress={() => setModal(false)}>
          <Card disabled={true} style={styles.card}>
            <Text category='h4'> ¿Estas Seguro? </Text>
            <Text category='h6'>¿Deseas salir y cerrar sesión?</Text>
            <View style={styles.close}>
              <Button size='medium' appearance='ghost' onPress={() => setModal(false)} >No</Button>
              <Button size='medium' appearance='ghost' onPress={loggOut} >Sí</Button>
            </View>
          </Card>
        </Modal>

        <Text category='h1'>MINCRIX</Text>
        <Image source={require('./imgs/logop.png')} style={styles.images} />
        <View style={styles.componets}>

          <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Instructions')} >
            <Icon style={styles.icon} fill='#ff6699' name='info-outline' />
            <Text category='h5'>Instrucciones</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.button} onPress={gotoSearch} >
            <Icon style={styles.icon} fill='#ff6699' name='search-outline' />
            <Text category='h5'>Buscar Jugador</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Chat')}>
            <Icon style={styles.icon} fill='#ff6699' name='message-circle-outline' />
            <Text category='h5'>Chat</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.button} onPress={gotoRanking}>
            <Icon style={styles.icon} fill='#ff6699' name='globe-outline' />
            <Text category='h5'>Ranking</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.componets2}>

          <TouchableOpacity style={styles.button} onPress={goToSettins}>
            <Icon style={styles.icon} fill='#ff6699' name='settings-outline' />
            <Text category='h5'>Configuración</Text>
          </TouchableOpacity>


          <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('MoreGames')}>
            <Icon style={styles.icon} fill='#ff6699' name='star-outline' />
            <Text category='h5'>Más Juegos</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.button} >
            <Icon style={styles.icon} fill='#ff6699' name='gift-outline' />
            <Text category='h5'>Donaciones</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('AboutUs')} >
          <Text category='h5'>Sobre MINCRIX</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={() => setModal(true)}>
          <Text category='h5'>Cerrar Sesión</Text>
        </TouchableOpacity>
      </ScrollView>
    </ImageBackground>

  );
}

const styles = StyleSheet.create({

  backimg: {
    flex: 1,
    justifyContent: 'center',
    padding: 10,
  },
  contentContainer: {
    alignItems: 'center',
  },
  componets: {
    alignItems: "center",
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
  images: {
    width: 50,
    height: 75,
    marginHorizontal: 3
  },
  backdrop: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
})