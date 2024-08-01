import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import CustomHeader from '../../../shared/Component/CustomHeader';
import { goBack } from '../../../shared/Utils/navigationRef';
import LottieView from 'lottie-react-native';
import { GetWorkoutListAPICall, UpdateWorkoutListAPICall } from './APICalls/WorkoutAPI';
import { ShowToast } from '../../../components/ShowToast';
import Button from '../../../components/Button';
import ProgressLoader from '../../../components/ProgressLoader';
import { useLoader } from '../../../config/LoaderContext';

const workoutIcon = require('../../../assets/Images/workoutIcon.png');
const checkIcon = require('../../../assets/Images/checkIcon.png');
const checkIconSelected = require('../../../assets/Images/selectedCheckIcon.png');
const workoutImage = require('../../../assets/Images/workout.png');

const WorkoutView = (props: any) => {
  const { route, navigation } = props;
  const { video_id, type, category } = route.params;
  const [selectedWorkouts, setSelectedWorkouts] = useState<string[]>([]);
  const [workouts, setWorkouts] = useState<{ [key: string]: boolean }>({});
  const { loading, setLoading } = useLoader();
  console.log("Workout screeen params", route.params);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const response = await GetWorkoutListAPICall(video_id);

      if (response.status === 200) {
        setWorkouts(response.data.workout);
        setLoading(false);
      } else {
        ShowToast('error', response.message);
        setLoading(false);
        console.error(response.message);
      }
    };
    fetchData();
    return () => {
      setWorkouts({});
    };
  }, [video_id, category]);

  const toggleWorkoutSelection = async (workout: string) => {
    if (!workouts[workout]) {
      const updatedWorkouts = { ...workouts, [workout]: true };
      setWorkouts(updatedWorkouts);

      const payload = {
        id: video_id,
        category,
        type,
        workout: updatedWorkouts,
      };

      const response = await UpdateWorkoutListAPICall(payload);

      if (response.status === 200 && response.message !== 'Unable to update workout.') {
        ShowToast('success', 'Workout updated successfully!');
        navigation.navigate('Congratulation');
      } else {
        ShowToast('error', response.message);
        console.error(response.message);
      }
    } else {
      ShowToast('info', 'This workout is already selected.');
    }
  };

  if (loading) {
    return <ProgressLoader />;
  }

  const handleMarkAsDone = async () => {
    const updatedWorkouts = Object.keys(workouts).reduce((acc, key) => {
      acc[key] = true;
      return acc;
    }, {} as { [key: string]: boolean });

    setWorkouts(updatedWorkouts);
    setSelectedWorkouts(Object.keys(updatedWorkouts));

    const payload = {
      id: video_id,
      category,
      type,
      workout: updatedWorkouts,
    };
    const response = await UpdateWorkoutListAPICall(payload);

    if (response.status === 200 && response.message !== 'Unable to update workout.') {
      ShowToast('success', 'All workouts marked as done!');
      navigation.navigate('Congratulation');
    } else {
      ShowToast('error', response.message);
      console.error(response.message);
    }
  };

  const renderItem = ({ item }: { item: string }) => (
    <TouchableOpacity
      style={styles.workoutItem}
      onPress={() => toggleWorkoutSelection(item)}
    >
      <View style={styles.workoutLeft}>
        <Image source={workoutIcon} style={styles.workoutIcon} />
        <Text style={styles.workoutText}>{item}</Text>
      </View>
      <Image
        source={workouts[item] ? checkIconSelected : checkIcon}
        style={styles.checkIcon}
      />
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <CustomHeader onBackPress={goBack} title={type} />

      <ScrollView contentContainerStyle={styles.contentContainer}
        scrollIndicatorInsets={{ right: 1 }}>
        <View style={styles.imageView}>
          <LottieView
            style={styles.image}
            source={require('../../../assets/animations/Plank.json')}
            autoPlay
            loop
          />
        </View>
        <Text style={styles.workoutTitle}>
          {'Workout Detail'}
        </Text>
        <Text style={styles.detail}>
          The lower abdomen and hips are the most difficult areas of the body to
          reduce when we are on a diet. Even so, in this area, especially the
          legs as a whole, you can reduce weight even if you don’t use tools.
        </Text>
        {Object.keys(workouts).length > 0 ? (
          <View style={styles.workoutsContainer}>
            <FlatList
              data={Object.keys(workouts)}
              renderItem={renderItem}
              keyExtractor={(item) => item}
            />
            <View style={styles.buttonContainer}>
              <Button
                title="Mark as Done"
                onPress={handleMarkAsDone}
                buttonStyle={styles.markAsDoneButton}
                textStyle={styles.buttonText}
              />
            </View>
          </View>
        ) : (
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>
              No record found at the moment. Please check back later!
            </Text>
          </View>
        )}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  contentContainer: {
    padding: wp('5%'),
  },
  imageView: {
    width: wp('90%'),
    height: wp('50%'),
    backgroundColor: '#F6FFE7',
    marginBottom: hp('2%'),
  },
  image: {
    width: '100%',
    height: '100%',
  },
  workoutTitle: {
    fontSize: wp('5%'),
    fontFamily: 'Outfit-Bold',
    marginBottom: hp('2%'),
    color: '#192126',
  },
  detail: {
    fontSize: wp('4%'),
    fontFamily: 'Outfit-Regular',
    marginBottom: hp('4%'),
    color: '#192126CC',
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
    color: '#232732',
    fontFamily: 'Outfit-SemiBold',
  },
  checkIcon: {
    width: wp('6%'),
    height: wp('6%'),
    resizeMode: 'contain',
  },
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: hp('10%'),
  },
  emptyText: {
    fontSize: wp('4%'),
    color: '#FF474C',
    textAlign: 'center',
  },
  buttonContainer: {
    width: '100%',
    alignItems: 'center',
    marginTop: hp('4%'),
    marginBottom: hp('10%'),
  },
  markAsDoneButton: {
    backgroundColor: '#c5f048',
    borderRadius: 25,
    paddingVertical: hp('1.5%'),
    paddingHorizontal: wp('31%'),
  },
  buttonText: {
    color: '#192126',
    fontFamily: 'Outfit-SemiBold',
    fontSize: wp('4.2%'),
  },
});

export default WorkoutView;
