import React, { useState, useEffect } from 'react';
import { Text, Icon, Avatar, Card, Button } from '@ui-kitten/components';
import { View, ImageBackground, StyleSheet, Image, ToastAndroid, FlatList } from 'react-native';
import LottieView from 'lottie-react-native';
import { useNetInfo } from "@react-native-community/netinfo";

export default function GamerProfileScreen({ route, navigation }) {

  const { nickname } = route.params;
  const { email } = route.params;

  const [userdata, setUserdata] = useState([]);
  const [useretos, setUseretos] = useState([]);
  const [isLoading, setIsloading] = useState(true);
  const [isFriend, setIsfriend] = useState(false);
  const [nfriends, setNfriends] = useState(0);

  const net = useNetInfo().isConnected;

  useEffect(() => {

    fetch('https://mincrix.com/lasñjpoaw4rqwlur4orijqkwjñkejrq939rk3jr3irlkaj4oir23/getnicknamegamer/' + nickname, {
      method: 'GET'
    })
      .then((response) => response.json())
      .then((responseJson) => {
        //console.log(responseJson);

        setUserdata(responseJson);

      }).catch((error) => {
        console.error(error);
      });

    fetch('https://mincrix.com/lasñjpoaw4rqwlur4orijqkwjñkejrq939rk3jr3irlkaj4oir23/getretosgamer/' + nickname, {
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

    fetch('https://mincrix.com/lasñjpoaw4rqwlur4orijqkwjñkejrq939rk3jr3irlkaj4oir23/getfriendsnikc/' + nickname, {
      method: 'GET'
    })
      .then((response) => response.json())
      .then((responseJson) => {
        //console.log(responseJson);

        setNfriends(responseJson);

      }).catch((error) => {
        console.error(error);
      }).finally(() => {
        setIsloading(false);
      });

    fetch('https://mincrix.com/lasñjpoaw4rqwlur4orijqkwjñkejrq939rk3jr3irlkaj4oir23/getfriendship/' + email + '/' + nickname, {
      method: 'GET'
    })
      .then((response) => response.json())
      .then((responseJson) => {
        //console.log(responseJson);

        if (responseJson == null) {
          setIsfriend(false);
        } else {
          setIsfriend(true);
        }

      }).catch((error) => {
        console.error(error);
      }).finally(() => {
        setIsloading(false);
      });

  }, []);

  const showToastWithGravity = () => {
    ToastAndroid.showWithGravity(
      "Has perdido la conexion a internet",
      ToastAndroid.SHORT,
      ToastAndroid.CENTER
    );
  };

  const sendRequest = async () => {

    setIsfriend(true);
    try {

      if (net) {

        await fetch('https://www.mincrix.com/lasjpoaw4rqwlur4orijqkwjkejrq939rk3jr3irlkaj4oir23/requestfriendship', {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            email: email,
            nickname: nickname,
          })
        }).then((response) => response.text())
          //If response is in json then in success
          .then((responseJson) => {
            console.log(responseJson);
          })
          //If response is not in json then in error
          .catch((error) => {
            //alert(JSON.stringify(error));
            console.log("mistake: " + error);
          });

      } else {
        showToastWithGravity();
      }

    } catch (error) {
      console.log('Failed to load the data ' + error.toString());
    }
  }

  const renderItem = ({ item }) => (
    //<ListItem title={item.title}/>
    <>
      <View >
        <Image source={{ uri: 'https://www.mincrix.com//storage/' + item.image }}
          style={styles.images}
          resizeMode="stretch" />

      </View>
      <Card style={{ backgroundColor: 'black',width: 350,}}  >
        <Text category='s1'>  {item.description}</Text>
      </Card>
    </>
  );

  const addIcon = (props) => (
    <Icon {...props} name='person-add-outline' />
  );


  return (

    <ImageBackground source={require('./imgs/back.png')} style={styles.topContainer}>


      {userdata.avatar == null ? (
        <Avatar size='giant' source={require('./imgs/comic.png')} />
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
        <View style={styles.groupLater}>
          <Text category='h6'> Amigos</Text>
          <View style={styles.number}>
            <Text category='h6'> {nfriends}</Text>
          </View>
        </View>
      </View>
      {isFriend ? <Text category='s1'> Has escogido a {nickname} como tu Amigo</Text> :
        <Button accessoryLeft={addIcon} appearance='ghost' onPress={sendRequest}> Agregar como Amigo</Button>
      }

      <Text category='h5'> Retos Completados</Text>


      {isLoading ? (
        <>
          
            <LottieView
              autoPlay={true}
              source={require('../animations/4434-loading.json')}
              loop={true}
            />
          
        </>
      ) : (
          useretos.length > 0 ?

            <FlatList              
              data={useretos}
              renderItem={renderItem}
              keyExtractor={(item, index) => index.toString()}
            />
            : (
              <>
                <View style={styles.imagelayer} >
                  <Text category='h3'> {nickname} no tiene retos aprobados </Text>
                </View>
              </>
            )
        )}
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  topContainer: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  avatar: {
    borderColor: '#ffffff',
    borderWidth: 1,
  },
  list: {
    alignSelf: 'center',
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
  imagelayer: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  images: {
    width: 350,
    height: 350,
    borderWidth: 15,
    borderColor: 'black',
  }, 
});