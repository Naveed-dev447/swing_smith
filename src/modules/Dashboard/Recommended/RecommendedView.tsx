import React, { useState } from 'react';
import { View, Text, ScrollView, Image, TouchableOpacity,ImageBackground } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import recommandedStyles from './styles';
import { goBack } from '../../../shared/Utils/navigationRef';
import CustomHeader from '../../../shared/Component/CustomHeader';
import VideoCardComponent from './VideoCardComponent';


const RecommendedView: React.FC = () => {
  const [selectedTab, setSelectedTab] = useState('All');

  return (
      <View style={recommandedStyles.container}>
                <CustomHeader onBackPress={goBack} title='Recommanded'/>
      <ScrollView contentContainerStyle={recommandedStyles.scrollViewContent}>

        <View style={recommandedStyles.tabContainer}>
          {['All', 'Workouts', 'Drills'].map(tab => (
            <TouchableOpacity
              key={tab}
              style={[
                recommandedStyles.tab,
                { backgroundColor: selectedTab === tab ? '#BBF246' : 'white' },
                {borderColor : selectedTab !== tab ? "#192126" : 'white' }
              ]}
              onPress={() => setSelectedTab(tab)}
            >
              <Text
                style={[
                  recommandedStyles.tabText,
                  { color: selectedTab === tab ? '#192126' : '#192126' }
                ]}
              >
                {tab}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Recommended Workouts */}
        {selectedTab === 'All' || selectedTab === 'Workouts' ? (
          <>
            <Text style={recommandedStyles.sectionTitle}>Recommended Workouts</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {Array(4)
                .fill(0)
                .map((_, index) => (
                  <View key={index} style={recommandedStyles.cardContainer}>
                    <Icon name="hand-heart-outline" style={recommandedStyles.cardIcon} />
                    <View style={recommandedStyles.cardContent}>
                      <Text style={recommandedStyles.progressText}>02/10</Text>
                      <Text style={recommandedStyles.boldText}>Core Strength</Text>
                      <Text style={recommandedStyles.smallText}>
                        Plank Variations, Side Planks, Russian Twists, And
                        Medicine Ball Throws Can I...
                      </Text>
                    </View>
                  </View>
                ))}
            </ScrollView>
          </>
        ) : null}

        {/* Recommended Drills */}
        {selectedTab === 'All' || selectedTab === 'Drills' ? (
          <>
            <Text style={recommandedStyles.sectionTitle}>Recommended Drills</Text>
            <View style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-around' }}>
        <View style={recommandedStyles.cardContainer}>
          <ImageBackground
            source={{ uri: 'https://images.unsplash.com/photo-1570129477492-45c003edd2be' }}
            style={recommandedStyles.cardImage}
            imageStyle={{ borderRadius: 10 }}
          >
            <Icon name="play-circle" size={wp('10%')} color="white" style={recommandedStyles.playIcon} />
            <Text style={recommandedStyles.cardTitle}>Weight Transfer Drill</Text>
          </ImageBackground>
          <View style={recommandedStyles.cardContent}>
            <Text style={recommandedStyles.smallText}>Watch video to get it fixed</Text>
          </View>
        </View>
        {Array(3).fill(0).map((_, index) => (
          <View key={index} style={recommandedStyles.cardContainer}>
            <Icon name="golf" size={wp('10%')} color="black" style={recommandedStyles.cardIcon} />
            <View style={recommandedStyles.cardContent}>
              <Text style={recommandedStyles.cardText}>Weight Transfer Drill</Text>
              <Text style={recommandedStyles.smallText}>Place a tee behind your left heel (for a right-handed golfer)...</Text>
            </View>
          </View>
        ))}
      </View>
          </>
        ) : null}

        {/* Recommended Tutorials */}
        {selectedTab === 'All' ? (
          <>
            <Text style={recommandedStyles.sectionTitle}>Recommended Tutorials</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              {Array(3).fill(0).map((_, index) => (
            <VideoCardComponent
            imageUri="https://example.com/image.jpg"
            title="Why you lose Balance in Golf?"
            author="Raymond Reddington"
            duration="4 Min"
            index={index}
          />
              ))}
            </ScrollView>
          </>
        ) : null}
        </ScrollView>
      </View>
  );
};

export default RecommendedView;
