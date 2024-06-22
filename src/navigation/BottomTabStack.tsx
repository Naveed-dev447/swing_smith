import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/MaterialIcons';
import HomeView from '../modules/Dashboard/Home/HomeView';
import AnalysisView from '../modules/Dashboard/AnalysisView';
import WorkoutView from '../modules/Dashboard/WorkoutView';
import ProfileView from '../modules/Dashboard/ProfileView';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

const Tab = createBottomTabNavigator();

const BottomTabNavigator = () => {
    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                tabBarIcon: ({ focused }) => {
                    let iconName;
                    if (route.name === 'Home') {
                        iconName = 'home';
                    } else if (route.name === 'Analysis') {
                        iconName = 'analytics';
                    } else if (route.name === 'Workouts') {
                        iconName = 'fitness-center';
                    } else if (route.name === 'Profile') {
                        iconName = 'person';
                    }
                    return (
                        <View style={styles.iconContainer}>
                            {focused ? (
                                <View style={styles.focusedContainer}>
                                    <Icon
                                        name={iconName}
                                        size={wp('6%')}
                                        color="#000"
                                    />
                                    <Text style={styles.focusedLabel}>{route.name}</Text>
                                </View>
                            ) : (
                                <Icon
                                    name={iconName}
                                    size={wp('6%')}
                                    color="#fff"
                                />
                            )}
                        </View>
                    );
                },
                tabBarShowLabel: false,
                tabBarStyle: styles.tabBar,
                headerShown: false,
            })}
        >
            <Tab.Screen name="Home" component={HomeView} />
            <Tab.Screen name="Analysis" component={AnalysisView} />
            <Tab.Screen name="Workouts" component={WorkoutView} />
            <Tab.Screen name="Profile" component={ProfileView} />
        </Tab.Navigator>
    );
};

const styles = StyleSheet.create({
    tabBar: {
        height: hp('7.5%'),
        backgroundColor: '#000',
        paddingHorizontal:wp('2%'),
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
    iconContainer: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    focusedContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#b5e61d',
        borderRadius: wp('5%'),
        paddingVertical: hp('0.8%'),
        paddingHorizontal: wp('2.5%'),
    },
    focusedLabel: {
        color: '#000',
        fontSize: wp('3.5%'),
        fontWeight: 'bold',
        marginLeft: wp('1%'),
    },
});

export default BottomTabNavigator;
