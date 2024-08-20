import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  ImageBackground,
  Image,
  FlatList
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import recommandedStyles from './styles';
import { goBack } from '../../../shared/Utils/navigationRef';
import CustomHeader from '../../../shared/Component/CustomHeader';
import {
  DrillCard,
  HorizontalScroll,
  Section,
  WorkoutCard,
} from '../Home/Common/Common';
import TutorialCard from '../../../shared/Component/TutorialCard/TutorialCard';
import { fetchRecommendedDrills } from '../../../redux/Slices/RecommendedDrillsSlice';
import { RootState, AppDispatch } from 'redux/store';
import { useDispatch, useSelector } from 'react-redux';
import VideoModal from '../../../components/VideoModal';
import { fetchRecommendedWorkouts } from '../../../redux/Slices/RecommendedWorkouts'
import ProgressLoader from '../../../components/ProgressLoader';
import { useIsFocused } from '@react-navigation/native';


const RecommendedView: React.FC = (props: any) => {
  const { route, navigation } = props;
  const focused = useIsFocused();
  const dispatch = useDispatch<AppDispatch>();
  const [selectedTab, setSelectedTab] = useState('All');
  const { tutorials } = useSelector((state: RootState) => state.tutorials);

  const [modalVisible, setModalVisible] = useState(false);
  const [selectedVideo, setSelectedVideo] = useState<{
    uri: string;
    title: string;
  } | null>(null);
  const { drills, drillsLoading, drillsError } = useSelector((state: RootState) => state.recommendedDrills);
  const { workouts, recWorkoutLoading, recWorkoutError } = useSelector(
    (state: RootState) => state.recommendedWorkout,
  );

  useEffect(() => {
    if (focused) {
      dispatch(fetchRecommendedDrills()).unwrap();
      dispatch(fetchRecommendedWorkouts()).unwrap();
    }
  }, [dispatch, focused]);


  const handleVideoPress = (uri: string, title: string) => {
    setSelectedVideo({ uri, title });
    setModalVisible(true);
  };

  if (drillsLoading || recWorkoutLoading) {
    return <ProgressLoader />
  }


  return (
    <View style={recommandedStyles.container}>
      <CustomHeader onBackPress={goBack} title="Recommended" />
      <ScrollView contentContainerStyle={recommandedStyles.scrollViewContent}>
        <View style={recommandedStyles.tabContainer}>
          <HorizontalScroll>
            {['All', 'Exercise', 'Swings', 'Tutorials'].map(tab => (
              <TouchableOpacity
                key={tab}
                style={[
                  recommandedStyles.tab,
                  { backgroundColor: selectedTab === tab ? '#BBF246' : 'white' },
                  { borderColor: selectedTab !== tab ? '#192126' : 'white' },
                ]}
                onPress={() => setSelectedTab(tab)}>
                <Text
                  style={[
                    recommandedStyles.tabText,
                    { color: selectedTab === tab ? '#192126' : '#192126' },
                  ]}>
                  {tab}
                </Text>
              </TouchableOpacity>
            ))}
          </HorizontalScroll>
        </View>


        {/* Recommended Drills */}
        {selectedTab === 'All' ? (
          <Section title="Recommended Swings Drills">
            <FlatList
              data={drills}
              keyExtractor={(item) => item.id.toString()}
              horizontal
              renderItem={({ item }) => (
                <DrillCard
                  title={item.name}
                  description={item.description}
                  navigateTo={{
                    routeName: 'Golf Drill',
                    params: { id: item.id, type: item.name, description: item.description },
                  }}
                />
              )}
            />
          </Section>
        ) : selectedTab === 'Swings' ? (
          <Section title="Recommended Swings Drills">
            <FlatList
              data={drills}
              keyExtractor={(item) => item.id.toString()}
              horizontal
              renderItem={({ item }) => (
                <DrillCard
                  title={item.name}
                  description={item.description}
                  navigateTo={{
                    routeName: 'Golf Drill',
                    params: { id: item.id, type: item.name, description: item.description },
                  }}
                />
              )}
            />
          </Section>
        ) : null}


        {/* Recommended Workouts */}
        {selectedTab === 'All' ? (
          <Section title="Recommended Exercise Drills">
            <FlatList
              horizontal
              showsHorizontalScrollIndicator={false}
              data={workouts}
              keyExtractor={(item) => item.id.toString()}
              renderItem={({ item }) => {
                const completedWorkouts = Object.keys(item.workouts).filter((key) => item.workouts[key]);
                const description = completedWorkouts.join(', ');

                return (
                  <WorkoutCard
                    title={item.type}
                    description={description}
                    progress={`${item.done}/${item.total}`}
                    navigateTo={{ routeName: 'Core Strength', params: { video_id: item.id, type: item.type, category: 'Workout Drills' } }}
                  />
                );
              }}
              contentContainerStyle={{ marginVertical: hp('1%') }}
            />

          </Section>
        ) : selectedTab === 'Exercise' ? (
          <Section title="Recommended Exercise Drills">
            <FlatList
              horizontal
              showsHorizontalScrollIndicator={false}
              data={workouts}
              keyExtractor={(item) => item.id.toString()}
              renderItem={({ item }) => {
                const completedWorkouts = Object.keys(item.workouts).filter((key) => item.workouts[key]);
                const description = completedWorkouts.join(', ');

                return (
                  <WorkoutCard
                    title={item.type}
                    description={description}
                    progress={`${item.done}/${item.total}`}
                    navigateTo={{ routeName: 'Core Strength', params: { video_id: item.id, type: item.type, category: 'Workout Drills' } }}
                  />
                );
              }}
              contentContainerStyle={{ marginVertical: hp('1%') }}
            />

          </Section>
        ) : null}

        {/* Recommended Tutorials */}
        {selectedTab === 'All' || selectedTab === 'Tutorials' ? (
          <Section title="Recommended Tutorials">
            <View style={{ marginLeft: wp('5%') }}>
              <HorizontalScroll>
                {tutorials?.map((item, index) => (
                  <TutorialCard
                    key={index}
                    data={item}
                    onPress={() =>
                      handleVideoPress(item.file_name, item.description, modalVisible)
                    }
                  />
                ))}
              </HorizontalScroll>
            </View>
          </Section>
        ) : null}
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

export default RecommendedView;
