import React, { useState, useEffect } from 'react';
import { StyleSheet, ImageBackground, FlatList, View, TouchableOpacity, Share } from 'react-native';
import { Text, Avatar, Button, Icon } from '@ui-kitten/components';
import LottieView from 'lottie-react-native';

export default function FriendsScreen({ navigation }) {

    const [friends, setFriends] = useState([]);
    const [waiting, setWaiting] = useState(true);

    useEffect(() => {

        fetch('http://mincrix.com/lasñjpoaw4rqwlur4orijqkwjñkejrq939rk3jr3irlkaj4oir23/useramigos/' + global.id, {
            method: 'GET'
        })
            .then((response) => response.json())
            .then((responseJson) => {

                setFriends(responseJson);

            }).catch((error) => {
                console.error(error);
            }).finally(() => {
                setWaiting(false);
            });
    }, []);


    const shareIcon = (props) => (
        <Icon {...props} name='share-outline' />
    );

    const searchIcon = (props) => (
        <Icon {...props} name='search-outline' />
    );

    const onShare = async () => {
        try {
            const result = await Share.share({
                message:
                    'Hola te invito a descargar MINCRIX | https://play.google.com/store/apps/details?id=com.mincrix',
            });
            if (result.action === Share.sharedAction) {
                if (result.activityType) {
                    // shared with activity type of result.activityType
                } else {
                    // shared
                }
            } else if (result.action === Share.dismissedAction) {
                // dismissed
            }
        } catch (error) {
            console.log(error.message);
        }
    };

    const renderItem = ({ item }) => (
        <TouchableOpacity style={styles.elements} onPress={() => navigation.navigate('GamerProfile', {
            nickname: item.nickname,
            email: global.id,
        })}>
            <Avatar style={styles.avatar} size='medium' source={{ uri: item.avatar }} />
            <View>
                <Text category='h6'> {item.name} </Text>
                <Text category='s1'> {item.nickname} Nivel {item.position} </Text>
            </View>
        </TouchableOpacity>

    );

    return (
        <ImageBackground source={require('./imgs/back.png')} style={styles.container} >
            <Text category='h1'>Amigos</Text>
            <Icon style={styles.icon} fill='#ff6699' name='people-outline' />
            <View style={styles.groupLater}>
                <Button size='small' accessoryLeft={shareIcon} appearance='ghost' onPress={onShare}> Invita a otros </Button>
                <Button size='small' accessoryLeft={searchIcon} appearance='ghost' onPress={() => navigation.navigate('Buscar')}> Buscar Jugador </Button>
            </View>
            {waiting ? (

                <>
                    <LottieView
                        autoPlay={true}
                        style={styles.anim}
                        source={require('../animations/25317-friendship.json')}
                        loop={true}
                    />
                </>

            ) : (friends.length > 0 ?
                <>

                    <FlatList
                        data={friends}
                        renderItem={renderItem}
                        keyExtractor={(item, index) => index.toString()}
                    />
                </>
                : (
                    <>
                        <Text category='h5'> Todavía no has hecho amigos en el Juego </Text>
                        <Text category='s1'> Busca a tus amigos o invitalos a descagar la app </Text>
                    </>)
                )}

        </ImageBackground>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'flex-start',
        alignContent: 'center',
    },
    images: {
        width: 50,
        height: 75,
        marginHorizontal: 3
    },
    elements: {
        flexDirection: 'row',
        borderBottomWidth: 2,
        borderBottomColor: '#ff6699',
        margin: 15
    },
    avatar: {
        borderColor: '#ffffff',
        borderWidth: 2,
    },
    btnSolicitud: {
        flexDirection: 'row',
    },
    anim: {
        width: 250,
        height: 250,
    },
    icon: {
        width: 40,
        height: 40,
    },
    groupLater: {
        flexDirection: 'row',
    },
})