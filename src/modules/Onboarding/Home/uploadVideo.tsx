import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Platform,
  ActivityIndicator,
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {launchImageLibrary} from 'react-native-image-picker';
import Video from 'react-native-video';
import {useDispatch} from 'react-redux';
import {useForm, Controller} from 'react-hook-form';
import * as yup from 'yup';
import {yupResolver} from '@hookform/resolvers/yup';
import CustomButton from '../../../shared/Component/CustomButton';
import CustomHeader from '../../../shared/Component/CustomHeader';
import globalStyles from '../styles';
import {setUploadedVideo} from '../../../redux/Slices/OnboardingSlice';
import {useLoader} from '../../../config/LoaderContext';
import Progress from 'react-native-progress/Bar';
import UploadVideoAPICall from './APICalls/UploadVideoAPI';
import {ShowToast} from '../../../components/ShowToast';

const schema = yup.object().shape({
  video: yup.string().required('Please upload a video'),
});
// const schema = yup.object().shape({
//   video: yup.string().test(
//     'required-if-not-empty',
//     'Please upload a video',
//     (value) => {
//       // Check if the field has a value and ensure it's not empty
//       if (value && value.length > 0) {
//         return true; // Field is valid if it has a value
//       }
//       return true; // Field is valid if it is empty (not required)
//     }
//   ),
// });
interface Video {
  uri: string;
  fileName?: string;
  size?: number;
  type?: string;
}

const UploadVideo: React.FC = (props: any) => {
  const {route, navigation} = props;
  const dispatch = useDispatch();
  const {
    control,
    handleSubmit,
    formState: {errors},
    setValue,
  } = useForm({
    resolver: yupResolver(schema),
  });
  const [videoUri, setVideoUri] = useState<Video | null>(null);
  const {loading, setLoading} = useLoader();

  const handleUploadPress = () => {
    const options = {
      mediaType: 'video',
      includeBase64: false,
    };

    launchImageLibrary(options, response => {
      if (response.didCancel) {
        console.log('User cancelled video picker');
      } else if (response.errorCode) {
        console.log('ImagePicker Error: ', response.errorMessage);
      } else if (response.assets && response.assets.length > 0) {
        const asset = response.assets[0];
        setVideoUri(asset);
        setValue('video', asset.uri);
      }
    });
  };

  const handleNextPress = async () => {
    if (videoUri?.uri) {
      setLoading(true);
      const formData = new FormData();
      formData.append('fileName', {
        uri:
          Platform.OS === 'android'
            ? videoUri.uri
            : videoUri.uri.replace('file://', ''),
        name: videoUri.fileName || 'video.mp4',
        type: videoUri.type || 'video/mp4',
      });

      try {
        const uploadResponse = await UploadVideoAPICall(formData);

        if (uploadResponse.status === 400) {
          dispatch(setUploadedVideo(uploadResponse.data));
          navigation.navigate('OnboardHome8');
          ShowToast('success', uploadResponse.message);
        } else {
          ShowToast('error', 'Video is not uploaded, Please try again');
        }
      } catch (error) {
        ShowToast('error', 'Video is not uploaded, Please try again');
        console.error(error);
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <View style={globalStyles.container}>
      <CustomHeader onBackPress={navigation.goBack} />
      {loading && (
        <View style={{alignSelf: 'center', marginTop: hp('1%')}}>
          <Progress width={200} indeterminate={true} />
        </View>
      )}
      <View style={globalStyles.contentContainer}>
        <Text style={globalStyles.title}>
          Upload your golf video to get an analysis 🪪
        </Text>
        <Text style={globalStyles.subTitle}>
          In order to achieve the best results, please upload high-quality
          videos from either face on or down the line camera angles at chest
          height.
        </Text>
        <Controller
          control={control}
          name="video"
          render={({field: {onChange}}) => (
            <TouchableOpacity
              style={[
                styles.uploadContainer,
                videoUri && styles.uploadContainerWithoutBorder,
              ]}
              onPress={handleUploadPress}>
              {videoUri ? (
                <Video
                  source={{uri: videoUri.uri}}
                  style={styles.videoPlayer}
                  controls={true}
                />
              ) : (
                <>
                  <Image
                    source={require('../../../assets/Images/uploadVideo.png')}
                    style={styles.uploadIcon}
                  />
                  <Text style={styles.uploadText}>Browse Gallery</Text>
                </>
              )}
            </TouchableOpacity>
          )}
        />
        {errors.video && (
          <Text style={styles.errorText}>{errors.video.message}</Text>
        )}
      </View>
      <View
        style={
          route?.params === 'HomeUpload'
            ? globalStyles.buttonContainerHome
            : globalStyles.buttonContainer
        }>
        <CustomButton
          title="Next"
          disabled={loading}
          loading={loading}
          onPress={handleSubmit(handleNextPress)}
        />
      </View>
      {/* <View
        style={
          route?.params === 'HomeUpload'
            ? globalStyles.buttonContainerHome
            : globalStyles.buttonContainer
        }>
        <TouchableOpacity
          style={[
            styles.nextButton,
            {
              backgroundColor: loading ? '#fff' : '#000',
              borderColor: loading ? '#000' : 'transparent',
              borderWidth: 1,
            },
          ]}
          onPress={handleSubmit(handleNextPress)}
          disabled={loading}>
          {loading ? (
            <ActivityIndicator
              size="small"
              color={loading ? '#000' : '#192126'}
            />
          ) : (
            <Text style={styles.nextButtonText}>Next</Text>
          )}
        </TouchableOpacity>
      </View> */}
    </View>
  );
};

const styles = StyleSheet.create({
  uploadContainer: {
    width: wp('90%'),
    height: hp('25%'),
    borderWidth: 2,
    borderColor: '#B2FF59',
    borderRadius: wp('5%'),
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F8F8F8',
    marginBottom: hp('5%'),
    paddingHorizontal: 2,
  },
  uploadContainerWithoutBorder: {
    borderWidth: 0,
  },
  uploadIcon: {
    width: wp('10%'),
    height: wp('10%'),
    resizeMode: 'contain',
    marginBottom: hp('1%'),
  },
  uploadText: {
    fontSize: wp('4%'),
    fontFamily: 'Outfit-Regular',
    color: '#9E9E9E',
  },
  videoPlayer: {
    width: '100%',
    height: '100%',
  },
  errorText: {
    fontFamily: 'Poppins-Regular',
    color: 'red',
    fontSize: wp('3%'),
    textAlign: 'center',
    marginTop: hp('1%'),
  },
  nextButton: {
    borderRadius: 25,
    paddingVertical: hp('1.5%'),
    width: wp('80%'),
    alignItems: 'center',
    backgroundColor: '#000',
    marginBottom: hp('1%'),
  },
  nextButtonText: {
    fontFamily: 'Outfit-Medium',
    color: '#FFFFFF',
    fontSize: hp('2%'),
  },
});

export default UploadVideo;
