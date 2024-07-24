import React, { useState } from 'react';
import { ScrollView, View, Text, Image, TouchableOpacity } from 'react-native';
import { styles } from './AnalysingScreenStyle';
import CustomHeader from '../../../shared/Component/CustomHeader';
import {
  DrillCard,
  HorizontalScroll,
  Section,
  WorkoutCard,
  Header,
  Banner,
  RecentAnalysis,
  UploadSwing,
  AnalysisCard,
} from '../../Dashboard/Home/Common/Common';
import TutorialCard from '../../../shared/Component/TutorialCard/TutorialCard';
import recommandedStyles from '../Recommended/styles';
import { AppDispatch, RootState } from 'redux/store';
import { useSelector, useDispatch } from 'react-redux';
import * as Progress from 'react-native-progress';

import {
  fetchSwingAnalysis,
  resetSwingAnalysisState,
} from '../../../redux/Slices/SwingAnalysisSlice';
import ProgressLoader from '../../../components/ProgressLoader';

import VideoModal from '../../../components/VideoModal';
import { isNotEmptyObject } from '../../../shared/Utils/CommonUtils';

const workoutImage = require('../../../assets/Images/swingAnalysis.png');
const profileImage = require('../../../assets/Images/profilePicture.png');
const flagImage = require('../../../assets/Images/flag.png');
const ruler = require('../../../assets/Images/ruler.png');
const wind = require('../../../assets/Images/fast-wind.png');

