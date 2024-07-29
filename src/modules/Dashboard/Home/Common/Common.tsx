import React from 'react';
import {
  ScrollView,
  StyleSheet,
  View,
  Text,
  Image,
  TouchableOpacity,
  ImageBackground,
  ImageSourcePropType,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import IconFontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import LinearGradient from 'react-native-linear-gradient';
import globalStyles from '../styles';
import { useNavigation } from '@react-navigation/native';
import recommandedStyles from '../../../../modules/Dashboard/Recommended/styles';

export const Header: React.FC<{
  toggleModal: () => void;
  name: string;
  address?: string;
}> = ({ toggleModal, name, address }) => (
  <View>
    <View style={globalStyles.headerContainer}>
      <TouchableOpacity onPress={toggleModal}>
        <Image
          source={require('../../../../assets/Images/tiles.png')}
          style={globalStyles.tiles}
        />
      </TouchableOpacity>
      <Image
        source={require('../../../../assets/Images/manProfile.png')}
        style={globalStyles.manProfile}
      />
    </View>
    {name && <Text style={globalStyles.headerText}>{name}</Text>}
    {address && (
      <View style={globalStyles.addressContainer}>
        <Image
          source={require('../../../../assets/Images/gps.png')}
          style={globalStyles.locationIcon}
        />
        <Text style={globalStyles.subHeader}>{address}</Text>
      </View>
    )}
  </View>
);

export const Banner: React.FC = () => (
  <ImageBackground
    source={require('../../../../assets/Images/DashBoard/firstImage.png')}
    style={{
      width: '100%',
      height: hp('25%'),
      borderRadius: wp('2%'),
      marginTop: hp('2%'),
      overflow: 'hidden',
    }}
    resizeMode="stretch">
    <View style={{ flex: 1, justifyContent: 'center', padding: wp('4%') }}>
      <Image
        source={require('../../../../assets/Images/DashBoard/overlay.png')}
        style={{
          width: wp('100%'),
          height: hp('25%'),
          position: 'absolute',
        }}
        resizeMode="stretch"
      />
      <Text style={globalStyles.bannerText}>
        Golf is 90% inspiration 10 Percent perspiration
      </Text>
    </View>
  </ImageBackground>
);

export const RecentAnalysis: React.FC = () => (
  <View>
    <Text style={[globalStyles.sectionTitle, { marginTop: hp('2%') }]}>
      Recent Analysis
    </Text>
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      style={{ marginVertical: hp('2%') }}>
      <View style={[globalStyles.analysisCard, { marginRight: wp('2%') }]}>
        <ImageBackground
          source={{
            uri: 'https://images.unsplash.com/photo-1570129477492-45c003edd2be',
          }}
          style={globalStyles.analysisCardImage}
          imageStyle={{ borderRadius: wp('2%') }}>
          <View style={globalStyles.analysisCardContent}>
            <Text style={globalStyles.cardSubtitle}>Score: 7.2</Text>
            <Text>Posture Score: 8.4</Text>
            <Text>Swing Rhythm: 6.0</Text>
          </View>
        </ImageBackground>
      </View>
      <View style={globalStyles.analysisCard}>
        <ImageBackground
          source={{
            uri: 'https://images.unsplash.com/photo-1580587771525-78b9dba3b914',
          }}
          style={globalStyles.analysisCardImage}
          imageStyle={{ borderRadius: wp('2%') }}>
          <Text style={[globalStyles.cardSubtitle, { paddingLeft: wp('4%') }]}>
            Score: 6.2
          </Text>
          <View style={globalStyles.analysisCardContent}>
            <Text>Posture Score: 7.5</Text>
            <Text>Swing Rhythm: 5.0</Text>
          </View>
        </ImageBackground>
      </View>
    </ScrollView>
  </View>
);

export const AnalysisCard: React.FC<{
  score: string;
  postureScore: string;
  swingRhythm: string;
  source: ImageSourcePropType;
  onPress: () => void;
}> = ({ score, postureScore, swingRhythm, source, onPress }) => (
  <View>
    <TouchableOpacity
      onPress={onPress}
      style={[styles.analysisCard, { marginRight: wp('2%') }]}>
      <ImageBackground
        source={source}
        style={styles.analysisCardImage}
        imageStyle={{ borderRadius: wp('2%') }}>
        <View style={styles.overlay}>
          <Text style={styles.scoreText}>Score</Text>
          <Text style={styles.scoreValue}>{score}</Text>
          <View style={styles.scoreDetail}>
            <Image
              source={require('../../../../assets/Images/DashBoard/fire.png')}
              style={styles.icon}
            />
            <Text style={styles.detailText}>
              Posture Score{' '}
              <Text style={styles.detailScoreText}>{postureScore}</Text>
            </Text>
          </View>
          <View style={styles.scoreDetail}>
            <Image
              source={require('../../../../assets/Images/DashBoard/clock.png')}
              style={styles.icon}
            />
            <Text style={styles.detailText}>
              Swing Rhythm{' '}
              <Text style={styles.detailScoreText}>{swingRhythm}</Text>
            </Text>
          </View>
        </View>
      </ImageBackground>
    </TouchableOpacity>
  </View>
);

export const UploadSwing: React.FC<{ onClick: () => void }> = ({ onClick }) => (
  <ImageBackground
    source={require('../../../../assets/Images/DashBoard/swingsImage.png')}
    style={globalStyles.uploadSwingImage}
    resizeMode="cover"
    imageStyle={{ borderRadius: wp('2%') }}>
    <View style={styles.overlaySwing}>
      <Text style={globalStyles.uploadSwingText}>Import Swing</Text>
      <Text style={globalStyles.swingDesText}>
        Record your Swing and receive analysis.
      </Text>
      <TouchableOpacity style={globalStyles.uploadButton} onPress={onClick}>
        <Text style={globalStyles.uploadButtonText}>Upload</Text>
      </TouchableOpacity>
    </View>
  </ImageBackground>
);

interface SectionProps {
  title: string;
  children: React.ReactNode;
}

export const Section: React.FC<SectionProps> = ({ title, children }) => (
  <View style={globalStyles.recommendedSection}>
    <View style={globalStyles.recommendedHeader}>
      <Text style={globalStyles.recommendedTitle}>{title}</Text>
    </View>
    {children}
  </View>
);

interface WorkoutCardProps {
  title: string;
  progress: string;
  icon?: string;
  description: string;
  score: string;
  navigateTo: {
    routeName: string;
    params: {
      video_id: string;
      type: string;
      category: string;
    };
  };
}

interface WorkoutCardProps {
  title: string;
  progress: string;
  icon: string;
  description: string;
  score: string;
  navigateTo: { routeName: string; params?: object };
}

export const WorkoutCard: React.FC<WorkoutCardProps> = ({
  title,
  progress,
  icon,
  description,
  navigateTo,
}) => {
  const navigation = useNavigation();

  return (
    <TouchableOpacity
      onPress={() =>
        navigation.navigate(navigateTo?.routeName, navigateTo.params)
      }
      style={[globalStyles.card, { width: wp('40%'), marginRight: wp('4%') }]}>
      <View style={{ marginVertical: '2%' }}>
        <Image
          source={require('../../../../assets/Images/GraphPie.png')}
          style={globalStyles.graphPieIcon}
        />
      </View>
      <View style={{ marginVertical: '2%' }}>
        <Text style={{ color: '#192126', fontFamily: 'Outfit-Regular' }}>
          {progress}
        </Text>
      </View>
      <View style={{ marginVertical: '1%' }}>
        <Text
          style={{
            color: '#192126',
            fontFamily: 'Outfit-SemiBold',
            textAlign: 'center',
          }}
          numberOfLines={1}
          ellipsizeMode="tail"
        >
          {title}
        </Text>
      </View>
      <View style={{ marginVertical: '1%' }}>
        <Text
          style={{
            color: '#192126',
            fontFamily: 'Outfit-Regular',
            textAlign: 'center',
          }}
          numberOfLines={2}
          ellipsizeMode="tail"
        >
          {description}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

interface DrillCardProps {
  title: string;
  description: string
  navigateTo: {
    routeName: string;
    params: {
      video_id: string;
      type: string;
      category: string;
    };
  };
}

export const DrillCard: React.FC<DrillCardProps> = ({ title, description, navigateTo }) => {
  const navigation = useNavigation();

  const handlePress = () => {
    navigation.navigate(navigateTo.routeName, navigateTo.params);
  };

  return (
    <TouchableOpacity
      style={recommandedStyles.cardContainer}
      onPress={handlePress}
    >
      <Image
        source={require('../../../../assets/Images/DashBoard/golfman.png')}
        style={recommandedStyles.cardIcon}
      />
      <View style={recommandedStyles.cardContent}>
        <Text style={recommandedStyles.cardText}>
          {title}
        </Text>
        <Text style={recommandedStyles.cardSmallText} numberOfLines={3}
        >
          {description}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

interface TutorialCardProps {
  title: string;
  duration: string;
}

export const TutorialCard: React.FC<TutorialCardProps> = ({
  title,
  duration,
}) => (
  <View style={styles.card}>
    <Image
      source={require('../../../../assets/Images/DashBoard/swingsImage.png')}
      resizeMode="stretch"
      style={styles.image}
    />
    <Text>{title}</Text>
    <Text>{duration}</Text>
  </View>
);

export const HorizontalScroll: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => (
  <ScrollView horizontal showsHorizontalScrollIndicator={false}>
    {children}
  </ScrollView>
);

export interface SwingCardProps {
  score: number;
  date: string;
  description: string;
  type: string;
  shot: string;
  navigate: () => void;
}
export const SwingCard: React.FC<SwingCardProps> = ({
  score,
  date,
  description,
  type,
  shot,
  navigate,
}) => {
  return (
    <View style={globalStyles.cardContainer}>
      <ImageBackground
        source={require('../../../../assets/Images/DashBoard/swingLog/swingLog1.png')}
        style={globalStyles.image}
        imageStyle={globalStyles.imageStyle}>
        <Text style={globalStyles.score}>
          Score {`\n`} {score}
        </Text>
        <TouchableOpacity
          style={{
            backgroundColor: '#FFFFFF4D',
            borderRadius: 35,
            marginRight: 10,
            marginBottom: 60,
          }}></TouchableOpacity>
      </ImageBackground>
      <View style={globalStyles.analysisView}>
        <Text style={globalStyles.recommendedTitle}>Swing Analysis</Text>
        <View style={globalStyles.swinglogDateContainer}>
          <Image
            source={require('../../../../assets/Images/calendar.png')}
            style={globalStyles.swinglogCalendarIcon}
          />
          <Text style={globalStyles.dateText}>{date}</Text>
        </View>
      </View>
      <Text style={globalStyles.description}>{description}</Text>
      <View style={globalStyles.detailsContainer}>
        <View style={globalStyles.detailItem}>
          <Image
            source={require('../../../../assets/Images/swingIron.png')}
            style={globalStyles.swinglogGolfIcon}
          />
          <Text style={globalStyles.detailText}>{type}</Text>
          <Image
            source={require('../../../../assets/Images/swingIron.png')}
            style={[globalStyles.swinglogGolfIcon, { marginLeft: '10%' }]}
          />
          <Text style={globalStyles.detailText}>{shot}</Text>
          <TouchableOpacity style={styles.button} onPress={navigate}>
            <Text style={styles.buttonText}>View Analysis</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  section: {
    marginVertical: hp('1%'),
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: wp('2.5%'),
  },
  sectionTitle: {
    fontSize: wp('4.5%'),
    fontWeight: 'bold',
  },
  seeAll: {
    color: '#1E90FF',
  },
  card: {
    width: wp('70%'),
    padding: wp('2%'),
    borderRadius: wp('2%'),
    alignItems: 'center',
  },
  image: {
    width: '100%',
    height: hp('20%'),
    borderRadius: wp('2%'),
  },
  button: {
    marginLeft: wp('5%'),
    paddingVertical: hp('1%'),
    paddingHorizontal: wp('9%'),
    backgroundColor: '#BBF246',
    borderRadius: wp('5%'),
  },
  buttonText: {
    color: '#192126',
    fontFamily: 'Poppins-Medium',
  },
  analysisCard: {
    width: wp('50%'),
    height: hp('20%'),
    borderRadius: wp('2%'),
    overflow: 'hidden',
  },
  analysisCardImage: {
    flex: 1,
    width: wp('50%'),
  },
  overlay: {
    padding: wp('3%'),
    borderRadius: wp('2%'),
  },
  scoreText: {
    color: '#ffffff',
    fontSize: wp('6%'),
    fontFamily: 'Outfit-Bold',
  },
  scoreValue: {
    color: '#ffffff',
    fontSize: wp('6%'),
    fontFamily: 'Outfit-Bold',
  },
  scoreDetail: {
    flexDirection: 'row',
    width: wp('40%'),
    alignItems: 'center',
    marginVertical: hp('0.5%'),
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    padding: wp('1%'),
    borderRadius: wp('4%'),
  },
  detailText: {
    fontSize: wp('3%'),
    color: '#192126',
    marginLeft: wp('2%'),
    fontFamily: 'Outfit-Regular',
  },
  detailScoreText: {
    fontSize: wp('3%'),
    color: '#192126',
    fontFamily: 'Outfit-SemiBold',
  },
  icon: {
    width: wp('4%'),
    height: wp('4%'),
    resizeMode: 'contain',
  },
  overlaySwing: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: wp('100%'),
  },
});
