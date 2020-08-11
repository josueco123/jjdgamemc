import React, {useState, useEffect} from 'react';
import { StyleSheet, TouchableWithoutFeedback, ImageBackground, View, Alert } from 'react-native';
import { Text, Autocomplete, AutocompleteItem, Icon, Avatar, Divider } from '@ui-kitten/components';


const filter = (item, query) => item.nickname.toLowerCase().includes(query.toLowerCase());



export default function searchScreen({ navigation }) {

    const [value, setValue] = useState(null);
    const [data, setData] = useState([]);

useEffect(() => {

    fetch('https://mincrix.com/getnicknamegamers', {
        method: 'GET'
    })
        .then((response) => response.json())
        .then((responseJson) => {
            //console.log(responseJson);

           setData(responseJson);

        }).catch((error) => {
            console.error(error);
        });
  }, []);

    const getUsers =  () =>{

         fetch('https://mincrix.com/getnicknamegamers', {
                method: 'GET'
            })
                .then((response) => response.json())
                .then((responseJson) => {
                    //console.log(responseJson);

                   setData(responseJson);

                }).catch((error) => {
                    console.error(error);
                });
    }        

    const clearInput = () => {
        setValue('');
        getUsers();        
    };

    const onSelect = (index) => {
        setValue(data[index].nickname);
        navigation.navigate('GamerProfile', {
            nickname: data[index].nickname
          });
      };
    
      const onChangeText = (query) => {
        setValue(query);
        setData(data.filter(item => filter(item, query)));
       
      };

    const renderCloseIcon = (props) => (
        <TouchableWithoutFeedback onPress={clearInput}>
            <Icon {...props} name='close' />
        </TouchableWithoutFeedback>
    );

    const renderOption = (item, index) => (
        <AutocompleteItem
          key={index}
          title={item.nickname}
          accessoryLeft={() => <Avatar  size='medium' source={{ uri: item.avatar }} />}        
        />
      );

    return (

        <ImageBackground source={require('../assets/back.png')} style={styles.container}>

            <View style={{ backgroundColor: '#ff6699', width: 400, alignItems: 'center', }}>
                <Text category='h4'>Buscar</Text>
            </View>

            <Autocomplete
                placeholder='Escribe el nickname...'
                value={value}
                style={styles.input}               
                accessoryRight={renderCloseIcon}
                onChangeText={onChangeText}
                onSelect={onSelect}>
                {data.map(renderOption)}
            </Autocomplete>

        </ImageBackground>
    );

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
        padding: 15
    },
   input:{
       top: 20,
       width: 330,
   },
    images: {
        width: 50,
        height: 75,
        marginHorizontal: 3
    },
})