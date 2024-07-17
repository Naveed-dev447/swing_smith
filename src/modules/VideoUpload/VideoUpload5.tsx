import React from 'react';
import { StyleSheet, Text, View, Image, ImageBackground } from 'react-native';
import * as Progress from 'react-native-progress';
import CustomHeader from '../../shared/Component/CustomHeader';
import { goBack } from '../../shared/Utils/navigationRef';
import CustomButton from '../../shared/Component/CustomButton';
import globalStyles from '../Onboarding/styles';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {useSelector} from 'react-redux';
import { RootState } from '../../redux/store';
import { CommonActions } from '@react-navigation/native';




const VideoUpload5: React.FC = (props: any) => {
  const {navigation} = props;
  const {
    skillLevel,
    aspectToImprove,
    coachingLesson,
    equipmentType,
    practiceDuration,
    scoringAverage,
    uploadedVideo,
    dtlSelectedOption,
    videoHandedness,
    selectedEquipment,
    selectedEquipment2,
  } = useSelector((state: RootState) => state.onboarding);
  const handleNavigation = () => {
    navigation.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [
          {
            name: 'BottomTabStack',
            state: {
              routes: [{
                name: 'Home',
                state: {
                  routes: [
                    { name: 'HomeScreen' },
                    { name: 'AnalysisView' },
                  ]
                }
              }]
            }
          }],
      })
    );
    navigation.navigate('Home', { screen: 'AnalysisView' });
  };

  return (
    <View style={styles.container}>
      <CustomHeader onBackPress={goBack} title="Analysing" />
      <View style={styles.progressBarContainer}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <Text style={styles.analyzingScore}>38%</Text>
          <Text style={styles.analyzingText}>Analyzing</Text>
        </View>
        <Progress.Bar
          progress={0.38}
          width={null}
          height={20}
          style={styles.progressBar}
          color="#BBF246"
          unfilledColor="#ffff"
          borderWidth={0.5}
        />
      </View>
      <View style={styles.imageContainer}>
        <Image
          source={require('../../assets/Images/importSwing.png')}
          style={styles.image}
        ></Image>
      </View>
      <View style={styles.tipContainer}>
        <Image
          source={require('../../assets/Images/AnalyzingTip.png')}
          style={styles.tipImage} />
      </View>
      <View style={styles.buttonContainer}>
        <CustomButton
          title="Next"
          onPress={handleNavigation}
        />
      </View>
       {/* <View style={styles.onboardingDataContainer}>
       <Text style={styles.onboardingDataText}>Scoring Average: {scoringAverage}</Text>
       <Text style={styles.onboardingDataText}>Practice Duration: {practiceDuration}</Text>
        <Text style={styles.onboardingDataText}>Skill Level: {skillLevel}</Text>
        <Text style={styles.onboardingDataText}>Aspect to Improve: {aspectToImprove}</Text>
        <Text style={styles.onboardingDataText}>Coaching Lesson: {coachingLesson}</Text>
        <Text style={styles.onboardingDataText}>Equipment Type: {equipmentType}</Text>
        <Text style={styles.onboardingDataText}>Uploaded Video: {uploadedVideo}</Text>
        <Text style={styles.onboardingDataText}>DTL Selected Option: {dtlSelectedOption}</Text>
        <Text style={styles.onboardingDataText}>Video Handedness: {videoHandedness}</Text>
        <Text style={styles.onboardingDataText}>Selected Equipment: {selectedEquipment}</Text>
        <Text style={styles.onboardingDataText}>Selected Equipment 2: {selectedEquipment2}</Text>
      </View> */}
    </View>
  );
};

export default VideoUpload5;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
  },
  progressBarContainer: {
    marginTop: 20,
  },
  analyzingScore: {
    fontSize: 20,
    color: 'black',
    fontFamily: 'Outfit-Regular',
    marginBottom: 10,
  },
  analyzingText: {
    fontSize: 14,
    color: 'black',
  },
  progressBar: {
    borderRadius: wp('5%'),
    marginBottom: 20,
  },
  imageContainer: {
    marginTop: 10,
    // marginBottom: 10,
  },
  image: {
    width: wp('90%'),
    height: hp('23%'),
    borderRadius: wp('2%')
  },
  tipContainer: {
    marginBottom: wp('10%'),
    marginTop: wp('5%'),
    alignItems: 'center',
    marginLeft: wp('3%')
  },
  tipImage: {
    width: wp('93%'),
    height: hp('23%'),
    borderRadius: wp('2%')
  },
  tipOverlay: {
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    padding: 10,
    borderRadius: 10,
  },
  tipTitle: {
    fontSize: 16,
    color: '#fff',
    fontWeight: 'bold',
  },
  tipText: {
    fontSize: 14,
    color: '#fff',
    marginTop: 5,
  },
  buttonContainer: {
    bottom: wp('4%'),
  },
  onboardingDataContainer: {
    marginVertical: 20,
  },
  onboardingDataText: {
    fontSize: 16,
    color: '#192126',
    marginBottom: 5,
    fontFamily: 'Outfit-Regular',
  },
});
