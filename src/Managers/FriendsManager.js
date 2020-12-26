import React, { Component } from 'react';
import { StyleSheet, ImageBackground, FlatList, View, TouchableOpacity, Share } from 'react-native';
import { Text, Avatar, Button, Icon } from '@ui-kitten/components';
import LottieView from 'lottie-react-native';

export default class FriendsManger extends Component {

    constructor(props) {
        super(props);

        
        this.state = {            
            friends: [],
            isLoading: true,
        };
    }

    componentDidMount() {

        fetch('http://mincrix.com/lasñjpoaw4rqwlur4orijqkwjñkejrq939rk3jr3irlkaj4oir23/useramigos/' + global.id, {
            method: 'GET'
        })
            .then((response) => response.json())
            .then((responseJson) => {

                this.setState({ friends: responseJson });               

            }).catch((error) => {
                console.error(error);
            }).finally(() => {
                this.setState({ isLoading: false });
            });
    }

    

    render() {

        const { friends, isLoading } = this.state;

        const renderItem = ({ item }) => (
            <TouchableOpacity style={styles.elements} >
                <Avatar style={styles.avatar} size='medium' source={{ uri: item.avatar }} />
                <View>
                    <Text category='h6'> {item.name} </Text>
                    <Text category='s1'> {item.nickname} Nivel {item.position} </Text>
                </View>
            </TouchableOpacity>

        );

        return (
            <>
                {isLoading ? (

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
                            <Text category='s1'> Invita a tus amigos a descagar la app </Text>
                        </>)
                    )}
            </>
        );
    }
}

const styles = StyleSheet.create({
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
})