import React, { useCallback } from 'react';
import { Text, Button, Icon } from '@ui-kitten/components';
import { StyleSheet, Image, ImageBackground, View, Share, TouchableOpacity, Alert, Linking } from 'react-native';

export default function AboutUsScreen({ navigation }) {

    const facebook = "https://www.facebook.com/Mincrix-113576890347533/?ti=as";
    const instagram = "https://www.instagram.com/mincrix?r=nametag";
    const twitter = "https://www.twitter.com/mincrixc";
    const youtube = "https://youtube.com/channel/UCDX8dZHbZcuA9gYc4PhcHoA";

    const openFace = async () => {
        const supported = await Linking.canOpenURL(facebook);
        if (supported) {            
            await Linking.openURL(facebook);
        } else {
            Alert.alert(`Don't know how to open this URL:`);
        }
    };

    const openInsta = async () => {
        const supported = await Linking.canOpenURL(instagram);
        if (supported) {            
            await Linking.openURL(instagram);
        } else {
            Alert.alert(`Don't know how to open this URL:`);
        }
    };

    const openTw = async () => {
        const supported = await Linking.canOpenURL(twitter);
        if (supported) {            
            await Linking.openURL(twitter);
        } else {
            Alert.alert(`Don't know how to open this URL:`);
        }
    };

    const openYt = async () => {
        const supported = await Linking.canOpenURL(youtube);
        if (supported) {            
            await Linking.openURL(youtube);
        } else {
            Alert.alert(`Don't know how to open this URL:`);
        }
    };

    const shareIcon = (props) => (
        <Icon {...props} name='share-outline' />
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

    return (
        <ImageBackground source={require('./imgs/back.png')} style={styles.container} >
            <Text category='h1'>Sobre MINCRIX </Text>
            <Image source={require('./imgs/logop.png')} style={styles.images} />
            <Button accessoryLeft={shareIcon} appearance='ghost' onPress={onShare}> Invita a otros </Button>
            <View style={styles.componets}>
                <Text category='h6'> MINCRIX es un ministerio que tiene como propósito servir, siendo y haciendo discípulos, enfocándonos a enseñar a otros a conectar, discipular y capacitar, con el fin de glorificar a Dios, quien nos ha llamado para que a través de los juegos cumplamos la misión de llevar su evangelio.</Text>
            </View>
            <Text category='h5'>Síguenos</Text>
            <View style={styles.links}>
                <TouchableOpacity onPress={openFace}>
                    <Image source={require('./imgs/fa-183.png')} style={styles.img} />
                </TouchableOpacity>
                <TouchableOpacity onPress={openInsta}>
                    <Image source={require('./imgs/insta-183.png')} style={styles.img} />
                </TouchableOpacity>
                <TouchableOpacity onPress={openTw}>
                    <Image source={require('./imgs/tw-1834.png')} style={styles.img} />
                </TouchableOpacity>
                <TouchableOpacity onPress={openYt}>
                    <Image source={require('./imgs/youtube-183.png')} style={styles.img} />
                </TouchableOpacity>
            </View>
        </ImageBackground>
    );

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'flex-start',
        padding: 10,
    },
    componets: {
        top: 5,
        borderTopWidth: 3,
        borderTopColor: '#ff6699',
        borderBottomWidth: 3,
        borderBottomColor: '#ff6699',
        padding: 20,
        margin: 10,
        alignItems: 'center',
    },
    images: {
        width: 50,
        height: 75,
        marginHorizontal: 3
    },
    links: {
        flexDirection: 'row',
        alignSelf: 'center',
        justifyContent: 'space-between',
        margin: 10,
    },
    img: {
        width: 70,
        height: 70,
        margin: 3
    },

})