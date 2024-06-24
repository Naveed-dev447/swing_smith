import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import CustomHeader from '../../../shared/Component/CustomHeader';
import CustomButton from '../../../shared/Component/CustomButton';
import globalStyles from '../styles';
import { goBack } from '../../../shared/Utils/navigationRef';
import SelectedTouchableButton from '../../../assets/components/SelectedTouchableButton';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

const GameImproveView: React.FC = (props: any) => {
  const { route, navigation } = props;
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
          Analyzing video recorded diagonally or from the back may result in
          lower accuracy
        </Text>
        <View style={styles.aspectContainer}>
          {aspects.map((aspect, index) => (
            <SelectedTouchableButton
              key={index}
              text={aspect}
              isSelected={selectedAspect === aspect}
              onPress={() => setSelectedAspect(aspect)}
              fullWidth={index === aspects.length - 1} 
            />
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

const styles = StyleSheet.create({
  aspectContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginTop: hp('5%'),
  },
});
