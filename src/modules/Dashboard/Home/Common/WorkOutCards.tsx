import React from 'react';
import { View, ImageBackground, Text, TouchableOpacity, ActivityIndicator, StyleSheet, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/AntDesign';

export interface WorkoutCardProps {
  title: string;
  description: string;
  navigateTo: {
    routeName: string;
    params: any;
  };
  url: string; // URL of the video or thumbnail
}

export const WorkoutCard: React.FC<WorkoutCardProps> = ({ title, description, navigateTo, url }) => {
  const navigation = useNavigation();
  const [loading, setLoading] = React.useState(true);

  const playVideo = () => {
    if (navigateTo) {
      navigation.navigate(navigateTo.routeName, navigateTo.params);
    }
  };

  return (
    <TouchableOpacity
      style={styles.cardContainer}
      onPress={playVideo}
    >
    <Image
      source={require('../../../../assets/Images/importSwing.png')}
      resizeMode="cover"
      style={styles.cardImage}
      onLoadEnd={() => setLoading(false)}
      />
      {/* <ImageBackground
        source={{ uri: url }}
        style={styles.cardImage}
        onLoadEnd={() => setLoading(false)}
        imageStyle={{ borderRadius: 10 }}
      > */}
        {loading && <ActivityIndicator size="large" color="#fff" style={styles.loader} />}
        <TouchableOpacity onPress={playVideo} style={styles.playIcon}>
          <Icon name="playcircleo" size={30} color="white" />
        </TouchableOpacity>
       
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    width: 200, // Adjust width
    height: 120, // Adjust height
    margin: 10,
    borderRadius: 10,
    overflow: 'hidden',
    backgroundColor: 'green',
  },
  cardImage: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
    width: '100%',
  },
  playIcon: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: [{ translateX: -15 }, { translateY: -15 }],
  },
  loader: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: [{ translateX: -15 }, { translateY: -15 }],
  },
  overlayBottom: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 10,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  titleOverlay: {
    color: '#ffffff',
    fontSize: 14,
    fontFamily: 'Outfit-Bold',
  },
  descriptionOverlay: {
    color: '#ffffff',
    fontSize: 12,
    fontFamily: 'Outfit-Regular',
  },
});

export default WorkoutCard;
