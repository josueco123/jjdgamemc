import React, {useState} from 'react';
import { Layout, Text, Card, Avatar } from '@ui-kitten/components';
import { View, ScrollView, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';


export default  function ProfileScreen({ navigation }) {
 
  const [avatar, setAvatar] = useState(null);
  const [name, setName] = useState('');

  const getData = async () => {
    try {
      const valuename = await AsyncStorage.getItem('username')
      if(valuename !== null) {
        // value previously stored
        setName(valuename);        
      }

      const valueavatar = await AsyncStorage.getItem('avatar')
      if(valueavatar !== null) {
        // value previously stored
        setAvatar(valueavatar);      
      }
      
    } catch(e) {
      // error reading value
    }
  }
    
  getData();

  const Header = (props) => (
    <View {...props}>
       {avatar == null ? (
       <Avatar size='giant' source={require('../assets/comic.png')}/>
       ) :(
        <Avatar size='giant' source={{uri: avatar}}/>
       )}
        <Text category='h6'>{name}</Text>
    </View>
  );
  
    return (
      
      <ScrollView>
      <Layout style={styles.topContainer} level="1">
      
        <Card style={styles.card} header={Header}>
          <Text>With Header</Text>
        </Card>
        
      </Layout>
      </ScrollView>
    );
  }

  const styles = StyleSheet.create({
    topContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    card: {
      flex: 1,
      margin: 2,
    },
    footerContainer: {
      flexDirection: 'row',
      justifyContent: 'flex-end',
    },
    footerControl: {
      marginHorizontal: 2,
    },
  });