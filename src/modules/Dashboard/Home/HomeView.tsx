import React, {useState} from 'react';
import {View, Text, ScrollView, TouchableOpacity} from 'react-native';
import globalStyles from './styles';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
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
import VideoModal from '../../../components/VideoModal';

const HomeView = (props: any) => {
  const {route, navigation} = props;
  const [modalVisible, setModalVisible] = useState(false);
  const { tutorials, loading, error } = useSelector((state: RootState) => state.tutorials);


  const [selectedVideo, setSelectedVideo] = useState<{
    uri: string;
    title: string;
  } | null>(null);

  console.log('Videos ', tutorials);

  const dispatch = useDispatch<AppDispatch>();

  React.useEffect(() => {
    dispatch(fetchTutorials()).unwrap();
  }, [dispatch]);

  const toggleModal = () => {
    setModalVisible(!modalVisible);
  };

  const handleVideoPress = (uri: string, title: string) => {
    setSelectedVideo({uri, title});
    setModalVisible(true);
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
            <WorkoutCard title="Core Strength" progress="02/04" navigateTo="WorkoutView" />
            <WorkoutCard title="Lower Body Strength" progress="01/04" navigateTo="WorkoutView" />
            <WorkoutCard title="Flexibility" progress="03/04" navigateTo="WorkoutView" />
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
            {tutorials?.map((item, index) => (
              <TutorialCard
                key={index}
                data={item}
                onPress={() => handleVideoPress(item.file_name, item.description)}
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
