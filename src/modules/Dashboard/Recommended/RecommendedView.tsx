import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
  ImageBackground,
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

const RecommendedView: React.FC = () => {
  const [selectedTab, setSelectedTab] = useState('All');
  const { tutorials, loading, error } = useSelector((state: RootState) => state.tutorials);


  return (
    <View style={recommandedStyles.container}>
      <CustomHeader onBackPress={goBack} title="Recommended" />
      <ScrollView contentContainerStyle={recommandedStyles.scrollViewContent}>
        <View style={recommandedStyles.tabContainer}>
          {['All', 'Workouts', 'Drills'].map(tab => (
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
        </View>

        {/* Recommended Workouts */}
        {selectedTab === 'All' || selectedTab === 'Workouts' ? (
          <>
            <Section title="Recommended Workouts">
              <HorizontalScroll>
                <WorkoutCard
                  title="Core Strength"
                  progress="02/10"
                  description="Plank Variations, Side Planks, Russian Twists, and Medicine Ball Throws can i."
                  score="7.2/10"
                />
                <WorkoutCard
                  title="Core Strength"
                  progress="02/10"
                  description="Plank Variations, Side Planks, Russian Twists, and Medicine Ball Throws can i."
                  score="7.2/10"
                />
                <WorkoutCard
                  title="Core Strength"
                  progress="02/10"
                  description="Plank Variations, Side Planks, Russian Twists, and Medicine Ball Throws can i."
                  score="7.2/10"
                />
              </HorizontalScroll>
            </Section>
          </>
        ) : null}

        {/* Recommended Drills */}
        {selectedTab === 'All' || selectedTab === 'Drills' ? (
          <>
            <Section title="Recommended Drills">
              <View style={recommandedStyles.maincontainer}>
                <View style={recommandedStyles.cardContainer}>
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
                    <Text style={recommandedStyles.cardTitle}>Weight Transfer Drill</Text>
                    <Text style={recommandedStyles.cardDescription}>Watch video to get it fixed</Text>
                  </ImageBackground>
                </View>
                {Array(3)
                  .fill(0)
                  .map((_, index) => (
                    <View key={index} style={recommandedStyles.cardContainer}>
                      <Image
                        source={require('../../../assets/Images/DashBoard/golfman.png')}
                        style={recommandedStyles.cardIcon}
                      />
                      <View style={recommandedStyles.cardContent}>
                        <Text style={recommandedStyles.cardText}>Weight Transfer Drill</Text>
                        <Text style={recommandedStyles.cardSmallText}>
                          Place a tee behind your left heel (for a right-handed golfer)...
                        </Text>
                      </View>
                    </View>
                  ))}
              </View>
            </Section>
          </>
        ) : null}

        {/* Recommended Tutorials */}
        {selectedTab === 'All' ? (
          <>
            <Section title="Recommended Tutorials">
              <View style={{marginLeft:wp('5%')}}>
              <HorizontalScroll>
                {tutorials?.map((item, index) => (
                  <TutorialCard key={index} data={item} />
                ))}
              </HorizontalScroll>
              </View>
            </Section>
          </>
        ) : null}
      </ScrollView>
    </View>
  );
};

export default RecommendedView;
