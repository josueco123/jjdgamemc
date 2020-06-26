import React,  { Component } from 'react';
import { StyleSheet, Alert } from 'react-native';
import { Button, Icon } from '@ui-kitten/components';
import {
    LoginManager,
    AccessToken,
    GraphRequest,
    GraphRequestManager,
  } from 'react-native-fbsdk';


  const FacebookIcon = (props) => (
    <Icon name='facebook' {...props} />
  ); 


  export default class LoginFBManager extends Component {
  
    render(){
      return(       
        <Button >Entra con Facebook</Button>        
    );
    }
   
};

 

const styles = StyleSheet.create({   
    btnfb: {
      backgroundColor: '#1877F2',
      borderColor: '#1877F2',
      borderRadius: 32,
      width: 200,
      height: 28,
      margin:0,
      left: 80,
      top: 130,
    },    
  });

  