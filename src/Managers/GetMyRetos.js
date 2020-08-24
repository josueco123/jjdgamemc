import React, { Component } from 'react';
import { List, Text, Spinner, Divider, Card, Layout, Button, Icon, } from '@ui-kitten/components';
import { StyleSheet, View, Image, Share } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import LottieView from 'lottie-react-native';
import { useNetInfo } from "@react-native-community/netinfo";

export default class GetMyRetos extends Component {
    constructor(props) {
        super(props);

        this.state = {
            data: [],
            isLoading: true,
            netinfo: false,
        };
    }

    async componentDidMount() {

        this.setState({ netinfo: useNetInfo().isConnected });
        
        if (this.state.netinfo) {
            try {

                const mail = await AsyncStorage.getItem('email');
                await fetch('https://mincrix.com/useretosup/' + mail)
                    .then((response) => response.json())
                    .then((json) => {
                        this.setState({ data: json });
                    })
                    .catch((error) => console.log("err:  " + error))
                    .finally(() => {
                        this.setState({ isLoading: false });
                    });

            } catch (er) {
                console.log(er);
            }
        }
    }
 

    render() {
        const { data, isLoading } = this.state;     

        const shareIcon = (props) => (
            <Icon {...props} name='share-outline' />
        );

        const Footer = (props) => (
            <View {...props} style={[props.style, styles.footerContainer]}>

            </View>
        );

        const renderItem = ({ item }) => (
            //<ListItem title={item.title}/>
            <View style={styles.card} >
                <Image source={{ uri: 'https://www.mincrix.com//storage/' + item.image }}
                    style={styles.images}
                    resizeMode="stretch" />
                <Card >
                    <Text category='s1'>  {item.description}</Text>
                </Card>
            </View>
        );

        return (
            <>
                {isLoading ? (
                    <>
                        <View style={styles.imagelayer} >
                            <LottieView
                                autoPlay={true}
                                source={require('../animations/4434-loading.json')}
                                loop={true}
                            />
                        </View>
                    </>
                ) : (
                        data.length > 0 ?
                            <View>

                                <List
                                    style={styles.list}
                                    data={data}
                                    renderItem={renderItem}
                                />
                            </View>
                            : (
                                <>
                                    <View style={styles.imagelayer} >
                                        <Text category='h3'> No tienes retos aprobados </Text>
                                    </View>
                                </>
                            )
                    )}
            </>
        );
    }
};

const styles = StyleSheet.create({
    container: {
        top: 20,
        left: 17,
        maxHeight: 260,
        width: 275,
        zIndex: 20,
        position: 'absolute',
    },
    list: {
        maxHeight: 250,
        borderLeftWidth: 40,
        borderLeftColor: 'black',
        borderRightColor: 'black',
        borderRightWidth: 30,
        borderTopColor: 'black',
        borderTopWidth: 10,
    },
    contentContainer: {
        paddingHorizontal: 8,
        paddingVertical: 4,
    },
    item: {
        marginVertical: 4,
    },
    images: {
        width: 320,
        height: 320,
        borderWidth: 1,
    },
    bimages: {
        width: 310,
        height: 310,
        borderWidth: 1,
    },
    imagelayer: {
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        width: 355,
        height: 300,
    },
    card: {
        flex: 1,
        alignItems: 'stretch',
        borderRadius: 15,
    },
    footerContainer: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
    },
    footerControl: {
        marginHorizontal: 2,
    },

});