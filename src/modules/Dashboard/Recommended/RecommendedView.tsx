import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  FlatList
} from 'react-native';
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
import { fetchRecommendedDrills } from '../../../redux/Slices/RecommendedDrillsSlice';
import { RootState, AppDispatch } from 'redux/store';
import { useDispatch, useSelector } from 'react-redux';
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
          drills.length > 1 &&
          <Section title="Recommended Swings Drills">
            <FlatList
              data={drills}
              keyExtractor={(item) => item.id.toString()}
              horizontal
              renderItem={({ item, index }) => (
                <DrillCard
                  key={index}
                  title={item.name}
                  description={item.description}
                  navigateTo={{
                    routeName: 'Golf Drill',
                    params: {
                      id: item.id,
                      type: item.drill_name || item.name,
                      description: item.description || '',
                      title: item?.title,
                      file_name: item.file_url,
                      screen: 'drill',
                      status: item.status,
                      duration: item.duration || '',
                    },
                  }} />
              )}
            />
          </Section>
        ) : selectedTab === 'Swings' ? (
          drills.length > 1 ?
            <Section title="Recommended Swings Drills">
              <FlatList
                data={drills}
                keyExtractor={(item) => item.id.toString()}
                horizontal
                renderItem={({ item, index }) => (
                  <DrillCard
                    key={index}
                    title={item.name}
                    description={item.description}
                    navigateTo={{
                      routeName: 'Golf Drill',
                      params: {
                        id: item.id,
                        type: item.drill_name || item.name,
                        description: item.description || '',
                        title: item?.title,
                        file_name: item.file_url,
                        screen: 'drill',
                        status: item.status,
                        duration: item.duration || '',
                      },
                    }} />
                )}
              />
            </Section>
            : <Text style={recommandedStyles.noDataText}>No data available for this category.</Text>) : null}


        {/* Recommended Workouts */}
        {selectedTab === 'All' ? (
          workouts.length > 1 &&
          <Section title="Recommended Exercise Drills">
            <FlatList
              horizontal
              showsHorizontalScrollIndicator={false}
              data={workouts}
              keyExtractor={(item) => item.id.toString()}
              renderItem={({ item, index }) => (
                <WorkoutCard
                  key={index}
                  title={item.name}
                  description={item.description}
                  navigateTo={{
                    routeName: 'Golf Drill',
                    params: {
                      id: item.id,
                      type: item.drill_name || item.name,
                      description: item.description || '',
                      title: item?.title,
                      file_name: item.file_url,
                      screen: 'workout',
                      status: item.status,
                      duration: item.duration || '',
                    },
                  }} />
              )}
              contentContainerStyle={{ marginVertical: hp('1%') }}
            />

          </Section>
        ) : selectedTab === 'Exercise' ? (
          workouts.length > 1 ?
            <Section title="Recommended Exercise Drills">
              <FlatList
                horizontal
                showsHorizontalScrollIndicator={false}
                data={workouts}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item, index }) => (
                  <WorkoutCard
                    key={index}
                    title={item.name}
                    description={item.description}
                    navigateTo={{
                      routeName: 'Golf Drill',
                      params: {
                        id: item.id,
                        type: item.drill_name || item.name,
                        description: item.description || '',
                        title: item?.title,
                        file_name: item.file_url,
                        screen: 'workout',
                        status: item.status,
                        duration: item.duration || '',
                      },
                    }} />
                )}
                contentContainerStyle={{ marginVertical: hp('1%') }}
              />

            </Section>
            : <Text style={recommandedStyles.noDataText}>No data available for this category.</Text>) : null}

        {/* Recommended Tutorials */}
        {selectedTab === 'All' || selectedTab === 'Tutorials' ? (
          tutorials.length > 1 &&
          <Section title="Recommended Tutorials">
            <HorizontalScroll>
              {tutorials?.map((item, index) => (
                <WorkoutCard
                  key={index}
                  title={item.title}
                  description={item.description}
                  navigateTo={{
                    routeName: 'Golf Drill',
                    params: {
                      id: item.id,
                      type: item.drill_name || item.name,
                      description: item.description || '',
                      title: item?.title,
                      file_name: item.file_url,
                      status: item.status,
                      duration: item.duration || '',
                    },
                  }} />
              ))}
            </HorizontalScroll>
          </Section>
        ) : null}
      </ScrollView>
    </View>
  );
};

export default RecommendedView;
