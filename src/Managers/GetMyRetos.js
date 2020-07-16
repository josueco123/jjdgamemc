import React, { Component } from 'react';
import { Image } from 'react-native';
import { List, Text, Spinner, Divider, Card, Layout, Button, Icon, } from '@ui-kitten/components';
import { StyleSheet, View } from 'react-native';
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

            const mail = await AsyncStorage.getItem('email');

            await fetch('https://mincrix.com/useretosup/' + mail)
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

        const HeartIcon = (props) => (
            <Icon {...props} name='heart' />
        );

        const ComentsIcon = (props) => (
            <Icon {...props} name='message-square' />
        );

        const Footer = (props) => (
            <View {...props} style={[props.style, styles.footerContainer]}>
                <Button
                    style={styles.footerControl}
                    size='medium'
                    accessoryLeft={HeartIcon}
                    appearance='ghost'
                >
                    12
              </Button>
                <Button
                    style={styles.footerControl}
                    accessoryLeft={ComentsIcon}
                    appearance='ghost'
                    size='medium'>
                    3
              </Button>
            </View>
        );

        const renderItem = ({ item }) => (
            //<ListItem title={item.title}/>
            <Card footer={Footer}>
                <Image source={{ uri: 'https://www.mincrix.com//storage/' + item.image }}
                    style={styles.images}
                    resizeMode="stretch" />
                <Card>
                    <Text category='s1'>  {item.description}</Text>
                </Card>
            </Card>
        );

        return (
            <>
                {isLoading ? (
                    <>
                        <Layout style={styles.imagelayer} level="3">
                            <Spinner />
                            <Image source={require('../assets/free-386.png')} style={styles.images} resizeMode="stretch" />
                        </Layout>
                    </>
                ) : (
                        data.length > 0 ?
                            <List
                                style={styles.container}
                                data={data}
                                ItemSeparatorComponent={Divider}
                                keyExtractor={({ id }, index) => id.toString()}
                                renderItem={renderItem}
                            />
                            : (
                                <>
                                    <Layout style={styles.imagelayer}  level="3">
                                        <Text category='s1'> No tienes retos aprobados </Text>
                                        <Image source={require('../assets/free-386.png')} style={styles.images} resizeMode="stretch" />
                                    </Layout>
                                </>
                            )
                    )}
            </>
        );
    }
};

const styles = StyleSheet.create({
    container: {
        maxHeight: 280,
        maxHeight: 270,        
        padding: 10,                             
    },
    contentContainer: {
        paddingHorizontal: 8,
        paddingVertical: 4,
    },
    item: {
        marginVertical: 4,
    },
    images: {
        width: 285,
        height: 300,
        borderWidth: 1,
    },
    imagelayer:{
        flexDirection: 'column',
        justifyContent:'center',
        alignItems: 'center',
        width: 355,
        height:300,
    },
    footerContainer: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
    },
    footerControl: {
        marginHorizontal: 2,
    },

});