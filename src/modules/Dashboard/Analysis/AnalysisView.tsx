import React, { useState } from 'react';
import { ScrollView, View, Text, Image, TouchableOpacity } from 'react-native';
import { styles } from './AnalysingScreenStyle';
import CustomHeader from '../../../shared/Component/CustomHeader';
import {
  DrillCard,
  HorizontalScroll,
  Section,
  WorkoutCard,
} from '../../Dashboard/Home/Common/Common';
import TutorialCard from '../../../shared/Component/TutorialCard/TutorialCard';
import { AppDispatch, RootState } from 'redux/store';
import { useSelector, useDispatch } from 'react-redux';
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

  const analysis = swingAnalysis?.data.analysis;
  const videoId = swingAnalysis?.data.id;

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
      return drills.map((drill, index) => (
        <WorkoutCard
          key={index}
          title={'Core Strength'}
          progress={`2/4`}
          description={drill}
          score="7.2/10"
          navigateTo={{
            routeName: 'Core Strength',
            params: {
              video_id: videoId,
              type: drill,
              category: 'Workout Drills',
            },
          }}
        />
      ));
    } else if (typeof drills === 'object' && drills !== null) {
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
            navigateTo={{
              routeName: 'Core Strength',
              params: {
                video_id: videoId,
                type: drillType,
                category: 'Workout Drills',
              },
            }}
          />
        );
      });
    } else {
      return (
        <Text
          style={{
            fontFamily: 'Outfit-Regular',
            color: '#192126',
          }}>
          No WorkOuts are available
        </Text>
      );
    }
  };

  const renderDrillCards = (drills: { [key: string]: string }) => {
    if (Array.isArray(drills)) {
      return drills.map((drill, index) => (
        <DrillCard
          key={index}
          title={drill}
          description={drills[drill]}
          navigateTo={{
            routeName: 'Core Strength',
            params: {
              video_id: videoId,
              type: drill,
              category: 'Golf Drills',
            },
          }}
        />
      ));
    } else if (typeof drills === 'object' && drills !== null) {
      return Object.keys(drills).map((drillName, index) => (
        <View key={index} style={{ marginBottom: 20 }}>
          <DrillCard
            key={index}
            title={drillName}
            description={drills[drillName]}
            navigateTo={{
              routeName: 'Core Strength',
              params: {
                video_id: videoId,
                type: drillName,
                category: 'Golf Drills',
              },
            }}
          />
        </View>
      ));
    } else {
      return (
        <Text
          style={{
            fontFamily: 'Outfit-Regular',
            color: '#192126',
          }}>
          No drills available
        </Text>
      );
    }
  };




  const renderHeaderContent = header => {
    switch (header) {
      case 'Positives':
        return (
          <View style={styles.instructionContainer}>
            <View style={styles.instructionHeader}>
              <Text style={styles.instructionTitle}>Positives</Text>
            </View>
            {Object.entries(analysis?.Positives).map(([key, value]) => (
              <Text style={styles.headerTitle} key={key}>
                <Text style={styles.subTitle}>{key}: </Text>
                {value}
              </Text>
            ))}
          </View>
        );
      case 'Negatives':
        return (
          <View style={styles.instructionContainer}>
            <View style={styles.instructionHeader}>
              <Text style={styles.instructionTitle}>Negatives</Text>
            </View>
            {Object.entries(analysis?.Negatives).map(([key, value]) => (
              <Text style={styles.headerTitle} key={key}>
                <Text style={styles.subTitle}>{key}: </Text>
                {value}
              </Text>
            ))}
          </View>
        );
      case 'Workout Drills':
        return (
          <View style={styles.workOutContainer}>
            <Section title="Recommended Workouts">
              <HorizontalScroll>
                {renderWorkoutCards(analysis['Workout Drills'])}
              </HorizontalScroll>
            </Section>
          </View>
        );
      case 'Golf Drills':
        return (
          <View style={styles.workOutContainer}>
            <Section title="Recommended Drills">
              <HorizontalScroll>
                {renderDrillCards(analysis['Golf Drills'])}
              </HorizontalScroll>
            </Section>
          </View>
        );
      case 'Video Suggestions':
        return (
          <View style={styles.workOutContainer}>
            <Section title="Recommended Tutorials">
              <HorizontalScroll>
                {swingAnalysis?.data?.recomended_tutorials?.map(
                  (item, index) => (
                    <TutorialCard
                      key={index}
                      data={item}
                      onPress={() =>
                        handleVideoPress(item.file_name, item.title)
                      }
                    />
                  ),
                )}
              </HorizontalScroll>
            </Section>
          </View>
        );
      case 'Overall':
        return (
          <>
            {renderHeaderContent('Positives')}
            {renderHeaderContent('Negatives')}
            {renderHeaderContent('Workout Drills')}
            {renderHeaderContent('Golf Drills')}
            {renderHeaderContent('Video Suggestions')}
          </>
        );
      default:
        return (
          <Text style={styles.instructionText}>
            No data available for this category.
          </Text>
        );
    }
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
              {[
                'Overall',
                'Positives',
                'Negatives',
                'Workout Drills',
                'Golf Drills',
                'Video Suggestions',
              ].map(tab => (
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
              ))}
            </HorizontalScroll>
          </View>
          {selectedTab && renderHeaderContent(selectedTab)}
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
