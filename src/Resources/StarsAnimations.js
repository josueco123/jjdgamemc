import React from 'react';
import * as Animatable from 'react-native-animatable';

export default function StarsAnimations() {

    return (
        <>
            <Animatable.Image style={{ position: 'absolute', height: 5, width: 5, top: 150, right: 30 }} source={require('../assets/296.png')} animation="flash" iterationCount="infinite" delay={3000} duration={3000} >
            </Animatable.Image>

            <Animatable.Image style={{ position: 'absolute', height: 7, width: 7, top: 350, right: 60 }} source={require('../assets/296.png')} animation="flash" iterationCount="infinite" delay={3000} duration={4000} >
            </Animatable.Image>

            <Animatable.Image style={{ position: 'absolute', height: 6, width: 6, top: 450, left: 60 }} source={require('../assets/296.png')} animation="flash" iterationCount="infinite" delay={3000} duration={5000} >
            </Animatable.Image>
        </>
    );
}