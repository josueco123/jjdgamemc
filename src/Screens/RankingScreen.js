import React, { useState, useEffect } from 'react';
import { StyleSheet, Image, ImageBackground, VirtualizedList, View, SafeAreaView  } from 'react-native';
import { List, Text, ListItem, Divider, Avatar } from '@ui-kitten/components';

export default function searchScreen({ navigation }) {

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
        <ListItem
          title={`${item.name} casilla ${item.position}`}
          description={item.nickname} 
          accessoryLeft={() => <Avatar  size='medium' source={{ uri: item.avatar }} />}          
        />
      );
    

    return (
        <ImageBackground source={require('../assets/back.png')} style={styles.container} >
            <Text category='h1'>RANKING</Text>
            <Image source={require('../assets/logo.png')} style={styles.images} />                 
            <List
                
                data={data}
                renderItem={renderItem}
                ItemSeparatorComponent={Divider}
            />
        </ImageBackground>
       
    );

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignContent: 'center',
        justifyContent: 'center',        
        padding: 10
    },    
    images: {
        width: 50,
        height: 75,
        marginHorizontal: 3
    },
    list:{
        top:10,
        maxHeight: 250,
    },
})