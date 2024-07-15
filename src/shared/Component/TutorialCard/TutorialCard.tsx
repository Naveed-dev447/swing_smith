import React, {useState} from 'react';
import {View, Text, TouchableOpacity, Image, StyleSheet} from 'react-native';
import Video from 'react-native-video';
import {widthPercentageToDP as wp} from 'react-native-responsive-screen';

type VideoType = {
  uri: any;
  title: string;
  duration: string;
  user: string;
  profileImage: any;
};

interface TutorialCardProps {
  video: VideoType;
}

const TutorialCard: React.FC<TutorialCardProps> = ({video}) => {
  const [isPlaying, setIsPlaying] = useState(false);

  const handlePlayPausePress = () => {
    setIsPlaying(prevIsPlaying => !prevIsPlaying);
  };

  return (
    <View style={styles.tutorialCard}>
      <TouchableOpacity
        onPress={handlePlayPausePress}
        style={styles.videoWrapper}>
        <View style={styles.videoContainer}>
          <Video
            source={video.uri}
            style={styles.videoPlayer}
            paused={!isPlaying}
            resizeMode="cover"
          />
          {!isPlaying && (
            <Image
              source={require('../../../assets/Images/play.png')}
              style={styles.playIcon}
            />
          )}
          <View style={styles.overlayTop}>
            <Text style={styles.tutorialTitleOverlay}>{video.title}</Text>
          </View>
          <View style={styles.tutorialFooterOverlay}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Image source={video.profileImage} style={styles.profileImage} />
              <Text style={styles.userName}>{video.user}</Text>
            </View>
            <View style={styles.tutorialDuration}>
              <Image
                source={require('../../../assets/Images/clock.png')}
                style={{
                  width: wp('4%'),
                  height: wp('4%'),
                  marginRight: wp('1%'),
                }}
              />
              <Text style={styles.time}>{video.duration}</Text>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  tutorialCard: {
    marginRight: wp('2%'),
  },
  videoWrapper: {
    position: 'relative',
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
    transform: [{translateX: -wp('4%')}, {translateY: -wp('4%')}],
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
    justifyContent: 'space-between',
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
    flexDirection: 'row',
    alignItems: 'center',
  },
  time: {
    color: '#192126',
    fontFamily: 'Outfit-Regular',
  },
});

export default TutorialCard;
