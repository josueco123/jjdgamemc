import * as React from 'react';
import { Modal, Text, Button, Divider, Card } from '@ui-kitten/components';
import { ScrollView, StyleSheet, Image, ImageBackground, View, } from 'react-native';
import * as Animatable from 'react-native-animatable';

export default function InstructionsScreen({ navigation }) {    

  const showTuto = () =>{
    global.sounds = false;
    navigation.navigate('Tutorial');
  }

    return (

        <ImageBackground source={require('./imgs/back.png')} style={styles.container} >
            <ScrollView contentContainerStyle={styles.contentContainer} centerContent={true} showsVerticalScrollIndicator={false}>
                                

                <Text category='h1'>Instrucciones </Text>
                <Image source={require('./imgs/logop.png')} style={styles.images} />
                <Button appearance='ghost' onPress={showTuto} > Ver Tutorial </Button>
                <Divider />
                <View style={styles.componets}>
                    <Text category='h5'> Ficha</Text>
                    <View style={styles.inside}>
                        <Animatable.View style={styles.ficha} animation="shake" iterationCount={2}>
                        </Animatable.View>
                        <Text category='s1'> Indica en que casilla estas, tocala para ver el reto, tirar el dado o ver tus premios y penitencias</Text>
                    </View>
                </View>
                <View style={styles.componets}>
                    <Text category='h5'> Retos</Text>
                    <View style={styles.inside}>
                        <Animatable.View style={styles.vGreen} animation="tada" iterationCount={2}>
                        </Animatable.View>
                        <Text category='s1'> Las casillas verdes son los retos grupales, los cuales deberás realizarlos con otros jugadores de MINCRIX</Text>
                    </View>
                    <View style={styles.inside}>
                        <Animatable.View style={styles.vBlue} animation="swing" iterationCount={2}>
                        </Animatable.View>
                        <Text category='s1'> Las casillas azules son los retos personales que debes hacer tú solo</Text>
                    </View>
                    <View style={styles.inside}>
                        <Animatable.View style={styles.vPink} animation="shake" iterationCount={2}>
                        </Animatable.View>
                        <Text category='s1'> Las casillas rosadas son los retos virtuales, en los que deberás usar tus redes sociales u otras apps para completarlos</Text>
                    </View>
                    <View style={styles.inside}>
                        <Animatable.View style={styles.vRed} animation="wobble" iterationCount={2}>
                        </Animatable.View>
                        <Text category='s1'> Las casillas rojas son los retos familiares, en los que deberás involucrar a tu familia para completarlos</Text>
                    </View>
                    <View style={styles.inside}>
                        <Animatable.View style={styles.vPurple} animation="shake" iterationCount={2}>
                        </Animatable.View>
                        <Text category='s1'> Las casillas moradas son los retos devocionales que deberás hacerlos en un tiempo a solas sin que te interrumpan</Text>
                    </View>
                    <View style={styles.inside}>
                        <Animatable.View style={styles.vOrange} animation="tada" iterationCount={2}>
                        </Animatable.View>
                        <Text category='s1'> Las casillas naranjas son los retos de la calle, en los que deberás salir a distintos lugares para completarlos</Text>
                    </View>
                </View>
                <View style={styles.componets}>
                    <Text category='h5'> Premios y Penitencias</Text>
                    <View style={styles.inside}>
                        <Animatable.View style={styles.vBlack} animation="swing" iterationCount={2}>
                            <Image source={require('./imgs/start-129.png')} style={styles.img} />
                        </Animatable.View>
                        <Text category='s1'> Las casillas con estrellas son premios que te permitirán avanzar rápido en el juego</Text>
                    </View>
                    <View style={styles.inside}>
                        <Animatable.View style={styles.vBlack} animation="shake" iterationCount={2}>
                            <Image source={require('./imgs/snake-447.png')} style={styles.img} />
                        </Animatable.View>
                        <Text category='s1'> Las casillas con serpientes son penitencias que te complicaran un poco el avance en el juego</Text>
                    </View>
                </View>
            </ScrollView>
        </ImageBackground>

    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        padding: 10,
    },
    contentContainer: {
        alignItems: 'center',
    },
    componets: {
        top: 20,
        borderTopWidth: 3,
        borderTopColor: '#ff6699',
        padding: 5,
        alignItems: 'center',
    },
    inside: {
        flexDirection: 'row',
        padding: 20,
        margin: 5,
    },
    images: {
        width: 50,
        height: 75,
        marginHorizontal: 3
    },
    img: {
        width: 35,
        height: 35,
        alignSelf: 'center'
    },
    ficha: {
        height: 45,
        width: 45,
        backgroundColor: "black",
        borderColor: '#ffffff',
        borderRadius: 64,
        borderWidth: 3,
        marginHorizontal: 8
    },
    vBlue: {
        height: 45,
        width: 45,
        borderRadius: 10,
        backgroundColor: '#00ffff',
        borderColor: '#ffffff',
        borderWidth: 3,
        marginHorizontal: 8
    },
    vPink: {
        height: 45,
        width: 45,
        borderRadius: 10,
        backgroundColor: '#ff6699',
        borderColor: '#ffffff',
        borderWidth: 3,
        marginHorizontal: 8
    },

    vPurple: {
        height: 45,
        width: 45,
        borderRadius: 10,
        backgroundColor: '#9900ff',
        borderColor: '#ffffff',
        borderWidth: 3,
        marginHorizontal: 8
    },
    vRed: {
        height: 45,
        width: 45,
        borderRadius: 10,
        backgroundColor: '#ff0000',
        borderColor: '#ffffff',
        borderWidth: 3,
        marginHorizontal: 8
    },
    vGreen: {
        height: 45,
        width: 45,
        borderRadius: 10,
        backgroundColor: '#00ff00',
        borderColor: '#ffffff',
        borderWidth: 3,
        marginHorizontal: 8
    },
    vBlack: {
        height: 45,
        width: 45,
        borderRadius: 10,
        backgroundColor: '#000000',
        borderColor: '#ffffff',
        borderWidth: 3,
        marginHorizontal: 8
    },
    vOrange: {
        height: 45,
        width: 45,
        borderRadius: 10,
        backgroundColor: '#F8750F',
        borderColor: '#ffffff',
        borderWidth: 3,
        marginHorizontal: 8
    },      

})