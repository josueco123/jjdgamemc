import * as React from 'react';
import LottieView from 'lottie-react-native';


export default function DadoAnimationScreen({ route, navigation }) {


  const { dadoResult } = route.params;

  const navigateBack = () => {
    //console.log(dadoResult);
    navigation.goBack();
  };  

  switch (dadoResult) {
    case 1:
      return (
        <>
          <LottieView
            autoPlay={true}
            source={require('../animations/18179-touzidice1.json')}
            loop={false}
            duration={5000}
            onAnimationFinish={navigateBack} />
        </>
      );
      break;

    case 2:
      return (
        <>
          <LottieView
            autoPlay={true}
            source={require('../animations/18180-touzidice2.json')}
            loop={false}
            duration={5000}
            onAnimationFinish={navigateBack} />
        </>
      );
      break;

    case 3:
      return (
        <>
          <LottieView
            autoPlay={true}
            source={require('../animations/18181-touzidice3.json')}
            loop={false}
            duration={5000}
            onAnimationFinish={navigateBack} />
        </>
      );
      break;

    case 4:
      return (
        <>
          <LottieView
            autoPlay={true}
            source={require('../animations/18182-touzidice4.json')}
            loop={false}
            duration={5000}
            onAnimationFinish={navigateBack} />
        </>
      );
      break;

    case 5:
      return (
        <>
          <LottieView
            autoPlay={true}
            source={require('../animations/18183-touzidice5.json')}
            loop={false}
            duration={5000}
            onAnimationFinish={navigateBack} />
        </>
      );
      break;

    case 6:
      return (
        <>
          <LottieView
            autoPlay={true}
            source={require('../animations/18184-touzidice6.json')}
            loop={false}
            duration={5000}
            onAnimationFinish={navigateBack} />
        </>
      );
      break;
  }
}
