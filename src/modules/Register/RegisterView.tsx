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
  Keyboard
} from 'react-native';
import {useForm, Controller} from 'react-hook-form';
import * as EmailValidator from 'email-validator';
import {yupResolver} from '@hookform/resolvers/yup';
import * as yup from 'yup';
import TextInput from '../../components/TextInput';
import Button from '../../components/Button';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import {useNavigation, NavigationProp} from '@react-navigation/native';
import {RootStackParamList} from '../../navigation/types';
import { RegisterAPICall } from './RegisterAPI';

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const registerSchema = yup.object().shape({
  name: yup.string().required('Name is required'),
  email: yup
  .string()
  .required('Email is required')
  .test('is-valid-email', 'Invalid email', value => EmailValidator.validate(value)),
    password: yup
    .string()
    .min(6, 'Password must be at least 6 characters')
    .required('Password is required'),
    password_confirmation: yup
    .string()
    .oneOf([yup.ref('password'), undefined], 'Passwords must match')
    .required('Confirm Password is required'),
});

const RegisterView: React.FC = (props: any) => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm({
    resolver: yupResolver(registerSchema),
  });

  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);

  const onSubmit = (data: any) => {
    Keyboard.dismiss()
  RegisterAPICall(data)
   .then(res => {
    if(res.status === 200){ 
      navigation.navigate('Login')
    }
   })
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
                <Text style={styles.title}>Register</Text>
                <View style={styles.subtitleContainer}>
                  <Text style={styles.subtitle}>Already have an account?</Text>
                  <TouchableOpacity
                    onPress={() => navigation.navigate('Login')}>
                    <Text style={styles.signUp}>Login</Text>
                  </TouchableOpacity>
                </View>
                <Controller
                  control={control}
                  name="name"
                  render={({field: {onChange, onBlur, value}}) => (
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
                  render={({field: {onChange, onBlur, value}}) => (
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
                <Controller
                  control={control}
                  name="password_confirmation"
                  render={({field: {onChange, onBlur, value}}) => (
                    <TextInput
                      label="Confirm Password"
                      placeholder="Confirm Password"
                      secureTextEntry={!confirmPasswordVisible}
                      onBlur={onBlur}
                      onChangeText={onChange}
                      value={value}
                      error={errors.password_confirmation?.message}
                      icon={confirmPasswordVisible ? 'eye-off' : 'eye'}
                      iconOnPress={() =>
                        setConfirmPasswordVisible(!confirmPasswordVisible)
                      }
                    />
                  )}
                />
                <Button
                  title="Register"
                  onPress={handleSubmit(onSubmit)}
                  buttonStyle={styles.loginButton}
                  textStyle={styles.loginButtonText}
                />
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
  loginContainer: {
    width: '95%',
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
  },
  signUp: {
    color: '#000',
    fontWeight: 'bold',
    marginLeft: 4,
  },
  loginButton: {
    backgroundColor: '#000',
    paddingVertical: hp('1.8%'),
    paddingHorizontal: wp('28%'),
    borderRadius: 25,
    marginTop:hp('1%'),
    marginBottom: hp('1%'),
  },
  loginButtonText: {
    color: '#FFFFFF',
    fontSize: hp('2%'),
    fontFamily: 'Outfit-Regular',
  },
  orText: {
    fontSize: hp('2%'),
    marginVertical: hp('1%'),
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
