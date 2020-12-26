import * as React from 'react';
import { StyleSheet, ToastAndroid } from 'react-native';
import { Spinner } from '@ui-kitten/components';
import Video from 'react-native-video';

export default function TutorialScreen({ navigation }) {

    const showToastWithGravity = () => {
        ToastAndroid.showWithGravity(
            "No se puede reproducir el video",
            ToastAndroid.SHORT,
            ToastAndroid.CENTER
        );
    };

    return (
        
            <Video source={{ uri: "https://www.mincrix.com//storage/web/Tutorial.mp4" }}   // Can be a URL or a local file.

                onError={showToastWithGravity}               // Callback when video cannot be loaded
                onEnd={()=>navigation.goBack()}                
                resizeMode="stretch"                                
                style={styles.backgroundVideo} />
        
    );

}

const styles = StyleSheet.create({
    backgroundVideo: {
        position: 'absolute',
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,       
    },

})