import React from 'react';
import { StyleSheet, View, Platform } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/MaterialIcons';
import AnalysisView from '../modules/Dashboard/Recommended/RecommendedView';
import UploadVideo from '../modules/Onboarding/Home/uploadVideo';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import HomeStack from './HomeStack';
import WeightTransferDrill from '../modules/Dashboard/WeightTransferDrills/WeightTransferDrills';
import SwingLogView from '../modules/Dashboard/Home/SwingLogView';
import ProfileScreen from '../modules/Dashboard/Setting/Profile/ProfileView';

const Tab = createBottomTabNavigator();

const BottomTabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused }) => {
          let iconName;
          if (route.name === 'Home') {
            iconName = 'home';
          }
          // else if (route.name === 'Analysis') {
          //   iconName = 'replay';
          // }
          else if (route.name === 'SwingLog') {
            iconName = 'replay';
          }
          else if (route.name === 'UploadVideo') {
            iconName = 'add';
          } else if (route.name === 'Workouts') {
            iconName = 'lightbulb';
          } else if (route.name === 'Profile') {
            iconName = 'person';
          }
          return (
            <View style={styles.iconContainer}>
              {focused ? (
                <View style={styles.focusedContainer}>
                  <Icon name={iconName} size={wp('5%')} color="#000" />
                </View>
              ) : (
                <Icon name={iconName} size={wp('6%')} color="#fff" />
              )}
            </View>
          );
        },
        tabBarShowLabel: false,
        tabBarStyle: [
          Platform.OS === 'ios' ? styles.tabBarIOS : styles.tabBar,
          route.name === 'UploadVideo' ? { display: 'none' } : null,
        ],
        headerShown: false,
      })}>
      <Tab.Screen name="Home" component={HomeStack} />
      <Tab.Screen name="SwingLog" component={SwingLogView} />
      <Tab.Screen name="UploadVideo" component={UploadVideo} />
      <Tab.Screen name="Workouts" component={AnalysisView} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>

  );
};

const styles = StyleSheet.create({
  tabBar: {
    height: hp('7.5%'),
    backgroundColor: '#000',
    paddingHorizontal: wp('2%'),
    borderRadius: wp('9%'),
    position: 'absolute',
    left: wp('2%'),
    right: wp('2%'),
    bottom: hp('1.5%'),
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: hp('0.5%') },
    shadowOpacity: 0.3,
    shadowRadius: hp('1%'),
  },
  tabBarIOS: {
    height: hp('7%'),
    backgroundColor: '#000',
    paddingHorizontal: wp('2%'),
    borderRadius: wp('9%'),
    position: 'absolute',
    left: wp('2%'),
    right: wp('2%'),
    bottom: hp('1%'),
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: hp('0.5%') },
    shadowOpacity: 0.3,
    shadowRadius: hp('1%'),
    paddingBottom: hp('0.5%'),
  },
  iconContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  focusedContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#b5e61d',
    borderRadius: wp('5%'),
    paddingVertical: hp('0.9%'),
    paddingHorizontal: wp('2.%'),
  },
  focusedLabel: {
    color: '#000',
    fontSize: wp('3.5%'),
    marginLeft: wp('1%'),
    marginRight: wp('1%'),
  },
});

export default BottomTabNavigator;
