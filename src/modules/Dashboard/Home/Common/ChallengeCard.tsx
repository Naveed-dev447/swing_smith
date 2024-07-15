import React from 'react';
import {View, Text, Image, StyleSheet} from 'react-native';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

interface ChallengeCardProps {
  title: string;
  imageSource: any;
  backgroundColor: string;
  textColor: string;
}

export const ChallengeCard: React.FC<ChallengeCardProps> = ({title, imageSource, backgroundColor, textColor}) => (
  <View style={[styles.challengeCard, {backgroundColor}]}>
    <Image source={imageSource} style={styles.image} />
    <Text style={[styles.text, {color: textColor}]}>{title}</Text>
  </View>
);

const styles = StyleSheet.create({
  challengeCard: {
    width: wp('30%'),
    height:wp('35%'),
    marginRight: wp('2%'),
    borderRadius: wp('3%'),
    padding: wp('6%'),
    justifyContent: 'center',
    alignItems: 'center',
    // Shadow for iOS
    shadowColor: '#000',
    shadowOffset: {
      width: 2,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    // Shadow for Android
    elevation: 5,
  },
  image: {
    width: wp('15%'),
    height: wp('15%'),
    marginLeft:hp('5%')
  },
  text: {
    fontSize: wp('4%'),
    lineHeight:25,
    fontFamily:'Outfit-Regular'
  },
});
