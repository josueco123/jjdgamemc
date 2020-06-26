import React ,{ Component } from 'react';
import { ApplicationProvider,IconRegistry } from '@ui-kitten/components';
import { default as theme } from './theme.json';
import { EvaIconsPack } from '@ui-kitten/eva-icons';
import IndexNavigator from './src/Screens/IndexNavigator'

 class MainApp extends Component {

    Mainapp = () =>{
        
            <>
              <IconRegistry icons={EvaIconsPack} />
              <ApplicationProvider {...eva} theme={{ ...eva.dark, ...theme }}>
               <IndexNavigator/>
              </ApplicationProvider>
            </>   
        
    }

}