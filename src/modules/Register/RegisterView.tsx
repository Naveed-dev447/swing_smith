import React, { useState } from 'react';
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
  ActivityIndicator
} from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import * as EmailValidator from 'email-validator';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import TextInput from '../../components/TextInput';
import Button from '../../components/Button';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { RootStackParamList } from '../../navigation/types';
import { RegisterAPICall } from './RegisterAPI';
import { useLoader } from '../../config/LoaderContext';
import { ShowToast } from '../../components/ShowToast';

const registerSchema = yup.object().shape({
  name: yup.string().required('Name is required'),
  email: yup.string()
    .required('Email is required')
    .test('is-valid-email', 'Invalid email', value => EmailValidator.validate(value)),
  password: yup.string()
    .min(6, 'Password must be at least 6 characters')
    .required('Password is required'),
  password_confirmation: yup.string()
    .oneOf([yup.ref('password'), undefined], 'Passwords must match')
    .required('Confirm Password is required'),
});

const RegisterView: React.FC = (props: any) => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const { control, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(registerSchema),
  });
  const { loading, setLoading } = useLoader();

  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);

  const onSubmit = async (data: any) => {
    Keyboard.dismiss();
    setLoading(true);

    try {
      const res = await RegisterAPICall(data);
      if (res.status === 201) {
        ShowToast('success', res.message);
        navigation.navigate('Login');
      } else {
        ShowToast('error', `${res.message}`)
      }
    } catch (error) {
      ShowToast('error', `${error?.response?.data?.message}|| ${error?.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <StatusBar backgroundColor="transparent" translucent={true} barStyle="light-content" />
      <ImageBackground source={require('../../assets/Images/onBoarding.jpg')} style={styles.background}>
        <View style={styles.overlay}>
          <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={{ flex: 1 }}>
            <ScrollView contentContainerStyle={styles.scrollContainer}>
              <View style={styles.registerContainer}>
                <Text style={styles.title}>Register</Text>
                <View style={styles.subtitleContainer}>
                  <Text style={styles.subtitle}>Already have an account?</Text>
                  <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                    <Text style={styles.signUp}>Login</Text>
                  </TouchableOpacity>
                </View>
                <Controller
                  control={control}
                  name="name"
                  render={({ field: { onChange, onBlur, value } }) => (
                    <TextInput
                      label="First Name"
                      placeholder="First Name"
                      onBlur={onBlur}
                      onChangeText={onChange}
                      value={value}
                      error={errors.name?.message}
                    />
                  )}
                />
                <Controller
                  control={control}
                  name="email"
                  render={({ field: { onChange, onBlur, value } }) => (
                    <TextInput
                      label="Email"
                      placeholder="Email"
                      onBlur={onBlur}
                      keyboardType='email-address'
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
                <Controller
                  control={control}
                  name="password_confirmation"
                  render={({ field: { onChange, onBlur, value } }) => (
                    <TextInput
                      label="Confirm Password"
                      placeholder="Confirm Password"
                      secureTextEntry={!confirmPasswordVisible}
                      onBlur={onBlur}
                      onChangeText={onChange}
                      value={value}
                      error={errors.password_confirmation?.message}
                      icon={confirmPasswordVisible ? 'eye-off' : 'eye'}
                      iconOnPress={() => setConfirmPasswordVisible(!confirmPasswordVisible)}
                    />
                  )}
                />
                <TouchableOpacity
                  style={[styles.loginButton, { backgroundColor: loading ? '#fff' : '#000', borderColor: loading ? '#000' : 'transparent', borderWidth: 1 }]}
                  onPress={handleSubmit(onSubmit)}
                  disabled={loading}
                >
                  {loading ? (
                    <ActivityIndicator size="small" color={loading ? "#000" : '#192126'} />
                  ) : (
                    <Text style={styles.loginButtonText}>Register</Text>
                  )}
                </TouchableOpacity>
                <Text style={styles.orText}>Or Register with</Text>
                <View style={styles.socialButtonsContainer}>
                  <TouchableOpacity
                    style={styles.socialButton}
                    onPress={() => console.log('Continue with Facebook')}>
                    <Image
                      source={require('../../assets/Images/facebook4.png')}
                      style={styles.socialIcon}
                    />
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.socialButton}
                    onPress={() => console.log('Continue with Google')}>
                    <Image
                      source={require('../../assets/Images/google_ic.png')}
                      style={styles.socialIcon}
                    />
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.socialButton}
                    onPress={() => console.log('Continue with Apple')}>
                    <Image
                      source={require('../../assets/Images/apple_ic.png')}
                      style={styles.socialIcon}
                    />
                  </TouchableOpacity>
                </View>
              </View>
            </ScrollView>
          </KeyboardAvoidingView>
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
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  registerContainer: {
    width: '95%',
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    borderRadius: 10,
    padding: hp('5%'),
    alignItems: 'center',
  },
  title: {
    fontSize: hp('3%'),
    fontFamily: 'Outfit-Bold',
    color: '#192126',
    marginBottom: hp('1%'),
  },
  subtitleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: hp('2%'),
  },
  subtitle: {
    fontSize: hp('1.8%'),
    fontFamily: 'Outfit-Regular',
    fontWeight: '500',
    color: "#6C7278"
  },
  signUp: {
    fontSize: hp('2%'),
    color: '#192126',
    fontFamily: 'Outfit-Bold',
    marginLeft: 4,
  },
  loginButton: {
    backgroundColor: '#000',
    paddingVertical: hp('1.8%'),
    width: wp('80%'),
    borderRadius: 25,
    alignItems: 'center',
  },
  loginButtonText: {
    color: '#FFFFFF',
    fontSize: hp('2%'),
    fontFamily: 'Outfit-Regular',
  },
  orText: {
    color: '#6C7278',
    fontFamily: 'Inter-Regular',
    marginVertical: hp('2%'),
  },
  socialButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginTop: hp('1%'),
  },
  socialButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingVertical: hp('1.5%'),
    paddingHorizontal: wp('7%'),
    borderRadius: 15,
    borderWidth: 1,
    borderColor: '#fff',
    marginBottom: hp('2%'),
  },
  socialButtonText: {
    color: '#000',
    fontSize: hp('2%'),
    fontWeight: 'bold',
    marginLeft: wp('2%'),
  },
  socialIcon: {
    width: hp('3%'),
    height: hp('3%'),
  },
});

export default RegisterView;
