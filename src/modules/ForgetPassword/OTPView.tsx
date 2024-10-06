import { ActivityIndicator, Keyboard, KeyboardAvoidingView, Platform, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import OTPTextInput from 'react-native-otp-textinput';
import { ShowToast } from '../../components/ShowToast';
import useLoginStyles from '../../modules/Login/styles';
import RequestOTPAPI from './API/RequestOTPAPI';
import { useLoader } from '../../config/LoaderContext';
import { navigate } from '../../shared/Utils/navigationRef';
import { ForgotPasswordAPI } from './API/ForgotPasswordAPI';

const OTPView = (props: any) => {
  const { navigation, route } = props;
  const { params } = route;
  const { email, password } = params;

  const styles = useLoginStyles();
  const { loading, setLoading } = useLoader();
  const [otp, setOtp] = useState('');



  const onSubmit = async () => {
    Keyboard.dismiss();
    setLoading(true);

    const payload = {
      email: email,
      code: otp,
      password: password
    };
    try {
      const response = await ForgotPasswordAPI(payload);
      if (response.message === 'The code has expired, please try again.') {
        ShowToast('error', response.message)
      }
      else {
        ShowToast('success', response.message);
        navigation.pop(3);
      }
      console.log('Password reset successful:', response)
    } catch (error: any) {
      ShowToast('error', `${error?.response?.data?.message}`)
      console.error('Network error:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleResendOTP = async () => {
    setLoading(true);
    try {
      const response = await RequestOTPAPI(params);
      ShowToast('success', 'OTP resent successfully');
    } catch (error: any) {
      ShowToast('error', `${error?.response?.data?.message} || 'An error occurred while resending the OTP'`);
    } finally {
      setLoading(false);
    }
  };
  const handleOTPVerification = () => {
    if (otp.length === 5) {
      onSubmit();
    } else {
      ShowToast('error', 'Please enter a valid OTP.');
    }
  };
  return (
    <View style={styles.forgetOverlay}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ flex: 1 }}>
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          <View style={styles.loginContainer}>
            <Text style={styles.title}>Verify OTP number</Text>
            <Text style={styles.forgetSubtitle}>
              Enter 5 digit OTP sent to your email.
            </Text>
            <OTPTextInput
              handleTextChange={(text) => setOtp(text)}
              containerStyle={styles.otpContainer}
              keyboardType="default"
              textInputStyle={styles.otpInput}
              inputCount={5}
            />
            <TouchableOpacity
              style={[
                styles.loginButton,
                {
                  marginTop: '10%',
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
            <TouchableOpacity
              onPress={handleResendOTP}
              disabled={loading}>
              <Text style={styles.resendButton}>Didn't receive an OTP?
                <Text style={styles.resendButtonText}> Resend</Text></Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>

    </View>
  )
}

export default OTPView

