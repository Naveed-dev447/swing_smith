import React, { useState } from 'react';
import { View, Text } from 'react-native';
import Slider from '@react-native-community/slider';
import CustomHeader from '../../../shared/Component/CustomHeader';
import CustomButton from '../../../shared/Component/CustomButton';
import { useDispatch } from 'react-redux';
import { setPracticeDuration } from '../../../redux/Slices/OnboardingSlice';
import globalStyles from '../styles';
import { goBack } from '../../../shared/Utils/navigationRef';

const GolfDurationView: React.FC = (props: any) => {
  const { route, navigation } = props;

  const dispatch = useDispatch();
  const [score, setScore] = useState(1);

  const handleSliderChange = (value: number) => {
    setScore(value);
    let duration = getDurationLabel(value)
    dispatch(setPracticeDuration(duration));
  };

  const getDurationLabel = (value: number) => {
    switch (value) {
      case 0:
        return 'Less than a year';
      case 1:
        return '1-3 years';
      case 2:
        return '4-6 years';
      case 3:
        return '7+ years';
      default:
        return '';
    }
  };

  return (
    <View style={globalStyles.container}>
      <CustomHeader onBackPress={goBack} />
      <View style={globalStyles.contentContainer}>
        <Text style={globalStyles.title}>How long have you been playing golf?
        </Text>
        <Text style={globalStyles.subTitle}>
          We provide content tailored to your hand orientation.
        </Text>

        <View style={globalStyles.sliderContainer}>
          <Text style={globalStyles.scoreText}>{getDurationLabel(score)}</Text>

          <Slider
            style={globalStyles.slider}
            minimumValue={0}
            maximumValue={3}
            value={score}
            onValueChange={handleSliderChange}
            minimumTrackTintColor="#B2FF59"
            maximumTrackTintColor="#E0E0E0"
            thumbTintColor="#FFFFFF"
            step={1}
          />
        </View>
      </View>
      <View style={globalStyles.buttonContainer}>
        <CustomButton title="Next" onPress={() => navigation.navigate('SwingTimeScreen')} />
      </View>
    </View>
  );
};

export default GolfDurationView;
