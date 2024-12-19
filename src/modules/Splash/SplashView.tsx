import React, { useEffect, useRef } from 'react';
import { View, StatusBar, StyleSheet, Dimensions } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Video, { VideoRef } from 'react-native-video';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../redux/store';
import { fetchFirstLoginStatus } from '../../redux/Slices/FirstLogin';
import { useLoader } from '../../config/LoaderContext';

const { height, width } = Dimensions.get('window');

const SplashScreen = (props: any) => {
  const { navigation } = props;
  const dispatch = useDispatch<AppDispatch>();
  const { setLoading } = useLoader();
  const videoRef = useRef<VideoRef>(null);

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
      if (videoRef.current) {
        videoRef.current.pause();
      }
    }
  };

  useEffect(() => {
    const timeout = setTimeout(handleNavigation, 5000); // Set timeout to 5 seconds
    return () => clearTimeout(timeout);
  }, []);

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" translucent backgroundColor="transparent" />
      <Video
        ref={videoRef}
        source={require('../../assets/video/splash.mp4')}
        style={styles.video}
        resizeMode="cover"
        repeat
        onEnd={() => handleNavigation()}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  video: {
    width: width,
    height: height,
  },
});

export default SplashScreen;
