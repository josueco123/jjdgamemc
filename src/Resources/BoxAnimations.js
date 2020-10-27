import React from 'react';
import { StyleSheet,Image, View } from 'react-native';
import { Text } from '@ui-kitten/components';
import * as Animatable from 'react-native-animatable';

export default function BoxAnimations() {

    return (
        <>
            <Animatable.View style={styles.salida}  animation="rubberBand" iterationCount={3} >
                <Text style={styles.text} category='h4'>Inicio</Text>
            </Animatable.View>

            <Animatable.View style={styles.vOrange} animation="shake" iterationCount={3} >
                <Text style={styles.text} category='h5'> 1</Text>
            </Animatable.View>

            <Animatable.View style={styles.vGreen} animation="bounce" iterationCount={3} >
                <Text style={styles.text} category='h5'> 2 </Text>
            </Animatable.View>

            <Animatable.View style={styles.vPurple} animation="tada" iterationCount={3}  >
                <Text style={styles.text} category='h5'> 3 </Text>
            </Animatable.View>

            <View style={styles.vRed}>
                <Text style={styles.text} category='h5'> 4 </Text>
            </View>

            <View style={styles.vBlack} >
                <Text style={styles.text} category='h5'> 5 </Text>
                <Image source={require('../assets/start-129.png')} style={styles.images} />
            </View>            

            <View style={styles.vPink} >
                <Text style={styles.text} category='h5'> 6 </Text>
            </View>

            <View style={styles.vBlue}>
                <Text style={styles.text} category='h5'> 7</Text>
                
            </View>

            <View style={styles.vOrange}>
                <Text style={styles.text} category='h5'> 8</Text>
            </View>

            <View style={styles.vGreen} >
                <Text style={styles.text} category='h5'> 9 </Text>
            </View>

            <View style={styles.vBlack} >
                <Text style={styles.text} category='h5'> 10 </Text>
                <Image source={require('../assets/snake-447.png')} style={styles.images} />
            </View>

            <View style={styles.vPurple}>
                <Text style={styles.text} category='h5'> 11 </Text>
            </View>

            <View style={styles.vRed} >
                <Text style={styles.text} category='h5'> 12 </Text>
            </View>

            <View style={styles.vPink} >
                <Text style={styles.text} category='h5'> 13 </Text>
            </View>

            <View style={styles.vBlue}>
                <Text style={styles.text} category='h5'> 14 </Text>                
            </View>
            
            <View style={styles.vBlack} >
                <Text style={styles.text} category='h5'> 15 </Text>
                <Image source={require('../assets/snake-447.png')} style={styles.images} />
            </View>

            <View style={styles.vOrange} >
                <Text style={styles.text} category='h5'> 16</Text>
            </View>

            <View style={styles.vGreen} >
                <Text style={styles.text} category='h5'> 17 </Text>
            </View>

            <View style={styles.vPurple} animation="tada" iterationCount={5}>
                <Text style={styles.text} category='h5'> 18 </Text>
            </View>

            <View style={styles.vRed}>
                <Text style={styles.text} category='h5'> 19 </Text>
            </View>

            <View style={styles.vPink}>
                <Text style={styles.text} category='h5'> 20 </Text>
            </View>

            <View style={styles.vBlue}>
                <Text style={styles.text} category='h5'> 21 </Text>
            </View>         
            
            <View style={styles.vOrange}>
                <Text style={styles.text} category='h5'> 22</Text>
            </View>

            <View style={styles.vGreen}>
                <Text style={styles.text} category='h5'> 23 </Text>
            </View>

            <View style={styles.vBlack} >
                <Text style={styles.text} category='h5'> 24 </Text>
                <Image source={require('../assets/start-129.png')} style={styles.images} />
            </View> 

             <View style={styles.vPurple} >
                <Text style={styles.text} category='h5'> 25 </Text>
            </View>

            <View style={styles.vRed}>
                <Text style={styles.text} category='h5'> 26 </Text>
            </View>

            <View style={styles.vPink} >
                <Text style={styles.text} category='h5'> 27 </Text>
            </View>

            <View style={styles.vBlue} >
                <Text style={styles.text} category='h5'> 28 </Text>
            </View>         
            
            <View style={styles.vOrange} >
                <Text style={styles.text} category='h5'> 29</Text>
            </View>

            <View style={styles.vGreen} >
                <Text style={styles.text} category='h5'> 30 </Text>
            </View>
            
            <View style={styles.vPurple} >
                <Text style={styles.text} category='h5'> 31 </Text>
            </View>

            <View style={styles.vRed} >
                <Text style={styles.text} category='h5'> 32 </Text>
            </View>

            <View style={styles.vPink} >
                <Text style={styles.text} category='h5'> 33 </Text>
            </View>

            <View style={styles.vBlue}>
                <Text style={styles.text} category='h5'> 34 </Text>
            </View>    

            <View style={styles.vBlack} >
                <Text style={styles.text} category='h5'> 35 </Text>
                <Image source={require('../assets/snake-447.png')} style={styles.images} />
            </View>

            <View style={styles.vOrange} >
                <Text style={styles.text} category='h5'> 36</Text>
            </View>

            <View style={styles.vGreen} >
                <Text style={styles.text} category='h5'> 37 </Text>
            </View>
            
            <View style={styles.vPurple} >
                <Text style={styles.text} category='h5'> 38 </Text>
            </View>

            <View style={styles.vRed} >
                <Text style={styles.text} category='h5'> 39 </Text>
            </View>

            <View style={styles.vBlack} >
                <Text style={styles.text} category='h5'> 40 </Text>
                <Image source={require('../assets/snake-447.png')} style={styles.images} />
            </View>
 
            <View style={styles.vPink} >
                <Text style={styles.text} category='h5'> 41 </Text>
            </View>

            <View style={styles.vBlue} >
                <Text style={styles.text} category='h5'> 42 </Text>
            </View>         
            
            <View style={styles.vOrange} >
                <Text style={styles.text} category='h5'> 43</Text>
            </View>

            <View style={styles.vGreen} >
                <Text style={styles.text} category='h5'> 44 </Text>
            </View>
            
            <View style={styles.vPurple} >
                <Text style={styles.text} category='h5'> 45 </Text>
            </View>

            <View style={styles.vBlack} >
                <Text style={styles.text} category='h5'> 46 </Text>
                <Image source={require('../assets/start-129.png')} style={styles.images} />
            </View> 

            <View style={styles.vBlack} >
                <Text style={styles.text} category='h5'> 47 </Text>
                <Image source={require('../assets/snake-447.png')} style={styles.images} />
            </View>

            <View style={styles.vRed} >
                <Text style={styles.text} category='h5'> 48 </Text>
            </View>            
 
            <View style={styles.vPink} >
                <Text style={styles.text} category='h5'> 49 </Text>
            </View>

            <View style={styles.vBlue} >
                <Text style={styles.text} category='h5'> 50 </Text>
            </View>         
            
            <View style={styles.vOrange}>
                <Text style={styles.text} category='h5'> 51</Text>
            </View>

            <View style={styles.vGreen} animation="shake" iterationCount={3}>
                <Text style={styles.text} category='h5'> 52 </Text>
            </View>
            
            <View style={styles.vPurple} >
                <Text style={styles.text} category='h5'> 53 </Text>
            </View>

            <View style={styles.vRed} animation="bounce" iterationCount={4}>
                <Text style={styles.text} category='h5'> 54 </Text>
            </View>

            <View style={styles.vBlack} >
                <Text style={styles.text} category='h5'> 55 </Text>
                <Image source={require('../assets/snake-447.png')} style={styles.images} />
            </View>

            <View style={styles.vPink} animation="wobble" iterationCount={4}>
                <Text style={styles.text} category='h5'> 56 </Text>
            </View>

            <View style={styles.vBlue} >
                <Text style={styles.text} category='h5'> 57 </Text>
            </View>         
            
            <View style={styles.vOrange} >
                <Text style={styles.text} category='h5'> 58</Text>
            </View>

            <View style={styles.vGreen} >
                <Text style={styles.text} category='h5'> 59 </Text>
            </View>
            
            <View style={styles.vPurple} >
                <Text style={styles.text} category='h5'> 60 </Text>
            </View>

            <View style={styles.vBlack} >
                <Text style={styles.text} category='h5'> 61 </Text>
                <Image source={require('../assets/start-129.png')} style={styles.images} />
            </View> 

            <View style={styles.vRed}>
                <Text style={styles.text} category='h5'> 62 </Text>
            </View>            
 
            <View style={styles.vPink} >
                <Text style={styles.text} category='h5'> 63 </Text>
            </View>

            <View style={styles.vBlue} >
                <Text style={styles.text} category='h5'> 64 </Text>
            </View>         
            
            <View style={styles.vOrange} >
                <Text style={styles.text} category='h5'> 65</Text>
            </View>

            <View style={styles.vGreen} >
                <Text style={styles.text} category='h5'> 66 </Text>
            </View>

            <View style={styles.vPurple} >
                <Text style={styles.text} category='h5'> 67 </Text>
            </View>

            <View style={styles.vBlack} >
                <Text style={styles.text} category='h5'> 68 </Text>
                <Image source={require('../assets/snake-447.png')} style={styles.images} />
            </View>

            <View style={styles.vRed} >
                <Text style={styles.text} category='h5'> 69 </Text>
            </View>            
 
            <View style={styles.vPink}>
                <Text style={styles.text} category='h5'> 70 </Text>
            </View>

            <View style={styles.vBlue} >
                <Text style={styles.text} category='h5'> 71 </Text>
            </View>         
            
            <View style={styles.vOrange} >
                <Text style={styles.text} category='h5'> 72</Text>
            </View>

            <View style={styles.vGreen} >
                <Text style={styles.text} category='h5'> 73 </Text>
            </View>

            <View style={styles.vBlack} >
                <Text style={styles.text} category='h5'> 74 </Text>
                <Image source={require('../assets/start-129.png')} style={styles.images} />
            </View>

            <View style={styles.vPurple} >
                <Text style={styles.text} category='h5'> 75 </Text>
            </View>
    
            <View style={styles.vRed}>
                <Text style={styles.text} category='h5'> 76 </Text>
            </View>            
 
            <View style={styles.vPink} >
                <Text style={styles.text} category='h5'> 77 </Text>
            </View>

            <View style={styles.vBlue} >
                <Text style={styles.text} category='h5'> 78 </Text>
            </View>         
            
            <View style={styles.vOrange} >
                <Text style={styles.text} category='h5'> 79</Text>
            </View>

            <View style={styles.vGreen} >
                <Text style={styles.text} category='h5'> 80 </Text>
            </View>

            <View style={styles.vBlack} >
                <Text style={styles.text} category='h5'> 81 </Text>
                <Image source={require('../assets/snake-447.png')} style={styles.images} />
            </View>

            <View style={styles.vPurple} >
                <Text style={styles.text} category='h5'> 82 </Text>
            </View>
    
            <View style={styles.vRed} >
                <Text style={styles.text} category='h5'> 83 </Text>
            </View>            
 
            <View style={styles.vPink} >
                <Text style={styles.text} category='h5'> 84 </Text>
            </View>

            <View style={styles.vBlue} >
                <Text style={styles.text} category='h5'> 85 </Text>
            </View>         
            
            <View style={styles.vOrange} >
                <Text style={styles.text} category='h5'> 86 </Text>
            </View>

            <View style={styles.vBlack} >
                <Text style={styles.text} category='h5'> 87 </Text>
                <Image source={require('../assets/start-129.png')} style={styles.images} />
            </View>

            <View style={styles.vGreen} >
                <Text style={styles.text} category='h5'> 88 </Text>
            </View>            

            <View style={styles.vPurple} >
                <Text style={styles.text} category='h5'> 89 </Text>
            </View>
    
            <View style={styles.vRed} >
                <Text style={styles.text} category='h5'> 90 </Text>
            </View>            
 
            <View style={styles.vPink} >
                <Text style={styles.text} category='h5'> 91 </Text>
            </View>

            <View style={styles.vBlue} >
                <Text style={styles.text} category='h5'> 92 </Text>
            </View>         
            
            <View style={styles.vOrange} >
                <Text style={styles.text} category='h5'> 93</Text>
            </View>

            <View style={styles.vGreen}>
                <Text style={styles.text} category='h5'> 94 </Text>
            </View>
            
            <View style={styles.vBlack} >
                <Text style={styles.text} category='h5'> 95 </Text>
                <Image source={require('../assets/snake-447.png')} style={styles.images} />
            </View>

            <View style={styles.vPurple} animation="tada" iterationCount={5}>
                <Text style={styles.text} category='h5'> 96 </Text>
            </View>
    
            <View style={styles.vRed} >
                <Text style={styles.text} category='h5'> 97 </Text>
            </View>            
 
            <View style={styles.vPink} >
                <Text style={styles.text} category='h5'> 98 </Text>
            </View>

            <View style={styles.vBlue} >
                <Text style={styles.text} category='h5'> 99 </Text>
            </View>         
            
            <View style={styles.vOrange} >
                <Text style={styles.text} category='h5'> 100 </Text>
            </View>

            <View style={styles.vBlack} >
                <Text style={styles.text} category='h5'> 101 </Text>
                <Image source={require('../assets/start-129.png')} style={styles.images} />
            </View>

            <View style={styles.vGreen}>
                <Text style={styles.text} category='h5'> 102 </Text>
            </View>            

            <View style={styles.vPurple} >
                <Text style={styles.text} category='h5'> 103 </Text>
            </View>
    
            <View style={styles.vRed} >
                <Text style={styles.text} category='h5'> 104 </Text>
            </View>            
 
            <View style={styles.vPink} >
                <Text style={styles.text} category='h5'> 105 </Text>
            </View>

            <View style={styles.vBlue} >
                <Text style={styles.text} category='h5'> 106 </Text>
            </View>         
            
            <View style={styles.vOrange} >
                <Text style={styles.text} category='h5'> 107</Text>
            </View>

            <View style={styles.vGreen} >
                <Text style={styles.text} category='h5'> 108 </Text>
            </View>
                      
            <View style={styles.vPurple} >
                <Text style={styles.text} category='h5'> 109 </Text>
            </View>

            <View style={styles.vBlack} >
                <Text style={styles.text} category='h5'> 110 </Text>
                <Image source={require('../assets/snake-447.png')} style={styles.images} />
            </View>

            <View style={styles.vRed} >
                <Text style={styles.text} category='h5'> 111 </Text>
            </View>            
 
            <View style={styles.vPink}>
                <Text style={styles.text} category='h5'> 112 </Text>
            </View>

            <View style={styles.vBlue} >
                <Text style={styles.text} category='h5'> 113 </Text>
            </View>         
            
            <View style={styles.vOrange} >
                <Text style={styles.text} category='h5'> 114</Text>
            </View>

            <View style={styles.vGreen} >
                <Text style={styles.text} category='h5'> 115 </Text>
            </View>

            <View style={styles.vBlack} >
                <Text style={styles.text} category='h5'> 116 </Text>
                <Image source={require('../assets/start-129.png')} style={styles.images} />
            </View>

            <View style={styles.vPurple} >
                <Text style={styles.text} category='h5'> 117 </Text>
            </View>
    
            <View style={styles.vRed} >
                <Text style={styles.text} category='h5'> 118 </Text>
            </View>            
 
            <View style={styles.vPink} >
                <Text style={styles.text} category='h5'> 119 </Text>
            </View>

            <View style={styles.vBlue} >
                <Text style={styles.text} category='h5'> 120 </Text>
            </View>         
            
            <View style={styles.vOrange} >
                <Text style={styles.text} category='h5'> 121</Text>
            </View>

            <View style={styles.vGreen} >
                <Text style={styles.text} category='h5'> 122 </Text>
            </View>
                      
            <View style={styles.vPurple} >
                <Text style={styles.text} category='h5'> 123 </Text>
            </View>
                   
            <View style={styles.vBlack} >
                <Text style={styles.text} category='h5'> 124 </Text>
                <Image source={require('../assets/snake-447.png')} style={styles.images} />
            </View>
                     
            <View style={styles.vRed} >
                <Text style={styles.text} category='h5'> 125 </Text>
            </View>            
 
            <View style={styles.vPink}>
                <Text style={styles.text} category='h5'> 126 </Text>
            </View>

            <View style={styles.vBlue} >
                <Text style={styles.text} category='h5'> 127 </Text>
            </View>         
            
            <View style={styles.vOrange} >
                <Text style={styles.text} category='h5'> 128</Text>
            </View>

            <View style={styles.vGreen}>
                <Text style={styles.text} category='h5'> 129 </Text>
            </View>
                      
            <View style={styles.vPurple} >
                <Text style={styles.text} category='h5'> 130 </Text>
            </View>

            <View style={styles.vRed} >
                <Text style={styles.text} category='h5'> 131 </Text>
            </View>            
 
            <View style={styles.vPink} >
                <Text style={styles.text} category='h5'> 132 </Text>
            </View>

            <View style={styles.vBlue} >
                <Text style={styles.text} category='h5'> 133 </Text>
            </View>         
            
            <View style={styles.vOrange}>
                <Text style={styles.text} category='h5'> 134</Text>
            </View>

            <View style={styles.vGreen}>
                <Text style={styles.text} category='h5'> 135 </Text>
            </View>
                      
            <View style={styles.vPurple} >
                <Text style={styles.text} category='h5'> 136 </Text>
            </View>

            <View style={styles.vBlack}>
                <Text style={styles.text} category='h5'> 137 </Text>
                <Image source={require('../assets/snake-447.png')} style={styles.images} />
            </View>

            <View style={styles.vRed} >
                <Text style={styles.text} category='h5'> 138 </Text>
            </View>            
 
            <View style={styles.vPink} >
                <Text style={styles.text} category='h5'> 139 </Text>
            </View>

            <View style={styles.vBlue}>
                <Text style={styles.text} category='h5'> 140 </Text>
            </View>

            <View style={styles.salida}  >
                <Text style={styles.text} category='h4'>Fin</Text>
            </View>
                     
        </>
    );
}

