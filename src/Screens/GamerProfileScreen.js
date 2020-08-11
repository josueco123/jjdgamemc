import React, {useState, useEffect} from 'react';
import { Layout, Text, Icon, Avatar, List,Card } from '@ui-kitten/components';
import { View, ImageBackground, StyleSheet, Image } from 'react-native';
import LottieView from 'lottie-react-native';

export default function GamerProfileScreen({route,navigation }) {

    const { nickname } = route.params;

    const [userdata, setUserdata] = useState([]);
    const [useretos, setUseretos] = useState([]);
    const [isLoading, setIsloading ] = useState(true);


    useEffect(() => {

        fetch('https://mincrix.com/getnicknamegamer/' + nickname, {
            method: 'GET'
        })
            .then((response) => response.json())
            .then((responseJson) => {
                //console.log(responseJson);
    
                setUserdata(responseJson);
    
            }).catch((error) => {
                console.error(error);
            });

            fetch('https://mincrix.com/getretosgamer/' + nickname, {
            method: 'GET'
        })
            .then((response) => response.json())
            .then((responseJson) => {
                //console.log(responseJson);
    
                setUseretos(responseJson);
    
            }).catch((error) => {
                console.error(error);
            }).finally(() => {
                setIsloading(false);
            });


      }, []);

      const renderItem = ({ item }) => (
        //<ListItem title={item.title}/>
        <View style={styles.card} >
            <Image source={{ uri: 'https://www.mincrix.com//storage/' + item.image }}
                style={styles.images}
                resizeMode="stretch" />
            <Card >
                <Text category='s1'>  {item.description}</Text>
            </Card>
        </View>
    );


      return (

        <ImageBackground source={require('../assets/back.png')} style={styles.topContainer}>
    
    
          {userdata.avatar == null ? (
            <Avatar size='giant' source={require('../assets/comic.png')} />
          ) : (
              <Avatar style={styles.avatar} size='giant' source={{ uri: userdata.avatar }} />
            )}
    
          <View style={{ backgroundColor: '#ff6699', width: 400, alignItems: 'center', }}>
            <Text category='h4'>{nickname}</Text>
          </View>
          <View style={styles.infolater}>
            <View style={styles.groupLater}>
              <Text category='h6'> Nivel </Text>
              <View style={styles.number}>
                <Text category='h6'> {userdata.position}</Text>
              </View>
            </View>
            
          </View>        
          <Text category='h5'> Retos Completados</Text>
    
          {isLoading ? (
                    <>
                        <View style={styles.imagelayer} >                            
                            <LottieView
                                autoPlay={true}
                                source={require('../animations/4434-loading.json')}
                                loop={true}                                
                                />
                        </View>
                    </>
                ) : (
                    useretos.length > 0 ?
                            <View>
                                
                                <List
                                    style={styles.list}
                                    data={useretos}
                                    renderItem={renderItem}
                                />
                            </View>
                            : (
                                <>
                                    <View style={styles.imagelayer} >
                                        <Text category='h3'> {nickname} No tienes retos aprobados </Text>                                        
                                    </View>
                                </>
                            )
                    )}
    
        </ImageBackground>
      );
}

const styles = StyleSheet.create({
    topContainer: {
      padding: 10,
      flex: 1,
      resizeMode: "cover",
      flexDirection: 'column',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    avatar: {
      borderColor: '#ffffff',
      borderWidth: 1,
    },
   
    layouretos: {
      justifyContent: 'center',
      alignItems: 'center',
  
    },
    infolater: {
      flexDirection: 'row',
      alignSelf: 'center',
      justifyContent: 'space-between',
    },
    groupLater: {
      flexDirection: 'column',
    },
    number: {
      backgroundColor: '#ff0000',
      width: 42,
      borderRadius: 5,
      alignItems: 'center',
    },
    list:{
        maxHeight: 250,
        borderLeftWidth:40,
        borderLeftColor: 'black',
        borderRightColor: 'black',
        borderRightWidth:30,        
        borderTopColor: 'black',        
        borderTopWidth: 10, 
    },
    imagelayer: {
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        width: 355,
        height: 300,
    },
    images: {
        width: 320,
        height: 320,
        borderWidth: 1,
    },
    card: {
        flex: 1,
        alignItems: 'stretch',
        borderRadius: 10,
    },
  });