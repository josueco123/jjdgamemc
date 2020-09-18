import React from 'react';
import { StyleSheet } from 'react-native';
import { Text } from '@ui-kitten/components';
import * as Animatable from 'react-native-animatable';

export default function BoxAnimations() {

    return (
        <>
            <Animatable.View style={styles.salida} animation="flash" >
                <Text style={styles.text} category='h4'>Inicio</Text>
            </Animatable.View>

            <Animatable.View style={styles.vPink} animation="pulse" iterationCount={4}>
                <Text style={styles.text} category='h5'> 1</Text>
            </Animatable.View>

            <Animatable.View style={styles.vBlue} animation="shake" iterationCount={3}>
                <Text style={styles.text} category='h5'> 2 </Text>
            </Animatable.View>

            <Animatable.View style={styles.vPurple} animation="tada" iterationCount={5}>
                <Text style={styles.text} category='h5'> 3 </Text>
            </Animatable.View>

            <Animatable.View style={styles.vGreen} animation="bounce" iterationCount={4}>
                <Text style={styles.text} category='h5'> 4 </Text>
            </Animatable.View>

            <Animatable.View style={styles.vBlack} animation="wobble" iterationCount={4}>
                <Text style={styles.text} category='h5'> 5 </Text>
            </Animatable.View>

            <Animatable.View style={styles.vOrange} animation="swing" iterationCount={3}>
                <Text style={styles.text} category='h5'> 6 </Text>
            </Animatable.View>

            <Animatable.View style={styles.vPink} animation="pulse" iterationCount={3}>
                <Text style={styles.text} category='h5'> 7</Text>
            </Animatable.View>

            <Animatable.View style={styles.vBlue} animation="shake" iterationCount={5}>
                <Text style={styles.text} category='h5'> 8 </Text>
            </Animatable.View>

            <Animatable.View style={styles.vPurple} animation="tada" iterationCount={4}>
                <Text style={styles.text} category='h5'> 9 </Text>
            </Animatable.View>

            <Animatable.View style={styles.vGreen} animation="bounce" iterationCount={3}>
                <Text style={styles.text} category='h5'> 10 </Text>
            </Animatable.View>

            <Animatable.View style={styles.vBlack} animation="wobble" iterationCount={5}>
                <Text style={styles.text} category='h5'> 11 </Text>
            </Animatable.View>

            <Animatable.View style={styles.vOrange} animation="swing" iterationCount={4}>
                <Text style={styles.text} category='h5'> 12 </Text>
            </Animatable.View>

            <Animatable.View style={styles.vPink} animation="pulse" iterationCount={3}>
                <Text style={styles.text} category='h5'> 13</Text>
            </Animatable.View>

            <Animatable.View style={styles.vBlue} animation="shake" iterationCount={4}>
                <Text style={styles.text} category='h5'> 14 </Text>
            </Animatable.View>

            <Animatable.View style={styles.vPurple} animation="tada" iterationCount={3}>
                <Text style={styles.text} category='h5'> 15 </Text>
            </Animatable.View>

            <Animatable.View style={styles.vGreen} animation="bounce" iterationCount={6}>
                <Text style={styles.text} category='h5'> 16 </Text>
            </Animatable.View>

            <Animatable.View style={styles.vBlack} animation="wobble" iterationCount={5}>
                <Text style={styles.text} category='h5'> 17 </Text>
            </Animatable.View>

            <Animatable.View style={styles.vOrange} animation="swing" iterationCount={4}>
                <Text style={styles.text} category='h5'> 18 </Text>
            </Animatable.View>
            <Animatable.View style={styles.vPink} animation="pulse" iterationCount={3}>
                <Text style={styles.text} category='h5'> 19</Text>
            </Animatable.View>

            <Animatable.View style={styles.vBlue} animation="shake" iterationCount={4}>
                <Text style={styles.text} category='h5'> 20 </Text>
            </Animatable.View>

            <Animatable.View style={styles.vPurple} animation="tada" iterationCount={5}>
                <Text style={styles.text} category='h5'> 21 </Text>
            </Animatable.View>

            <Animatable.View style={styles.vGreen} animation="bounce" iterationCount={4}>
                <Text style={styles.text} category='h5'> 22 </Text>
            </Animatable.View>

            <Animatable.View style={styles.vBlack} animation="wobble" iterationCount={5}>
                <Text style={styles.text} category='h5'> 23 </Text>
            </Animatable.View>

            <Animatable.View style={styles.vOrange} animation="swing" iterationCount={3}>
                <Text style={styles.text} category='h5'> 24 </Text>
            </Animatable.View>

        </>
    );
}

const styles = StyleSheet.create({
    salida: {
        height: 100,
        width: 200,
        borderRadius: 20,
        backgroundColor: '#000000',

    },
    vPink: {
        height: 100,
        width: 100,
        borderRadius: 20,
        backgroundColor: '#ff6699',
        borderColor: '#ffffff',

        borderWidth: 6,
        // right:100,     
    },
    vBlue: {
        height: 100,
        width: 100,
        borderRadius: 20,
        backgroundColor: '#00ffff',
        borderColor: '#ffffff',
        borderWidth: 6,
        //right:40,        
    },
    vPurple: {
        height: 100,
        width: 100,
        borderRadius: 20,
        backgroundColor: '#9900ff',
        borderColor: '#ffffff',
        borderWidth: 6,
        //left: 30,      
    },
    vRed: {
        height: 100,
        width: 100,
        borderRadius: 20,
        backgroundColor: '#ff0000',
        borderColor: '#ffffff',
        borderWidth: 6,
        //left: 30,      
    },
    vGreen: {
        height: 100,
        width: 100,
        borderRadius: 20,
        backgroundColor: '#00ff00',
        borderColor: '#ffffff',
        borderWidth: 6,
        //left: 100,      
    },
    vBlack: {
        height: 100,
        width: 100,
        borderRadius: 20,
        backgroundColor: '#000000',
        borderColor: '#ffffff',
        borderWidth: 6,
        //left: 100,      
    },
    vOrange: {
        height: 100,
        width: 100,
        borderRadius: 20,
        backgroundColor: '#F8750F',
        borderColor: '#ffffff',
        borderWidth: 6,
        //left: 100,      
    },
    text: {
        margin: 2,
    },

});