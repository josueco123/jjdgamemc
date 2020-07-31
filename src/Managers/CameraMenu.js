import React, { Component } from 'react'
import { StyleSheet, Image } from 'react-native';
import ImagePicker from 'react-native-image-picker';
import { Button, Layout, Input, Text, Icon } from '@ui-kitten/components';
import AsyncStorage from '@react-native-community/async-storage';


const options = {
    title: 'Select Avatar',
    customButtons: [{ name: 'fb', title: 'Choose Photo from Facebook' }],
    storageOptions: {
        skipBackup: true,
        path: 'images',
    },
};


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

    chooseImage = () => {
        let options = {
            title: 'Select Image',
            customButtons: [
                { name: 'customOptionKey', title: 'Choose Photo from Custom Option' },
            ],
            storageOptions: {
                skipBackup: true,
                path: 'mincrix',
            },
        };
        ImagePicker.showImagePicker(options, (response) => {
            console.log('Response = ', response);

            if (response.didCancel) {
                console.log('User cancelled image picker');
            } else if (response.error) {
                console.log('ImagePicker Error: ', response.error);
            } else if (response.customButton) {
                console.log('User tapped custom button: ', response.customButton);
                alert(response.customButton);
            } else {
                const source = { uri: response.uri };

                // You can also display the image using data:
                // const source = { uri: 'data:image/jpeg;base64,' + response.data };
                // alert(JSON.stringify(response));s
                //console.log('response', JSON.stringify(response));
                this.setState({
                    filePath: response,
                    fileData: response.data,
                    fileUri: response.uri
                });
            }
        });
    }

    launchCamera = () => {
        let options = {
            storageOptions: {
                skipBackup: true,
                path: 'mincrix',
            },
        };

        ImagePicker.launchCamera(options, (response) => {
            //console.log('Response = ', response);

            if (response.didCancel) {
                console.log('User cancelled image picker');
            } else if (response.error) {
                console.log('ImagePicker Error: ', response.error);
            } else if (response.customButton) {
                console.log('User tapped custom button: ', response.customButton);
                alert(response.customButton);
            } else {
                const source = { uri: response.uri };
                //console.log('response uri', JSON.stringify(response.uri));
                this.storeData(response);                
                this.setState({
                    filePath: response,
                    fileData: response.data,
                    fileUri: response.uri
                });
            }
        });

    }

    launchImageLibrary = () => {
        let options = {
            storageOptions: {
                skipBackup: true,
                path: 'mincrix',
            },
        };
        ImagePicker.launchImageLibrary(options, (response) => {
            //console.log('Response = ', response);

            if (response.didCancel) {
                console.log('User cancelled image picker');
            } else if (response.error) {
                console.log('ImagePicker Error: ', response.error);
            } else if (response.customButton) {
                console.log('User tapped custom button: ', response.customButton);
                alert(response.customButton);
            } else {
                const source = { uri: response.uri };  
                //console.log(response);              
                this.storeData(response);
                this.setState({
                    filePath: response,
                    fileData: response.data,
                    fileUri: response.uri
                });
            }
        });

    }

    storeData = async (value) => {

        try {           
            await AsyncStorage.setItem('pathimg', value.path)
        } catch (error) {
            console.log('msj ' + error)
        }
    }

    renderFileData() {
        if (this.state.fileData) {
            return <Image source={{ uri: 'data:image/jpeg;base64,' + this.state.fileData }}
                style={styles.images}
                resizeMode="stretch"
            />
        } else {
            return <Image source={require('../assets/social-343.png')}
                style={styles.images} 
                resizeMode="stretch"
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
                <Layout style={styles.btncontainer} level="1">
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
        height: 375,
        borderColor: 'black',
        borderWidth: 1,
        marginHorizontal: 3
    },
})