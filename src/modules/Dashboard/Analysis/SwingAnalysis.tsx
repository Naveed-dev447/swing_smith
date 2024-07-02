import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import React from 'react'
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
  } from 'react-native-responsive-screen';

const SwingAnalysis  = (props: any) => {
    const { route, navigation } = props;
    const handleMarkAsDone = () => {
        navigation.navigate('OnboardHome8');
      };
  return (
    <View>
      <Text>SwingAnalysis</Text>
      <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.markAsDoneButton}
            onPress={handleMarkAsDone}
          >
            <Text style={styles.buttonText}>Mark as Done</Text>
          </TouchableOpacity>
        </View>
    </View>
  )
}

export default SwingAnalysis

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
    },
    contentContainer: {
      padding: wp('5%'),
    },
    image: {
      width: wp('90%'),
      height: wp('50%'),
      marginBottom: hp('2%'),
    },
    workoutTitle: {
      fontSize: wp('5%'),
      fontWeight: 'bold',
      marginBottom: hp('2%'),
      color: 'black',
    },
    detail: {
      fontSize: wp('4%'),
      textAlign: 'center',
      marginBottom: hp('4%'),
      color: 'black',
    },
    workoutsContainer: {
      width: '100%',
      marginBottom: hp('4%'),
    },
    workoutItem: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: wp('3%'),
      borderRadius: 8,
      backgroundColor: '#f0f0f0',
      marginBottom: hp('1%'),
    },
    workoutLeft: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    workoutIcon: {
      width: wp('8%'),
      height: wp('8%'),
      resizeMode: 'contain',
      marginRight: wp('4%'),
    },
    workoutText: {
      fontSize: wp('4%'),
      color: 'black',
    },
    checkIcon: {
      width: wp('6%'),
      height: wp('6%'),
      resizeMode: 'contain',
    },
    buttonContainer: {
      width: '100%',
      alignItems: 'center',
      marginBottom: hp('10%'),
    },
    markAsDoneButton: {
      backgroundColor: '#c5f048',
      borderRadius: 25,
      paddingVertical: hp('1.5%'),
      paddingHorizontal: wp('31%'),
    },
    buttonText: {
      color: 'black',
      fontSize: wp('4.2%'),
      fontWeight: '600',
    },
  });
  