const styles = StyleSheet.create({
    salida: {
        height: 100,
        width: 200,
        borderRadius: 10,
        backgroundColor: '#000000',
        borderColor: '#ffffff',        
        borderLeftWidth:4,
        borderRightWidth:4,
        borderBottomWidth: 4,
    },
    vPink: {
        height: 100,
        width: 100,
        borderRadius: 20,
        backgroundColor: '#ff6699',
        borderColor: '#ffffff',
        borderWidth: 5,
        // right:100,     
    },
    vBlue: {
        height: 100,
        width: 100,
        borderRadius: 20,
        backgroundColor: '#00ffff',
        borderColor: '#ffffff',
        borderWidth: 5,
        //right:40,        
    },
    vPurple: {
        height: 100,
        width: 100,
        borderRadius: 20,
        backgroundColor: '#9900ff',
        borderColor: '#ffffff',
        borderWidth: 5,
        //left: 30,      
    },
    vRed: {
        height: 100,
        width: 100,
        borderRadius: 20,
        backgroundColor: '#ff0000',
        borderColor: '#ffffff',
        borderWidth: 5,
        //left: 30,      
    },
    vGreen: {
        height: 100,
        width: 100,
        borderRadius: 20,
        backgroundColor: '#00ff00',
        borderColor: '#ffffff',
        borderWidth: 5,
        //left: 100,      
    },
    vBlack: {
        height: 100,
        width: 100,
        borderRadius: 20,
        backgroundColor: '#000000',
        borderColor: '#ffffff',
        borderWidth: 5,
        //left: 100,      
    },
    vOrange: {
        height: 100,
        width: 100,
        borderRadius: 20,
        backgroundColor: '#F8750F',
        borderColor: '#ffffff',
        borderWidth: 5,
        //left: 100,      
    },
    text: {
        margin: 2,
    },
    images: {
        width: 55,
        height: 55,
        alignSelf: 'center'
      },
});