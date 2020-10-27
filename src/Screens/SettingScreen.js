import React, { useState } from 'react';
import { StyleSheet, Image, ImageBackground, Vibration, View, ToastAndroid } from 'react-native';
import { Text, Button, Toggle, Modal, Card } from '@ui-kitten/components';
import SoundPlayer from 'react-native-sound-player';
import AsyncStorage from '@react-native-community/async-storage';
import { useNetInfo } from "@react-native-community/netinfo";

export default function SettingScreen({ navigation }) {

    const [sounds, setSounds] = useState(global.sounds);
    const [vibs, setVibs] = useState(global.vibs);    
    const [modal, setModal] = useState(false);
    const [confirm, setConfirm] = useState(false);

    const net = useNetInfo().isConnected;    

    const onCheckedSounds = async (isChecked) => {
        setSounds(isChecked);

        
        if(!isChecked){
            SoundPlayer.stop();
              
            await AsyncStorage.setItem('sound', "1");  
        }else{
            await AsyncStorage.removeItem('sound'); 
           
            try {
                // play the file tone.mp3
                SoundPlayer.playSoundFile('mincrixsong', 'mp3')
    
            } catch (e) {
                console.log(`cannot play the sound file`, e)
            }
        }       
        
    };

    const onCheckedVibs = async (isChecked) => {
        setVibs(isChecked);

        if(isChecked){
            Vibration.vibrate(1000);
            await AsyncStorage.removeItem('vibs');             
        }else{
            await AsyncStorage.setItem('vibs', "1"); 
        }
        
    }  

    const showToastWithGravity = () => {
        ToastAndroid.showWithGravity(
          "Has perdido la conexion a internet",
          ToastAndroid.SHORT,
          ToastAndroid.CENTER
        );
      };

    const restartLevel = async () => {

        if (net) {

            await fetch('https://mincrix.com/lasñjpoaw4rqwlur4orijqkwjñkejrq939rk3jr3irlkaj4oir23/restartposition/' + global.id)
              .then((response) => response.json())
              .then((json) => {
    
              })
              .catch((error) => console.log("err:  " + error))
          } else {
            showToastWithGravity();
          }
          await AsyncStorage.setItem('position', '0');
          global.firstExecute = true;
          setModal(false);  
          setConfirm(true);        
    }

    return (
        <ImageBackground source={require('../assets/back.png')} style={styles.container} >

            <Text category='h1'>Configuracion</Text>

            <Image source={require('../assets/image.png')} style={styles.images} />

            <View style={styles.componets}>                

                <Toggle style={styles.toggle} checked={sounds} onChange={onCheckedSounds}>
                    {sounds ? <Text category='h5'> Sonidos: On </Text> : <Text category='h5'> Sonidos: Off </Text>}
                </Toggle>

                <Toggle style={styles.toggle} checked={vibs} onChange={onCheckedVibs}>
                    {vibs ? <Text category='h5'> Vibraciones: On </Text> : <Text category='h5'> Vibraciones: Off </Text>}
                </Toggle>
            </View>

            <Button size='small' style={styles.button} onPress={() => setModal(true)}> Reiniciar Juego </Button>

            <Modal visible={modal}                
                onBackdropPress={() => setModal(false)}>
                <Card disabled={true} style={styles.card}>
                    <Text category='h4'> ¿Estas Seguro? </Text>
                    <Text category='h6'>¿Deseas perder tu avance en el juego y volver al inicio?</Text>
                    <View style={styles.close}>
                        <Button size='medium' appearance='ghost' onPress={() => setModal(false)} >No</Button>
                        <Button size='medium' appearance='ghost' onPress={restartLevel} >Sí</Button>
                    </View>
                </Card>
            </Modal>

            <Modal visible={confirm}                
                onBackdropPress={() => setConfirm(false)}>
                <Card disabled={true} style={styles.card}>
                    <Text category='h4'> ¡Listo! </Text>
                    <Text category='h6'> Has vuelto al inicio</Text>
                    <View style={styles.close}>
                        <Button size='medium' appearance='ghost' onPress={() => setConfirm(false)} >Ok</Button>                        
                    </View>
                </Card>
            </Modal>

        </ImageBackground>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'flex-start',
        padding: 10,

    },
    images: {
        width: 50,
        height: 75,
        margin: 5
    },
    componets: {
        top: 20,
        borderBottomWidth: 3,
        borderTopWidth: 3,
        borderBottomColor: '#ff6699',
        borderTopColor: '#ff6699',

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

    toggle: {
        margin: 15
    },

    button: {
        margin: 10,
        top: 50,
    },
    close: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
    },
    backdrop: {
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },

});
