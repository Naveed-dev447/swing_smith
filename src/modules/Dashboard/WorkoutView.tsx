// import React from 'react';
// import {
//   StyleSheet,
//   Text,
//   View,
//   Image,
//   ScrollView,
// } from 'react-native';
// import {
//   widthPercentageToDP as wp,
//   heightPercentageToDP as hp,
// } from 'react-native-responsive-screen';
// import CustomHeader from '../../shared/Component/CustomHeader';
// import CustomButton from '../../shared/Component/CustomButton';

// const workoutIcon = require('../../assets/Images/workout.png');
// const WorkoutView = (props: any) => {
//   const {route, navigation} = props;
//   return (
//     <View style={styles.container}>
//       <View style={{flexDirection: 'row'}}>
//         <CustomHeader onBackPress={() => {}} />
//         <Text style={styles.title}>Core Strength</Text>
//       </View>

//       <ScrollView contentContainerStyle={styles.contentContainer}>
//         <Image source={workoutIcon} style={styles.image} />
//         <Text>WorkOut Details</Text>
//         <Text style={styles.detail}>
//           The lower abdomen and hips are the most difficult areas of the body to
//           reduce when we are on a diet. Even so, in this area, especially the
//           legs as a whole, you can reduce weight even if you don’t use tools.
//         </Text>
//         <View style={styles.workoutsContainer}>
//           {['Side Plank', 'Russian Twists', 'Plank', 'Crunches'].map(
//             (workout, index) => (
//               <View key={index} style={styles.workoutItem}>
//                 <Text style={styles.workoutText}>{workout}</Text>
//                 {/* <Image source={require('../../assets/Images/checkIcon.png')} style={styles.checkIcon} /> Adjust the path as needed */}
//               </View>
//             ),
//           )}
//         </View>
//         <View style={styles.buttonContainer}>
//           <CustomButton
//             title="Next"
//             onPress={() => navigation.navigate('OnboardHome8')}
//           />
//         </View>
//       </ScrollView>
//     </View>
//   );
// };

// export default WorkoutView;

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//   },
//   contentContainer: {
//     alignItems: 'center',
//     padding: wp('5%'),
//   },
//   image: {
//     width: wp('90%'),
//     height: wp('60%'),
//     resizeMode: 'contain',
//     marginBottom: hp('2%'),
//   },
//   title: {
//     marginTop: 50,
//     marginLeft: 60,
//     fontSize: wp('6%'),
//     fontWeight: 'bold',
//     // marginBottom: hp('2%'),
//   },
//   detail: {
//     fontSize: wp('4%'),
//     textAlign: 'center',
//     marginBottom: hp('4%'),
//   },
//   workoutsContainer: {
//     width: '100%',
//     marginBottom: hp('4%'),
//   },
//   workoutItem: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'space-between',
//     padding: wp('4%'),
//     borderRadius: 8,
//     backgroundColor: '#f0f0f0',
//     marginBottom: hp('1%'),
//   },
//   workoutText: {
//     fontSize: wp('4%'),
//   },
//   checkIcon: {
//     width: wp('6%'),
//     height: wp('6%'),
//     resizeMode: 'contain',
//   },
//   buttonContainer: {
//     // padding: wp('6%'),
//   },
// });

import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import CustomHeader from '../../shared/Component/CustomHeader';
import CustomButton from '../../shared/Component/CustomButton';

const workoutIcon = require('../../assets/Images/workout.png');
const WorkoutView = (props: any) => {
  const {route, navigation} = props;
  return (
    <View style={styles.container}>
      <View style={styles.headerRow}>
        <CustomHeader onBackPress={() => {}} />
        <Text style={styles.title}>Core Strength</Text>
      </View>

      <ScrollView contentContainerStyle={styles.contentContainer}>
        <Image source={workoutIcon} style={styles.image} />
        <Text style={styles.workoutTitle}>Workout Detail</Text>
        <Text style={styles.detail}>
          The lower abdomen and hips are the most difficult areas of the body to
          reduce when we are on a diet. Even so, in this area, especially the
          legs as a whole, you can reduce weight even if you don’t use tools.
        </Text>
        <View style={styles.workoutsContainer}>
          {['Side Plank', 'Russian Twists', 'Plank', 'Crunches'].map(
            (workout, index) => (
              <View key={index} style={styles.workoutItem}>
                <Text style={styles.workoutText}>{workout}</Text>
                {/* <Image source={require('../../assets/Images/checkIcon.png')} style={styles.checkIcon} /> Adjust the path as needed */}
              </View>
            ),
          )}
        </View>
        <View style={styles.buttonContainer}>
          <CustomButton
            title="Mark as Done"
            onPress={() => navigation.navigate('OnboardHome8')}
          />
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
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: wp('5%'),
    paddingTop: hp('3%'),
  },
  contentContainer: {
    alignItems: 'center',
    padding: wp('5%'),
  },
  image: {
    width: wp('50%'),
    height: wp('50%'),
    resizeMode: 'contain',
    marginBottom: hp('2%'),
  },
  title: {
    flex: 1,
    fontSize: wp('6%'),
    fontWeight: 'bold',
    textAlign: 'center',
  },
  workoutTitle: {
    fontSize: wp('5%'),
    fontWeight: 'bold',
    marginBottom: hp('2%'),
  },
  detail: {
    fontSize: wp('4%'),
    textAlign: 'center',
    marginBottom: hp('4%'),
  },
  workoutsContainer: {
    width: '100%',
    marginBottom: hp('4%'),
  },
  workoutItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: wp('4%'),
    borderRadius: 8,
    backgroundColor: '#f0f0f0',
    marginBottom: hp('1%'),
  },
  workoutText: {
    fontSize: wp('4%'),
  },
  checkIcon: {
    width: wp('6%'),
    height: wp('6%'),
    resizeMode: 'contain',
  },
  buttonContainer: {
    width: '100%',
    alignItems: 'center',
    marginBottom: hp('4%'),
  },
});
