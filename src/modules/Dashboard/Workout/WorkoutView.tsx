import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import CustomHeader from '../../../shared/Component/CustomHeader';
import { goBack } from '../../../shared/Utils/navigationRef';

const workoutIcon = require('../../../assets/Images/workoutIcon.png');
const checkIcon = require('../../../assets/Images/checkIcon.png'); 
const checkIconSelected = require('../../../assets/Images/selectedCheckIcon.png'); 
const workoutImage = require('../../../assets/Images/workout.png'); 

const WorkoutView = (props: any) => {
  const { route, navigation } = props;
  const [selectedWorkout, setSelectedWorkout] = useState<string | null>(null);

  const toggleWorkoutSelection = (workout: string) => {
    setSelectedWorkout((prevSelected) =>
      prevSelected === workout ? null : workout
    );
  };
  const handleMarkAsDone = () => {
    console.log('Selected Workout:', selectedWorkout);
    navigation.navigate('OnboardHome8');
  };

  return (
    <View style={styles.container}>
      <CustomHeader onBackPress={goBack} title='Core Strength'/>

      <ScrollView contentContainerStyle={styles.contentContainer}>
        <Image source={workoutImage} style={styles.image} />
        <Text style={styles.workoutTitle}>Workout Detail</Text>
        <Text style={styles.detail}>
          The lower abdomen and hips are the most difficult areas of the body to
          reduce when we are on a diet. Even so, in this area, especially the
          legs as a whole, you can reduce weight even if you don’t use tools.
        </Text>
        <View style={styles.workoutsContainer}>
          {['Side Plank', 'Russian Twists', 'Plank', 'Crunches'].map(
            (workout, index) => (
              <TouchableOpacity
                key={index}
                style={styles.workoutItem}
                onPress={() => toggleWorkoutSelection(workout)}
              >
                <View style={styles.workoutLeft}>
                  <Image source={workoutIcon} style={styles.workoutIcon} />
                  <Text style={styles.workoutText}>{workout}</Text>
                </View>
                <Image
                  source={
                    selectedWorkout === workout
                      ? checkIconSelected
                      : checkIcon
                  }
                  style={styles.checkIcon}
                />
              </TouchableOpacity>
            ),
          )}
        </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.markAsDoneButton}
            onPress={handleMarkAsDone}
          >
            <Text style={styles.buttonText}>Mark as Done</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

export default WorkoutView;

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
