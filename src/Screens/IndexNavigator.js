import React, { useState, useRef, useEffect } from 'react';
import { StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { Icon } from '@ui-kitten/components';
import AsyncStorage from '@react-native-community/async-storage';
import GameScreen from './GameScreen';
import ProfileScreen from './ProfileScreen';
import MenuScreen from './MenuScreen';
import NotificationScreen from './NotificationScreen';
import DadoAnimationScreen from './DadoAnimationScreen';
import LogginScreen from './LoginScreen';
import WelcomeScreen from './WelcomeScreen';
import CreateRetoScreen from './CreateRetoScreen';
import searchScreen from './searchScreen'
import GamerProfileScreen from './GamerProfileScreen';
import RankingScreen from './RankingScreen';

const TabNav = createBottomTabNavigator();
const LoginStack = createStackNavigator();
const GameStack = createStackNavigator();
const ProfileStack = createStackNavigator();
const MenuStack = createStackNavigator();


function TabNavigator() {

  const perfilIconRef = useRef();
  const gameIconRef = useRef();
  const chatIconRef = useRef();
  const menuIconRef = useRef();

  useEffect(() => {
    perfilIconRef.current.startAnimation();
    gameIconRef.current.startAnimation();
    chatIconRef.current.startAnimation();
    menuIconRef.current.startAnimation();
  }, []);

  return (
    <TabNav.Navigator tabBarOptions={{  
      activeTintColor:'#ff6699',     
      keyboardHidesTabBar:true,      
      tabStyle:{backgroundColor: '#000000'}
    }}   >
      <TabNav.Screen name='Game' component={gameNavigator} options={{  
        tabBarLabel: 'El Juego',       
          tabBarIcon: ({ color, size }) => (
            <Icon
            ref={gameIconRef}
            animationConfig={{ cycles: Infinity }}
            animation='pulse'
            style={{width: 32,height: 32,}}
            fill='#ff6699'
            name='star'
            color={color} size={size}
          />
          ),
        }}
       />
      <TabNav.Screen name='Profile' component={profileNavigator}
      options={{              
        tabBarLabel: 'Mi Perfil',
        tabBarIcon: ({ color, size }) => (
          <Icon
            ref={perfilIconRef}
            animationConfig={{ cycles: Infinity }}
            animation='pulse'
            style={{width: 32,height: 32,}}
            fill='#ff6699'
            name='person'
            color={color} size={size}
          />
        ),
      }} 
     />
      <TabNav.Screen name='Notification' component={NotificationScreen} 
      options={{    
        tabBarLabel: 'Chat',    
        tabBarIcon: ({ color, size }) => (
          <Icon
          ref={chatIconRef}
          animationConfig={{ cycles: Infinity }}
          animation='pulse'
            style={{width: 32,height: 32,}}
            fill='#ff6699'
            name='message-circle'
            color={color} size={size}
          />
        ),
      }}/>
      <TabNav.Screen name='Menu' component={menuNavigator} 
      options={{        
        tabBarLabel: 'Menu',
        tabBarIcon: ({ color, size }) => (
          <Icon
          ref={menuIconRef}
          animationConfig={{ cycles: Infinity }}
          animation='pulse'
            style={{width: 32,height: 32,}}
            fill='#ff6699'
            name='menu'
            color={color} size={size}
          />
        ),
      }}/>
    </TabNav.Navigator >

  );
}

function gameNavigator() {
  return (
    <GameStack.Navigator headerMode="none" >
      <GameStack.Screen name='Game' component={GameScreen} />
      <GameStack.Screen name="DadoAnimation" component={DadoAnimationScreen} />
    </GameStack.Navigator>
  )
}

function profileNavigator() {
  return (
    <ProfileStack.Navigator headerMode="none" >
      <ProfileStack.Screen name='Profile' component={ProfileScreen}
      />
      <ProfileStack.Screen name='CreateReto' component={CreateRetoScreen}
      />
    </ProfileStack.Navigator>
  )
}

function menuNavigator() {
  return (
    <MenuStack.Navigator headerMode="none" >
      <MenuStack.Screen name='Menu' component={MenuScreen} />
      <MenuStack.Screen name="Buscar" component={searchScreen} />
      <MenuStack.Screen name="GamerProfile" component={GamerProfileScreen} />
      <MenuStack.Screen name="Ranking" component={RankingScreen} />    
    </MenuStack.Navigator>
  )
}

function loginNavigator() {

  const [tokenLog, setTokenLog] = useState(null);

  const getData = async () => {
    try {
      const value = await AsyncStorage.getItem('token')
      if (value !== null) {
        // value previously stored
        setTokenLog(value);
      }
    } catch (e) {
      // error reading value
      console.log('Mk1:' + error)
    }
  }

  getData();

  return (
    <NavigationContainer>
      <StatusBar backgroundColor="#000000" barStyle='dark-content' animated={true} />
      {tokenLog == null ? (
        // No token found, user isn't signed in
        <LoginStack.Navigator headerMode="none">
          <LoginStack.Screen
            name='loggin'
            component={LogginScreen}
            options={{
              title: ' ',
              headerStyle: {
                backgroundColor: '#000000',
              },
            }}
          />
          <LoginStack.Screen name='Welcome' component={WelcomeScreen} />
          <LoginStack.Screen name='Game' component={TabNavigator} />
        </LoginStack.Navigator>
      ) : (
          <TabNavigator />)}
    </NavigationContainer>
  );
}

export default loginNavigator;