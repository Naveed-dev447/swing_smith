import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  ImageBackground,
  Platform,
} from 'react-native';
import * as Progress from 'react-native-progress';
import CustomHeader from '../../shared/Component/CustomHeader';
import { goBack } from '../../shared/Utils/navigationRef';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import { CommonActions } from '@react-navigation/native';
import { useLoader } from '../../config/LoaderContext';
import { ShowToast } from '../../components/ShowToast';
import GetTipAPICall from '../Onboarding/Home/APICalls/TipAPI';
import { ITipsResponse } from 'types/Tips';
import AnalysisVideoAPICall from '../Onboarding/Home/APICalls/AnalyiseVideoAPI';

const VideoUpload5: React.FC = (props: any) => {
  const { navigation } = props;
  const { uploadedVideo } = useSelector((state: RootState) => state.onboarding);
  const { loading, setLoading } = useLoader();
  const [getTip, setGetTip] = useState<ITipsResponse | null>(null);

  const handleNextPress = async () => {
    if (uploadedVideo) {

      setLoading(true);

      const payload = {
        file_name: uploadedVideo.filename,
        mimetype: uploadedVideo.mimetype,
      }
      try {
        const tipResponse = await GetTipAPICall();   
        console.log("Tips API call ", tipResponse);

        setGetTip(tipResponse);


        const uploadResponse = await AnalysisVideoAPICall(payload);

        if (uploadResponse.status === 200) {
          setLoading(false);
          ShowToast('success', uploadResponse.message);
          handleNavigation(uploadResponse.data?.id);
        }
      } catch (error) {
        ShowToast('error', 'Vidoe Analysis failed, Please try again');
        setLoading(false);
        console.error(error);
      } finally {
        setLoading(false);
      }
    }
  };

  useEffect(() => {
    handleNextPress();
  }, []);

  const handleNavigation = (data: any) => {
    console.log('Navigating with data:', data);

    navigation.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [{ name: 'BottomTabStack' }],
      }),
    );

    navigation.navigate('Home', {
      screen: 'AnalysisView',
      params: data,
    });
  };

  return (
    <View style={styles.container}>
      <CustomHeader onBackPress={goBack} title="Analysing" />
      {loading && (
        <View style={styles.progressBarContainer}>
          <Text style={styles.progressText}>Processing your upload. This may take a moment.</Text>
          <Progress.Bar
            width={null}
            height={20}
            style={styles.progressBar}
            color="#BBF246"
            indeterminate={true}
            unfilledColor="#ffff"
            borderWidth={0.5}
          />
        </View>
      )}
      <ImageBackground
        source={require('../../assets/Images/importSwing.png')}
        style={styles.imageContainer}>
        <Image
          source={require('../../assets/Images/importSwing.png')}
          style={styles.image}
        />
      </ImageBackground>
      <ImageBackground
        source={require('../../assets/Images/tipBackgroundImage.png')}
        style={styles.tipContainer}>
        <View style={styles.tipContent}>
          <Image
            source={require('../../assets/Images/blackFlag.png')}
            style={styles.flagIcon}
          />
          <Text style={styles.tipTitle}>Tip</Text>
          <Text style={styles.tipText}>{getTip?.tip}</Text>
        </View>
      </ImageBackground>
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
  progressText: {
    marginTop: 10,
    marginBottom: 10,
    fontSize: 16,
    color: 'black',
    fontFamily: 'Outfit-Regular',
  },
  analyzingScore: {
    fontSize: 20,
    color: 'black',
    fontFamily: 'Outfit-SemiBold',
    marginBottom: 10,
  },
  analyzingText: {
    fontSize: 14,
    color: 'black',
  },
  progressBar: {
    borderColor: '#939393',
    borderWidth: 0.5,
    borderRadius: wp('5%'),
    marginTop: 10,
    marginBottom: 20,
  },
  imageContainer: {
    marginTop: 10,
    width: wp('90%'),
    height: hp('20%'),
    borderRadius: wp('2%'),
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: '100%',
    borderRadius: wp('2%'),
  },
  tipContainer: {
    marginTop: wp('5%'),
    marginLeft: wp('2%'),
    width: '100%',
    height: '60%',
    overflow: 'hidden',
  },
  tipTitle: {
    fontSize: 16,
    fontFamily: 'Outfit-Bold',
    marginBottom: 10,
    color: 'black',
  },
  tipText: {
    paddingHorizontal: 10,
    fontSize: wp('5%'),
    textAlign: 'center',
    color: 'black',
    marginTop: wp('5%'),
    fontFamily: 'Outfit-Regular',
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
  tipContent: {
    marginTop: wp('10%'),
    alignItems: 'center',
  },
  flagIcon: {
    width: 30,
    height: 30,
    marginBottom: 10,
  },
});
