import React from 'react';
import {
  ScrollView,
  StyleSheet,
  View,
  Text,
  Image,
  TouchableOpacity,
  ImageBackground,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import IconFontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import globalStyles from '../styles';

export const Header: React.FC<{ toggleModal: () => void, name: string, address: string }> = ({ toggleModal, name, address }) => (
  <View>
    <View style={globalStyles.headerContainer}>
      <TouchableOpacity onPress={toggleModal}>
        <Image
          source={require('../../../../assets/Images/tiles.png')}
          style={globalStyles.tiles}
        />
      </TouchableOpacity>
      <Icon name="account-circle" style={globalStyles.headerIcon} />
    </View>
    <Text style={globalStyles.headerText}>{name}</Text>
    <Text style={globalStyles.subHeader}>{address}</Text>
  </View>
);
export const Banner: React.FC = () => (
  <ImageBackground
    source={{
      uri: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644',
    }}
    style={{
      width: '100%',
      height: hp('20%'),
      borderRadius: wp('2%'),
      marginTop: hp('2%'),
    }}
    resizeMode="cover">
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text style={globalStyles.bannerText}>
        Golf is 90% inspiration, 10% perspiration
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
  imageUri: string;
  onPress: () => void;
}> = ({ score, postureScore, swingRhythm, imageUri, onPress }) => (
  <TouchableOpacity onPress={onPress} style={[styles.analysisCard, { marginRight: wp('2%') }]}>
    <ImageBackground
      source={{ uri: imageUri }}
      style={styles.analysisCardImage}
      imageStyle={{ borderRadius: wp('2%') }}>
      <View style={styles.overlay}>
        <Text style={styles.scoreText}>Score</Text>
        <Text style={styles.scoreValue}>{score}</Text>
        <View style={styles.scoreDetail}>
          <Text style={styles.detailText}>Posture Score {postureScore}</Text>
        </View>
        <View style={styles.scoreDetail}>
          <Text style={styles.detailText}>Swing Rhythm {swingRhythm}</Text>
        </View>
      </View>
    </ImageBackground>
  </TouchableOpacity>
);

export const UploadSwing: React.FC = () => (
  <View style={globalStyles.uploadSwingContainer}>
    <ImageBackground
      source={{
        uri: 'https://images.unsplash.com/photo-1570129477492-45c003edd2be',
      }}
      style={globalStyles.uploadSwingImage}
      resizeMode="cover"
      imageStyle={{ borderRadius: wp('2%') }}>
      <Text style={globalStyles.bannerText}>Import Swing</Text>
      <Text style={globalStyles.swingDesText}>
        Record your Swing and receive analysis.
      </Text>
      <TouchableOpacity style={globalStyles.uploadButton}>
        <Text style={globalStyles.uploadButtonText}>Upload</Text>
      </TouchableOpacity>
    </ImageBackground>
  </View>
);

interface SectionProps {
  title: string;
  children: React.ReactNode;
}

export const Section: React.FC<SectionProps> = ({ title, children }) => (
  <View style={globalStyles.recommendedSection}>
    <View style={globalStyles.recommendedHeader}>
      <Text style={globalStyles.recommendedTitle}>{title}</Text>
      <TouchableOpacity>
        <Text style={globalStyles.seeAll}>See All</Text>
      </TouchableOpacity>
    </View>
    {children}
  </View>
);

interface WorkoutCardProps {
  title: string;
  progress: string;
}

export const WorkoutCard: React.FC<WorkoutCardProps> = ({ title, progress }) => (
  <View style={[globalStyles.card, { width: wp('40%'), marginRight: wp('2%') }]}>
    <Icon name="dumbbell" size={wp('10%')} color="#000" />
    <Text>{progress}</Text>
    <Text>{title}</Text>
  </View>
);

interface DrillCardProps {
  title: string;
}

export const DrillCard: React.FC<DrillCardProps> = ({ title }) => (
  <View style={[globalStyles.card, { width: wp('40%'), marginRight: wp('2%') }]}>
    <Icon name="golf" size={30} color="#000" />
    <Text>{title}</Text>
    <TouchableOpacity style={globalStyles.markAsDoneButton}>
      <Text style={globalStyles.markAsDoneText}>Mark As Done</Text>
    </TouchableOpacity>
  </View>
);

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
      source={{ uri: 'https://images.unsplash.com/photo-1570129477492-45c003edd2be' }}
      style={styles.image}
    />
    <Text>{title}</Text>
    <Text>{duration}</Text>
  </View>
);

