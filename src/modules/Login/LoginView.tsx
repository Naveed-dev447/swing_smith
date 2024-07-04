import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  StatusBar,
  TouchableOpacity,
  Image,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Keyboard,
} from 'react-native';
import * as EmailValidator from 'email-validator';
import {useForm, Controller} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useTheme } from '@react-navigation/native';
import TextInput from '../../components/TextInput';
import Button from '../../components/Button';
import Checkbox from '../../components/Checkbox';
  
import useLoginStyles from './styles';
import LoginAPICall from './LoginAPI';

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

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
  const {route, navigation} = props
  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm({
    resolver: yupResolver(loginSchema),
  });
  const { colors } = useTheme();
  const styles = useLoginStyles();
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  const onSubmit = (data: any) => {
    Keyboard.dismiss();
    data.rememberMe = rememberMe;
    // LoginAPICall(data)
    // .then(res => {
    //   if(res.status === 200){
    //     navigation.navigate('Onboard')
    //   }
    //  })
    navigation.navigate('Onboard')
  };

  return (
    <>
      <StatusBar
        backgroundColor="transparent"
        translucent={true}
        barStyle="light-content"
      />
      <ImageBackground
        source={require('../../assets/Images/onBoarding.jpg')}
        style={styles.background}>
        <View style={styles.overlay}>
          <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={{flex: 1}}>
            <ScrollView contentContainerStyle={styles.scrollContainer}>
              <View style={styles.loginContainer}>
                <Text style={styles.title}>Login</Text>
                <View style={styles.subtitleContainer}>
                <Text style={styles.subtitle}>Don't have an account?</Text>
                <TouchableOpacity
                    onPress={() => navigation.navigate('RegisterView')}>
                    <Text style={styles.signUp}>Sign Up</Text>
                  </TouchableOpacity>
                </View>
                <Controller
                  control={control}
                  name="email"
                  render={({field: {onChange, onBlur, value}}) => (
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
                  render={({field: {onChange, onBlur, value}}) => (
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
                  onPress={() => navigation.navigate('BottomTabStack')}                  buttonStyle={styles.socialButton}
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
    </>
  );
};

export default LoginScreen;