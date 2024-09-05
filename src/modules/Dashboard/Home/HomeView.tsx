import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, FlatList, Image, StyleSheet } from 'react-native';
import globalStyles from './styles';
import {
  HorizontalScroll,
  Section,
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
import { useIsFocused } from '@react-navigation/native';
import { DrillCard } from './Common/DrillCard';
import { WorkoutCard } from '../Home/Common/WorkOutCards';


// Define a fallback image URL
const FALLBACK_IMAGE_URL = 'https://example.com/path/to/fallback-image.png'; // URL for remote fallback image
const LOCAL_FALLBACK_IMAGE = require('../../../assets/Images/DashBoard/RecentAna1.png');

const HomeView = (props: any) => {
  const { route, navigation } = props;
  const dispatch = useDispatch<AppDispatch>();
  const focused = useIsFocused();
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedVideo, setSelectedVideo] = useState<{
    uri: string;
    title: string;
  } | null>(null);
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

  const { drills, drillsLoading, drillsError } = useSelector((state: RootState) => state.recommendedDrills);


  useEffect(() => {
    if (focused) {
      dispatch(fetchRecommendedWorkouts()).unwrap();
      dispatch(fetchProfile()).unwrap();
      dispatch(fetchRecommendedDrills()).unwrap();
      dispatch(fetchRecentAnalysis()).unwrap();
      dispatch(fetchTutorials()).unwrap();
    }
  }, [dispatch, focused]);

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
  // if (tutorialsError || profileError || analysisError || recWorkoutError || drillsError) {
  //   console.error({ tutorialsError, profileError, analysisError, recWorkoutError, drillsError });
  // }

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
                score={item.swing_rating?.toString()}
                postureScore={""}
                swingRhythm={""}
                source={require('../../../assets/Images/DashBoard/RecentAna1.png')}
                onPress={() => navigation.navigate('AnalysisView', item)}
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
      <Section title="Recommended Swing Drills">
          <FlatList
            data={drills}
            horizontal
            showsHorizontalScrollIndicator={false}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <DrillCard
                key={item.id}
                title={item.name}
                description={item.description}
                navigateTo={{
                  routeName: 'Golf Drill',
                  params: {
                    id: item.id,
                    type: item.name,
                    description: item.description,
                    title: item.name,
                    file_name: item.file_url,
                    screen: 'drill',
                    status: item.status,
                    file_name: item.file_url,
                    duration: item.duration || '',
                  }
                }}
                url={item.file_url}
              />
            )}
            contentContainerStyle={styles.flatListContent}
          />
        </Section>
        <Section title="Recommended Exercise Drills">
          <FlatList
            data={workouts}
            horizontal
            showsHorizontalScrollIndicator={false}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item, index }) => {
              return (
                <TutorialCard
                  key={index}
                  data={item}
                  onPress={() => console.log("Test")}
                  navigateTo={{
                    routeName: 'Golf Drill',
                    params: {
                      id: item.id,
                      type: item.drill_name || item.name,
                      description: item.description || '',
                      title: item?.title,
                      status: item.status,
                      screen: 'workout',
                      file_name: item.file_name,
                      duration: item.duration || '',
                    },
                  }} isPlay={false} />
              );
            }}
            contentContainerStyle={{ marginVertical: hp('1%') }}
          />
        </Section>
        <Section title="Recommended Tutorials">
          <FlatList
            data={tutorials}
            horizontal
            showsHorizontalScrollIndicator={false}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item, index }) => (
              <TutorialCard
                key={index}
                data={item}
                onPress={() => console.log("Test")}
                navigateTo={{
                  routeName: 'Golf Drill',
                  params: {
                    id: item.id,
                    type: item.drill_name || item.name,
                    description: item.description || '',
                    title: item.title,
                    status: item.status,
                    file_name: item.file_name,
                    duration: item.duration || '',
                  },
                }} isPlay={false}
              />
            )}
          />
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
const styles = StyleSheet.create({
  sectionContainer: {
    width: '100%',
  },
  flatListContent: {
    marginVertical: hp('1%'),
  },
});
