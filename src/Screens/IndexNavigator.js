import React, { useState } from 'react';
import { StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { TabBar, Tab, Icon } from '@ui-kitten/components';
import AsyncStorage from '@react-native-community/async-storage';
import GameScreen from './GameScreen';
import ProfileScreen from './ProfileScreen';
import MenuScreen from './MenuScreen';
import NotificationScreen from './NotificationScreen';
import DadoAnimationScreen from './DadoAnimationScreen';
import LogginScreen from './LoginScreen';
import WelcomeScreen from './WelcomeScreen';
import CreateRetoScreen from './CreateRetoScreen';

const TabNav = createBottomTabNavigator();
const LoginStack = createStackNavigator();
const GameStack = createStackNavigator();
const ProfileStack = createStackNavigator();

const PersonIcon = (props) => (
  <Icon {...props} name='person-outline' />
);

const GameIcon = (props) => (
  <Icon {...props} name='star-outline' />
);

const NotificationIcon = (props) => (
  <Icon {...props} name='bell-outline' />
);

const MenuIcon = (props) => (
  <Icon {...props} name='menu-outline' />
);

const TopTabBar = ({ navigation, state }) => (
  <TabBar
    selectedIndex={state.index}
    onSelect={index => navigation.navigate(state.routeNames[index])}>
    <Tab icon={GameIcon} />
    <Tab icon={PersonIcon} />
    <Tab icon={NotificationIcon} />
    <Tab icon={MenuIcon} />
  </TabBar>
);

function TabNavigator() {
  return (
    <TabNav.Navigator  tabBar={props => <TopTabBar {...props} />} >
      <TabNav.Screen name='Game' component={gameNavigator} />
      <TabNav.Screen name='Profile' component={profileNavigator} />
      <TabNav.Screen name='Notification' component={NotificationScreen} />
      <TabNav.Screen name='Menu' component={MenuScreen} />
    </TabNav.Navigator >

  );
}

function gameNavigator() {
  return (
    <GameStack.Navigator >
      <GameStack.Screen name='Game' component={GameScreen} 
       options={{
        title: 'El Juego',
        headerStyle: {
          backgroundColor: '#1a2138',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      }} />
      <GameStack.Screen name="DadoAnimation" component={DadoAnimationScreen} 
       options={{
        title: 'El Juego',
        headerStyle: {
          backgroundColor: '#1a2138',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      }}/>
    </GameStack.Navigator>
  )
}

function profileNavigator(){
  return(
    <ProfileStack.Navigator >
      <ProfileStack.Screen name='Profile' component={ProfileScreen}
       options={{
        title: 'Mi Perfil',
        headerStyle: {
          backgroundColor: '#1a2138',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      }} />
      <ProfileStack.Screen name='CreateReto' component={CreateRetoScreen} 
      options={{
        title: 'Enviar Reto',
        headerStyle: {
          backgroundColor: '#1a2138',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      }}/>
    </ProfileStack.Navigator>
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
      <StatusBar backgroundColor="#1a2138" barStyle='light-content' />
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
          <LoginStack.Screen name='Welcome' component={WelcomeScreen}  />
          <LoginStack.Screen name='Game' component={TabNavigator}  />
        </LoginStack.Navigator>
      ) : (
        <TabNavigator/>)}
    </NavigationContainer>
  );
}

export default loginNavigator;