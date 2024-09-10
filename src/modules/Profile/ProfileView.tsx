import React from 'react';
import { View, Text, Image, TouchableOpacity, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { styles } from './styles';
import CustomHeader from '../../shared/Component/CustomHeader';
import { goBack } from '../../shared/Utils/navigationRef';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../redux/Slices/AuthSlice';
import { AppDispatch, RootState } from '../../redux/store';

const profile = require('../../assets/Images/avatar.jpg');

const ProfileScreen: React.FC = (props: any) => {
  const { navigation } = props;
  const dispatch = useDispatch<AppDispatch>();
  const { profiles, profileLoading, profileError } = useSelector(
    (state: RootState) => state.profile,
  );
  const userName = profiles.length > 0 ? profiles[0] : { email: 'Fresslab88@gmail.com', name: 'Mikor Burton' };

  const handleLogout = () => {
    dispatch(logout()).then(() => {
      navigation.navigate('Login');
    });
  };

  return (
    <View style={styles.container}>
      <CustomHeader onBackPress={goBack} title={'Profile'} />
      <ScrollView contentContainerStyle={{ flexGrow: 1, paddingBottom:60 }} showsVerticalScrollIndicator={false}>

        <View style={styles.profileContainer}>
          <View>
            <Image source={profile} style={styles.profileImage} />
            <TouchableOpacity style={styles.cameraIconContainer}>
              <Icon name="camera" size={18} color="black" />
            </TouchableOpacity>
          </View>
          <View>
            <Text style={styles.profileName}>{userName.name}</Text>
            <Text style={styles.profileEmail}>{userName.email}</Text>
          </View>
        </View>
        <View style={styles.optionMainContainer}>
          <OptionRow icon="clock-o" text="Workout Reminder" />
          <OptionRow
            icon="credit-card"
            text="Subscription"
            rightText="Get Full Access"
            onPress={() => navigation.navigate('subscription')}
          />
          <OptionRow
            icon="lock"
            text="Change Password"
            onPress={() => navigation.navigate('ChangePassword')} // Add navigation for Change Password
          />
        </View>
        <View style={styles.optionMainContainer}>

          <OptionRow icon="envelope" text="Contact Us" />
          <OptionRow icon="file-text" text="Term of Use" />
          <OptionRow icon="shield" text="Privacy Policy" />
          <OptionRow icon="thumbs-o-up" text="Rate on the App Store" />
          <OptionRow icon="sign-out" text="Log out" onPress={handleLogout} />
          {/* <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
            <Icon name="sign-out" size={24} color="white" />
          </TouchableOpacity> */}
        </View>


      </ScrollView>
    </View>
  );
};

interface OptionRowProps {
  icon: string;
  text: string;
  rightText?: string;
  isLast?: boolean;
  onPress: () => void;
}

const OptionRow: React.FC<OptionRowProps> = ({
  icon,
  text,
  rightText,
  isLast,
  onPress
}) => {
  return (
    <TouchableOpacity onPress={onPress}
      style={[styles.optionContainer, isLast && styles.lastOption]}>
      <View style={styles.optionIcon}>
        <Icon name={icon} size={16} color='#192126' />
      </View>
      <Text style={styles.optionText}>{text}</Text>
      {rightText && <Text style={styles.optionRightText}>{rightText}</Text>}
      {text !== 'Log out' &&
        <Icon name="chevron-right" style={styles.arrowIcon} />}
    </TouchableOpacity>
  );
};

export default ProfileScreen;
