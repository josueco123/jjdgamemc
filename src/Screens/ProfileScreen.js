import React, { useEffect, useState }  from 'react';
import { Layout, Text, Input, Button} from '@ui-kitten/components';


export default  function ProfileScreen({ navigation }) {
 
  const [radicacion, setRadicacion] = useState('');
  const [demandante, setDemandante] = useState('');
  const [demandado, setDemandado] = useState('');
  const [juzgado, setJuzgado] = useState(''); 
  
  const saveInWeb = () => {
    fetch('https://mywebsite.com/endpoint/', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        _token: '',
        radicacion: radicacion,
        demandante: demandante,
        demandado: demandado,
        juzgado: juzgado,

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
      console.error("mistake: "+error);;
    });
  }
        
    return (
      <Layout style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }} level="3">
        <Text category='h1'>Profile Screen</Text>
        <Input
          placeholder='Place your Text'
          value={radicacion}
          onChangeText={nextValue => setRadicacion(nextValue)}
          />
          <Input
          placeholder='Place your Text'
          value={demandante}
          onChangeText={nextValue => setDemandante(nextValue)}
          />
          <Input
          placeholder='Place your Text'
          value={demandado}
          onChangeText={nextValue => setDemandado(nextValue)}
          />
          <Input
          placeholder='Place your Text'
          value={juzgado}
          onChangeText={nextValue => setJuzgado(nextValue)}
          />
          <Button onPress={saveInWeb}>enviar</Button>
      </Layout>
    );
  }