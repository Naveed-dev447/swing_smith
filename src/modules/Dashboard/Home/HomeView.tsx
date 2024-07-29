import React, {useState} from 'react';
import {View, Text, ScrollView} from 'react-native';
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
import {useDispatch, useSelector} from 'react-redux';
import {AppDispatch, RootState} from '../../../redux/Store';
import {fetchTutorials} from '../../../redux/Slices/TutorialSlice';
import {fetchProfile} from '../../../redux/Slices/ProfileSlice';
import {fetchRecommendedDrills} from '../../../redux/Slices/RecommendedDrillsSlice';
import VideoModal from '../../../components/VideoModal';
import ProgressLoader from '../../../components/ProgressLoader';
import {heightPercentageToDP as hp} from 'react-native-responsive-screen';

const HomeView = (props: any) => {
  const {route, navigation} = props;
  const [modalVisible, setModalVisible] = useState(false);
  const {tutorials, loading, error} = useSelector(
    (state: RootState) => state.tutorials,
  );
  const {profiles, profileLoading, profileError} = useSelector(
    (state: RootState) => state.profile,
  );
  const userName = profiles.length > 0 ? profiles[0].name : 'User';
  const [selectedVideo, setSelectedVideo] = useState<{
    uri: string;
    title: string;
  } | null>(null);

  const dispatch = useDispatch<AppDispatch>();

  React.useEffect(() => {
    dispatch(fetchTutorials()).unwrap();
    dispatch(fetchProfile()).unwrap();
    dispatch(fetchRecommendedDrills()).unwrap;
  }, [dispatch]);

  const toggleModal = () => {
    setModalVisible(!modalVisible);
  };

  const handleVideoPress = (uri: string, title: string) => {
    setSelectedVideo({uri, title});
    setModalVisible(true);
  };
  if (loading || profileLoading) {
    return <ProgressLoader />;
  }
  return (
    <View style={globalStyles.container}>
      <Header toggleModal={toggleModal} name={`Hello, ${userName}`} />
      <ScrollView contentContainerStyle={globalStyles.SwingLogScrollView}>
        <Banner />
        <View style={{width: '100%'}}>
          <Text style={[globalStyles.sectionTitle, {marginTop: hp('2%')}]}>
            Recent Analysis
          </Text>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={{marginVertical: hp('1%')}}>
            <AnalysisCard
              score="7.2"
              postureScore="8.4"
              swingRhythm="6.0"
              source={require('../../../assets/Images/DashBoard/RecentAna1.png')} // Adjust the path as necessary
            />
            <AnalysisCard
              score="6.2"
              postureScore="8.4"
              swingRhythm="6.0"
              source={require('../../../assets/Images/DashBoard/RecentAna2.png')} // Adjust the path as necessary
            />
          </ScrollView>
        </View>
        <UploadSwing
          onClick={() =>
            navigation.navigate(
              'Onboard',
              {screen: 'OnboardHome12'},
              'HomeUpload',
            )
          }
        />
        <Section title="Recommended Workouts">
          <HorizontalScroll>
            <WorkoutCard
              title="Core Strength"
              progress="02/04"
              navigateTo={{
                routeName: 'Core Strength',
                params: {video_id: 0, type: '', category: 'Workout Drills'},
              }}
            />
            <WorkoutCard
              title="Lower Body Strength"
              progress="01/04"
              navigateTo={{
                routeName: 'Core Strength',
                params: {video_id: 0, type: '', category: 'Workout Drills'},
              }}
            />
            <WorkoutCard
              title="Flexibility"
              progress="03/04"
              navigateTo={{
                routeName: 'Core Strength',
                params: {video_id: 0, type: '', category: 'Workout Drills'},
              }}
            />
          </HorizontalScroll>
        </Section>
        <Section title="Recommended Drills">
          <HorizontalScroll>
            <DrillCard
              title="Core Strength"
              description="This drill focuses on building core strength."
              navigateTo={{
                routeName: 'Core Strength',
                params: {video_id: 0, type: '', category: 'Workout Drills'},
              }}
            />
            <DrillCard
              title="Flexibility Drills"
              description="Improve your flexibility with these drills."
              navigateTo={{
                routeName: 'Flexibility',
                params: {video_id: 1, type: '', category: 'Workout Drills'},
              }}
            />
            <DrillCard
              title="Swing Drills"
              description="Enhance your swing with these drills."
              navigateTo={{
                routeName: 'Flexibility',
                params: {video_id: 2, type: '', category: 'Swing Drills'},
              }}
            />
          </HorizontalScroll>
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
