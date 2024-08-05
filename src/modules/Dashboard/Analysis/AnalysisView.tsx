import React, { useState, useEffect } from 'react';
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
import { fetchProfile } from '../../../redux/Slices/ProfileSlice';
import ProgressLoader from '../../../components/ProgressLoader';
import VideoModal from '../../../components/VideoModal';
import { isNotEmptyObject } from '../../../shared/Utils/CommonUtils';
import { useIsFocused } from '@react-navigation/native';

const workoutImage = require('../../../assets/Images/swingAnalysis.png');
const profileImage = require('../../../assets/Images/avatar.jpg');
const flagImage = require('../../../assets/Images/flag.png');
const ruler = require('../../../assets/Images/ruler.png');
const wind = require('../../../assets/Images/fast-wind.png');

const AnalysisView: React.FC = (props: any) => {
  const { navigation, route } = props;
  const { params } = route;
  const focused = useIsFocused();
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
  const { profiles, profileLoading, profileError } = useSelector(
    (state: RootState) => state.profile,
  );
  const userName = profiles.length > 0 ? profiles[0].name : 'User';


  const analysis = swingAnalysis && swingAnalysis?.data?.analysis;

  useEffect(() => {
    if (params) {
      if (focused) {
        dispatch(fetchSwingAnalysis(params));
      }
    }
    // return () => {
    //   dispatch(resetSwingAnalysisState());
    // };
  }, [dispatch, focused]);

  if (loading) {
    return <ProgressLoader />;
  }
  const renderCards = (
    items: any,
    Component: React.FC<any>,
    title: string,
    category: string
  ) => {

    if (category === 'Golf Drills') {

      if (Array.isArray(items) && items.length === 1) {
        const item = items[0];
        return (
          <Component
            key={0}
            title={item.drill_name || item.name}
            description={item.description}
            navigateTo={{
              routeName: 'Golf Drill',
              params: {
                id: item.id,
                type: item.drill_name || item.name,
                description: item.description,
              },
            }}
          />
        );
      } else if (Array.isArray(items)) {
        return items.map((item, index) => (
          <Component
            key={index}
            title={item.name}
            description={item.description}
            navigateTo={{
              routeName: 'Golf Drill',
              params: {
                id: item.id,
                type: item.name,
                description: item.description,
              },
            }}
          />
        ));
      } else {
        return (
          <Text style={{ fontFamily: 'Outfit-Regular', color: '#192126' }}>
            No {title.toLowerCase()} available
          </Text>
        );
      }
    } else if (category === 'Workout Drills') {
      if (Array.isArray(items)) {
        return items.map((item, index) => {
          const parsedWorkout = item.workout ? JSON.parse(item.workout) : {};
          const totalWorkouts = Object.keys(parsedWorkout).length;
          const completedWorkouts = Object.values(parsedWorkout).filter(
            (value: boolean) => value
          ).length;
          const progress = `${completedWorkouts}/${totalWorkouts}`;
          console.log("progress",progress);
          
          const trueFlagsDescription = Object.keys(parsedWorkout)
            .filter((key) => parsedWorkout[key])
            .join(', ');

          return (
            <Component
              key={index}
              title={item.type}
              description={trueFlagsDescription || item.description}
              progress={progress}
              navigateTo={{
                routeName: 'Core Strength',
                params: {
                  video_id: item.id,
                  type: item.type,
                  category: 'Workout Drills',
                },
              }}
            />
          )
        });
      } else {
        return (
          <Text style={{ fontFamily: 'Outfit-Regular', color: '#192126' }}>
            No {title.toLowerCase()} available
          </Text>
        );
      }

    } else {
      return (
        <Text style={{ fontFamily: 'Outfit-Regular', color: '#192126' }}>
          No {title.toLowerCase()} available
        </Text>
      );
    }
  };



  const renderHeaderContent = (header: string) => {
    switch (header) {
      case 'Positives':
      case 'Negatives':
        return (
          <View style={styles.instructionContainer}>
            <View style={styles.instructionHeader}>
              <Text style={styles.instructionTitle}>{header}</Text>
            </View>
            {Object.entries(analysis?.[header]).map(([key, value]) => (
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
                {renderCards(analysis['Workout Drills'], WorkoutCard, 'Core Strength', 'Workout Drills')}
              </HorizontalScroll>
            </Section>
          </View>
        );
      case 'Golf Drills':
        return (
          <View style={styles.workOutContainer}>
            <Section title="Recommended Drills">
              <HorizontalScroll>
                {renderCards(analysis['Golf Drills'], DrillCard, 'Core Strength', 'Golf Drills')}
              </HorizontalScroll>
            </Section>
          </View>
        );
      case 'Video':
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
                        handleVideoPress(item.file_name, item.title, modalVisible)
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
            {renderHeaderContent('Video')}
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
              <Text style={styles.userName}>{`${userName}`}</Text>
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
                'Video',
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
        <View style={{ flex: 1, justifyContent: 'center', alignContent: 'center', alignItems: 'center' }}>
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
