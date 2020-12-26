import React, { useCallback } from 'react';
import { Text, Button, Icon } from '@ui-kitten/components';
import { ScrollView, StyleSheet, Image, ImageBackground, View, Linking } from 'react-native';

export default function MoreGamesScreen({ navigation }) {

    const link = "";

    const infoIcon = (props) => (
        <Icon {...props} name='info-outline' />
    );

    const OpenURLButton = ({ url, children }) => {
        const handlePress = useCallback(async () => {
            // Checking if the link is supported for links with custom URL scheme.
            const supported = await Linking.canOpenURL(url);

            if (supported) {
                // Opening the link with some app, if the URL scheme is "http" the web link should be opened
                // by some browser in the mobile
                await Linking.openURL(url);
            } else {
                Alert.alert(`Don't know how to open this URL: ${url}`);
            }
        }, [url]);
        return <Button accessoryLeft={infoIcon} appearance='ghost' onPress={handlePress} > {children} </Button>;
    };

    return (
        <ImageBackground source={require('./imgs/back.png')} style={styles.container} >
            <ScrollView contentContainerStyle={styles.contentContainer} centerContent={true} showsVerticalScrollIndicator={false}>
                <Text category='h1'>Otros Juegos </Text>
                <Image source={require('./imgs/logop.png')} style={styles.images} />
                <OpenURLButton url={link}>Más Información</OpenURLButton>
                <View style={styles.componets}>                    

                    <View style={styles.group}>
                        <View style={styles.one}>
                            <Image source={require('./imgs/STREET.png')} style={styles.img} />
                            <Text category='h6'>STREET </Text>
                        </View>
                        <View style={styles.one}>
                            <Image source={require('./imgs/ESPIAS.png')} style={styles.img} />
                            <Text category='h6'>ESPIAS </Text>

                        </View>
                    </View>

                    <View style={styles.group}>
                        <View style={styles.one}>
                            <Image source={require('./imgs/LOS66.png')} style={styles.img} />
                            <Text category='h6'>LOS 66 </Text>
                        </View>
                        <View style={styles.one}>
                            <Image source={require('./imgs/INFLUENCER.png')} style={styles.img} />
                            <Text category='h6'>INFLUENCER </Text>
                        </View>
                    </View>

                    <View style={styles.group}>
                        <View style={styles.one}>
                            <Image source={require('./imgs/3X3.png')} style={styles.img} />
                            <Text category='h6'>3X3 </Text>
                        </View>
                        <View style={styles.one}>
                            <Image source={require('./imgs/HOBBIES.png')} style={styles.img} />
                            <Text category='h6'>HOBBIES </Text>

                        </View>
                    </View>


                    <View style={styles.group}>
                        <View style={styles.one}>
                            <Image source={require('./imgs/PEKAS.png')} style={styles.img} />
                            <Text category='h6'>PEKAS </Text>
                        </View>
                        <View style={styles.one}>
                            <Image source={require('./imgs/CODICIABLE.png')} style={styles.img} />
                            <Text category='h6'>CODICIABLE </Text>
                        </View>
                    </View>


                    <View style={styles.group}>
                        <View style={styles.one}>
                            <Image source={require('./imgs/OPENHOUSE.png')} style={styles.img} />
                            <Text category='h6'>OPEN HOUSE </Text>
                        </View>
                        <View style={styles.one}>
                            <Image source={require('./imgs/TWIN.png')} style={styles.img} />
                            <Text category='h6'>TWIN </Text>

                        </View>
                    </View>

                    <View style={styles.group}>
                        <View style={styles.one}>
                            <Image source={require('./imgs/CARRERABIBLICA.png')} style={styles.img} />
                            <Text category='h6'>CARRERA BIBLICA </Text>
                        </View>
                        <View style={styles.one}>
                            <Image source={require('./imgs/CATOLICO.png')} style={styles.img} />
                            <Text category='h6'>CATOLICO </Text>
                        </View>
                    </View>

                    <View style={styles.group}>
                        <View style={styles.one}>
                            <Image source={require('./imgs/MINCRIX.png')} style={styles.img} />
                            <Text category='h6'>MINCRIX </Text>
                        </View>
                        <View style={styles.one}>
                            <Image source={require('./imgs/SIGUEME12.png')} style={styles.img} />
                            <Text category='h6'>SIGUEME 12 </Text>
                        </View>
                    </View>

                    <View style={styles.group}>
                        <View style={styles.one}>
                            <Image source={require('./imgs/PRACTICAS.png')} style={styles.img} />
                            <Text category='h6'>PRACTICAS </Text>
                        </View>
                        <View style={styles.one}>
                            <Image source={require('./imgs/VALIENTE.png')} style={styles.img} />
                            <Text category='h6'>VALIENTE </Text>

                        </View>
                    </View>

                </View>
            </ScrollView>
        </ImageBackground>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-start',
        padding: 10,
    },
    contentContainer: {
        alignItems: 'center',
    },
    componets: {
        top: 5,
        borderTopWidth: 3,
        borderTopColor: '#ff6699',
        padding: 10,        
        alignItems: 'center',
    },
    images: {
        width: 40,
        height: 60,
        marginHorizontal: 3
    },

    img: {
        width: 95,
        height: 130,
        marginHorizontal: 5,
    },
    group: {
        flexDirection: 'row',
        alignSelf: 'center',
        justifyContent: 'space-between',
        margin: 10,
    },
    one: {
        flexDirection: 'column',
        margin: 10,
    }
})