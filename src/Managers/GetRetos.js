import React, { Component } from 'react';
import { List, Text, Spinner, Divider, Card, Layout, Button, Icon, } from '@ui-kitten/components';
import { StyleSheet, View, Image } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';

export default class GetMyRetos extends Component {

    constructor(props) {
        super(props);

        this.state = {
            data: [],
            isLoading: true
        };
    }

    async componentDidMount() {

        try {

            const pos = await AsyncStorage.getItem('position');

            await fetch('https://mincrix.com/showreto/' + pos)
                .then((response) => response.json())
                .then((json) => {
                    this.setState({ data: json });
                })
                .catch((error) => console.log("err:  " + error))
                .finally(() => {
                    this.setState({ isLoading: false });
                });
        } catch (er) {
            console.log(er);
        }
    }

    render() {
        const { data, isLoading } = this.state;

        return (

            <>
                {isLoading ? (
                    <Spinner />
                ) : (
                    <>
                        <Text category='h3'  status='primary'> {data.titulo}</Text>
                        <Divider/>
                        <Text category='h5'>{data.descripcion}</Text>
                        <Text category='s2'>no olvides tomar una foto y subirla a tu perfil</Text>
                    </>
                )}
            </>

        );


    }

}