import React, {useState} from 'react';
import {View, Text, ScrollView, TouchableOpacity} from 'react-native';
import Modal from 'react-native-modal';
import globalStyles from './styles';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {
  ChallengeCard,
  DrillCard,
  HorizontalScroll,
  Section,
  TutorialCard,
  WorkoutCard,
  Header,
  Banner,
  RecentAnalysis,
  UploadSwing,
  AnalysisCard,
} from './Common/Common';
import FilterModal from '../Home/Common/FilterModal';

const HomeView = (props: any) => {
  const {route, navigation} = props;
  const [modalVisible, setModalVisible] = useState(false);

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
          <Text style={[globalStyles.sectionTitle, {marginTop: hp('2%')}]}>
            Recent Analysis
          </Text>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={{marginVertical: hp('2%')}}>
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
        <UploadSwing />

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
            <TutorialCard
              title="Why you lose Balance in Golf?"
              duration="4 Min"
            />
            <TutorialCard
              title="Why you lose Balance in Golf?"
              duration="4 Min"
            />
          </HorizontalScroll>
        </Section>

        <Section title="Your Challenges (Optional)">
          <HorizontalScroll>
            <ChallengeCard title="Challenge" icon="flag" />
            <ChallengeCard title="Challenge" icon="golf" />
            <ChallengeCard title="Challenge" icon="bag-suitcase" />
          </HorizontalScroll>
        </Section>
      </ScrollView>
    </View>
  );
};

export default HomeView;
