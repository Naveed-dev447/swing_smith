import React from 'react';
import { View, Text, ImageBackground, StatusBar } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import styles from './styles';
import Button from '../../components/Button';
import { useDispatch } from 'react-redux';
import { AppDispatch } from 'redux/store';
import { fetchFirstLoginStatus } from '../../redux/Slices/FirstLogin';
import { useLoader } from '../../config/LoaderContext';

const SplashScreen = (props: any) => {
  const { route, navigation } = props
  const dispatch = useDispatch<AppDispatch>();
  const { loading, setLoading } = useLoader();


  const handleGetStarted = async () => {
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

  return (
    <ImageBackground
      source={require('../../assets/Images/onBoarding.jpg')}
      style={styles.backgroundImage}
    >
      <StatusBar barStyle="light-content" translucent backgroundColor="transparent" />
      <View style={styles.container}>
        <Text style={styles.title}>Welcome to your Swing Coach!</Text>
        <Text style={styles.subtitle}>Get started with us and improve your game with personalized swing analysis.</Text>
        <Button
          title="Get Started"
          onPress={handleGetStarted}
          buttonStyle={styles.button}
          textStyle={styles.buttonText}
          disabled={loading}
          loading={loading}
        />

      </View>
    </ImageBackground>
  );
};

export default SplashScreen;
