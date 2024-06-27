import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ImageBackground } from 'react-native';
import globalStyles from '../Onboarding/styles';
import CustomHeader from '../../shared/Component/CustomHeader';
import CustomButton from '../../shared/Component/CustomButton';
import { goBack } from '../../shared/Utils/navigationRef';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

const VideoUpload4: React.FC = (props: any) => {
  const { route, navigation } = props;
  const [selectedEquipment, setSelectedEquipment] = useState<string | null>(null);

  const equipmentOptions = [
    { text: 'Full swing', backgroundImage: require('../../assets/Images/Chip.png') },
    { text: 'Pitch', backgroundImage: require('../../assets/Images/pitch.png') },
    { text: 'Chip', backgroundImage: require('../../assets/Images/Chip.png') },
    { text: 'Putt', backgroundImage: require('../../assets/Images/putt.png') },
  ];

  return (
    <View style={globalStyles.container}>
      <CustomHeader onBackPress={goBack} />
      <View style={globalStyles.contentContainer}>
        <Text style={globalStyles.title}>
          What type of swing is in the video?
        </Text>
        <Text style={globalStyles.subTitle}>
          Analyzing video recorded diagonally or from the back may result in lower accuracy
        </Text>
        <View style={styles.equipmentContainer}>
          {equipmentOptions.map((option, index) => (
            <TouchableOpacity
              key={index}
              style={[
                styles.equipmentButton,
                selectedEquipment === option.text && styles.selectedEquipmentButton
              ]}
              onPress={() => setSelectedEquipment(option.text)}
            >
              {selectedEquipment === option.text ? (
                <View style={styles.selectedBackground}>
                  <Text style={styles.selectedEquipmentText}>
                    {option.text}
                  </Text>
                </View>
              ) : (
                <ImageBackground
                  source={option.backgroundImage}
                  style={styles.backgroundImage}
                  imageStyle={{ borderRadius: wp('3%') }}
                >
                </ImageBackground>
              )}
            </TouchableOpacity>
          ))}
        </View>
      </View>
      <View style={globalStyles.buttonContainer}>
        <CustomButton
          title="Next"
          onPress={() => navigation.navigate('OnboardHome11')}
        />
      </View>
    </View>
  );
};

export default VideoUpload4;

const styles = StyleSheet.create({
  equipmentContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginTop: hp('5%'),
  },
  equipmentButton: {
    width: wp('43%'),
    height: hp('15%'),
    borderRadius: wp('3%'),
    overflow: 'hidden',
    marginVertical: hp('1%'),
  },
  selectedEquipmentButton: {
    backgroundColor: '#BBF246',
    justifyContent: 'center',
    alignItems: 'center',
  },
  selectedBackground: {
    width: '100%',
    height: '100%',
    backgroundColor: '#BBF246',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: wp('3%'),
  },
  backgroundImage: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  equipmentText: {
    fontSize: wp('4%'),
    color: '#FFF',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  selectedEquipmentText: {
    fontSize: wp('4%'),
    color: '#000',
    textAlign: 'center',
  },
});
