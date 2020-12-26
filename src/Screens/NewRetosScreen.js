import React, { useState, useEffect } from 'react';
import { Text, } from '@ui-kitten/components';
import { View, ImageBackground, StyleSheet, Image, ToastAndroid, FlatList, SafeAreaView } from 'react-native';
import LottieView from 'lottie-react-native';
import { useNetInfo } from "@react-native-community/netinfo";

export default function NewRetosScreen({ navigation }) {

    const [isLoading, setIsloading] = useState(true);
    const [retos, setRetos] = useState([]);
    const [updateList, setUpdateList] = useState(false);

    const net = useNetInfo().isConnected;

    useEffect(() => {

        fetch('https://mincrix.com/las%C3%B1jpoaw4rqwlur4orijqkwj%C3%B1kejrq939rk3jr3irlkaj4oir23/newretos', {
            method: 'GET'
        })
            .then((response) => response.json())
            .then((responseJson) => {
                //console.log(responseJson);

                setRetos(responseJson);                

            }).catch((error) => {
                console.error(error);
            }).finally(() => {
                setIsloading(false);
            });
    }, []);

    const updateRetos = async () => {

        setIsloading(true);

        if (net) {
            setUpdateList(true);
            showToastWithGravity();

        } else {
            showToastnoInternet();
        }
    }

    const showToastWithGravity = () => {
        ToastAndroid.showWithGravity(
            "Se ha Actualizado los Retos Aprobados",
            ToastAndroid.SHORT,
            ToastAndroid.CENTER
        );
    };

    const showToastnoInternet = () => {
        ToastAndroid.showWithGravity(
            "Has perdido la conexion a internet",
            ToastAndroid.SHORT,
            ToastAndroid.CENTER
        );
    };

    const renderItem = ({ item }) => (
        //<ListItem title={item.title}/>        
        <View style={styles.elements}>
            <Image source={{ uri: 'https://www.mincrix.com//storage/' + item.image }}
                style={styles.images}
                resizeMode="stretch" />
        </View>
    );


    return (
        <ImageBackground source={require('./imgs/back.png')} style={styles.container}>
            <View style={{ margin: 10, backgroundColor: '#ff6699', width: 500, alignItems: 'center', }}>
                <Text category='h4'>Nuevos Retos Aprobados</Text>
            </View>
           
                {isLoading ? (
                    <>
                        <LottieView
                            autoPlay={true}
                            source={require('../animations/4434-loading.json')}
                            loop={true}
                        />
                    </>
                ) : (
                        <FlatList
                            data={retos}
                            renderItem={renderItem}                           
                            keyExtractor={(item, index) => index.toString()}
                        />
                    )}
           
        </ImageBackground>
    );

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'center',
        padding: 15,
    },
    images: {
        width: 330,
        height: 330,
        borderWidth: 15,
        borderColor: 'black',
    },
    elements: {
        borderTopWidth: 4,
        borderTopColor: '#ff6699',
        margin: 5,
    },
});