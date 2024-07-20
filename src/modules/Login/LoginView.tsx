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
} from 'react-native';
import * as EmailValidator from 'email-validator';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useTheme } from '@react-navigation/native';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../redux/store'; // Import the typed dispatch
import TextInput from '../../components/TextInput';
import Button from '../../components/Button';
import Checkbox from '../../components/Checkbox';
import Loader from '../../components/Loader';
import useLoginStyles from './styles';
import LoginAPICall from './LoginAPI';
import { fetchTutorials } from '../../redux/Slices/TutorialSlice';
import { useLoader } from '../../config/LoaderContext';
import { CommonActions } from '@react-navigation/native';
import { ShowToast } from '../../components/ShowToast';


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
  const dispatch = useDispatch<AppDispatch>(); // Use the typed dispatch
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
        await dispatch(fetchTutorials()).unwrap();
        navigation.replace('Onboard');
      }
    } catch (error) {
      ShowToast('error', 'Login failed, Please try again');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };
 const handleNavigation = () => {
    navigation.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [{ name: 'BottomTabStack' }],
      })
    );
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
                  <TouchableOpacity>
                    <Text style={styles.forgotText}>Forgot Password?</Text>
                  </TouchableOpacity>
                </View>
                <Button
                  title="Log In"
                  onPress={handleSubmit(onSubmit)}
                  buttonStyle={styles.loginButton}
                  textStyle={styles.loginButtonText}
                />
                <Text style={styles.orText}>Or</Text>
                <Button
                  title="Continue with Google"
                  onPress={handleNavigation}
                  buttonStyle={styles.socialButton}
                  textStyle={styles.socialButtonText}
                  icon={require('../../assets/Images/google_ic.png')}
                />
                <Button
                  title="Continue with Facebook"
                  onPress={() => console.log('Continue with Facebook')}
                  buttonStyle={styles.socialButton}
                  textStyle={styles.socialButtonText}
                  icon={require('../../assets/Images/facebok3.png')}
                />
              </View>
            </ScrollView>
          </KeyboardAvoidingView>
        </View>
      </ImageBackground>
      {loading && <Loader />}
    </>
  );
};

export default LoginScreen;
