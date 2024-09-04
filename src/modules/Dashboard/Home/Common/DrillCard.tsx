// DrillCard.tsx
import React from 'react';
import { View, ImageBackground, Text, TouchableOpacity, Image, ActivityIndicator } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/AntDesign';

export interface DrillCardProps {
  title: string;
  description: string;
  navigateTo: {
    routeName: string;
    params: any;
  };
  url: string;
}

export const DrillCard: React.FC<DrillCardProps> = ({ title, description, navigateTo, url }) => {
  const navigation = useNavigation();
  const [loading, setLoading] = React.useState(true);

  const playVideo = () => {
    if (navigateTo) {
      navigation.navigate(navigateTo.routeName, navigateTo.params);
    }
  };

  return (
    <TouchableOpacity
      style={recommendedStyles.cardContainer}
      onPress={playVideo}
    >
    <Image
      source={require('../../../../assets/Images/onBoarding.jpg')}
      resizeMode="cover"
      style={recommendedStyles.cardImage}
      onLoadEnd={() => setLoading(false)}
      />
      {/* <Image
        source={"../../../../assets/Images/DTL.png"}
        style={recommendedStyles.cardImage}
        imageStyle={{ borderRadius: 10 }}
        onLoadEnd={() => setLoading(false)}
        onError={() => setLoading(false)}
      > */}
        {loading && <ActivityIndicator size="large" color="#fff" style={recommendedStyles.loader} />}
        <TouchableOpacity onPress={playVideo} style={recommendedStyles.playIcon}>
          <Icon name="playcircleo" size={30} color="white" />
        </TouchableOpacity>
    
    </TouchableOpacity>
  );
};
// DrillCardStyle.ts
import { StyleSheet } from 'react-native';

 const recommendedStyles = StyleSheet.create({
  cardContainer: {
    width: 200, // Adjust width
    height: 120, // Adjust height
    margin: 10,
    borderRadius: 10,
    overflow: 'hidden',
    backgroundColor:'green'
  },
  cardImage: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    height:100,
    width:200
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
});
