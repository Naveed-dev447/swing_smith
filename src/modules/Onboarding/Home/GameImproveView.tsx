import React, {useState} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import CustomHeader from '../../../shared/Component/CustomHeader';
import CustomButton from '../../../shared/Component/CustomButton';
import globalStyles from '../styles';
import {goBack} from '../../../shared/Utils/navigationRef';

const GameImproveView: React.FC = (props: any) => {
  const {route, navigation} = props;
  const [selectedAspect, setSelectedAspect] = useState<string | null>(null);

  const aspects = ['Driving', 'Iron play', 'Putting', 'Short game', 'Course management'];

  return (
    <View style={globalStyles.container}>
      <CustomHeader onBackPress={goBack} />
      <View style={globalStyles.contentContainer}>
        <Text style={globalStyles.title}>
          What aspect of your game do you want to improve the most?
        </Text>
        <Text style={globalStyles.subTitle}>
          Analyzing video recorder diagonally or from the back may result in
          lower accuracy
        </Text>
        <View style={globalStyles.levelContainer}>
          {aspects.map((aspect, index) => (
            <TouchableOpacity
              key={index}
              style={[
                globalStyles.levelButton,
                selectedAspect === aspect && globalStyles.selectedLevelButton
              ]}
              onPress={() => setSelectedAspect(aspect)}
            >
              <Text
                style={[
                  globalStyles.levelText,
                  selectedAspect === aspect && globalStyles.selectedLevelText
                ]}
              >
                {aspect}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
      <View style={globalStyles.buttonContainer}>
        <CustomButton
          title="Next"
          onPress={() => navigation.navigate('OnboardHome5')}
        />
      </View>
    </View>
  );
};

export default GameImproveView;
