import React, { useState, useEffect } from 'react';
import { Layout, Text, Button, Input, Spinner, Icon, Modal, Card } from '@ui-kitten/components';
import { ScrollView, StyleSheet, BackHandler, ToastAndroid } from 'react-native';
import { useNetInfo } from "@react-native-community/netinfo";
import CameraMenu from '../Managers/CameraMenu';
import AsyncStorage from '@react-native-community/async-storage';
import RNFetchBlob from 'rn-fetch-blob';


export default function CreateRetoScreen({ navigation }) {

  const [description, setDescription] = useState('');
  const [user_id, setUserId] = useState('');
  const [position, setPosition] = useState('');
  const [btnavalible, setBtnavalible] = useState(false);
  const [modal1, setModal1] = useState(false);
  const [modal2, setModal2] = useState(false);
  const [modal3, setModal3] = useState(false);

  const [data, setData] = useState('');
  const net = useNetInfo().isConnected;

  const getData = async () => {
    try {
      const value = await AsyncStorage.getItem('email')
      if (value !== null) {
        // value previously stored
        setUserId(value);
      }
      const value1 = await AsyncStorage.getItem('pathimg')
      if (value1 !== null) {
        // value previously stored
        setData(value1);
      }
      const value2 = await AsyncStorage.getItem('position')
      if (value2 !== null) {
        // value previously stored
        setPosition(value2);
      }

    } catch (e) {
      // error reading value
    }
  }

  getData();


  //mensage cuando se pierde la conexion
  const showToastWithGravity = () => {
    ToastAndroid.showWithGravity(
      "Has perdido la conexion a internet",
      ToastAndroid.SHORT,
      ToastAndroid.CENTER
    );
  };

  useEffect(() => {
    BackHandler.addEventListener("hardwareBackPress", goToProfile);

    return () =>
      BackHandler.removeEventListener("hardwareBackPress", goToProfile);
  }, []);

  const uploadReto = async () => {

    if (description == '') {
      setModal1(true);
    } else if (data == '') {
      setModal2(true);
    } else {

        

      if (net) {
        

        setBtnavalible(true);    
        setModal3(true);
        await AsyncStorage.setItem('estado', "3");

        await RNFetchBlob.fetch('POST', 'https://www.mincrix.com/lasjpoaw4rqwlur4orijqkwjkejrq939rk3jr3irlkaj4oir23/saveretouser', {
          'Content-Type': 'multipart/form-data',
        }, [
          // custom content type
          { name: 'image', filename: 'image.jpg', type: 'image/jpg', data: RNFetchBlob.wrap(data) },
          // elements without property `filename` will be sent as plain text
          { name: 'description', data: description },
          { name: 'user_id', data: user_id },
          { name: 'position', data: position },
        ]).then(response => response.json())
          .then((responseJson) => {
            //alert(JSON.stringify(responseJson));
            //console.log(responseJson);

            

          })
          .catch((err) => {
            // ...
            console.log("mistake: " + err);
          });
      } else {
        showToastWithGravity();
      }

    }
  }

  const goToProfile = async () => {
    setModal1(false);
    setModal2(false);
    setModal3(false);
    setBtnavalible(false);
    await AsyncStorage.removeItem('pathimg');
    navigation.navigate('Profile');
  }

  const sendIcon = (props) => (
    <Icon {...props} name='paper-plane-outline' />
  );

  return (

    <Layout style={styles.layout} level="4">
      <ScrollView contentContainerStyle={styles.contentContainer} centerContent={true} showsVerticalScrollIndicator={false}>

        <Layout style={styles.layout} level="4">

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
        {btnavalible ? <Spinner /> :
          <Button disabled={btnavalible} accessoryLeft={sendIcon} appearance='ghost' onPress={uploadReto} > Enviar Reto</Button>
        }

        <Modal visible={modal1}
          backdropStyle={styles.backdrop}
          onBackdropPress={() => setModal1(false)} >
          <Card disabled={true} style={styles.card}>
            <Text category='h4'> ¡Hubo un error! </Text>
            <Text category='h6'> No pusiste nada en la descripcion del reto</Text>
            <Button size='small' appearance='ghost' onPress={() => setModal1(false)} >Ok</Button>
          </Card>
        </Modal>

        <Modal visible={modal2}
          backdropStyle={styles.backdrop}
          onBackdropPress={() => setModal2(false)}>
          <Card disabled={true} style={styles.card}>
            <Text category='h4'> ¡Hubo un error! </Text>
            <Text category='h6'> No subiste ninguna una imagen</Text>

            <Button size='small' appearance='ghost' onPress={() => setModal2(false)} >Ok</Button>
          </Card>
        </Modal>

        <Modal visible={modal3}
          backdropStyle={styles.backdrop}
          onBackdropPress={() => setModal3(true)}>
          <Card disabled={true} style={styles.card}>
            <Text category='h4'> ¡Excelente!</Text>
            <Text category='h6'> Gracias por enviarnos tu reto, espera un poco por nuestra aprobación</Text>

            <Button size='small' appearance='ghost' onPress={goToProfile} >Ok</Button>
          </Card>
        </Modal>
      </ScrollView>
    </Layout>

  )

}

const styles = StyleSheet.create({
  layout: {
    flex: 1,
    justifyContent: 'center',
    padding: 10,     
  },
  contentContainer: {
    alignItems: 'center', 
  },
  input: {
    width: 350,
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
})