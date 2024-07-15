import React, { useState, useRef } from 'react';
import { View, Text, TouchableOpacity, Image, ScrollView } from 'react-native';
import Video from 'react-native-video';
import CustomButton from '../../../shared/Component/CustomButton';
import CustomHeader from '../../../shared/Component/CustomHeader';
import globalStyles from '../../Onboarding/styles';
import styles from './WeightTransferDrillStyles';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { HorizontalScroll, Section } from '../Home/Common/Common';
import TutorialCard from '../../../shared/Component/TutorialCard/TutorialCard';

const tutorialVideos = [
  {
    uri: require('../../../assets/Images/DashBoard/Golf.mp4'),
    title: 'Why you lose Balance in Golf?',
    duration: '4 Min',
    user: 'Raymond Reddington',
    profileImage: require('../../../assets/Images/profilePicture.png'),
  },
  {
    uri: require('../../../assets/Images/DashBoard/Golf.mp4'),
    title: 'How to Improve Your Swing',
    duration: '5 Min',
    user: 'John Doe',
    profileImage: require('../../../assets/Images/profilePicture.png'),
  },
  {
    uri: require('../../../assets/Images/DashBoard/Golf.mp4'),
    title: 'Mastering the Golf Grip',
    duration: '3 Min',
    user: 'Jane Smith',
    profileImage: require('../../../assets/Images/profilePicture.png'),
  },
];

const WeightTransferDrill: React.FC = (props: any) => {
  const { navigation } = props;
  const videoLink = require('../../../assets/Images/DashBoard/Golf.mp4');
  const recommendedVideos = [
    {
      uri: require('../../../assets/Images/DashBoard/Golf.mp4'),
      title: 'Why you loose Balance in Golf?',
      duration: '4 Min',
    },
    {
      uri: require('../../../assets/Images/DashBoard/Golf.mp4'),
      title: 'Perfect your Golf Swing',
      duration: '5 Min',
    },
  ];
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [playingVideoUri, setPlayingVideoUri] = useState<any>(videoLink);
  const videoRefs = useRef<{ [key: string]: Video }>({});

  const handlePlayPausePress = (videoUri: any) => {
    if (playingVideoUri === videoUri) {
      setIsPlaying(!isPlaying);
    } else {
      setPlayingVideoUri(videoUri);
      setIsPlaying(true);
    }
  };

  const handleNextPress = () => {};

  const renderTutorialCard = (
    video: { uri: any; title: string; duration: string },
    index: number,
  ) => (
    <View style={styles.tutorialCard} key={index}>
      <TouchableOpacity
        onPress={() => handlePlayPausePress(video.uri)}
        style={styles.videoWrapper}>
        <Video
          ref={(ref) => {
            if (ref) {
              videoRefs.current[video.uri] = ref;
            }
          }}
          source={video.uri}
          style={styles.videoPlayer}
          paused={playingVideoUri !== video.uri || !isPlaying}
          resizeMode="cover"
        />
        {(playingVideoUri !== video.uri || !isPlaying) && (
          <Image
            source={require('../../../assets/Images/play.png')}
            style={styles.playIcon}
          />
        )}
        <View style={styles.overlayTop}>
          <Text style={styles.tutorialTitleOverlay}>{video.title}</Text>
        </View>
        <View style={styles.tutorialFooterOverlay}>
          <View style={styles.tutorialDuration}>
            <Image
              source={require('../../../assets/Images/clock.png')}
              style={{ width: wp('4%'), height: wp('4%'), marginRight: wp('1%') }}
            />
            <Text style={styles.time}>{video.duration}</Text>
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={globalStyles.container}>
      <CustomHeader
        onBackPress={navigation.goBack}
        title="Weight Transfer Drill"
      />
      <ScrollView contentContainerStyle={styles.scrollContentContainer}>
        <TouchableOpacity
          style={[
            styles.videoContainer,
            playingVideoUri && styles.videoContainerWithoutBorder,
          ]}
          onPress={() => handlePlayPausePress(videoLink)}>
          <TouchableOpacity
            onPress={() => handlePlayPausePress(videoLink)}
            style={styles.videoWrapper}>
            <Video
              ref={(ref) => {
                if (ref) {
                  videoRefs.current[videoLink] = ref;
                }
              }}
              source={videoLink}
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
              <Text style={styles.tutorialTitleOverlay}>
                Why you loose Balance in Golf?
              </Text>
            </View>
            <View style={styles.tutorialFooterOverlay}>
              <View style={styles.tutorialDuration}>
                <Image
                  source={require('../../../assets/Images/clock.png')}
                  style={{
                    width: wp('4%'),
                    height: wp('4%'),
                    marginRight: wp('1%'),
                  }}
                />
                <Text style={styles.time}>4 Min</Text>
              </View>
            </View>
          </TouchableOpacity>
        </TouchableOpacity>
        <View style={styles.instructionContainer}>
          <View style={styles.instructionHeader}>
            <Text style={styles.instructionTitle}>Drill Instructions</Text>
            <Image
              source={require('../../../assets/Images/info.png')}
              style={styles.infoIcon}
            />
          </View>
          <Text style={styles.instructionText}>
            Place a tee behind your left heel (for a right-handed golfer) and
            practice transferring your weight smoothly from your back foot to
            your front foot during your swing.
          </Text>
        </View>
       <Section title="Recommended Tutorials">
          <HorizontalScroll>
            {tutorialVideos.slice(1).map((video, index) => (
              <TutorialCard key={index} video={video} />
            ))}
          </HorizontalScroll>
        </Section>
        <View style={styles.buttonContainer}>
          <CustomButton title="Completed" onPress={handleNextPress} />
        </View>
      </ScrollView>
    </View>
  );
};

export default WeightTransferDrill;
