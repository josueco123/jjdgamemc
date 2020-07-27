import React, { useState } from 'react';
import { Layout, Text, Avatar, Input, Button, Divider } from '@ui-kitten/components';
import { StyleSheet, Alert } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';

export default function WelcomeScreen({ route, navigation }) {

    const [nickname, setNicknme] = useState('');

    const { name } = route.params;
    const { email } = route.params;
    const { avatar } = route.params;
    const { token } = route.params;    

    const saveNewUser = async () => {

        try {
            await fetch('https://www.mincrix.com/savenewuser', {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    name: name,
                    email: email,
                    avatar: avatar,
                    nickname: nickname
                })
            }).then((response) => response.json())
                //If response is in json then in success
                .then((responseJson) => {
                    //alert(JSON.stringify(responseJson));
                    console.log(responseJson);

                    
                })
                //If response is not in json then in error
                .catch((error) => {
                    //alert(JSON.stringify(error));
                    console.log("mistake: " + error);;
                });

                await AsyncStorage.setItem('token', token)
                await AsyncStorage.setItem('username', name)
                await AsyncStorage.setItem('email', email)
                await AsyncStorage.setItem('avatar', avatar)
                await AsyncStorage.setItem('nickname', nickname)

                saveFCMtoken();

            console.log('Data successfully saved ' + name);
            createTwoButtonAlert();

        } catch (error) {
            console.log('Failed to save the data to the storage ' + error.toString());
        }
    }

    const saveFCMtoken = async () =>{

        try {
    
            const fcmtoken = await AsyncStorage.getItem('tokenfcm');
            const email = await AsyncStorage.getItem('email');
    
            await fetch('https://www.mincrix.com/savereuserfcmtoken', {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    email:email,
                    fcmtoken: fcmtoken,                   
                })
            }).then((response) => response.json())
                //If response is in json then in success
                .then((responseJson) => {
                    //alert(JSON.stringify(responseJson));
                    console.log(responseJson);                    
                })
                //If response is not in json then in error
                .catch((error) => {
                    //alert(JSON.stringify(error));
                    console.log("mistake: " + error);;
                });
    
                
        } catch (error) {
            console.log('Failed to save the data to the storage ' + error.toString());
        }    
    }    

    const goToGameScren = () => {
        navigation.navigate("Game")
    }

    const createTwoButtonAlert = () =>
        Alert.alert(
            "¡Perfecto!",
            "Todo listo para que inicies a Jugar.",
            [
                { text: "OK", onPress: goToGameScren }
            ],
            { cancelable: false }
        );    

        
        return (
            <Layout style={styles.layout} level="1">
                <Text category='h3'>Bienvenido a Mincrix</Text>
                <Text category='h6'>{name}</Text>

                {avatar == null ? (
                    <Avatar size='giant' source={require('../assets/comic.png')} />
                ) : (
                        <Avatar size='giant' source={{ uri: avatar }} />
                    )}
                <Text category='s1'>Escribe tu Nicknme para el juego </Text>
                <Input
                    style={styles.input}
                    placeholder='nickname'
                    textContentType='nickname'
                    status='basic'
                    value={nickname}
                    onChangeText={nextValue => setNicknme(nextValue)}
                />
                <Button onPress={saveNewUser}>Guardar</Button>

            </Layout>
        )     

}

const styles = StyleSheet.create({
    layout: {
        flex: 1,
        justifyContent: 'space-around',
        alignItems: 'center',
        padding: 35,
    },
    input: {
        width: 250
    }
})