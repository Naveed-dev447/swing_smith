// import React, {useState} from 'react';
// import {
//   StyleSheet,
//   Text,
//   View,
//   Image,
//   ScrollView,
//   TouchableOpacity,
// } from 'react-native';
// import {
//   widthPercentageToDP as wp,
//   heightPercentageToDP as hp,
// } from 'react-native-responsive-screen';
// import CustomHeader from '../../../shared/Component/CustomHeader';
// import {goBack} from '../../../shared/Utils/navigationRef';

// const workoutIcon = require('../../../assets/Images/workoutIcon.png');
// const checkIcon = require('../../../assets/Images/checkIcon.png');
// const checkIconSelected = require('../../../assets/Images/selectedCheckIcon.png');
// const workoutImage = require('../../../assets/Images/workout.png');
// import LottieView from 'lottie-react-native';

// const workouts = ['Side Plank', 'Russian Twists', 'Plank', 'Crunches'];

// const Flexibility = (props: any) => {
//   const {route, navigation} = props;
//   const [selectedWorkouts, setSelectedWorkouts] = useState<string[]>([]);

//   const toggleWorkoutSelection = (workout: string) => {
//     setSelectedWorkouts(prevSelected => {
//       if (!prevSelected.includes(workout)) {
//         return [...prevSelected, workout];
//       }
//       return prevSelected;
//     });
//   };

//   const handleMarkAsDone = () => {
//     setSelectedWorkouts(workouts);
//     console.log('Selected Workouts:', workouts);
//     // navigation.navigate('OnboardHome8');
//   };

//   return (
//     <View style={styles.container}>
//       <CustomHeader onBackPress={goBack} title="Flexibilty" />

//       <ScrollView contentContainerStyle={styles.contentContainer}>
//         <View style={styles.imageView}>
//           <LottieView
//             style={styles.image}
//             source={require('../../../assets/animations/Plank.json')}
//             autoPlay
//             loop
//           />
//         </View>
//         <Text style={styles.workoutTitle}>Flexibility Detail</Text>
//         <Text style={styles.detail}>
//           The lower abdomen and hips are the most difficult areas of the body to
//           reduce when we are on a diet. Even so, in this area, especially the
//           legs as a whole, you can reduce weight even if you don’t use tools.
//         </Text>
//         <View style={styles.workoutsContainer}>
//           {workouts.map((workout, index) => (
//             <TouchableOpacity
//               key={index}
//               style={styles.workoutItem}
//               onPress={() => toggleWorkoutSelection(workout)}>
//               <View style={styles.workoutLeft}>
//                 <Image source={workoutIcon} style={styles.workoutIcon} />
//                 <Text style={styles.workoutText}>{workout}</Text>
//               </View>
//               <Image
//                 source={
//                   selectedWorkouts.includes(workout)
//                     ? checkIconSelected
//                     : checkIcon
//                 }
//                 style={styles.checkIcon}
//               />
//             </TouchableOpacity>
//           ))}
//         </View>
//       </ScrollView>
//     </View>
//   );
// };

// export default Flexibility;

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//   },
//   contentContainer: {
//     padding: wp('5%'),
//   },
//   image: {
//     width: wp('90%'),
//     height: wp('50%'),
//   },
//   imageView: {
//     width: wp('90%'),
//     height: wp('50%'),
//     backgroundColor: '#F6FFE7',
//     marginBottom: hp('2%'),
//   },
//   workoutTitle: {
//     fontSize: wp('5%'),
//     fontFamily: 'Outfit-Bold',
//     marginBottom: hp('2%'),
//     color: '#192126',
//   },
//   detail: {
//     fontSize: wp('4%'),
//     fontFamily: 'Outfit-Regular',
//     marginBottom: hp('4%'),
//     color: '#192126CC',
//   },
//   workoutsContainer: {
//     width: '100%',
//     marginBottom: hp('4%'),
//   },
//   workoutItem: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'space-between',
//     padding: wp('3%'),
//     borderRadius: 8,
//     backgroundColor: '#f0f0f0',
//     marginBottom: hp('1%'),
//   },
//   workoutLeft: {
//     flexDirection: 'row',
//     alignItems: 'center',
//   },
//   workoutIcon: {
//     width: wp('8%'),
//     height: wp('8%'),
//     resizeMode: 'contain',
//     marginRight: wp('4%'),
//   },
//   workoutText: {
//     fontSize: wp('4%'),
//     color: '#232732',
//     fontFamily: 'Outfit-SemiBold',
//   },
//   checkIcon: {
//     width: wp('6%'),
//     height: wp('6%'),
//     resizeMode: 'contain',
//   },
//   buttonContainer: {
//     width: '100%',
//     alignItems: 'center',
//     marginBottom: hp('10%'),
//   },
//   markAsDoneButton: {
//     backgroundColor: '#c5f048',
//     borderRadius: 25,
//     paddingVertical: hp('1.5%'),
//     paddingHorizontal: wp('31%'),
//   },
//   buttonText: {
//     color: '#192126',
//     fontFamily: 'Outfit-SemiBold',
//     fontSize: wp('4.2%'),
//   },
// });

import React, {useState} from 'react';
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
import {goBack} from '../../../shared/Utils/navigationRef';
import LottieView from 'lottie-react-native';

const workoutIcon = require('../../../assets/Images/workoutIcon.png');
const checkIcon = require('../../../assets/Images/checkIcon.png');
const checkIconSelected = require('../../../assets/Images/selectedCheckIcon.png');

const workouts = ['Side Plank', 'Russian Twists', 'Plank', 'Crunches'];

const Flexibility = (props: any) => {
  const {route, navigation} = props;
  const [selectedWorkouts, setSelectedWorkouts] = useState<string[]>([]);

  const toggleWorkoutSelection = (workout: string) => {
    setSelectedWorkouts(prevSelected => {
      if (!prevSelected.includes(workout)) {
        navigation.navigate('Congratulation'); 
        return [...prevSelected, workout];
      }
      return prevSelected;
    });
  };

  return (
    <View style={styles.container}>
      <CustomHeader onBackPress={goBack} title="Flexibility" />

      <ScrollView contentContainerStyle={styles.contentContainer}>
        <View style={styles.imageView}>
          <LottieView
            style={styles.image}
            source={require('../../../assets/animations/Plank.json')}
            autoPlay
            loop
          />
        </View>
        <Text style={styles.workoutTitle}>Flexibility Detail</Text>
        <Text style={styles.detail}>
          The lower abdomen and hips are the most difficult areas of the body to
          reduce when we are on a diet. Even so, in this area, especially the
          legs as a whole, you can reduce weight even if you don’t use tools.
        </Text>
        <View style={styles.workoutsContainer}>
          {workouts.map((workout, index) => (
            <TouchableOpacity
              key={index}
              style={styles.workoutItem}
              onPress={() => toggleWorkoutSelection(workout)}>
              <View style={styles.workoutLeft}>
                <Image source={workoutIcon} style={styles.workoutIcon} />
                <Text style={styles.workoutText}>{workout}</Text>
              </View>
              <Image
                source={
                  selectedWorkouts.includes(workout)
                    ? checkIconSelected
                    : checkIcon
                }
                style={styles.checkIcon}
              />
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </View>
  );
};

export default Flexibility;

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
  },
  imageView: {
    width: wp('90%'),
    height: wp('50%'),
    backgroundColor: '#F6FFE7',
    marginBottom: hp('2%'),
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
    color: '#192126',
    fontFamily: 'Outfit-SemiBold',
    fontSize: wp('4.2%'),
  },
});
