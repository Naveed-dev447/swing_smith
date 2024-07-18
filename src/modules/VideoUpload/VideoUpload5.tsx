import React, { useState } from 'react';
import { StyleSheet, Text, View, Image, ImageBackground, Platform } from 'react-native';
import * as Progress from 'react-native-progress';
import CustomHeader from '../../shared/Component/CustomHeader';
import { goBack } from '../../shared/Utils/navigationRef';
import CustomButton from '../../shared/Component/CustomButton';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {useSelector} from 'react-redux';
import { RootState } from '../../redux/store';
import { CommonActions } from '@react-navigation/native';
 import { useLoader } from '../../config/LoaderContext';
import UploadVideoAPICall from '../Onboarding/Home/APICalls/UploadVideoAPI'
import { ShowToast } from '../../components/ShowToast';
import GetTipAPICall from '../Onboarding/Home/APICalls/TipAPI';
import { ITipsResponse } from 'types/Tips';




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
  const { loading, setLoading } = useLoader();
  const [getTip, setGetTip] = useState<ITipsResponse | null>(null);  

  
  const handleNextPress = async () => {
    if (uploadedVideo) {
      setLoading(true);
      const formData = new FormData();
      formData.append('fileName', {
        uri: Platform.OS === 'android' ? uploadedVideo : uploadedVideo.replace('file://', ''),
        name: 'video.mp4',
        type: 'video/mp4'
      });
  
      try {
        const tipResponse = await GetTipAPICall();
        console.log("Tip Response:", tipResponse);  // Check if this logs the expected data
        setGetTip(tipResponse);
  
        const uploadResponse = await UploadVideoAPICall(formData);
        if (uploadResponse.status === 200) {
          setLoading(false);
          ShowToast('success', uploadResponse.message);
          handleNavigation(tipResponse);  // Ensure data is passed to handleNavigation
        }
      } catch (error) {
        ShowToast('error', 'Request is not Completed, Please try again');
        setLoading(false)
        console.error(error);
      } finally {
        setLoading(false);
      }
    }
  };
  

  React.useEffect(() => {
    handleNextPress();
  }, []);


  const handleNavigation = (data: any) => {
    console.log("Navigating with data:", data);  // Check if data is logged correctly
    
    navigation.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [{ name: 'BottomTabStack' }],
      })
    );
    
    navigation.navigate('Home', {
      screen: 'AnalysisView',
      params: { data }  // Pass the data using params
    });
  };
  


  return (
    <View style={styles.container}>
      <CustomHeader onBackPress={goBack} title="Analysing" />
      {loading && <View style={styles.progressBarContainer}> 
        {/* <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <Text style={styles.analyzingScore}>38%</Text>
          <Text style={styles.analyzingText}>Analyzing</Text>
        </View> */}
         <Progress.Bar
          progress={0.38}
          width={null}
          height={20}
          style={styles.progressBar}
          color="#BBF246"
          indeterminate={true}
          unfilledColor="#ffff"
          borderWidth={0.5}
        /> 
      </View> }
      <View style={styles.imageContainer}>
        <Image
          source={require('../../assets/Images/importSwing.png')}
          style={styles.image}
        ></Image>
      </View>
      // Attay show getTip state messge inside this picture with Text tag
      <View style={styles.tipContainer}>
        <ImageBackground
          source={require('../../assets/Images/AnalyzingTip.png')}
          style={styles.tipImage} >

          </ImageBackground>
      </View>
      {/* <View style={styles.buttonContainer}>
        <CustomButton
          title="Next"
          onPress={handleNavigation}
        />
      </View> */}
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
