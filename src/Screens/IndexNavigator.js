import React, { useState, useRef, useEffect } from 'react';
import { StatusBar } from 'react-native';
import { NavigationContainer, getFocusedRouteNameFromRoute } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { Icon } from '@ui-kitten/components';
import SoundPlayer from 'react-native-sound-player';
import AsyncStorage from '@react-native-community/async-storage';
import GameScreen from './GameScreen';
import ProfileScreen from './ProfileScreen';
import MenuScreen from './MenuScreen';
import ChatScreen from './ChatScreen';
import DadoAnimationScreen from './DadoAnimationScreen';
import LogginScreen from './LoginScreen';
import WelcomeScreen from './WelcomeScreen';
import CreateRetoScreen from './CreateRetoScreen';
import searchScreen from './searchScreen'
import GamerProfileScreen from './GamerProfileScreen';
import RankingScreen from './RankingScreen';
import FriendsScreen from './FriendsScreen';
import SettingScreen from './SettingScreen';
import InstructionsScreen from './InstructionsScreen';
import AboutUsScreen from './AboutUsScreen';
import MoreGamesScreen from './MoreGamesScreen';
import NewRetosScreen from './NewRetosScreen';
import AmigoScreen from './AmigoScreen';
import TutorialScreen from './TutorialScreen';

const TabNav = createBottomTabNavigator();
const LoginStack = createStackNavigator();
const GameStack = createStackNavigator();
const ProfileStack = createStackNavigator();
const MenuStack = createStackNavigator();
const FriendStack = createStackNavigator();

function getHeaderTitle(route) {
  // If the focused route is not found, we need to assume it's the initial screen
  // This can happen during if there hasn't been any navigation inside the screen
  // In our case, it's "Feed" as that's the first screen inside the navigator
  const routeName = getFocusedRouteNameFromRoute(route) ?? 'Game';

  switch (routeName) {
    case 'Game':
      return 'Juego';
    case 'Profile':
      return 'Profile';
      case 'NewRetos':
      return 'NewRetos';
    case 'Friends':
      return 'Friends';
    case 'Menu':
      return 'Menu';

  }
}


function TabNavigator({ navigation, route }) {
  React.useLayoutEffect(() => {
    navigation.setOptions({ headerTitle: getHeaderTitle(route) });
  }, [navigation, route]);


  return (
    <TabNav.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName; let refName;

          if (route.name === 'Game') {

            iconName = focused ? 'star' : 'star-outline';
          } else if (route.name === 'Profile') {

            iconName = focused ? 'person' : 'person-outline';
          } else if (route.name === 'Friends') {

            iconName = focused ? 'people' : 'people-outline';
          } else if (route.name === 'Menu') {
            iconName = focused ? 'menu' : 'menu-outline';
          } else if(route.name === 'NewRetos'){
            iconName = focused ? 'tv' : 'tv-outline';
          }


          // You can return any component that you like here!
          return <Icon name={iconName} size={size} color={color}
            style={{ width: 30, height: 30, }} fill='#ff6699' />;
        },
      })}
      tabBarOptions={{
        activeTintColor: '#ff6699',
        inactiveTintColor: 'gray',
        keyboardHidesTabBar: true,
        tabStyle: { backgroundColor: '#000000' },
        labelStyle: { fontFamily: 'VT323-Regular', fontSize: 14 }
      }}
    >
      <TabNav.Screen name='Game' component={gameNavigator} options={{
        tabBarLabel: 'Juego',
      }} />
      <TabNav.Screen name='Profile' component={profileNavigator} options={{
        tabBarLabel: 'Mi Perfil',
      }}

      />
       <TabNav.Screen name='NewRetos' component={NewRetosScreen} options={{
        tabBarLabel: 'Retos',
      }}

      />
      <TabNav.Screen name='Friends' component={friendsNavigator} options={{
        tabBarLabel: 'Amigos',
      }}
      />
      <TabNav.Screen name='Menu' component={menuNavigator}
      />
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
      <ProfileStack.Screen name='Profile' component={ProfileScreen}  />
      <ProfileStack.Screen name='CreateReto' component={CreateRetoScreen}  />
    </ProfileStack.Navigator>
  )
}

function friendsNavigator() {
  return (
    <FriendStack.Navigator headerMode="none" >
      <FriendStack.Screen name='Friends' component={AmigoScreen} />
      <FriendStack.Screen name="GamerProfile" component={GamerProfileScreen} />
      <FriendStack.Screen name="Buscar" component={searchScreen}  />      
    </FriendStack.Navigator>
  )
}

function menuNavigator() {
  return (
    <MenuStack.Navigator headerMode="none" >
      <MenuStack.Screen name='Menu' component={MenuScreen} />
      <MenuStack.Screen name="Buscar" component={searchScreen} />
      <MenuStack.Screen name="GamerProfile" component={GamerProfileScreen} />
      <MenuStack.Screen name="Ranking" component={RankingScreen} />
      <MenuStack.Screen name="Chat" component={ChatScreen} />
      <MenuStack.Screen name="Settings" component={SettingScreen} />
      <MenuStack.Screen name="Instructions" component={InstructionsScreen} />
      <MenuStack.Screen name="AboutUs" component={AboutUsScreen} />
      <MenuStack.Screen name="MoreGames" component={MoreGamesScreen} />      
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
      
      const soundvalue = await AsyncStorage.getItem('sound');
      if(soundvalue == null){
        global.sounds = true;

        try {
          // play the file tone.mp3
          SoundPlayer.playSoundFile('mincrixsong', 'mp3');      
      
        } catch (e) {
          console.log('cannot play the sound file', e)
        }
        
      }else{
        global.sounds = false;
      }

      const vibsvalue = await AsyncStorage.getItem('vibs');
      if(vibsvalue == null){
        global.vibs = true;
      }else{
        global.vibs = false;
      }      

      //console.log("eje: " + value)
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
            <LoginStack.Screen name='Tutorial' component={TutorialScreen} />
          </LoginStack.Navigator>
        ) : (
            <LoginStack.Navigator headerMode="none" >
              <LoginStack.Screen name='Game' component={TabNavigator} />
              <LoginStack.Screen name='Tutorial' component={TutorialScreen} />
            </LoginStack.Navigator>
          )}      
    </NavigationContainer>
  );
}

export default loginNavigator;