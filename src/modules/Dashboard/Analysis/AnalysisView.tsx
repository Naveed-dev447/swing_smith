import React from 'react';
import { ScrollView, View, Text, Image } from 'react-native';
import { styles } from './AnalysingScreenStyle';
import CustomHeader from '../../../shared/Component/CustomHeader';
import {
  DrillCard,
  HorizontalScroll,
  Section,
  // TutorialCard,
  WorkoutCard,
  Header,
  Banner,
  RecentAnalysis,
  UploadSwing,
  AnalysisCard,
} from '../../Dashboard/Home/Common/Common';
import TutorialCard from '../../../shared/Component/TutorialCard/TutorialCard';
const workoutImage = require('../../../assets/Images/swingAnalysis.png');
const profileImage = require('../../../assets/Images/profilePicture.png');
const flagImage = require('../../../assets/Images/flag.png');
const ruler = require('../../../assets/Images/ruler.png');
const wind = require('../../../assets/Images/fast-wind.png');

const tutorialVideos = [
  {
    uri: require('../../../assets/Images//DashBoard/Golf.mp4'),
    title: 'Why you lose Balance in Golf?',
    duration: '4 Min',
    user: 'Raymond Reddington',
    profileImage: profileImage,
  },
  {
    uri: require('../../../assets/Images//DashBoard/Golf.mp4'),
    title: 'How to Improve Your Swing',
    duration: '5 Min',
    user: 'John Doe',
    profileImage: profileImage,
  },
  {
    uri: require('../../../assets/Images//DashBoard/Golf.mp4'),
    title: 'Mastering the Golf Grip',
    duration: '3 Min',
    user: 'Jane Smith',
    profileImage: profileImage,
  },
];

const AnalysisView: React.FC = (props: any) => {
  const { navigation } = props;
  return (
    <View style={styles.container}>
      <CustomHeader onBackPress={navigation.goBack} title="Swing Analysis" />
      <ScrollView style={{ flex: 1, paddingBottom: 70, marginTop: 30 }}>
        <Image source={workoutImage} style={styles.image} />
        <View style={styles.analysisCardContainer}>
          <Image source={profileImage} style={styles.profileImage} />
          <View style={styles.userInfo}>
            <Text style={styles.userName}>Nora Achoia</Text>
            <Text style={styles.userSkill}>DTF/Iron/Right Handed</Text>
          </View>
          <View style={styles.scoreContainer}>
            <Image source={flagImage} style={styles.flagImage} />
            <Text style={styles.scoreText}>06</Text>
            <Text style={styles.scoreLabel}>SCORE</Text>
          </View>
        </View>
        <View style={styles.scoreCardContainer}>
          <View style={styles.scoreCard}>
            <Text style={styles.scoreCardText}>Posture Score</Text>
            <Image source={ruler} style={styles.scoreCardIcon} />
            <Text style={styles.scoreCardValue}>7.2/10</Text>
          </View>
          <View style={styles.scoreCard}>
            <Text style={styles.scoreCardText}>Swing Rhythm</Text>
            <Image source={wind} style={styles.scoreCardIcon} />
            <Text style={styles.scoreCardValue}>7.2/10</Text>
          </View>
        </View>
        <View style={styles.instructionContainer}>
          <View style={styles.instructionHeader}>
            <Text style={styles.instructionTitle}>Swing Analysis</Text>
            <Image
              source={require('../../../assets/Images/info.png')}
              style={styles.infoIcon}
            />
          </View>
          <Text style={styles.subInstructionText}>
            There are some good fundamentals, but there's a lot of room for
            improvement.
          </Text>
          <Text style={styles.instructionText}>
            <Text style={styles.subTitle}>Set-up:</Text> Your setup looks fairly
            balanced, but you appear to be slightly leaning back, which can
            affect your weight transfer and power. {'\n\n'}
            <Text style={styles.subTitle}>Backswing:</Text> Your backswing is a
            bit too upright, with your arms getting a little close to your body.
            This can lead to a loss of power and potential for hitting the ball
            off the toe of the club.
            {'\n\n'}
            <Text style={styles.subTitle}> Downswing:</Text> Your downswing
            starts a bit early, and you're not fully rotating your hips through
            the shot. This can cause you to hit the ball thin or off-centre.{' '}
            {'\n\n'}
            <Text style={styles.subTitle}> Impact:</Text> You're not keeping
            your head still and are looking up too early, which is affecting
            your consistency. {'\n\n'}
            <Text style={styles.subTitle}>Finish:</Text> Your finish is upright
            and not fully extended, which indicates a loss of power and control.{' '}
            {'\n\n'}
          </Text>
        </View>
        <View style={styles.workOutContainer}>
          <Section title="Recommended Workouts">
            <HorizontalScroll>
              <WorkoutCard
                title="Core Strength"
                progress="02/10"
                description="Plank Variations, Side Planks, Russian Twists, and Medicine Ball Throws can i."
                score="7.2/10"
              />
              <WorkoutCard
                title="Core Strength"
                progress="02/10"
                description="Plank Variations, Side Planks, Russian Twists, and Medicine Ball Throws can i."
                score="7.2/10"
              />
              <WorkoutCard
                title="Core Strength"
                progress="02/10"
                description="Plank Variations, Side Planks, Russian Twists, and Medicine Ball Throws can i."
                score="7.2/10"
              />
            </HorizontalScroll>
          </Section>
        </View>
        <View style={styles.workOutContainer}>
          <Section title="Recommended Drills">
            <HorizontalScroll>
              <DrillCard title="Core Strength" />
              <DrillCard title="Core Strength" />
              <DrillCard title="Core Strength" />
            </HorizontalScroll>
          </Section>
        </View>
        <View style={styles.workOutContainer}>
          <Section title="Recommended Tutorials">
            <HorizontalScroll>
              {tutorialVideos.map((video, index) => (
                <TutorialCard key={index} video={video} />
              ))}
            </HorizontalScroll>
          </Section>
        </View>
      </ScrollView>
    </View>
  );
};

export default AnalysisView;
