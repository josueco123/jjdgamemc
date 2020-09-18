import React, { useState, useEffect } from 'react';
import { StyleSheet, Image, ImageBackground, FlatList, View, ToastAndroid } from 'react-native';
import { List, Text, ListItem, Divider, Avatar } from '@ui-kitten/components';

export default function RankingScreen({ navigation }) {

    const [data, setData] = useState([]);
   

    useEffect(() => {       

            fetch('https://mincrix.com/getrankiengamers', {
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

    

    const renderItem = ({ item, index }) => (

        <View style={styles.elements}>
            <View style={styles.number}>
                <Text category='h1' >{index + 1}</Text>
            </View>
            <Avatar style={styles.avatar} shape='square' size='medium' source={{ uri: item.avatar }} />
            <View>
                <Text category='h6'> {item.name} Casilla {item.position} </Text>
                <Text category='s1'> {item.nickname}  </Text>
            </View>
        </View>
    );

    const listHeader = () => (
        <View styles={styles.header}>

        </View>
    );

    return (
        <ImageBackground source={require('../assets/back.png')} style={styles.container} >
            <Text category='h1'>RANKING</Text>
            <Image source={require('../assets/trophy-153.png')} style={styles.images} />
            <FlatList
                style={styles.list}
                data={data}
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

})