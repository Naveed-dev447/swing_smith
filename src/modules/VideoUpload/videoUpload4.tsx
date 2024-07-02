import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
} from 'react-native';
import globalStyles from '../Onboarding/styles';
import CustomHeader from '../../shared/Component/CustomHeader';
import CustomButton from '../../shared/Component/CustomButton';
import {goBack} from '../../shared/Utils/navigationRef';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

const VideoUpload4: React.FC = (props: any) => {
  const {route, navigation} = props;
  const [selectedEquipment, setSelectedEquipment] = useState<string | null>(
    null,
  );

  const equipmentOptions = [
    {
      text: 'Full swing',
      backgroundImage: require('../../assets/Images/fullSwing.png'),
    },
    {text: 'Pitch', backgroundImage: require('../../assets/Images/pitch.png')},
    {text: 'Chip', backgroundImage: require('../../assets/Images/Chip.png')},
    {text: 'Putt', backgroundImage: require('../../assets/Images/putt.png')},
    
  ];

  return (
    <View style={styles.container}>
      <CustomHeader onBackPress={goBack} />
      <View style={styles.contentContainer}>
        <Text style={styles.title}>What type of swing is in the video?</Text>
        <Text style={styles.subTitle}>
          Analyzing video recorded diagonally or from the back may result in
          lower accuracy
        </Text>
        <View style={styles.equipmentContainer}>
          {equipmentOptions.map((option, index) => (
            <TouchableOpacity
              key={index}
              style={[
                styles.equipmentButton,
                selectedEquipment === option.text &&
                  styles.selectedEquipmentButton,
              ]}
              onPress={() => setSelectedEquipment(option.text)}>
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
                  imageStyle={{borderRadius: wp('3%')}}></ImageBackground>
              )}
            </TouchableOpacity>
          ))}
        </View>
      </View>
      <View style={globalStyles.buttonContainer}>
        <CustomButton
          title="Next"
          onPress={() => navigation.navigate('BottomTabStack')}
        />
      </View>
    </View>
  );
};

export default VideoUpload4;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  contentContainer: {
    flex: 1,
    paddingHorizontal: wp('5%'),
    marginTop: hp('3%'),
  },
  title: {
    color: '#000',
    fontSize: wp('6%'),
    fontWeight: 'bold',
  },
  subTitle: {
    color: '#192126',
    fontSize: wp('4.2%'),
    fontWeight: '400',
    marginTop: hp('1%'),
    marginBottom: hp('3%'),
  },
  equipmentContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginVertical: hp('2%'),
  },
  equipmentButton: {
    width: wp('42%'),
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
