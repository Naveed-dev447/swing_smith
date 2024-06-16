import React, { useState } from 'react';
import { View, Text, StyleSheet, ImageBackground, StatusBar, TouchableOpacity } from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import TextInput from '../../assets/components/TextInput';
import Button from '../../assets/components/Button';
import Checkbox from '../../assets/components/Checkbox';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { useNavigation } from '@react-navigation/native';

const loginSchema = yup.object().shape({
  email: yup.string().email('Invalid email').required('Email is required'),
  password: yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
});

const LoginScreen: React.FC = () => {
  const navigation = useNavigation(); 
  const { control, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(loginSchema),
  });

  const [passwordVisible, setPasswordVisible] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  const onSubmit = (data: any) => {
    data.rememberMe = rememberMe;
    console.log(data);
  };

  return (
    <>
      <StatusBar backgroundColor="transparent" translucent={true} barStyle="light-content" />
      <ImageBackground
        source={require('../../assets/Images/onBoarding.jpg')}
        style={styles.background}
      >
        <View style={styles.overlay}>
          <View style={styles.loginContainer}>
            <Text style={styles.title}>Login</Text>
            <View style={styles.subtitleContainer}>
              <Text style={styles.subtitle}>
                Don't have an account? 
              </Text>
              <TouchableOpacity onPress={() => navigation.navigate('Register')}>
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
                  icon={passwordVisible ? "eye-off" : "eye"}
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
              onPress={() => console.log('Continue with Google')}
              buttonStyle={styles.googleButton}
              textStyle={styles.googleButtonText}
            />
            <Button
              title="Continue with Facebook"
              onPress={() => console.log('Continue with Facebook')}
              buttonStyle={styles.facebookButton}
              textStyle={styles.facebookButtonText}
            />
          </View>
        </View>
      </ImageBackground>
    </>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  overlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.3)',
  },
  loginContainer: {
    width: '90%',
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    borderRadius: 10,
    padding: hp('5%'),
    alignItems: 'center',
  },
  title: {
    fontSize: hp('3%'),
    fontWeight: 'bold',
    color: '#000',
    marginBottom: hp('1%'),
  },
  subtitleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: hp('2%'),
  },
  subtitle: {
    fontSize: hp('2%'),
    color: '#000',
  },
  signUp: {
    color: '#000',
    fontWeight: 'bold',    
  },
  rememberContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    marginBottom: hp('2%'),
  },
  rememberText: {
    fontSize: hp('1.8%'),
  },
  forgotText: {
    fontSize: hp('1.8%'),
    color: '#000',
    fontWeight: 'bold',
  },
  loginButton: {
    backgroundColor: '#000',
    paddingVertical: hp('1.5%'),
    paddingHorizontal: wp('28%'),
    borderRadius: 25,
    marginBottom: hp('1%'),
  },
  loginButtonText: {
    color: '#FFFFFF',
    fontSize: hp('2%'),
    fontFamily: 'Outfit-Regular',
  },
  orText: {
    fontSize: hp('2%'),
    marginVertical: hp('2%'),
  },
  googleButton: {
    backgroundColor: '#fff',
    paddingVertical: hp('1.5%'),
    paddingHorizontal: wp('15%'),
    borderRadius: 25,
    borderWidth: 1,
    borderColor: '#fff',
    marginBottom: hp('2%'),
  },
  googleButtonText: {
    color: '#000',
    fontSize: hp('2%'),
    fontWeight: 'bold',
  },
  facebookButton: {
    backgroundColor: '#fff',
    paddingVertical: hp('1.5%'),
    paddingHorizontal: wp('13%'),
    borderRadius: 25,
    borderWidth: 1,
    borderColor: '#fff',
  },
  facebookButtonText: {
    color: '#000',
    fontSize: hp('2%'),
    fontWeight: 'bold',
  },
});

export default LoginScreen;