interface ChallengeCardProps {
  title: string;
  icon: string;
}

export const ChallengeCard: React.FC<ChallengeCardProps> = ({ title, icon }) => (
  <View style={[globalStyles.card, { width: wp('30%'), marginRight: wp('2%') }]}>
    <Icon name={icon} size={wp('10%')} color="#000" />
    <Text>{title}</Text>
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
  onPress: () => void,
  favourite: boolean
}
export const SwingCard: React.FC<SwingCardProps> = ({ score, date, description, type, shot, onPress, favourite }) => {
  return (
    <View style={globalStyles.cardContainer}>
      <ImageBackground
        source={{ uri: 'https://images.unsplash.com/photo-1570129477492-45c003edd2be' }}
        style={globalStyles.image}
        imageStyle={globalStyles.imageStyle}
      >
        <Text style={globalStyles.score}>Score {`\n`} {score}</Text>
        <TouchableOpacity style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)', borderRadius: 15, marginRight: 10, marginBottom: 50 }} onPress={onPress}>
          <Icon name="heart" color={favourite ? "#FF0000" : "#fff"} style={globalStyles.iconHeart} />
        </TouchableOpacity>
      </ImageBackground>
      <View style={globalStyles.analysisView}>
        <Text style={globalStyles.recommendedTitle}>Seeing Analysis</Text>
        <Text style={globalStyles.dateText}>{date}</Text>
      </View>
      <Text style={globalStyles.description}>{description}</Text>
      <View style={globalStyles.detailsContainer}>
        <View style={globalStyles.detailItem}>
          <MaterialCommunityIcons name="golf" size={18} />
          <Text style={globalStyles.detailText}>{type}</Text>
          <MaterialCommunityIcons name="golf" size={18} style={{ marginLeft: '10%' }} />
          <Text style={globalStyles.detailText}>{shot}</Text>
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>View Analysis</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

// export const SwingLog: React.FC<SwingLogProps> = ({ score, analysis, date }) => {
//   return (
//     <View style={globalStyles.swingLog}>
//       <View style={globalStyles.iconRow}>
//         <Text style={globalStyles.score}>Score {score}</Text>
//         <Image style={globalStyles.icon} source={{
//         uri: 'https://images.unsplash.com/photo-1570129477492-45c003edd2be',
//       }}/>
//       </View>
//       <Text style={globalStyles.analysis}>{analysis}</Text>
//       <Text style={globalStyles.date}>{date}</Text>
//       <View style={globalStyles.icons}>
//         <MaterialCommunityIcons name="golf" size={wp('5%')} color="#666" style={globalStyles.smallIcon} />
//         <Icon name="flag" size={wp('5%')} color="#666" style={globalStyles.smallIcon} />
//       </View>
//       <TouchableOpacity style={styles.button}>
//         <Icon name="eye" size={wp('5%')} color="#fff" />
//         <Text style={styles.buttonText}>View Analysis</Text>
//       </TouchableOpacity>
//     </View>
//   );
// };

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
    width: wp('40%'),
    marginHorizontal: wp('2.5%'),
    padding: wp('2.5%'),
    backgroundColor: '#f8f8f8',
    borderRadius: wp('2%'),
    alignItems: 'center',
  },
  image: {
    width: '100%',
    height: hp('12%'),
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
    fontWeight: '600'
  },
  analysisCard: {
    width: wp('80%'),
    height: hp('20%'),
    borderRadius: wp('2%'),
    overflow: 'hidden',
  },
  analysisCardImage: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  overlay: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    padding: wp('3%'),
    borderRadius: wp('2%'),
  },
  scoreText: {
    color: '#fff',
    fontSize: wp('4%'),
    fontWeight: 'bold',
  },
  scoreValue: {
    color: '#fff',
    fontSize: wp('7%'),
    fontWeight: 'bold',
  },
  scoreDetail: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: hp('0.5%'),
  },
  detailText: {
    color: '#fff',
    fontSize: wp('3.5%'),
  },
});
