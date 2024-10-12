// import React, { useEffect, useRef } from 'react';
// import { View, StatusBar, StyleSheet, Dimensions } from 'react-native';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import LottieView from 'lottie-react-native';
// import { useDispatch } from 'react-redux';
// import { AppDispatch } from '../../redux/store';
// import { fetchFirstLoginStatus } from '../../redux/Slices/FirstLogin';
// import { useLoader } from '../../config/LoaderContext';

// const { height, width } = Dimensions.get('window');

// const SplashScreen = (props: any) => {
//   const { navigation } = props;
//   const dispatch = useDispatch<AppDispatch>();
//   const { setLoading } = useLoader();
//   const animationRef = useRef<LottieView>(null);

//   const handleNavigation = async () => {
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

//   useEffect(() => {
//     if (animationRef.current) {
//       animationRef.current.play();
//     }
//   }, []);

//   return (
//     <View style={styles.container}>
//       <StatusBar barStyle="light-content" translucent backgroundColor="transparent" />
//       <LottieView
//         ref={animationRef}
//         source={require('../../assets/animations/Splash_loader.json')}
//         autoPlay
//         loop={false}
//         style={styles.lottie}
//         onAnimationFinish={handleNavigation} // Trigger navigation on animation finish
//       />
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: 'white',
//   },
//   lottie: {
//     width: width,
//     height: height,
//   },
// });

// export default SplashScreen;


import React, { useEffect, useRef } from 'react';
import { View, StatusBar, StyleSheet, Dimensions } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import LottieView from 'lottie-react-native';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../redux/store';
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
      if (animationRef.current) {
        animationRef.current.pause(); 
      }
    }
  };

  useEffect(() => {
    if (animationRef.current) {
      animationRef.current.play();
    }
    handleNavigation();
  }, []);

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" translucent backgroundColor="transparent" />
      <LottieView
        ref={animationRef}
        source={require('../../assets/animations/Splash_loader.json')}
        autoPlay
        loop={true} 
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
