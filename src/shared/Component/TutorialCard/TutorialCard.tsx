import React, { useState, useRef } from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';
import Video, { VideoRef } from 'react-native-video';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { ITutorial } from '../../../types/Tutorial';
import * as Progress from 'react-native-progress';
import { useNavigation } from '@react-navigation/native';


interface TutorialCardProps {
  key: number;
  data: ITutorial;
  isPlay: boolean,
  onPress: () => void;
  navigateTo: {
    routeName: string;
    params: any;
  };
}

const TutorialCard: React.FC<TutorialCardProps> = ({ key, onPress, isPlay, data, navigateTo }) => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const videoRef = useRef<VideoRef>(null);
  const navigation = useNavigation();
  const handlePress = () => {
    if (navigateTo !== null) {
      navigation.navigate(navigateTo?.routeName, navigateTo.params)
    } else {
      onPress();
    }
  };
  const mainContainerStyle = navigateTo
    ? styles.mainContainer
    : styles.mainContainer2
  return (
    <View style={mainContainerStyle}>
      <TouchableOpacity key={key}
        onPress={handlePress}>
        <View style={styles.videoContainer}>
          <Video
            source={{ uri: data?.file_name || data.fileURL }}
            ref={videoRef}
            style={styles.videoPlayer}
            resizeMode="cover"
            onError={(error) => {
              setIsLoading(false)
              console.error('Video error:', error)
            }}
            onBuffer={({ isBuffering }) => console.log('Buffering:', isBuffering)}
            onLoadStart={() => setIsLoading(true)}
            onReadyForDisplay={() => setIsLoading(false)}
            controls={false}
            paused={!isPlay}
          />
          {isLoading && (
            <View style={{ alignSelf: 'center' }}>
              <Progress.Bar width={200} indeterminate={true} />
            </View>
          )}
          {!isLoading && (
            <>
              <Image
                source={require('../../../assets/Images/play.png')}
                style={styles.playIcon} /><View style={styles.overlayTop}>
                <Text style={styles.tutorialTitleOverlay}>{data?.description}</Text>
              </View><View style={styles.tutorialFooterOverlay}>
                <View style={styles.tutorialDuration}>
                  <Image
                    source={require('../../../assets/Images/clock.png')}
                    style={{
                      width: wp('4%'),
                      height: wp('4%'),
                      marginRight: wp('1%'),
                    }} />
                  <Text style={styles.time}>{data?.duration} sec</Text>
                </View>
              </View>
            </>
          )}
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    marginTop: hp('2%'),
    width: wp('70%'),
    marginLeft: wp('2%'),
    marginRight: 20
  },
  mainContainer2: {
    alignSelf: 'center',
    width: wp('85%')
  },
  videoContainer: {
    borderRadius: wp('2%'),
    overflow: 'hidden',
  },
  videoPlayer: {
    width: wp('85%'),
    height: wp('45%'),
  },
  playIcon: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: [{ translateX: -wp('4%') }, { translateY: -wp('4%') }],
    width: wp('8%'),
    height: wp('8%'),
  },
  overlayTop: {
    position: 'absolute',
    top: 0,
    width: '100%',
    padding: wp('2%'),
  },
  tutorialTitleOverlay: {
    color: '#ffffff',
    fontSize: wp('4%'),
    fontFamily: 'Outfit-Bold',
  },
  tutorialFooterOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: wp('2%'),
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  profileImage: {
    width: wp('8%'),
    height: wp('8%'),
    borderRadius: wp('4%'),
  },
  userName: {
    color: '#ffffff',
    fontSize: wp('4%'),
    fontFamily: 'Outfit-Bold',
    marginLeft: wp('1%'),
  },
  tutorialDuration: {
    fontSize: wp('3.5%'),
    color: '#192126',
    backgroundColor: '#EBEBEB',
    paddingHorizontal: wp('2%'),
    paddingVertical: wp('1%'),
    borderRadius: wp('3%'),
    justifyContent: 'flex-end',
    flexDirection: 'row',
    alignItems: 'center',
  },
  time: {
    color: '#192126',
    fontFamily: 'Outfit-Regular',
  },
  loadingProgressBar: {
    alignSelf: 'center',
    borderColor: '#939393',
    borderWidth: 0.5,
    borderRadius: wp('5%'),
    marginTop: 10,
    marginBottom: 20,
    marginLeft: wp('1%'),
  },
});

export default TutorialCard;
