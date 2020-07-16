import React, {useState }  from 'react';
import { Layout, Text, Input, Button } from '@ui-kitten/components';


export default  function NotificationScreen({ navigation }) {
  const [titulo, setTitulo] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [numero, setNumero] = useState('');  
  
  const saveInWeb = () => {
    fetch('https://www.mincrix.com/storeto', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'        
      },
      body: JSON.stringify({       
        titulo: titulo,
        descripcion: descripcion,
        numero: numero       
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
      console.log("mistake: "+ error);
    });
  }
      
        
    return (
      <Layout style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }} level="3" >
        <Text category='h1'>Notification Screen</Text>
        <Input
          placeholder='titulo'
          value={titulo}
          onChangeText={nextValue => setTitulo(nextValue)}
          />
          <Input
          placeholder='Descripcion'
          value={descripcion}
          onChangeText={nextValue => setDescripcion(nextValue)}
          />
          <Input
          placeholder='numero'
          value={numero}
          onChangeText={nextValue => setNumero(nextValue)}
          />          
          <Button onPress={saveInWeb}>enviar</Button>
      </Layout>
    );
  }
  