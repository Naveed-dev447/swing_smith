import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { styles } from './styles';
import CustomHeader from '../../../shared/Component/CustomHeader';
import { goBack } from '../../../shared/Utils/navigationRef';
import { useDispatch } from 'react-redux';
import { logout } from '../../../redux/Slices/AuthSlice';
import { AppDispatch } from '../../../redux/store';

const ProfileScreen: React.FC = (props: any) => {
  const { navigation } = props;
  const dispatch = useDispatch<AppDispatch>();


  const handleLogout = () => {
    dispatch(logout()).then(() => {
      navigation.navigate('Login');
    });
  };

  return (
    <View style={styles.container}>
      <CustomHeader onBackPress={goBack} title={'Profile'} />
      <View style={styles.profileContainer}>
        <Image
          source={{ uri: 'https://via.placeholder.com/150' }}
          style={styles.profileImage}
        />
        <TouchableOpacity style={styles.cameraIconContainer}>
          <Icon name="camera" size={18} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.profileName}>Mikor Burton</Text>
        <Text style={styles.profileEmail}>Freeslab88@gmail.com</Text>
      </View>

      <OptionRow icon="clock-o" text="Workout Reminder" />
      <OptionRow icon="credit-card" text="Subscription" rightText="Get Full Access" />
      <OptionRow icon="lock" text="Change Password" />
      <OptionRow icon="envelope" text="Contact Us" />
      <OptionRow icon="file-text" text="Term of Use" />
      <OptionRow icon="shield" text="Privacy Policy" />
      <OptionRow icon="thumbs-o-up" text="Rate on the App Store" />

      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Icon name="sign-out" size={24} color="white" />
      </TouchableOpacity>
    </View>
  );
};

interface OptionRowProps {
  icon: string;
  text: string;
  rightText?: string;
  isLast?: boolean;
}

const OptionRow: React.FC<OptionRowProps> = ({ icon, text, rightText, isLast }) => {
  return (
    <TouchableOpacity style={[styles.optionContainer, isLast && styles.lastOption]}>
      <View style={styles.optionIcon}>
        <Icon name={icon} size={18} color="#fff" />
      </View>
      <Text style={styles.optionText}>{text}</Text>
      {rightText && <Text style={styles.optionRightText}>{rightText}</Text>}
      <Icon name="chevron-right" style={styles.arrowIcon} />
    </TouchableOpacity>
  );
};

export default ProfileScreen;
