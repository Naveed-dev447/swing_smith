import React from 'react';
import { TouchableOpacity, View, Text, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Svg, { Circle } from 'react-native-svg';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';

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
  score,
  navigateTo,
}) => {
  const navigation = useNavigation();
  const [currentScore, totalScore] = score.split('/').map(Number);
  const progressValue = (currentScore / totalScore) * 100;
  const radius = 45;
  const strokeWidth = 10;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (circumference * progressValue) / 100;

  return (
    <TouchableOpacity
      onPress={() =>
        navigation.navigate(navigateTo?.routeName, navigateTo.params)
      }
      style={{
        width: wp('40%'),
        marginRight: wp('4%'),
        padding: 10,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#ddd',
        backgroundColor: '#fff',
        alignItems: 'center',
      }}
    >
      <View style={{ alignItems: 'center', marginVertical: '2%' }}>
        <Svg height="100" width="100" viewBox="0 0 100 100">
          <Circle
            cx="50"
            cy="50"
            r={radius}
            stroke="#e6e6e6"
            strokeWidth={strokeWidth}
            fill="none"
          />
          <Circle
            cx="50"
            cy="50"
            r={radius}
            stroke="#a6f6b8"
            strokeWidth={strokeWidth}
            fill="none"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
          />
        </Svg>
        <Text
          style={{
            position: 'absolute',
            color: '#192126',
            fontFamily: 'Outfit-SemiBold',
            fontSize: 18,
          }}
        >
          {score}
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
