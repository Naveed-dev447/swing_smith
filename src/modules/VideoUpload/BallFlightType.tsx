import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import CustomHeader from '../../shared/Component/CustomHeader';
import { goBack } from '../../shared/Utils/navigationRef';
import globalStyles from '../Onboarding/styles';
import CustomButton from '../../shared/Component/CustomButton';
import SelectedTouchableButton from '../../components/SelectedTouchableButton';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

const schema = yup.object().shape({
    ballType: yup.string().required('Please select a Ball flight'),
});

const BallFlightTypes = (props: any) => {
    const { navigation, route } = props;
    const {
        control,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(schema),
    });

    const [selectedLevel, setSelectedLevel] = useState<string | null>(null);

    const levels = ['Push', 'Pull', 'Slice', 'Hook', 'Fade', 'Draw', 'Straight'];

    let data = {
        "contact": route.params,
        "ball_flight": selectedLevel,
    };

    const onSubmit = () => {
        navigation.navigate('OnboardHome13', data);
    };

    return (
        <View style={globalStyles.container}>
            <CustomHeader onBackPress={goBack} />
            <View style={globalStyles.contentContainer}>
                <Text style={globalStyles.title}>
                    What is your current Ball flight?
                </Text>
                <Text style={globalStyles.subTitle}>
                    Analyzing video recorded diagonally or from the back may result in
                    lower accuracy
                </Text>
                <Controller
                    control={control}
                    name="ballType"
                    render={({ field: { onChange } }) => (
                        <FlatList
                            data={levels}
                            numColumns={2}
                            contentContainerStyle={styles.levelContainer}
                            keyExtractor={(item) => item}
                            renderItem={({ item }) => (
                                <SelectedTouchableButton
                                    text={item}
                                    isSelected={selectedLevel === item}
                                    onPress={() => {
                                        setSelectedLevel(item);
                                        onChange(item);
                                    }}
                                />
                            )}
                        />
                    )}
                />
                {errors.ballType && (
                    <Text style={styles.errorText}>{errors.ballType.message}</Text>
                )}
            </View>
            <View style={globalStyles.buttonContainer}>
                <CustomButton title="Next" onPress={handleSubmit(onSubmit)} />
            </View>
        </View>
    );
};

export default BallFlightTypes;

const styles = StyleSheet.create({
    levelContainer: {
        alignItems: 'center',
        justifyContent: 'space-between',
        marginTop: hp('5%'),
        paddingBottom: hp('10%')
    },
    errorText: {
        color: 'red',
        fontSize: wp('3%'),
        textAlign: 'center',
        marginTop: hp('1%'),
    },
});
