import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  ImageBackground,
  Image,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import recommandedStyles from './styles';
import { goBack } from '../../../shared/Utils/navigationRef';
import CustomHeader from '../../../shared/Component/CustomHeader';
import { HorizontalScroll, Section, WorkoutCard } from '../Home/Common/Common';
import TutorialCard from '../../../shared/Component/TutorialCard/TutorialCard';
import { RootState } from 'redux/store';
import { useSelector } from 'react-redux';
import VideoModal from '../../../components/VideoModal';

const RecommendedView: React.FC = (props: any) => {
  const { route, navigation } = props;
  const [selectedTab, setSelectedTab] = useState('All');
  const { tutorials } = useSelector((state: RootState) => state.tutorials);

  const [modalVisible, setModalVisible] = useState(false);
  const [selectedVideo, setSelectedVideo] = useState<{
    uri: string;
    title: string;
  } | null>(null);

  const handleVideoPress = (uri: string, title: string) => {
    setSelectedVideo({ uri, title });
    setModalVisible(true);
  };
  const handlePress = () => {
    navigation.navigate('Core Strength', {
      video_id: 0,
      type: '',
      category: 'Workout Drills',
    });
  };
  return (
    <View style={recommandedStyles.container}>
      <CustomHeader onBackPress={goBack} title="Recommended" />
      <ScrollView contentContainerStyle={recommandedStyles.scrollViewContent}>
        <View style={recommandedStyles.tabContainer}>
          <HorizontalScroll>
            {['All', 'Workouts', 'Drills', 'Tutorials'].map(tab => (
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

        {/* Recommended Workouts */}
        {selectedTab === 'All' ? (
          <Section title="Recommended Workouts">
            <HorizontalScroll>
              <WorkoutCard
                title="Core Strength"
                progress="02/04"
                description="Planks, Russian twists, Medicine ball rotations"
                score="7.2/10"
                navigateTo={{ routeName: 'Core Strength', params: { video_id: 0, type: '', category: 'Workout Drills' } }}
              />

              <WorkoutCard
                title="Lower Body Strength"
                progress="01/03"
                description="Squats, Lunges, Glute bridges"
                score="7.2/10"
                navigateTo={{ routeName: 'Core Strength', params: { video_id: 0, type: '', category: 'Workout Drills' } }}
              />
              <WorkoutCard
                title="Flexibility"
                progress="01/03"
                description="Yoga, Pilates"
                score="7.2/10"
                navigateTo={{ routeName: 'Core Strength', params: { video_id: 0, type: '', category: 'Workout Drills' } }}
              />
            </HorizontalScroll>
          </Section>
        ) : selectedTab === 'Workouts' ? (
          <Section title="Recommended Workouts">
            <View style={recommandedStyles.maincontainer}>
              <WorkoutCard
                title="Core Strength"
                progress="02/04"
                description="Planks, Russian twists, Medicine ball rotations"
                score="7.2/10"
                navigateTo={{ routeName: 'Core Strength', params: { video_id: 0, type: '', category: 'Workout Drills' } }}
              />
              <WorkoutCard
                title="Lower Body Strength"
                progress="01/03"
                description="Squats, Lunges, Glute bridges"
                score="7.2/10"
                navigateTo={{ routeName: 'Core Strength', params: { video_id: 0, type: '', category: 'Workout Drills' } }}
              />
              <WorkoutCard
                title="Flexibility"
                progress="01/03"
                description="Yoga, Pilates"
                score="7.2/10"
                navigateTo={{ routeName: 'Core Strength', params: { video_id: 0, type: '', category: 'Workout Drills' } }}
              />
            </View>
          </Section>
        ) : null}

        {/* Recommended Drills */}
        {selectedTab === 'All' || selectedTab === 'Drills' ? (
          <Section title="Recommended Drills">
            <View style={recommandedStyles.maincontainer}>
              <TouchableOpacity style={recommandedStyles.cardContainer}
                onPress={handlePress}>
                <ImageBackground
                  source={require('../../../assets/Images/recommendedVideoIcon.png')}
                  style={recommandedStyles.cardImage}
                  imageStyle={{ borderRadius: 10 }}>
                  <Icon
                    name="play-circle"
                    size={wp('10%')}
                    color="white"
                    style={recommandedStyles.playIcon}
                  />
                  <Text style={recommandedStyles.cardTitle}>
                    Weight Transfer Drill
                  </Text>
                  <Text style={recommandedStyles.cardDescription}>
                    Watch video to get it fixed
                  </Text>
                </ImageBackground>
              </TouchableOpacity>
              {Array(3)
                .fill(0)
                .map((_, index) => (
                  <TouchableOpacity key={index} style={recommandedStyles.cardContainer}
                    onPress={handlePress} >
                    <Image
                      source={require('../../../assets/Images/DashBoard/golfman.png')}
                      style={recommandedStyles.cardIcon}
                    />
                    <View style={recommandedStyles.cardContent}>
                      <Text style={recommandedStyles.cardText}>
                        Weight Transfer Drill
                      </Text>
                      <Text style={recommandedStyles.cardSmallText}>
                        Place a tee behind your left heel (for a right-handed
                        golfer)...
                      </Text>
                    </View>
                  </TouchableOpacity>
                ))}
            </View>
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
                    onPress={() => handleVideoPress(item.file_name, item.description)}
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