const AnalysisView: React.FC = (props: any) => {
  const { navigation, route } = props;
  const { params } = route;

  const [selectedTab, setSelectedTab] = useState('Overall');
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedVideo, setSelectedVideo] = useState<{
    uri: string;
    title: string;
  } | null>(null);
  const dispatch = useDispatch<AppDispatch>();
  const { swingAnalysis, loading, error } = useSelector(
    (state: RootState) => state.swingAnalysis,
  );
  const analysis = swingAnalysis?.analysis;

  console.log('Swing Analysis', swingAnalysis);

  React.useEffect(() => {
    if (params) {
      dispatch(fetchSwingAnalysis(params));
    }

    return () => {
      dispatch(resetSwingAnalysisState());
    };
  }, [dispatch, params]);

  if (loading) {
    return <ProgressLoader />;
  }

  const renderWorkoutCards = (drills: any) => {
    if (Array.isArray(drills)) {
      // Handle case where drills is an array
      return drills.map((drill, index) => (
        <WorkoutCard
          key={index}
          title={'Unknown Title'} // Use a generic title for array items
          progress={`0/10`} // Assuming each item has a progress of 1 out of the total number of drills
          description={drill}
          score="7.2/10" // Replace with actual logic to determine score
        />
      ));
    } else if (typeof drills === 'object' && drills !== null) {
      // Handle case where drills is an object
      return Object.keys(drills).map(drillType => {
        const drillItems = drills[drillType];
        const progress = Array.isArray(drillItems)
          ? `${drillItems.length}/10`
          : `0/10`;

        return (
          <WorkoutCard
            key={drillType}
            title={drillType}
            progress={progress}
            description={
              Array.isArray(drillItems) ? drillItems.join(', ') : drillItems
            }
            score="7.2/10"
            navigateTo="" // Replace with actual logic to determine score
          />
        );
      });
    } else {
      return <Text>No drills available</Text>; // Handle cases where drills data is neither array nor object
    }
  };

  const renderDrillCards = (drills: any) => {
    if (Array.isArray(drills)) {
      // Handle case where drills is an array
      return drills.map((drill, index) => (
        <DrillCard key={index} title={drill} />
      ));
    } else if (typeof drills === 'object' && drills !== null) {
      // Handle case where drills is an object
      return Object.keys(drills).map(drillType => {
        const drillItems = drills[drillType];
        return (
          <View key={drillType} style={{ marginBottom: 20 }}>
            {/* <Text style={{ fontSize: 18, fontWeight: 'bold' }}>{drillType}</Text> */}
            {drillItems.map((drill, index) => (
              <DrillCard key={index} title={drill} />
            ))}
          </View>
        );
      });
    } else {
      return <Text>No drills available</Text>; // Handle cases where drills data is neither array nor object
    }
  };

  const getShuffledFeedbacks = () => {
    if (!analysis) return [];

    const positives = Object.entries(analysis.Positives).map(
      ([title, description]) => ({ title, description }),
    );
    const negatives = Object.entries(analysis.Negatives).map(
      ([title, description]) => ({ title, description }),
    );

    const allFeedbacks = [...positives, ...negatives];
    for (let i = allFeedbacks.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [allFeedbacks[i], allFeedbacks[j]] = [allFeedbacks[j], allFeedbacks[i]];
    }
    return allFeedbacks;
  };

  const shuffledFeedbacks = getShuffledFeedbacks();
  const toggleModal = () => {
    setModalVisible(!modalVisible);
  };

  const handleVideoPress = (uri: string, title: string) => {
    setSelectedVideo({ uri, title });
    setModalVisible(true);
  };

  return (
    <View style={styles.container}>
      <CustomHeader onBackPress={navigation.goBack} title="Swing Analysis" />
      {isNotEmptyObject(analysis) ? (
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
              <Text style={styles.scoreText}>
                {analysis && analysis['Swing Rating']}
              </Text>
              <Text style={styles.scoreLabel}>SCORE</Text>
            </View>
          </View>
          <View style={styles.scoreCardContainer}>
            <View style={styles.scoreCard}>
              <Text style={styles.scoreCardText}>Posture Score</Text>
              <Image source={ruler} style={styles.scoreCardIcon} />
              <Text style={styles.scoreCardValue}>{analysis?.Posture}/10</Text>
            </View>
            <View style={styles.scoreCard}>
              <Text style={styles.scoreCardText}>Swing Rhythm</Text>
              <Image source={wind} style={styles.scoreCardIcon} />
              <Text style={styles.scoreCardValue}>
                {analysis && analysis['Swing Rhythm']}/10
              </Text>
            </View>
          </View>
          <View style={styles.tabContainer}>
            <HorizontalScroll>

              {/* {analysis && Object.keys(analysis).map( */}
              {['Overall', 'Posture', 'Swing Rythm', 'Workouts', 'Drills'].map(
                tab => (
                  <TouchableOpacity
                    key={tab}
                    style={[
                      styles.tab,
                      selectedTab === tab && styles.selectedTab,
                    ]}
                    onPress={() => setSelectedTab(tab)}>
                    <Text
                      style={[
                        styles.tabText,
                        { color: selectedTab === tab ? '#232732' : '#7E7E7E' },
                      ]}>
                      {tab}
                    </Text>
                  </TouchableOpacity>
                ),
              )}
            </HorizontalScroll>
          </View>

          {selectedTab === 'Overall' || selectedTab === 'Swing Rythm' ? (
            <>
              <View style={styles.instructionContainer}>
                <View style={styles.instructionHeader}>
                  <Text style={styles.instructionTitle}>Swing Analysis</Text>
                  <Image
                    source={require('../../../assets/Images/info.png')}
                    style={styles.infoIcon}
                  />
                </View>
                <Text style={styles.subInstructionText}>
                  There are some good fundamentals, but there's a lot of room
                  for improvement.
                </Text>
                <Text style={styles.instructionText}>
                  {shuffledFeedbacks.map((feedback, index) => (
                    <Text key={index}>
                      <Text style={styles.subTitle}>{feedback.title} : </Text>{' '}
                      {feedback.description} {'\n\n'}
                    </Text>
                  ))}
                </Text>
              </View>
            </>
          ) : null}
          {selectedTab === 'Overall' || selectedTab === 'Workouts' ? (
            <>
              <View style={styles.workOutContainer}>
                <Section title="Recommended Workouts">
                  <HorizontalScroll>
                    {analysis && renderWorkoutCards(analysis['Workout Drills'])}
                  </HorizontalScroll>
                </Section>
              </View>
            </>
          ) : null}
          {selectedTab === 'Overall' || selectedTab === 'Drills' ? (
            <>
              <View style={styles.workOutContainer}>
                <Section title="Recommended Drills">
                  <HorizontalScroll>
                    {analysis && renderDrillCards(analysis['Golf Drills'])}
                  </HorizontalScroll>
                </Section>
              </View>
            </>
          ) : null}
          {selectedTab === 'Overall' || selectedTab === 'Posture' ? (
            <>
              <View style={styles.workOutContainer}>
                <Section title="Recommended Tutorials">
                  <HorizontalScroll>
                    {swingAnalysis?.recomended_tutorials?.map((item, index) => (
                      <TutorialCard
                        key={index}
                        data={item}
                        onPress={() =>
                          handleVideoPress(item.file_name, item.title)
                        }
                      />
                    ))}
                  </HorizontalScroll>
                </Section>
              </View>
            </>
          ) : null}
        </ScrollView>
      ) : (
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignContent: 'center',
            alignItems: 'center',
          }}>
          <Text>No Swing Analysis found</Text>
        </View>

      )}
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

export default AnalysisView;
