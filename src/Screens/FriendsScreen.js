import React, { useState, useEffect } from 'react';
import { StyleSheet, Image, ImageBackground, FlatList, View, TouchableOpacity, ToastAndroid, Share } from 'react-native';
import { Text, Avatar, Button, Icon } from '@ui-kitten/components';
import { useNetInfo } from "@react-native-community/netinfo";

export default function FriendsScreen({ route, navigation }) {

    const [data, setData] = useState([]);
    const { email } = route.params;  
    
    useEffect(() => {

            fetch('http://mincrix.com/lasñjpoaw4rqwlur4orijqkwjñkejrq939rk3jr3irlkaj4oir23/useramigos/' + email, {
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

    //mensage cuando se pierde la conexion
  const showToastWithGravity = () => {
    ToastAndroid.showWithGravity(
      "Has perdido la conexion a internet",
      ToastAndroid.SHORT,
      ToastAndroid.CENTER
    );
  };

    const renderItem = ({ item, index }) => (

        <TouchableOpacity style={styles.elements} onPress={() => navigation.navigate('GamerProfile', {
            nickname: item.nickname,
            email: global.id
        })}>
            <Avatar style={styles.avatar} size='medium' source={{ uri: item.avatar }} />
            <View>
                <Text category='h6'> {item.name} </Text>
                <Text category='s1'> {item.nickname} Nivel {item.position} </Text>
            </View>
        </TouchableOpacity>
    );
  

    const shareIcon = (props) => (
        <Icon {...props} name='share-outline' />
    );

    const onShare = async () => {
        try {
            const result = await Share.share({
                message:
                    'Hola te invito a descargar MINCRIX | https://mincrix.com',
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

    return (
        <ImageBackground source={require('../assets/back.png')} style={styles.container} >
            <View style={styles.tabContainer}>
                <Text category='h1'>Amigos</Text>
                {data.length <= 0 ? (
                    <View style={styles.mensaje}>
                        <Text category='h5'> Todavía no tienes amigos en el Juego </Text>
                        <Text category='s1'> Invita a tus amigos a descagar la app </Text>
                        <Button accessoryLeft={shareIcon} appearance='ghost' onPress={onShare}> Invitar </Button>
                    </View>
                ) : (
                        <>
                            <Button accessoryLeft={shareIcon} appearance='ghost' onPress={onShare}> Invita a otros </Button>
                            <FlatList
                                style={styles.list}
                                data={data}
                                renderItem={renderItem}
                                keyExtractor={(item, index) => index.toString()}
                            />
                        </>
                    )}
            </View>
        </ImageBackground>

    );

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-start',

    },
    tabContainer: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    images: {
        width: 50,
        height: 75,
        marginHorizontal: 3
    },
    list: {
        alignSelf: 'center',

    },
    number: {
        alignItems: 'center',
        margin: 5,
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
    mensaje: {
        padding: 8,
    },
    btnSolicitud: {
        flexDirection: 'row',
    },
    header: {
        borderColor: '#ff6699',
        borderWidth: 10,
    }
})