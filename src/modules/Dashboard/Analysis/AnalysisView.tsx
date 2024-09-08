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
import ProgressLoader from '../../../components/ProgressLoader';
import VideoModal from '../../../components/VideoModal';
import { formatSkillText, isNotEmptyObject } from '../../../shared/Utils/CommonUtils';
import { useIsFocused } from '@react-navigation/native';

const workoutImage = require('../../../assets/Images/swingAnalysis.png');
const profileImage = require('../../../assets/Images/avatar.jpg');
const flagImage = require('../../../assets/Images/flag.png');
const ruler = require('../../../assets/Images/ruler.png');
const wind = require('../../../assets/Images/fast-wind.png');

const AnalysisView: React.FC = (props: any) => {
  const { navigation, route } = props;
  const { params } = route;
  const {
    ball_flight,
    club,
    contact,
    created_at,
    face_direction,
    file_url,
    hand,
    id,
    posture,
    swing_analysis,
    swing_rating,
    swing_rhythm,
    thumbnail,
    type
  } = params;
  console.log("Params", params);
  
  const focused = useIsFocused();
  const [selectedTab, setSelectedTab] = useState('Analysis ');
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
  console.log("Swing Analysis ======>", swingAnalysis);
  
  useEffect(() => {
    if (id) {
      if (focused) {
        dispatch(fetchSwingAnalysis(id));
      }
    }
    return () => {
      dispatch(resetSwingAnalysisState());
    };
  }, [dispatch, focused]);

  if (loading) {
    return <ProgressLoader />;
  }

  const renderCards = (
    items: any[],
    Component: React.FC<any>,
    title: string,
    category: string
  ) => {
    if (!items || items.length === 0) {
      const messages: { [key: string]: string } = {
        'Golf Drills': 'No golf drills available.',
        'Workout Drills': 'No workout drills available.',
      };
      return <Text style={styles.noDataText}>{messages[category] || 'No data available.'}</Text>;
    }

    return items.map((item, index) => {
      try {
        if (category === 'Golf Drills') {
          return (
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
          );
        } else if (category === 'Workout Drills') {
          return (
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
          );
        }
      } catch (error) {
        console.error(`Error rendering card: ${error}`);
        return <Text style={styles.noDataText}>Error rendering data.</Text>;
      }
      return null;
    });
  };

  const renderHeaderContent = (header: string) => {
    try {
      switch (header) {
        case 'Head Sway':
        case 'Hip Sway':
        case 'Impact':
        case 'Head Stability':
        case 'Hip Turn':
        case 'Pivot':
        case 'Shoulder Tilt':
        case 'Spine Inclination':
        case 'Weight Forward':
        case 'Shoulder Turn':
        case 'Straight Arms':
          if (analysis?.[header]) {
            return (
              <View style={{padding:10}} key={header}>
                <View style={styles.instructionHeader}>
                  <Text style={styles.instructionTitle}>{header}</Text>
                </View>
                <Text style={styles.headerTitle}>{analysis[header]}</Text>
              </View>
            );
          }
          return null;

        case 'Exercise Drills':
          if (analysis?.['Workouts'] && Array.isArray(analysis['Workouts']) && analysis['Workouts'].length) {
            return (
              <View style={styles.workOutContainer}>
                <Section title="Recommended Exercise Drills">
                  <HorizontalScroll>
                    {renderCards(analysis['Workouts'], WorkoutCard, 'Core Strength', 'Workout Drills')}
                  </HorizontalScroll>
                </Section>
              </View>
            );
          }
          return (
            <View style={styles.workOutContainer}>
              <Section title="Recommended Exercise Drills">
                <Text style={styles.noDataText}>No exercise drills available.</Text>
              </Section>
            </View>
          )

        case 'Swing Drills':
          if (analysis?.['Golf Drills'] && Array.isArray(analysis['Golf Drills']) && analysis['Golf Drills'].length) {
            return (
              <View style={styles.workOutContainer}>
                <Section title="Recommended Swing Drills">
                  <HorizontalScroll>
                    {renderCards(analysis['Golf Drills'], DrillCard, 'Core Strength', 'Golf Drills')}
                  </HorizontalScroll>
                </Section>
              </View>
            );
          }
          return (
            <View style={styles.workOutContainer}>
              <Section title="Recommended Swing Drills">
                <Text style={styles.noDataText}>No swing drills available.</Text>
              </Section>
            </View>
          )

        case 'Tutorials':
          if (swingAnalysis?.data?.recomended_tutorials && Array.isArray(swingAnalysis.data.recomended_tutorials) && swingAnalysis.data.recomended_tutorials.length) {
            return (
              <View style={styles.workOutContainer}>
                <Section title="Recommended Tutorials">
                  <HorizontalScroll>
                    {swingAnalysis.data.recomended_tutorials.map((item, index) => (
                     <TutorialCard
                        key={index}
                        data={item}
                        onPress={()=> console.log("Test")}
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
                    ))}
                  </HorizontalScroll>
                </Section>
              </View>
            );
          }
          return (
            <View style={styles.workOutContainer}>
              <Section title="Recommended Tutorials">
                <Text style={styles.noDataText}>No videos available.</Text>
              </Section>
            </View>
          )

        case 'Analysis ':
          return (
            <>
             <View style={styles.instructionContainer}>
              {renderHeaderContent('Head Stability')}
              {renderHeaderContent('Hip Turn')}
              {renderHeaderContent('Pivot')}
              {renderHeaderContent('Shoulder Tilt')}
              {renderHeaderContent('Spine Inclination')}
              {renderHeaderContent('Head Sway')}
              {renderHeaderContent('Hip Sway')}
              {renderHeaderContent('Impact')}
              {renderHeaderContent('Weight Forward')}
              {renderHeaderContent('Shoulder Turn')}
              {renderHeaderContent('Straight Arms')}
              </View>
              {renderHeaderContent('Swing Drills')}
              {renderHeaderContent('Exercise Drills')}
              {renderHeaderContent('Tutorials')}
            </>
          );

        default:
          return <Text style={styles.noDataText}>No data available for this category.</Text>;
      }
    } catch (error) {
      console.error(`Error rendering header content: ${error}`);
      return <Text style={styles.noDataText}>Error displaying data.</Text>;
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
        <ScrollView style={{ flexGrow: 1, paddingBottom: 70,marginTop: 20}}>
          <Image source={workoutImage} style={styles.image} />
          <View style={styles.analysisCardContainer}>
            <Image source={profileImage} style={styles.profileImage} />
            <View style={styles.userInfo}>
              <Text style={styles.userName}>{userName}</Text>
              <Text style={styles.userSkill}>{formatSkillText(face_direction, club, hand)}</Text>
            </View>
            <View style={styles.scoreContainer}>
              <Image source={flagImage} style={styles.flagImage} />
              <Text style={styles.scoreText}>
                {analysis?.['Swing Rating'] ? analysis?.['Swing Rating'] : 'N/A'}
              </Text>
              <Text style={styles.userSkill}>SCORE</Text>
            </View>
            <View style={styles.scoreContainer}>
              <Image source={ruler} style={styles.scoreCardIcon} />
              <Text style={styles.scoreCardValue}>{analysis?.SwingRhythm}/10</Text>
            </View>
          </View>
          <View style={styles.tabContainer}>
            <HorizontalScroll>
              {[
                'Analysis ',
                'Exercise Drills',
                'Swing Drills',
                'Tutorials',
              ].map(tab => (
                <TouchableOpacity
                  key={tab}
                  style={[
                    styles.tab,
                    selectedTab === tab && styles.selectedTab,
                  ]}
                  onPress={() => setSelectedTab(tab)}
                >
                  <Text
                    style={[
                      styles.tabText,
                      selectedTab === tab && styles.selectedTabText,
                    ]}
                  >
                    {tab}
                  </Text>
                </TouchableOpacity>
              ))}
            </HorizontalScroll>
          </View>
          {renderHeaderContent(selectedTab)}
        </ScrollView>
      ) : (
        <Text style={styles.noDataText}>No Analysis Data Available</Text>
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













































































// Old Analysis Design

// import React, { useState, useEffect } from 'react';
// import { ScrollView, View, Text, Image, TouchableOpacity } from 'react-native';
// import { styles } from './AnalysingScreenStyle';
// import CustomHeader from '../../../shared/Component/CustomHeader';
// import {
//   DrillCard,
//   HorizontalScroll,
//   Section,
//   WorkoutCard,
// } from '../../Dashboard/Home/Common/Common';
// import TutorialCard from '../../../shared/Component/TutorialCard/TutorialCard';
// import { AppDispatch, RootState } from 'redux/store';
// import { useSelector, useDispatch } from 'react-redux';
// import {
//   fetchSwingAnalysis,
//   resetSwingAnalysisState,
// } from '../../../redux/Slices/SwingAnalysisSlice';
// import { fetchProfile } from '../../../redux/Slices/ProfileSlice';
// import ProgressLoader from '../../../components/ProgressLoader';
// import VideoModal from '../../../components/VideoModal';
// import { isNotEmptyObject } from '../../../shared/Utils/CommonUtils';
// import { useIsFocused } from '@react-navigation/native';

// const workoutImage = require('../../../assets/Images/swingAnalysis.png');
// const profileImage = require('../../../assets/Images/avatar.jpg');
// const flagImage = require('../../../assets/Images/flag.png');
// const ruler = require('../../../assets/Images/ruler.png');
// const wind = require('../../../assets/Images/fast-wind.png');

// const AnalysisView: React.FC = (props: any) => {
//   const { navigation, route } = props;
//   const { params } = route;
//   const {
//     ball_flight,
//     club,
//     contact,
//     created_at,
//     face_direction,
//     file_url,
//     hand,
//     id,
//     posture,
//     swing_analysis,
//     swing_rating,
//     swing_rhythm,
//     thumbnail,
//     type
//   } = params;


//   const focused = useIsFocused();
//   const [selectedTab, setSelectedTab] = useState('Analysis ');
//   const [modalVisible, setModalVisible] = useState(false);
//   const [selectedVideo, setSelectedVideo] = useState<{
//     uri: string;
//     title: string;
//   } | null>(null);
//   const dispatch = useDispatch<AppDispatch>();
//   const { swingAnalysis, loading, error } = useSelector(
//     (state: RootState) => state.swingAnalysis,
//   );
//   const { profiles, profileLoading, profileError } = useSelector(
//     (state: RootState) => state.profile,
//   );
//   const userName = profiles.length > 0 ? profiles[0].name : 'User';

//   const analysis = swingAnalysis && swingAnalysis?.data?.analysis;
  
//   useEffect(() => {
//     if (id) {
//       if (focused) {
//         dispatch(fetchSwingAnalysis(id));
//       }
//     }
//     return () => {
//       dispatch(resetSwingAnalysisState());
//     };
//   }, [dispatch, focused]);

//   if (loading) {
//     return <ProgressLoader />;
//   }
// console.log("JSON", JSON.stringify(analysis));

//   const renderCards = (
//     items: any[],
//     Component: React.FC<any>,
//     title: string,
//     category: string
//   ) => {
//     if (!items || items.length === 0) {
//       const messages: { [key: string]: string } = {
//         'Golf Drills': 'No golf drills available.',
//         'Workout Drills': 'No workout drills available.',
//       };
//       return <Text style={styles.noDataText}>{messages[category] || 'No data available.'}</Text>;
//     }

//     return items.map((item, index) => {
//       try {
//         if (category === 'Golf Drills') {
//           return (
//             <Component
//               key={index}
//               title={item.drill_name || item.name}
//               description={item.description || ''}
//               navigateTo={{
//                 routeName: 'Golf Drill',
//                 params: {
//                   id: item.id,
//                   type: item.drill_name || item.name,
//                   description: item.description || '',
//                 },
//               }}
//             />
//           );
//         } else if (category === 'Workout Drills') {
//           console.log("Items", item);
          
//           const parsedWorkout = item.workout ? JSON.parse(item.workout) : {};
//           const totalWorkouts = Object.keys(parsedWorkout).length;
//           const completedWorkouts = Object.values(parsedWorkout).filter((value: boolean) => value).length;
//           const progress = `${completedWorkouts}/${totalWorkouts}`;
//           const trueFlagsDescription = Object.keys(parsedWorkout).filter(key => parsedWorkout[key]).join(', ');

//           return (
//             <Component
//               key={index}
//               title={item.type}
//               description={trueFlagsDescription || item.description || ''}
//               progress={progress}
//               navigateTo={{
//                 routeName: 'Core Strength',
//                 params: {
//                   video_id: item.id,
//                   type: item.type,
//                   category: 'Workout Drills',
//                 },
//               }}
//             />
//           );
//         }
//       } catch (error) {
//         console.error(`Error rendering card: ${error}`);
//         return <Text style={styles.noDataText}>Error rendering data.</Text>;
//       }
//       return null;
//     });
//   };

//   const renderHeaderContent = (header: string) => {
//     try {
//       switch (header) {
//         case 'Head Sway':
//         case 'Hip Sway':
//         case 'Impact':
//         case 'Head Stability':
//         case 'Hip Turn':
//         case 'Pivot':
//         case 'Shoulder Tilt':
//         case 'Spine Inclination':
//         case 'Weight Forward':
//         case 'Shoulder Turn':
//         case 'Straight Arms':
//           if (analysis?.[header]) {
//             return (
//               <View style={styles.instructionContainer} key={header}>
//                 <View style={styles.instructionHeader}>
//                   <Text style={styles.instructionTitle}>{header}</Text>
//                 </View>
//                 <Text style={styles.headerTitle}>{analysis[header]}</Text>
//               </View>
//             );
//           }
//           return null;

//         case 'Exercise Drills':
//           if (analysis?.['Workout Drills'] && Array.isArray(analysis['Workout Drills']) && analysis['Workout Drills'].length) {
//             return (
//               <View style={styles.workOutContainer}>
//                 <Section title="Recommended Exercise Drills">
//                   <HorizontalScroll>
//                     {renderCards(analysis['Workout Drills'], WorkoutCard, 'Core Strength', 'Workout Drills')}
//                   </HorizontalScroll>
//                 </Section>
//               </View>
//             );
//           }
//           return (
//             <View style={styles.workOutContainer}>
//               <Section title="Recommended Exercise Drills">
//                 <Text style={styles.noDataText}>No exercise drills available.</Text>
//               </Section>
//             </View>
//           )

//         case 'Swing Drills':
//           if (analysis?.['Golf Drills'] && Array.isArray(analysis['Golf Drills']) && analysis['Golf Drills'].length) {
//             return (
//               <View style={styles.workOutContainer}>
//                 <Section title="Recommended Swing Drills">
//                   <HorizontalScroll>
//                     {renderCards(analysis['Golf Drills'], DrillCard, 'Core Strength', 'Golf Drills')}
//                   </HorizontalScroll>
//                 </Section>
//               </View>
//             );
//           }
//           return (
//             <View style={styles.workOutContainer}>
//               <Section title="Recommended Swing Drills">
//                 <Text style={styles.noDataText}>No swing drills available.</Text>
//               </Section>
//             </View>
//           )

//         case 'Video':
//           if (swingAnalysis?.data?.recomended_tutorials && Array.isArray(swingAnalysis.data.recomended_tutorials) && swingAnalysis.data.recomended_tutorials.length) {
//             return (
//               <View style={styles.workOutContainer}>
//                 <Section title="Recommended Tutorials">
//                   <HorizontalScroll>
//                     {swingAnalysis.data.recomended_tutorials.map((item, index) => (
//                       <TutorialCard
//                         key={index}
//                         data={item}
//                         onPress={() => handleVideoPress(item.file_name, item.title)}
//                       />
//                     ))}
//                   </HorizontalScroll>
//                 </Section>
//               </View>
//             );
//           }
//           return (
//             <View style={styles.workOutContainer}>
//               <Section title="Recommended Tutorials">
//                 <Text style={styles.noDataText}>No videos available.</Text>
//               </Section>
//             </View>
//           )

//         case 'Analysis ':
//           return (
//             <>
//               {renderHeaderContent('Head Stability')}
//               {renderHeaderContent('Hip Turn')}
//               {renderHeaderContent('Pivot')}
//               {renderHeaderContent('Shoulder Tilt')}
//               {renderHeaderContent('Spine Inclination')}
//               {renderHeaderContent('Head Sway')}
//               {renderHeaderContent('Hip Sway')}
//               {renderHeaderContent('Impact')}
//               {renderHeaderContent('Weight Forward')}
//               {renderHeaderContent('Shoulder Turn')}
//               {renderHeaderContent('Straight Arms')}
//               {renderHeaderContent('Swing Drills')}
//               {renderHeaderContent('Exercise Drills')}
//               {renderHeaderContent('Video')}
//             </>
//           );

//         default:
//           return <Text style={styles.noDataText}>No data available for this category.</Text>;
//       }
//     } catch (error) {
//       console.error(`Error rendering header content: ${error}`);
//       return <Text style={styles.noDataText}>Error displaying data.</Text>;
//     }
//   };

//   const handleVideoPress = (uri: string, title: string) => {
//     setSelectedVideo({ uri, title });
//     setModalVisible(true);
//   };

//   return (
//     <View style={styles.container}>
//       <CustomHeader onBackPress={navigation.goBack} title="Swing Analysis" />
//       {isNotEmptyObject(analysis) ? (
//         <ScrollView style={{ flex: 1, paddingBottom: 70, marginTop: 30 }}>
//           <Image source={workoutImage} style={styles.image} />
//           <View style={styles.analysisCardContainer}>
//             <Image source={profileImage} style={styles.profileImage} />
//             <View style={styles.userInfo}>
//               <Text style={styles.userName}>{userName}</Text>
//               <Text style={styles.userSkill}>{face_direction === 'up' ? 'FO' : 'DTL'}/{club}/{hand} Handed</Text>
//             </View>
//             <View style={styles.scoreContainer}>
//               <Image source={flagImage} style={styles.flagImage} />
//               <Text style={styles.scoreText}>
//                 {analysis?.['Swing Rating'] ? analysis?.['Swing Rating'] : 'N/A'}
//               </Text>
//             </View>
//             <View style={styles.scoreContainer}>
//               <Image source={ruler} style={styles.scoreCardIcon} />
//               <Text style={styles.scoreCardValue}>{analysis?.SwingRhythm}/10</Text>
//             </View>
//           </View>
//           <View style={styles.tabContainer}>
//             <HorizontalScroll>
//               {[
//                 'Analysis ',
//                 'Exercise Drills',
//                 'Swing Drills',
//                 'Video',
//               ].map(tab => (
//                 <TouchableOpacity
//                   key={tab}
//                   style={[
//                     styles.tab,
//                     selectedTab === tab && styles.selectedTab,
//                   ]}
//                   onPress={() => setSelectedTab(tab)}
//                 >
//                   <Text
//                     style={[
//                       styles.tabText,
//                       selectedTab === tab && styles.selectedTabText,
//                     ]}
//                   >
//                     {tab}
//                   </Text>
//                 </TouchableOpacity>
//               ))}
//             </HorizontalScroll>
//           </View>
//           {renderHeaderContent(selectedTab)}
//         </ScrollView>
//       ) : (
//         <Text style={styles.noDataText}>No Analysis Data Available</Text>
//       )}
//       {selectedVideo && (
//         <VideoModal
//           visible={modalVisible}
//           onClose={() => setModalVisible(false)}
//           videoUri={selectedVideo.uri}
//           title={selectedVideo.title}
//         />
//       )}
//     </View>
//   );
// };

// export default AnalysisView;