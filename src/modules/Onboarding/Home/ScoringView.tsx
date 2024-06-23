// App.tsx
import React, { useState } from 'react';
import { View, Text } from 'react-native';
import Slider from '@react-native-community/slider';
import CustomHeader from '../../../shared/Component/CustomHeader';
import CustomButton from '../../../shared/Component/CustomButton';

import globalStyles from '../styles';
import { goBack } from '../../../shared/Utils/navigationRef';

const ScoringView: React.FC = (props: any) => {
    const {route, navigation} = props
    const [score, setScore] = useState(80);

    return (
        <View style={globalStyles.container}>
            <CustomHeader onBackPress={navigation.goBack} />
            <View style={globalStyles.contentContainer}>
                <Text style={globalStyles.title}>What's your scoring average?</Text>
                <Text style={globalStyles.subTitle}>
                    We provide content tailored to your hand orientation.
                </Text>
                <View style={globalStyles.sliderContainer}>
                    <Text style={globalStyles.scoreText}>{score}</Text>
                    <Slider
                        style={globalStyles.slider}
                        minimumValue={0}
                        maximumValue={100}
                        value={score}
                        onValueChange={(value) => setScore(value)}
                        minimumTrackTintColor="#B2FF59"
                        maximumTrackTintColor="#E0E0E0"
                        thumbTintColor="#FFFFFF"
                        step={1}
                    />
                </View>
            </View>
            <View style={globalStyles.buttonContainer}>
                <CustomButton title="Next" onPress={() => navigation.navigate('OnboardHome2')} />
            </View>
        </View>
    );
};

export default ScoringView;
