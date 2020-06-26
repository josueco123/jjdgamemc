import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { TabBar, Tab, Icon,TopNavigation } from '@ui-kitten/components';
import GameScreen from './GameScreen';
import ProfileScreen from './ProfileScreen';
import MenuScreen from './MenuScreen';
import NotificationScreen from './NotificationScreen';
import DadoAnimationScreen from './DadoAnimationScreen';

const { Navigator, Screen } = createBottomTabNavigator();
const Stack = createStackNavigator();

const PersonIcon = (props) => (
  <Icon {...props} name='person-outline'/>
);

const GameIcon = (props) => (
  <Icon {...props} name='star-outline' />
);

const NotificationIcon = (props) => (
  <Icon {...props} name='bell-outline' />
);

const MenuIcon = (props) => (
    <Icon {...props} name='menu-outline'/>
  );

const TopTabBar = ({ navigation, state }) => (
    <TabBar
      selectedIndex={state.index}
      onSelect={index => navigation.navigate(state.routeNames[index])}>
      <Tab icon={GameIcon} />
      <Tab icon={PersonIcon} />
      <Tab icon={NotificationIcon} />
      <Tab icon={MenuIcon}  />
    </TabBar>
  );
  
  const TabNavigator = () => (
    <Navigator tabBar={props => <TopTabBar {...props} />}>
      <Screen name='GameNavigator' component={gameNavigator}/>
      <Screen name='Profile' component={ProfileScreen}/>
      <Screen name='Notification' component={NotificationScreen}/> 
      <Screen name='Menu' component={MenuScreen}/> 
            
    </Navigator>
  );

  function gameNavigator(){
    return(
      <Stack.Navigator>
        <Screen name='Game' component={GameScreen}  options={{
          title: 'MINCRIX',
          headerStyle: {
            backgroundColor: '#29375b',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}/>
        <Stack.Screen name="DadoAnimation" component={DadoAnimationScreen}  options={{
          title: 'MINCRIX',
          headerStyle: {
            backgroundColor: '#29375b',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}/>
      </Stack.Navigator>
    )
}

  
  function IndexNavigator() {

    return (
      <NavigationContainer>         
       <TabNavigator/>     
      </NavigationContainer>
    );
  }
  
  export default IndexNavigator;