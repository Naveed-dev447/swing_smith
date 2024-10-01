import React, { useState } from 'react';
import {
  View,
  Text,
  StatusBar,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Keyboard,
  ActivityIndicator,
  Modal,
} from 'react-native';
import * as EmailValidator from 'email-validator';
import { useForm, Controller } from 'react-hook-form';
import OTPTextInput from 'react-native-otp-textinput';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useTheme } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';
import TextInput from '../../components/TextInput';
import { useLoader } from '../../config/LoaderContext';
import { ShowToast } from '../../components/ShowToast';
import useLoginStyles from '../../modules/Login/styles';
import RequestOTPAPI from './API/RequestOTPAPI';
import { navigate } from '../../shared/Utils/navigationRef';

// Validation schema using yup
const loginSchema = yup.object().shape({
  email: yup
    .string()
    .required('Email is required')
    .test('is-valid-email', 'Invalid email', value =>
      EmailValidator.validate(value),
    )
});

const ForgetPassword: React.FC = (props: any) => {
  const { navigation } = props;
  const { control, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(loginSchema),
  });
  const { colors } = useTheme();
  const styles = useLoginStyles();
  const { loading, setLoading } = useLoader();
  const [showOTP, setShowOTP] = useState(false);
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');

  const onSubmit = async (data: any) => {
    console.log("Data ----", data.email);
    Keyboard.dismiss();
    setLoading(true);
    try {
      const response = await RequestOTPAPI({ email: data.email });
      setEmail(data.email)
      ShowToast('success', response.message);
      setShowOTP(true);
    } catch (error) {
      ShowToast('error', error?.response?.data?.message || 'An error occurred while requesting the OTP.')
    } finally {
      setLoading(false);
    }
  };

  const handleResendOTP = async () => {
    setLoading(true);
    try {
      const response = await RequestOTPAPI({ email });
      ShowToast('success', 'OTP resent successfully');
    } catch (error) {
      ShowToast('error',`${error?.response?.data?.message} || 'An error occurred while resending the OTP'`);
    } finally {
      setLoading(false);
    }
  };

  const handleBack = () => {
    setShowOTP(false);
    setOtp('');
  };

  const handleOTPVerification = () => {
    
    const navigateObj = {email,otp};    
    if (otp.length === 5) {
      setShowOTP(false)
      navigate('resetForgotPassword', navigateObj); // Navigating to the next screen with email and OTP
    } else {
      ShowToast('error', 'Please enter a valid OTP.');
    }
  };
  return (
    <>
      <StatusBar
        backgroundColor="transparent"
        translucent={true}
        barStyle="light-content"
      />
      <Modal
        visible={showOTP}
        transparent={true}
        animationType="slide"
        onRequestClose={handleBack}
      >
        <View style={styles.otpOverlay}>
          <TouchableOpacity onPress={handleBack} style={styles.backButton}>
            <Icon name="close" size={30} color="#FFFFFF" />
          </TouchableOpacity>
          <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={{ flex: 1 }}>
            <ScrollView contentContainerStyle={styles.scrollContainer}>
              <View style={styles.loginContainer}>
                <Text style={styles.title}>Enter OTP</Text>
                <OTPTextInput
                  handleTextChange={(text) => setOtp(text)} // Capture OTP input change
                  containerStyle={styles.otpContainer}
                  textInputStyle={styles.otpInput}
                  inputCount={5} // Number of OTP input fields
                />
                <TouchableOpacity
                  style={styles.resendButton}
                  onPress={handleResendOTP}
                  disabled={loading}>
                  <Text style={styles.resendButtonText}>Resend OTP</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[
                    styles.loginButton,
                    {
                      marginTop: '5%',
                      backgroundColor: loading ? '#fff' : '#000',
                      borderColor: loading ? '#000' : 'transparent',
                      borderWidth: 1,
                    },
                  ]}
                  onPress={handleOTPVerification}
                  disabled={loading}>
                  {loading ? (
                    <ActivityIndicator
                      size="small"
                      color={loading ? '#000' : '#192126'}
                    />
                  ) : (
                    <Text style={styles.loginButtonText}>Verify OTP</Text>
                  )}
                </TouchableOpacity>
              </View>
            </ScrollView>
          </KeyboardAvoidingView>
        </View>
      </Modal>
      <View style={styles.forgetOverlay}>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={{ flex: 1 }}>
          <ScrollView contentContainerStyle={styles.scrollContainer}>
            <View style={styles.loginContainer}>
              <Text style={styles.title}>Forget Password</Text>
              <Text style={styles.forgetSubtitle}>
                Don't worry! It occurs. Please enter the email address linked
                with your account.
              </Text>
              <View style={styles.subtitleContainer}>
                <Text style={styles.subtitle}>Remember Your Password?</Text>
                <TouchableOpacity
                  onPress={() => navigation.navigate('Login')}>
                  <Text style={styles.signUp}>Login Now</Text>
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
                    borderColor='grey'
                    onChangeText={onChange}
                    value={value}
                    error={errors.email?.message}
                  />
                )}
              />
              <TouchableOpacity
                style={[
                  styles.loginButton,
                  {
                    marginTop: '5%',
                    backgroundColor: loading ? '#fff' : '#000',
                    borderColor: loading ? '#000' : 'transparent',
                    borderWidth: 1,
                  },
                ]}
                onPress={handleSubmit(onSubmit)}
                disabled={loading}>
                {loading ? (
                  <ActivityIndicator
                    size="small"
                    color={loading ? '#000' : '#192126'}
                  />
                ) : (
                  <Text style={styles.loginButtonText}>Send Code</Text>
                )}
              </TouchableOpacity>
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </View>
    </>
  );
};

export default ForgetPassword;
