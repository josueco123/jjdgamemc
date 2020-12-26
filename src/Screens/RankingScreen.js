import React, { useState, useEffect } from 'react';
import { StyleSheet, Image, ImageBackground, FlatList, View, ToastAndroid } from 'react-native';
import { Text, Avatar } from '@ui-kitten/components';

export default function RankingScreen({ route, navigation }) {

    const [gamers, setGamers] = useState([]);
    const [puesto, setPuesto] = useState([]);
    const { email } = route.params;


    useEffect(() => {

        fetch('https://mincrix.com/lasñjpoaw4rqwlur4orijqkwjñkejrq939rk3jr3irlkaj4oir23k/getrankiengamers', {
            method: 'GET'
        })
            .then((response) => response.json())
            .then((responseJson) => {
                //console.log(responseJson);

                setGamers(responseJson);

            }).catch((error) => {
                console.error(error);
            });

        fetch('https://mincrix.com/las%C3%B1jpoaw4rqwlur4orijqkwj%C3%B1kejrq939rk3jr3irlkaj4oir23/globalpos/' + email, {
            method: 'GET'
        })
            .then((response) => response.json())
            .then((responseJson) => {
                //console.log(responseJson);

                setPuesto(responseJson);

            }).catch((error) => {
                console.error(error);
            })

    }, []);

    const renderItem = ({ item, index }) => (

        <View style={styles.elements}>
            <View style={styles.number}>
                <Text category='h1' >{index + 1}</Text>
            </View>
            <Avatar style={styles.avatar} shape='square' size='medium' source={{ uri: item.avatar }} />
            <View>
                <Text category='h6'> {item.name} Nivel {item.position} </Text>
                <Text category='s1'> {item.nickname}  </Text>
            </View>
        </View>
    );

    return (
        <ImageBackground source={require('./imgs/back.png')} style={styles.container} >
            <Text category='h1'>RANKING</Text>
            <Image source={require('./imgs/trophy-153.png')} style={styles.images} />
            <View style={styles.init}> 
                <Text category='h6'> Tú puesto es el {puesto} </Text>                
            </View>
            <Text category='h3' >Los 20 primeros</Text>
            <FlatList
                style={styles.list}
                data={gamers}
                renderItem={renderItem}
                keyExtractor={(item, index) => index.toString()}
            />
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
    list: {
        alignSelf: 'center',
    },
    number: {
        alignItems: 'center',
        margin: 5,
    },
    elements: {
        flexDirection: 'row',
        borderBottomWidth: 4,
        borderBottomColor: '#ff6699',
        margin: 15
    },
    avatar: {
        borderColor: '#ffffff',
        borderWidth: 2,
    },
    init:{
        borderBottomWidth: 4,
        borderBottomColor: '#ff6699',
        margin: 10,
    },

})