import React, {useState} from 'react';
import {View, Text} from 'react-native';
import Slider from '@react-native-community/slider';
import CustomHeader from '../../../shared/Component/CustomHeader';
import CustomButton from '../../../shared/Component/CustomButton';

import globalStyles from '../styles';
import {goBack} from '../../../shared/Utils/navigationRef';

const GolfDurationView: React.FC = (props: any) => {
  const {route, navigation} = props;
  const [score, setScore] = useState(80);
    return (
        <View style={globalStyles.container}>
            <CustomHeader onBackPress={goBack} />
            <View style={globalStyles.contentContainer}>
                <Text style={globalStyles.title}>How often do you practise your golf swing?</Text>
                <Text style={globalStyles.subTitle}>
                    We provide content tailored to your hand orientation.
                </Text>
                <View style={globalStyles.sliderContainer}>
                    <Slider
                        style={globalStyles.slider}
                        minimumValue={0}
                        maximumValue={100}
                        value={score}
                        onValueChange={(value) => setScore(value)}
                        minimumTrackTintColor="#00FF00"
                        maximumTrackTintColor="#000000"
                        thumbTintColor="#FFFFFF"
                    />
                    <Text style={globalStyles.scoreText}>{score}</Text>
                </View>
            </View>
            <View style={globalStyles.buttonContainer}>
                <CustomButton title="Next" onPress={() => navigation.navigate('SwingTimeScreen')} />
                  </View>
              </View>
    );
};

export default GolfDurationView;
