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
    StyleSheet,
} from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import TextInput from '../../components/TextInput';
import { useLoader } from '../../config/LoaderContext';
import CustomHeader from '../../shared/Component/CustomHeader';
import { goBack, navigate } from '../../shared/Utils/navigationRef';
const loginSchema = yup.object().shape({
    password: yup
        .string()
        .min(6, 'Password must be at least 6 characters')
        .required('Password is required'),
    confirmPassword: yup
        .string()
        .oneOf([yup.ref('password'), null], 'Passwords must match')
        .required('Confirm Password is required'),
});

const ResetPassword: React.FC = (props: any) => {
    const { navigation, route } = props;
    const { params } = route;

    const {
        control,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(loginSchema),
    });
    const { loading, setLoading } = useLoader();
    const [passwordVisible, setPasswordVisible] = useState(false);

    const onSubmit = async (data: any) => {
        Keyboard.dismiss();
        const payload = {
            email: params,
            password: data.password
        };
        navigate('otpScreen', payload)
    };


    return (
        <>
            <StatusBar
                backgroundColor="transparent"
                translucent={true}
                barStyle="light-content"
            />
            <CustomHeader title="Reset Password" onBackPress={goBack} />
            <View style={updatedStyles.container}>
                <KeyboardAvoidingView
                    behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                    style={{ flex: 1 }}>
                    <ScrollView contentContainerStyle={updatedStyles.scrollContainer}>
                        <View style={updatedStyles.topContainer}>
                            <Controller
                                control={control}
                                name="password"
                                render={({ field: { onChange, onBlur, value } }) => (
                                    <TextInput
                                        label="New Password"
                                        placeholder="New Password"
                                        secureTextEntry={!passwordVisible}
                                        onBlur={onBlur}
                                        onChangeText={onChange}
                                        value={value}
                                        borderColor="grey"
                                        error={errors.password?.message}
                                        icon={passwordVisible ? 'eye-off' : 'eye'}
                                        iconOnPress={() => setPasswordVisible(!passwordVisible)}
                                    />
                                )}
                            />
                            <Controller
                                control={control}
                                name="confirmPassword"
                                render={({ field: { onChange, onBlur, value } }) => (
                                    <TextInput
                                        label="Confirm Password"
                                        placeholder="Confirm Password"
                                        secureTextEntry={!passwordVisible}
                                        onBlur={onBlur}
                                        onChangeText={onChange}
                                        value={value}
                                        borderColor="grey"
                                        error={errors.confirmPassword?.message}
                                        icon={passwordVisible ? 'eye-off' : 'eye'}
                                        iconOnPress={() => setPasswordVisible(!passwordVisible)}
                                    />
                                )}
                            />
                        </View>
                    </ScrollView>
                    <TouchableOpacity
                        style={[updatedStyles.nextButton, { backgroundColor: loading ? '#fff' : '#000' }]}
                        onPress={handleSubmit(onSubmit)}
                        disabled={loading}>
                        {loading ? (
                            <ActivityIndicator size="small" color={loading ? '#000' : '#192126'} />
                        ) : (
                            <Text style={updatedStyles.buttonText}>Next</Text>
                        )}
                    </TouchableOpacity>
                </KeyboardAvoidingView>
            </View>
        </>
    );
};

const updatedStyles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'space-between',
        paddingHorizontal: 20,
    },
    scrollContainer: {
        flexGrow: 1,
    },
    topContainer: {
        marginTop: 50,
        alignItems: 'center',
    },
    nextButton: {
        padding: 15,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 30,
        borderWidth: 1,
        borderColor: '#000',
        marginBottom: 20, // Adjust this for better positioning
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
});

export default ResetPassword;
