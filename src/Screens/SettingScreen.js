import React, { useState } from 'react';
import { StyleSheet, Image, ImageBackground, Vibration, View } from 'react-native';
import { Text, Button, Toggle, Modal, Card } from '@ui-kitten/components';
import SoundPlayer from 'react-native-sound-player';
import AsyncStorage from '@react-native-community/async-storage';

export default function SettingScreen({ navigation }) {

    const [sounds, setSounds] = useState(global.sounds);
    const [vibs, setVibs] = useState(global.vibs);    
    const [modal, setModal] = useState(false);

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
            await AsyncStorage.setItem('vibs', "1"); 
        }else{
            await AsyncStorage.removeItem('vibs'); 
        }
        
    }  

    const restartLevel = () => {

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
                backdropStyle={styles.backdrop}
                onBackdropPress={() => setModal(false)}>
                <Card disabled={true} status='danger'>
                    <Text category='h4'> ¿Estas Seguro? </Text>
                    <Text category='h6'>¿Deseas perder tu avance en el juego y volver al inicio?</Text>
                    <View style={styles.close}>
                        <Button size='medium' appearance='ghost' onPress={() => setModal(false)} >No</Button>
                        <Button size='medium' appearance='ghost' onPress={restartLevel} >Sí</Button>
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
