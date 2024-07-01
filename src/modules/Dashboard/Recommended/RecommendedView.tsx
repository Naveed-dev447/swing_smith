import React, { useState } from 'react';
import { View, Text, ScrollView, Image, TouchableOpacity,ImageBackground } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import recommandedStyles from './styles';


const RecommendedView: React.FC = () => {
  const [selectedTab, setSelectedTab] = useState('All');

  return (
    <ScrollView contentContainerStyle={recommandedStyles.scrollViewContent}>
      <View style={recommandedStyles.container}>
        {/* Header */}
        <View style={recommandedStyles.headerContainer}>
          <TouchableOpacity>
            <Icon name="arrow-left" style={recommandedStyles.headerIcon} />
          </TouchableOpacity>
          <Text style={recommandedStyles.headerText}>Recommended</Text>
          <TouchableOpacity>
            <Icon name="ellipsis-h" style={recommandedStyles.headerIcon} />
          </TouchableOpacity>
        </View>

        {/* Tabs */}
        <View style={recommandedStyles.tabContainer}>
          {['All', 'Workouts', 'Drills'].map(tab => (
            <TouchableOpacity
              key={tab}
              style={[
                recommandedStyles.tab,
                { backgroundColor: selectedTab === tab ? 'limegreen' : 'white' }
              ]}
              onPress={() => setSelectedTab(tab)}
            >
              <Text
                style={[
                  recommandedStyles.tabText,
                  { color: selectedTab === tab ? 'black' : 'gray' }
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
                    <Icon name="heartbeat" style={recommandedStyles.cardIcon} />
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
                <View key={index} style={recommandedStyles.cardContainer}>
                  <Image source={{ uri: 'https://via.placeholder.com/150' }} style={recommandedStyles.cardImage} />
                  <View style={recommandedStyles.cardContent}>
                    <Text style={recommandedStyles.cardText}>Why you lose Balance in Golf?</Text>
                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                      <Icon name="play-circle" style={{ ...recommandedStyles.headerIcon, color: 'limegreen' }} />
                      <Text style={recommandedStyles.cardText}>Raymond Reddington</Text>
                      <Text style={recommandedStyles.cardText}>4 Min</Text>
                    </View>
                  </View>
                </View>
              ))}
            </ScrollView>
          </>
        ) : null}
      </View>
    </ScrollView>
  );
};

export default RecommendedView;
