import { ActivityIndicator, Keyboard, KeyboardAvoidingView, Platform, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import OTPTextInput from 'react-native-otp-textinput';
import { ShowToast } from '../../components/ShowToast';
import useLoginStyles from '../../modules/Login/styles';
import RequestOTPAPI from './API/RequestOTPAPI';
import { useLoader } from '../../config/LoaderContext';
import { goBack, navigate } from '../../shared/Utils/navigationRef';
import { ForgotPasswordAPI } from './API/ForgotPasswordAPI';
import CustomHeader from '../../shared/Component/CustomHeader';

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
      <CustomHeader onBackPress={goBack} title={''} />
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ flex: 1 }}>
        <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
          <Text style={styles.title}>OTP Verification</Text>
          <Text style={styles.forgetSubtitle}>
            Enter the verification code we just sent on your email address.
          </Text>
          <View style={styles.loginContainer}>
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
                <Text style={styles.loginButtonText}>Verify</Text>
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

