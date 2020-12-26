import React, { useState } from 'react';
import { Layout, Text, Avatar, Input, Button, Modal, Card, Spinner } from '@ui-kitten/components';
import { StyleSheet, View, ToastAndroid } from 'react-native';
import { useNetInfo } from "@react-native-community/netinfo";
import AsyncStorage from '@react-native-community/async-storage';

export default function WelcomeScreen({ route, navigation }) {

    const [nickname, setNicknme] = useState('');

    const [modal1, setModal1] = useState(false);
    const [modal2, setModal2] = useState(false);
    const [btnavalible, setBtnavalible] = useState(false);

    const { name } = route.params;
    const { email } = route.params;
    const { avatar } = route.params;
    const { token } = route.params;

    const net = useNetInfo().isConnected;

    //mensage cuando se pierde la conexion
    const showToastWithGravity = () => {
        ToastAndroid.showWithGravity(
            "Has perdido la conexion a internet",
            ToastAndroid.SHORT,
            ToastAndroid.CENTER
        );
    };

    const saveNewUser = async () => {

        let exist = false;

       
        if (nickname == '' || nickname.includes(' ') || nickname.length < 3) {

            setModal1(true);
            setBtnavalible(false);
        } else {

            if (net) {
                setBtnavalible(true);
                
                await fetch('https://mincrix.com/lasñjpoaw4rqwlur4orijqkwjñkejrq939rk3jr3irlkaj4oir23/getallnicknames', {
                    method: 'GET'
                })
                    .then((response) => response.json())
                    .then((responseJson) => {                        

                        for (var i = 0; i < responseJson.length; i++) {

                            if (responseJson[i].nickname == nickname) {
                                exist = true;
                            }                           
                        }


                    }).catch((error) => {
                        console.error(error);
                    });
            } else {
                showToastWithGravity();
            }


            if (exist) {

                setModal2(true);
                setBtnavalible(false);
            } else {

                try {
                    if (net) {
                        await fetch('https://www.mincrix.com/lasjpoaw4rqwlur4orijqkwjkejrq939rk3jr3irlkaj4oir23/savenewuser', {
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
                        }).then((response) => response.text())
                            //If response is in json then in success
                            .then((responseJson) => {                               
                                saveData();
                            })
                            //If response is not in json then in error
                            .catch((error) => {                               
                                console.log("mistake: " + error);;
                            });

                    } else {
                        showToastWithGravity();
                    }


                } catch (error) {
                    console.log('Failed to save the data to the storage ' + error.toString());
                }
            }
        }
    }

    const saveData = async () => {

        //console.log("eje");
        await AsyncStorage.setItem('token', token)
        await AsyncStorage.setItem('username', name)
        await AsyncStorage.setItem('email', email)
        await AsyncStorage.setItem('avatar', avatar)
        await AsyncStorage.setItem('nickname', nickname)
        await AsyncStorage.setItem('position', "0")
        await AsyncStorage.setItem('estado', "2")
        global.id = email;
        saveFCMtoken();
        goToGameScren();
        
    }

    const saveFCMtoken = async () => {

        try {

            const fcmtoken = await AsyncStorage.getItem('tokenfcm');
            const email = await AsyncStorage.getItem('email');

            if (net) {
                await fetch('https://www.mincrix.com/lasjpoaw4rqwlur4orijqkwjkejrq939rk3jr3irlkaj4oir23/savereuserfcmtoken', {
                    method: 'POST',
                    headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        email: email,
                        fcmtoken: fcmtoken,
                    })
                }).then((response) => response.json())
                    //If response is in json then in success
                    .then((responseJson) => {                        
                    })
                    //If response is not in json then in error
                    .catch((error) => {                        
                        console.log("mistake: " + error);;
                    });
            } else {
                showToastWithGravity();
            }



        } catch (error) {
            console.log('Failed to save the data to the storage ' + error.toString());
        }
    }

    const goToGameScren = () => {
        setBtnavalible(false);
        navigation.navigate("Game");
    }

    return (
        <Layout style={styles.layout} level="3">
            <View style={{ backgroundColor: '#ff6699', width: 400, alignItems: 'center', }}>
                <Text category='h3'>Bienvenido a Mincrix</Text>
            </View>
            <Text category='h4'>{name}</Text>

            {avatar == null ? (
                <Avatar size='giant' source={require('./imgs/comic.png')} />
            ) : (
                    <Avatar style={styles.avatar} size='giant' source={{ uri: avatar }} />
                )}
            <Text category='h6'>Escribe tu Nicknme para el juego </Text>
            <Input
                style={styles.input}
                placeholder='nickname'
                textContentType='nickname'
                status='basic'
                value={nickname}
                onChangeText={nextValue => setNicknme(nextValue)}
            />
            {btnavalible ? <Spinner /> :
                <Button disabled={btnavalible} appearance='ghost' onPress={saveNewUser}>Guardar</Button>
            }
            <Modal visible={modal1}
                backdropStyle={styles.backdrop}
                onBackdropPress={() => setModal1(false)}>
                <Card disabled={true} status='danger'>
                    <Text category='h4'> ¡Hubo un error! </Text>
                    <Text category='h6'>Tu nickname no debe tener espacios y debe ser mayor a tres letras</Text>
                    <Button size='small' appearance='ghost' onPress={() => setModal1(false)} >Ok</Button>
                </Card>
            </Modal>

            <Modal visible={modal2}
                backdropStyle={styles.backdrop}
                onBackdropPress={() => setModal2(false)}>
                <Card disabled={true} status='danger'>
                    <Text category='h4'> ¡El nickname ya existe! </Text>
                    <Text category='h6'>Lo sentimos, por favor intenta escribir otro</Text>
                    <Button size='small' appearance='ghost' onPress={() => setModal2(false)} >Ok</Button>
                </Card>
            </Modal>            

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
    },
    avatar: {
        borderColor: '#ffffff',
        borderWidth: 1,
    },
    backdrop: {
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
})