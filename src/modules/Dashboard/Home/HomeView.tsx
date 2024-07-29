import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, FlatList, Image, StyleSheet } from 'react-native';
import globalStyles from './styles';
import {
  DrillCard,
  HorizontalScroll,
  Section,
  WorkoutCard,
  Header,
  Banner,
  UploadSwing,
  AnalysisCard,
} from './Common/Common';
import TutorialCard from '../../../shared/Component/TutorialCard/TutorialCard';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../../redux/Store';
import { fetchTutorials } from '../../../redux/Slices/TutorialSlice';
import { fetchProfile } from '../../../redux/Slices/ProfileSlice';
import { fetchRecommendedDrills } from '../../../redux/Slices/RecommendedDrillsSlice';
import { fetchRecentAnalysis } from '../../../redux/Slices/RecentAnalysisSlice';
import { fetchRecommendedWorkouts } from '../../../redux/Slices/RecommendedWorkouts';

import VideoModal from '../../../components/VideoModal';
import ProgressLoader from '../../../components/ProgressLoader';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';


// Define a fallback image URL
const FALLBACK_IMAGE_URL = 'https://example.com/path/to/fallback-image.png'; // URL for remote fallback image
const LOCAL_FALLBACK_IMAGE = require('../../../assets/Images/DashBoard/RecentAna1.png');

const HomeView = (props: any) => {
  const { route, navigation } = props;
  const dispatch = useDispatch<AppDispatch>();
  const [modalVisible, setModalVisible] = useState(false);
  const { tutorials, loading: tutorialsLoading, error: tutorialsError } = useSelector(
    (state: RootState) => state.tutorials,
  );
  const { profiles, profileLoading, profileError } = useSelector(
    (state: RootState) => state.profile,
  );
  const { data: recentAnalysis, analysisloading: recentAnalysisLoading, analysisError } = useSelector(
    (state: RootState) => state.recentAnalysis,
  );
  const { workouts, recWorkoutLoading, recWorkoutError } = useSelector(
    (state: RootState) => state.recommendedWorkout,
  );
  const userName = profiles.length > 0 ? profiles[0].name : 'User';
  const [selectedVideo, setSelectedVideo] = useState<{
    uri: string;
    title: string;
  } | null>(null);

  const { drills, drillsLoading, drillsError } = useSelector((state: RootState) => state.recommendedDrills);


  useEffect(() => {
    dispatch(fetchRecommendedWorkouts()).unwrap();
    dispatch(fetchProfile()).unwrap();
    dispatch(fetchRecommendedDrills()).unwrap();
    dispatch(fetchRecentAnalysis()).unwrap();
    dispatch(fetchTutorials()).unwrap();
  }, [dispatch]);

  const toggleModal = () => {
    setModalVisible(!modalVisible);
  };

  const handleVideoPress = (uri: string, title: string) => {
    setSelectedVideo({ uri, title });
    setModalVisible(true);
  };

  if (tutorialsLoading || profileLoading || recentAnalysisLoading || recWorkoutLoading || drillsLoading) {
    return <ProgressLoader />;
  }

  return (
    <View style={globalStyles.container}>
      <Header toggleModal={toggleModal} name={`Hello, ${userName}`} />
      <ScrollView contentContainerStyle={globalStyles.SwingLogScrollView}>
        <Banner />
        <View style={{ width: '100%' }}>
          <Text style={[globalStyles.sectionTitle, { marginTop: hp('2%') }]}>
            Recent Analysis
          </Text>
          <FlatList
            horizontal
            showsHorizontalScrollIndicator={false}
            data={recentAnalysis}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <AnalysisCard
                score={item.swing_rating.toString()}
                postureScore={item.posture.toString()}
                swingRhythm={item.swing_rhythm.toString()}
                source={require('../../../assets/Images/DashBoard/RecentAna1.png')}
                onPress={() => navigation.navigate('AnalysisView', item.id)}
              />
            )}
            contentContainerStyle={{ marginVertical: hp('1%') }}
          />
        </View>
        <UploadSwing
          onClick={() =>
            navigation.navigate(
              'Onboard',
              { screen: 'OnboardHome12' },
              'HomeUpload',
            )
          }
        />
        <Section title="Recommended Workouts">
          <FlatList
            horizontal
            showsHorizontalScrollIndicator={false}
            data={workouts}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <WorkoutCard
                title={item.type}
                progress={`${item.done}/${item.total}`}
                navigateTo={{ routeName: 'Core Strength', params: { video_id: item.id, type: item.type, category: 'Workout Drills' } }}

              />
            )}
            contentContainerStyle={{ marginVertical: hp('1%') }}
          />
        </Section>
        <Section title="Recommended Drills">
          <FlatList
            data={drills}
            keyExtractor={(item) => item.id.toString()}
            horizontal
            renderItem={({ item }) => (
              <DrillCard
                title={item.name}
                description={item.description}
                navigateTo={{
                  routeName: 'Core Strength', // Adjust route as needed
                  params: { video_id: item.video_id, type: item.name, category: 'Golf Drills' },
                }}
              />
            )}
          />
        </Section>
        <Section title="Recommended Tutorials">
          <HorizontalScroll>
            {tutorials?.map((item, index) => (
              <TutorialCard
                key={index}
                data={item}
                onPress={() =>
                  handleVideoPress(item.file_name, item.description)
                }
              />
            ))}
          </HorizontalScroll>
        </Section>
      </ScrollView>
      {selectedVideo && (
        <VideoModal
          visible={modalVisible}
          onClose={() => setModalVisible(false)}
          videoUri={selectedVideo.uri}
          title={selectedVideo.title}
        />
      )}
    </View>
  );
};


export default HomeView;
