// import React from 'react';
// import { View, Text, ImageBackground, StatusBar } from 'react-native';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import styles from './styles';
// import Button from '../../components/Button';
// import { useDispatch } from 'react-redux';
// import { AppDispatch } from 'redux/store';
// import { fetchFirstLoginStatus } from '../../redux/Slices/FirstLogin';
// import { useLoader } from '../../config/LoaderContext';

// const SplashScreen = (props: any) => {
//   const { route, navigation } = props
//   const dispatch = useDispatch<AppDispatch>();
//   const { loading, setLoading } = useLoader();


//   const handleGetStarted = async () => {
//     try {
//       setLoading(true);
//       const token = await AsyncStorage.getItem('Token');
//       if (token) {
//         const isFirstLogin = await dispatch(fetchFirstLoginStatus()).unwrap();

//         if (isFirstLogin) {
//           navigation.replace('Onboard');
//         } else {
//           navigation.replace('BottomTabStack');
//         }
//       } else {
//         navigation.navigate('Login');
//       }
//     } catch (error) {
//       console.error('Error reading token from AsyncStorage:', error);
//       navigation.navigate('Login');
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <ImageBackground
//       source={require('../../assets/Images/onBoarding.jpg')}
//       style={styles.backgroundImage}
//     >
//       <StatusBar barStyle="light-content" translucent backgroundColor="transparent" />
//       <View style={styles.container}>
//         <Text style={styles.title}>Welcome to your Swing Coach!</Text>
//         <Text style={styles.subtitle}>Get started with us and improve your game with personalized swing analysis.</Text>
//         <Button
//           title="Get Started"
//           onPress={handleGetStarted}
//           buttonStyle={styles.button}
//           textStyle={styles.buttonText}
//           disabled={loading}
//           loading={loading}
//         />

//       </View>
//     </ImageBackground>
//   );
// };

// export default SplashScreen;


import React, { useEffect, useRef } from 'react';
import { View, StatusBar, StyleSheet, Dimensions } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import LottieView from 'lottie-react-native';
import { useDispatch } from 'react-redux';
import { AppDispatch } from 'redux/store';
import { fetchFirstLoginStatus } from '../../redux/Slices/FirstLogin';
import { useLoader } from '../../config/LoaderContext';

const { height, width } = Dimensions.get('window');

const SplashScreen = (props: any) => {
  const { navigation } = props;
  const dispatch = useDispatch<AppDispatch>();
  const { setLoading } = useLoader();
  const animationRef = useRef<LottieView>(null);

  const handleNavigation = async () => {
    try {
      setLoading(true);
      const token = await AsyncStorage.getItem('Token');
      if (token) {
        const isFirstLogin = await dispatch(fetchFirstLoginStatus()).unwrap();
        if (isFirstLogin) {
          navigation.replace('Onboard');
        } else {
          navigation.replace('BottomTabStack');
        }
      } else {
        navigation.navigate('Login');
      }
    } catch (error) {
      console.error('Error reading token from AsyncStorage:', error);
      navigation.navigate('Login');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (animationRef.current) {
      animationRef.current.play();
    }

    const animationDuration = 3000; 
    const timer = setTimeout(() => {
      handleNavigation();
    }, animationDuration);

    return () => clearTimeout(timer);
  }, []);

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" translucent backgroundColor="transparent" />
      <LottieView
        ref={animationRef}
        source={require('../../assets/animations/Splash_loader.json')}
        autoPlay
        loop={false}
        style={styles.lottie}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white', 
  },
  lottie: {
    width: width,
    height: height,
  },
});

export default SplashScreen;
