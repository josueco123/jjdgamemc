import React, { useState, useEffect  } from 'react';
import { Layout, Text, Button, Icon, Spinner } from '@ui-kitten/components';
import { GiftedChat, Bubble, Send, Time,Day } from 'react-native-gifted-chat';
import { View, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import LottieView from 'lottie-react-native';
import { useIsFocused } from '@react-navigation/native';



let getData = true;
let index = 0;

export default function NotificationScreen({ navigation }) {

  const [messages, setMessages] = useState([]);
  const [avatar, setAvatar] = useState('');
  const [nickname, setNickname] = useState('');
  const [email, setEmail] = useState('');
 

  async function getUser() {

    if (getData) {

      try {
        const valueavatar = await AsyncStorage.getItem('avatar')
        if (valueavatar !== null) {
          // value previously stored
          setAvatar(valueavatar);
        }

        const valueanickname = await AsyncStorage.getItem('nickname')
        if (valueanickname !== null) {
          // value previously stored
          setNickname(valueanickname);
          console.log('eeje');
        }
        const valueaid = await AsyncStorage.getItem('email')
        if (valueaid !== null) {
          // value previously stored
          setEmail(valueaid);
        }
      } catch (e) {
        // error reading value
        console.log('bad');
      }

      getData = false;
    }
  }
  getUser();

  function renderSend(props) {
    return (
      <Send {...props}>
        <View style={styles.sendingContainer}>
          <Icon
            style={styles.icon}
            fill='#ff6699'
            name='paper-plane'
          />
        </View>
      </Send>
    );
  }

  function scrollToBottomComponent() {
    return (
      <View >
        <Icon
          style={styles.icon}
          fill='#ff6699'
          name='arrowhead-down'
        />
      </View>
    );
  }

  const renderBubble = (props) => (
    <Bubble
      {...props}
      wrapperStyle={{
        right: {
          // Here is the color change
          backgroundColor: '#9900ff'
        },
        left:{
          backgroundColor: '#ff6699'
        }
      }}
      textStyle={{       
        right: {
          fontFamily: 'VT323-Regular',
          color: '#fff',
          fontSize: 20,  
        },
        left :{
          fontFamily: 'VT323-Regular',
          color: '#fff',
          fontSize: 20,  
        }
      }}
    />
  ); 

  /** render the time labels in the bubble */
  function renderTime() {
    return (
        <Time
            textStyle={{
                right: {
                  color: '#fff',
                  fontFamily: 'VT323-Regular',  
                  fontSize: 25                  
                },
                left: {
                    color: '#fff',
                    fontFamily: 'VT323-Regular',  
                    fontSize: 25                 
                }
            }}
        />
    );
}

/** render the day labels above the bubble */
const renderDay = (props) => (
  <Day
    {...props}
    
    textStyle={{       
      
        fontFamily: 'VT323-Regular',
        color: '#fff',
        fontSize: 20,  
              
    }}
  />
); 

  function renderLoading() {
    return (
      <View style={styles.loadingContainer}>
        <LottieView
          autoPlay={true}
          source={require('../animations/15319-navbar-chat.json')}
          loop={true}
        />
      </View>
    );
  }   
  
  const getChatMsg = () => {

    fetch('https://mincrix.com/messgesfromchat', {
     method: 'GET'
   })
     .then((response) => response.json())
     .then((responseJson) => {
  
       while (index < responseJson.length) {
  
         setMessages(previousMessages => GiftedChat.append(previousMessages,
           {
             _id: responseJson[index].id,
             text: responseJson[index].texto,
             createdAt: responseJson[index].created_at,
             user: {
               _id: responseJson[index].email,
               name: responseJson[index].nickname,
               avatar: responseJson[index].avatar,
             },
           },
         ))
  
         index++;
       }
       console.log(index);
     }).catch((error) => {
       console.error(error);
     });
  }
  
  useEffect(() => {
    const toggle = setInterval(getChatMsg, 1000);

    return () => clearInterval(toggle);
 });
   
  async function handleSend(messages) {

    const msg = messages[0].text;

    await fetch('https://www.mincrix.com/savemessgesforchat', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email: email,
        texto: msg,
      })
    }).then((response) => response.json())
      //If response is in json then in success
      .then((responseJson) => {
        //alert(JSON.stringify(responseJson));
        console.log(responseJson);
      })
      //If response is not in json then in error
      .catch((error) => {
        //alert(JSON.stringify(error));
        console.log("mistake: " + error);;
      });
    //setMessages(previousMessages => GiftedChat.append(previousMessages, messages))
  }

  

  return (
    <View style={styles.container}>
      <GiftedChat
        messages={messages}
        onSend={handleSend}
        user={{ _id: email, name: nickname, avatar: avatar }}
        placeholder='Escribe tu mensaje...'
        renderBubble={renderBubble} 
        renderDay={renderDay}                         
        renderUsernameOnMessage={true}
        renderLoading={renderLoading}
        scrollToBottom={true}
        renderAvatarOnTop={true}
        showUserAvatar
        renderSend={renderSend}
        scrollToBottomComponent={scrollToBottomComponent}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingTop: 10,
    backgroundColor: '#081240',
    padding: 8,
  },
  sendingContainer: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  loadingContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  icon: {
    width: 32,
    height: 32,
  },
});
