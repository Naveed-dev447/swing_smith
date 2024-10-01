// src/screens/LoginScreen.tsx
import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  StatusBar,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Keyboard,
  ActivityIndicator,
} from 'react-native';
import * as EmailValidator from 'email-validator';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useTheme } from '@react-navigation/native';
import { useDispatch } from 'react-redux';
import { AppDispatch } from 'redux/store';
import TextInput from '../../components/TextInput';
import Button from '../../components/Button';
import Checkbox from '../../components/Checkbox';
import useLoginStyles from './styles';
import LoginAPICall from './LoginAPI';
import { fetchTutorials } from '../../redux/Slices/TutorialSlice';
import { useLoader } from '../../config/LoaderContext';
import { ShowToast } from '../../components/ShowToast';
import { fetchFirstLoginStatus } from '../../redux/Slices/FirstLogin';
import { GoogleSignin, statusCodes } from '@react-native-google-signin/google-signin';


const loginSchema = yup.object().shape({
  email: yup
    .string()
    .required('Email is required')
    .test('is-valid-email', 'Invalid email', value => EmailValidator.validate(value)),
  password: yup
    .string()
    .min(6, 'Password must be at least 6 characters')
    .required('Password is required'),
});

const LoginScreen: React.FC = (props: any) => {
  const { navigation } = props;
  const dispatch = useDispatch<AppDispatch>();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(loginSchema),
  });
  const { colors } = useTheme();
  const styles = useLoginStyles();
  const { loading, setLoading } = useLoader();
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);


  const onSubmit = async (data: any) => {
    Keyboard.dismiss();
    data.rememberMe = rememberMe;
    setLoading(true);
    try {
      const res = await LoginAPICall(data);

      if (res.status === 201) {

        const isFirstLogin = await dispatch(fetchFirstLoginStatus()).unwrap();
        await dispatch(fetchTutorials()).unwrap();

        if (isFirstLogin) {
          navigation.replace('Onboard');
        } else {
          navigation.replace('BottomTabStack');
        }
      }
    } catch (error) {
      ShowToast('error', error?.response?.data?.message || 'Login failed, Please try again');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      GoogleSignin.configure({
        iosClientId: '320360764204-77apiqhigrdi7dnkmdae7829m8kjil43.apps.googleusercontent.com',
        webClientId: '320360764204-u87tan1oqdsphl0vug9vv1eqohq5kq4e.apps.googleusercontent.com',
        offlineAccess: true,
      });
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();

      const payload = {
        plateform: 'google',
        email: userInfo.user.email,
        name: userInfo.user.name,
        device_token: userInfo.idToken,
      };

      onSubmit(payload);

    } catch (error: any) {
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        ShowToast('info', 'User cancelled the login');
      } else if (error.code === statusCodes.IN_PROGRESS) {
        ShowToast('info', 'Signin in progress');
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        ShowToast('error', 'Play services not available');
      } else {
        ShowToast('error', 'Something went wrong');
      }
      console.error(error);
    }
  };
  return (
    <>
      <StatusBar backgroundColor="transparent" translucent={true} barStyle="light-content" />
      <ImageBackground source={require('../../assets/Images/onBoarding.jpg')} style={styles.background}>
        <View style={styles.overlay}>
          <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={{ flex: 1 }}>
            <ScrollView contentContainerStyle={styles.scrollContainer}>
              <View style={styles.loginContainer}>
                <Text style={styles.title}>Login</Text>
                <View style={styles.subtitleContainer}>
                  <Text style={styles.subtitle}>Don't have an account?</Text>
                  <TouchableOpacity onPress={() => navigation.navigate('RegisterView')}>
                    <Text style={styles.signUp}>Sign Up</Text>
                  </TouchableOpacity>
                </View>
                <Controller
                  control={control}
                  name="email"
                  render={({ field: { onChange, onBlur, value } }) => (
                    <TextInput
                      label="Email"
                      placeholder="Email"
                      keyboardType='email-address'
                      onBlur={onBlur}
                      onChangeText={onChange}
                      value={value}
                      error={errors.email?.message}
                    />
                  )}
                />
                <Controller
                  control={control}
                  name="password"
                  render={({ field: { onChange, onBlur, value } }) => (
                    <TextInput
                      label="Password"
                      placeholder="Password"
                      secureTextEntry={!passwordVisible}
                      onBlur={onBlur}
                      onChangeText={onChange}
                      value={value}
                      error={errors.password?.message}
                      icon={passwordVisible ? 'eye-off' : 'eye'}
                      iconOnPress={() => setPasswordVisible(!passwordVisible)}
                    />
                  )}
                />
                <View style={styles.rememberContainer}>
                  <Checkbox
                    label="Remember me"
                    checked={rememberMe}
                    onPress={() => setRememberMe(!rememberMe)}
                  />
                  <TouchableOpacity onPress={() => navigation.navigate('forgetPassword')}
                  >
                    <Text style={styles.forgotText}>Forgot Password?</Text>
                  </TouchableOpacity>
                </View>
                <TouchableOpacity
                  style={[styles.loginButton, { backgroundColor: loading ? '#fff' : '#000', borderColor: loading ? '#000' : 'transparent', borderWidth: 1 }]}
                  onPress={handleSubmit(onSubmit)}
                  disabled={loading}
                >
                  {loading ? (
                    <ActivityIndicator size="small" color={loading ? "#000" : '#192126'} />
                  ) : (
                    <Text style={styles.loginButtonText}>Log In</Text>
                  )}
                </TouchableOpacity>
                <Text style={styles.orText}>Or</Text>
                <Button
                  title="Continue with Google"
                  onPress={handleGoogleLogin}
                  buttonStyle={styles.socialButton}
                  textStyle={styles.socialButtonText}
                  icon={require('../../assets/Images/google_ic.png')}
                />
                <Button
                  title="Continue with Facebook"
                  onPress={() => console.log("Facebook pressed")}
                  buttonStyle={styles.socialButton}
                  textStyle={styles.socialButtonText}
                  icon={require('../../assets/Images/facebok3.png')}
                />
              </View>
            </ScrollView>
          </KeyboardAvoidingView>
        </View>
      </ImageBackground>
    </>
  );
};

export default LoginScreen;
