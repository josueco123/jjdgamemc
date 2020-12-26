import React, { Component } from 'react'
import { StyleSheet, Image } from 'react-native';
import ImagePicker from 'react-native-image-crop-picker';
import { Button, Layout, Input, Text, Icon } from '@ui-kitten/components';
import AsyncStorage from '@react-native-community/async-storage';


export default class CameraMenu extends Component {

    constructor(props) {
        super(props)
        this.state = {
            filepath: {
                data: '',
                uri: ''
            },
            fileData: '',
            fileUri: ''
        }
    }

    

    launchCamera = () => {
     
        ImagePicker.openCamera({
            useFrontCamera: true,
            cropping: true,
            width: 700,
            height: 700,
            includeBase64: true,
            compressImageQuality: 0.7,
            mediaType: 'photo',
          }).then(image => {            
            this.storeData(image); 
            this.setState({
                filePath: image,
                fileData: image.data,
                fileUri: ''
            });

          }).catch((error) => {
            console.log("crop mk: " + error);
          });     

    }

    launchImageLibrary = () => {
       
        ImagePicker.openPicker({
            cropping: true,
            width: 700,
            height: 700,
            includeBase64: true, 
            compressImageQuality: 0.7,           
            mediaType: 'photo',
            cropping: true
          }).then(image => {            
            this.storeData(image); 
            this.setState({
                filePath: image,
                fileData: image.data,
                fileUri: ''
            });

          });

    }

    storeData = async (value) => {

        try {           
            await AsyncStorage.setItem('pathimg', value.path)
        } catch (error) {
            console.log('msj ' + error)
        }
    }

    deleteData = async () => {
        try {
            await AsyncStorage.removeItem('pathimg');
        } catch (error) {
            console.log('msj: ' + error)
        }
    }

    renderFileData() {
        if (this.state.fileData) {
            return <Image source={{ uri: 'data:image/jpeg;base64,' + this.state.fileData }}
                style={styles.images}
                resizeMode="contain"
            />
        } else {
            return <Image source={require('./img/social-343.png')}
                style={styles.images} 
                resizeMode="contain"
            />
        }
    }


    render() {

        const AdjIcon = (props) => (
            <Icon {...props} name='attach' />
        );

        const CamIcon = (props) => (
            <Icon {...props} name='camera' />
        );
        return (

            <>
                <Layout style={styles.btncontainer} level="4">
                    <Button style={styles.button} accessoryLeft={CamIcon} appearance='ghost' onPress={this.launchCamera} > Tomar Foto</Button>
                    <Button style={styles.button} accessoryLeft={AdjIcon} appearance='ghost' onPress={this.launchImageLibrary}>Abrir Galeria</Button>
                </Layout>
                {this.renderFileData()}


            </>
        );
    }
}

const styles = StyleSheet.create({
    btncontainer: {
        flex: 1,
        flexDirection: 'row',
    },
    button: {        
        margin: 2,
    },
    images: {
        width: 350,
        height: 350,
        borderColor: 'black',
        borderWidth: 1,
        marginHorizontal: 3
    },
})