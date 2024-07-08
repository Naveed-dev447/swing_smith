import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { launchImageLibrary } from 'react-native-image-picker';
import Video from 'react-native-video';
import CustomButton from '../../../shared/Component/CustomButton';
import CustomHeader from '../../../shared/Component/CustomHeader';
import globalStyles from '../styles';

const UploadVideo: React.FC = (props: any) => {
  const { route, navigation } = props;
  const [videoUri, setVideoUri] = useState<string | null>(null);

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
        console.log('Video URI: ', uri);
      }
    });
  };

  const handleNextPress = () => {
    navigation.navigate('OnboardHome8');
  };

  return (
    <View style={globalStyles.container}>
      <CustomHeader onBackPress={navigation.goBack} />
      <View style={globalStyles.contentContainer}>
        <Text style={globalStyles.title}>
          Upload your golf video to get an analysis 🪪
        </Text>
        <Text style={globalStyles.subTitle}>
          Regulations require you to upload a high-quality video of you playing golf to get an instant analysis. Don't worry, we will guide you through it to show you improvements in game.
        </Text>
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
      </View>
      <View style={globalStyles.buttonContainer}>
        <CustomButton title="Next" onPress={handleNextPress} />
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
    color: '#666666',
  },
  videoPlayer: {
    width: '100%',
    height: '100%',
  },
});

export default UploadVideo;