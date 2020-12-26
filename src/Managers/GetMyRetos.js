import React, { Component } from 'react';
import { List, Text, Card } from '@ui-kitten/components';
import { StyleSheet, View, Image, FlatList } from 'react-native';
import LottieView from 'lottie-react-native';


export default class GetMyRetos extends Component {
    constructor(props) {
        super(props);

        this.state = {
            data: [],
            isLoading: true,
        };
    }

    componentDidMount() {

        try {

            fetch('https://mincrix.com/lasñjpoaw4rqwlur4orijqkwjñkejrq939rk3jr3irlkaj4oir23/useretosup/' + global.id)
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

        const renderItem = ({ item }) => (
            //<ListItem title={item.title}/>
            <>
            <View >
                <Image source={{ uri: 'https://www.mincrix.com//storage/' + item.image }}
                    style={styles.images}
                    resizeMode="stretch" />                
            </View>
            <Card style={{backgroundColor: 'black',width: 350,}}  >
            <Text category='s1'>  {item.description}</Text>
            </Card>
            </>
        );

        return (
            <>
                {isLoading ? (
                                                           
                            <LottieView
                                autoPlay={true}
                                source={require('../animations/4434-loading.json')}
                                loop={true}
                            />                        
                    
                ) : (
                        data.length > 0 ?
                            
                                <FlatList
                                    
                                    data={data}
                                    renderItem={renderItem}
                                    keyExtractor={(item, index) => index.toString()}
                                />
                            
                            : (
                                <>
                                    <View style={styles.imagelayer} >
                                        <Text category='h3'> No tienes retos aprobados </Text>
                                    </View>
                                </>
                            )
                    )}
            </>
        );
    }
};

const styles = StyleSheet.create({
     
    contentContainer: {
        paddingHorizontal: 8,
        paddingVertical: 4,
    },
    item: {
        marginVertical: 4,
    },
    images: {
        width: 350,
        height: 350,
        borderWidth: 15,
        borderColor: 'black',
    },    
    imagelayer: {                
        alignItems: 'center',      
    },
     

});