import React, { useState, useEffect } from 'react';
import { StyleSheet, TouchableWithoutFeedback, ImageBackground, View, Alert } from 'react-native';
import { Text, Autocomplete, AutocompleteItem, Icon, Avatar, Button, Card, Modal, Divider } from '@ui-kitten/components';
import AsyncStorage from '@react-native-community/async-storage';

const filter = (item, query) => item.nickname.toLowerCase().includes(query.toLowerCase());



export default function searchScreen({ navigation }) {

    const [value, setValue] = useState(null);
    const [data, setData] = useState([]);
    const [modal, setModal] = useState(false);

    useEffect(() => {

        fetch('https://mincrix.com/getnicknamegamers', {
            method: 'GET'
        })
            .then((response) => response.json())
            .then((responseJson) => {
                //console.log(responseJson);

                setData(responseJson);

            }).catch((error) => {
                console.error(error);
            });
    }, []);

    const getUsers = () => {

        fetch('https://mincrix.com/getnicknamegamers', {
            method: 'GET'
        })
            .then((response) => response.json())
            .then((responseJson) => {
                //console.log(responseJson);

                setData(responseJson);

            }).catch((error) => {
                console.error(error);
            });
    }

    const clearInput = () => {
        setValue('');
        getUsers();
    };

    const onSelect = async (index) => {

        setValue(data[index].nickname);

        const nickname = await AsyncStorage.getItem('nickname');
        const myemail = await AsyncStorage.getItem('email');

        if (data[index].nickname == nickname) {
            setModal(true);
        } else {
            navigation.navigate('GamerProfile', {
                nickname: data[index].nickname,
                email: myemail
            });
        }

    };

    const onChangeText = (query) => {
        setValue(query);
        setData(data.filter(item => filter(item, query)));

    };

    const renderCloseIcon = (props) => (
        <TouchableWithoutFeedback onPress={clearInput}>
            <Icon {...props} name='close' />
        </TouchableWithoutFeedback>
    );

    const renderOption = (item, index) => (
        <AutocompleteItem
            key={index}
            title={item.nickname}
            accessoryLeft={() => <Avatar size='small' source={{ uri: item.avatar }} />}
        />
    );

    return (

        <ImageBackground source={require('../assets/back.png')} style={styles.container}>

            <View style={{ backgroundColor: '#ff6699', width: 400, alignItems: 'center', }}>
                <Text category='h4'>Buscar</Text>
            </View>

            <Autocomplete
                placeholder='Escribe el nickname...'
                value={value}
                style={styles.input}
                accessoryRight={renderCloseIcon}
                onChangeText={onChangeText}
                onSelect={onSelect}>
                {data.map(renderOption)}
            </Autocomplete>

            <Modal visible={modal}
                backdropStyle={styles.backdrop}
                onBackdropPress={() => setModal(false)}>
                <Card disabled={true} status='danger'>
                    <Text category='h4' > ¡Espera!</Text>
                    <Text category='h6'>ve a la pestaña de perfil para ver el tuyo</Text>                    
                    <Button size='small' appearance='ghost' onPress={() => setModal(false)} >Ok</Button>
                </Card>
            </Modal>

        </ImageBackground>
    );

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
        padding: 15
    },
    input: {
        top: 20,
        width: 330,
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