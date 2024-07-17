import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import globalStyles from './styles';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {
  DrillCard, HorizontalScroll, Section, WorkoutCard, Header,
  Banner, UploadSwing, AnalysisCard
} from './Common/Common';
import TutorialCard from '../../../shared/Component/TutorialCard/TutorialCard';
import { ChallengeCard } from './Common/ChallengeCard';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../redux/Store';


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

const HomeView = (props: any) => {
  const { route, navigation } = props;
  const [modalVisible, setModalVisible] = useState(false);
  const { tutorials, loading, error } = useSelector((state: RootState) => state.tutorials);
  console.log("Videos ", tutorials);


  const toggleModal = () => {
    setModalVisible(!modalVisible);
  };

  return (
    <View style={globalStyles.container}>
      <Header
        toggleModal={toggleModal}
        name={'Hello, Dilshan'}
        address={'Kandy, Sri Lanka'}
      />
      <ScrollView contentContainerStyle={globalStyles.SwingLogScrollView}>
        <Banner />
        <View>
          <Text style={[globalStyles.sectionTitle, { marginTop: hp('2%') }]}>
            Recent Analysis
          </Text>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={{ marginVertical: hp('2%') }}>
            <AnalysisCard
              score="7.2"
              postureScore="8.4"
              swingRhythm="6.0"
              source={require('../../../assets/Images/DashBoard/RecentAna1.png')} // Adjust the path as necessary
              onPress={() => navigation.navigate('SwingLog')}
            />
            <AnalysisCard
              score="6.2"
              postureScore="8.4"
              swingRhythm="6.0"
              source={require('../../../assets/Images/DashBoard/RecentAna2.png')} // Adjust the path as necessary
              onPress={() => navigation.navigate('SwingLog')}
            />
          </ScrollView>
        </View>
        <UploadSwing onClick={() => navigation.navigate('Onboard', { screen: 'OnboardHome12' }, 'HomeUpload')} />

        <Section title="Recommended Workouts">
          <HorizontalScroll>
            <WorkoutCard title="Core Strength" progress="02/10" />
            <WorkoutCard title="Core Strength" progress="02/10" />
            <WorkoutCard title="Core Strength" progress="02/10" />
          </HorizontalScroll>
        </Section>

        <Section title="Recommended Drills">
          <HorizontalScroll>
            <DrillCard title="Core Strength" />
            <DrillCard title="Core Strength" />
            <DrillCard title="Core Strength" />
          </HorizontalScroll>
        </Section>

        <Section title="Recommended Tutorials">
          <HorizontalScroll>
            {tutorialVideos.map((video, index) => (
              <TutorialCard key={index} video={video} />
            ))}
          </HorizontalScroll>
        </Section>

        <Section title="Your Challenges (Optional)">
          <HorizontalScroll>
            <ChallengeCard
              title="01 Challenge"
              imageSource={require('../../../assets/Images/DashBoard/Flag.png')}
              backgroundColor="#d0f456"
              textColor="#000"
            />
            <ChallengeCard
              title="02 Challenge"
              imageSource={require('../../../assets/Images/DashBoard/goldhandle.png')}
              backgroundColor="#1c1c1c"
              textColor="#fff"
            />
            <ChallengeCard
              title="03 Challenge"
              imageSource={require('../../../assets/Images/DashBoard/challenge3.png')}
              backgroundColor="#ffffff"
              textColor="#000"
            />
          </HorizontalScroll>
        </Section>
      </ScrollView>
    </View>
  );
};

export default HomeView;
