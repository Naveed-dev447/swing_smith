import React from 'react';
import { View, Text, ImageBackground, TouchableOpacity, StatusBar } from 'react-native';
import styles from './styles';
import Button from '../../components/Button';

const SplashScreen = (props: any) => {
  const { route, navigation } = props

  const handleGetStarted = () => {
    navigation.navigate('Login');
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
        />
      </View>
    </ImageBackground>
  );
};

export default SplashScreen;