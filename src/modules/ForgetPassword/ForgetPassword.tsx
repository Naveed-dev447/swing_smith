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
} from 'react-native';
import * as EmailValidator from 'email-validator';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useTheme } from '@react-navigation/native';
import { useDispatch } from 'react-redux';
import { AppDispatch } from 'redux/store';
import TextInput from '../../components/TextInput';
import { fetchTutorials } from '../../redux/Slices/TutorialSlice';
import { useLoader } from '../../config/LoaderContext';
import { ShowToast } from '../../components/ShowToast';
import useLoginStyles from '../../modules/Login/styles';

const loginSchema = yup.object().shape({
  email: yup
    .string()
    .required('Email is required')
    .test('is-valid-email', 'Invalid email', value =>
      EmailValidator.validate(value),
    ),
  password: yup
    .string()
    .min(6, 'Password must be at least 6 characters')
    .required('Password is required'),
});

const ForgetPassword: React.FC = (props: any) => {
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
  const [rememberMe, setRememberMe] = useState(false);

  const onSubmit = async (data: any) => {
    Keyboard.dismiss();
    setLoading(true);
  };



  return (
    <>
      <StatusBar
        backgroundColor="transparent"
        translucent={true}
        barStyle="light-content"
      />

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
