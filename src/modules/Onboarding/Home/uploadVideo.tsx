import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, Platform } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { launchImageLibrary } from 'react-native-image-picker';
import Video from 'react-native-video';
import CustomButton from '../../../shared/Component/CustomButton';
import CustomHeader from '../../../shared/Component/CustomHeader';
import globalStyles from '../styles';
import { useForm, Controller } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

const schema = yup.object().shape({
  video: yup.string().required('Please upload a video'),
});
import { useLoader } from '../../../config/LoaderContext';
import UploadVideoAPICall from './APICalls/UploadVideoAPI';
import Progress from 'react-native-progress/Bar';
import Loader from '../../../components/Loader';

const UploadVideo: React.FC = (props: any) => {
  const { route, navigation } = props;
  const { control, handleSubmit, formState: { errors }, setValue } = useForm({
    resolver: yupResolver(schema),
  });
  const [videoUri, setVideoUri] = useState<string | null>(null);

  const { loading, setLoading } = useLoader();


  const handleUploadPress = () => {
    const options = {
      mediaType: 'video',
      includeBase64: false,
    };

    launchImageLibrary(options, (response) => {
      if (response.didCancel) {
        console.log('User cancelled video picker');
      } else if (response.errorCode) {
        console.log('ImagePicker Error: ', response.errorMessage);
      } else {
        const uri = response.assets[0].uri;
        setVideoUri(uri);
        setValue('video', uri); // Set the video URI in form state
        console.log('Video URI: ', uri);
      }
    });
  };

  const handleNextPress = () => {
    if (videoUri) {
      setLoading(true);
      const formData = new FormData();
      formData.append('fileName', {
        uri: Platform.OS === 'android' ? videoUri : videoUri.replace('file://', ''),
        name: 'video.mp4',
        type: 'video/mp4'
      });

      UploadVideoAPICall(formData)
        .then(res => {
          console.log("Response", res);

          if (res.status === 200) {
            setLoading(false);
            navigation.navigate('OnboardHome8');
            // Handle success (e.g., navigate to the next screen)
          }
        })
        .catch(error => {
          console.error(error);
          setLoading(false);
        })
        .finally(() => {
          setLoading(false);
        });
    }
  };


  return (
    <View style={globalStyles.container}>
      <CustomHeader onBackPress={navigation.goBack} />
      {loading && (
        <View style={{ alignSelf: 'center', marginTop: hp('1%') }}>
          <Progress
            width={200}
            indeterminate={true}
          />
        </View>
      )}
      <View style={globalStyles.contentContainer}>
        <Text style={globalStyles.title}>
          Upload your golf video to get an analysis 🪪
        </Text>
        <Text style={globalStyles.subTitle}>
          Regulations require you to upload a high-quality video of you playing golf to get an instant analysis. Don't worry, we will guide you through it to show you improvements in game.
        </Text>
        <Controller
          control={control}
          name="video"
          render={({ field: { onChange } }) => (
            <TouchableOpacity
              style={[
                styles.uploadContainer,
                videoUri && styles.uploadContainerWithoutBorder
              ]}
              onPress={handleUploadPress}
            >
              {videoUri ? (
                <Video
                  source={{ uri: videoUri }}
                  style={styles.videoPlayer}
                  controls={true}
                />
              ) : (
                <>
                  <Image source={require('../../../assets/Images/uploadVideo.png')} style={styles.uploadIcon} />
                  <Text style={styles.uploadText}>Browse Gallery</Text>
                </>
              )}
            </TouchableOpacity>
          )}
        />
        {errors.video && <Text style={styles.errorText}>{errors.video.message}</Text>}
      </View>
      <View style={route?.params === 'HomeUpload' ? globalStyles.buttonContainerHome : globalStyles.buttonContainer}>
        <CustomButton title="Next" onPress={handleSubmit(handleNextPress)} />
      </View>
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
});

export default UploadVideo;
