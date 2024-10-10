import React, { useEffect, useState } from 'react';
import { useLoader } from '../../../../config/LoaderContext';
import Image from 'react-native-image-progress';
import ProgressBar from 'react-native-progress/Pie';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { styles } from './styles';
import CustomHeader from '../../../../shared/Component/CustomHeader';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../../../redux/Slices/AuthSlice';
import { AppDispatch, RootState } from '../../../../redux/store';
import Progress from 'react-native-progress/Bar';
import { launchImageLibrary } from 'react-native-image-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { updateProfilePicture } from './ProfileUpdateAPICall';
import { heightPercentageToDP } from 'react-native-responsive-screen';
import { fetchSubscriptionInfo } from '../../../../redux/Slices/SubscriptionInfo';
import { useIsFocused } from '@react-navigation/native';
import { checkUserSubscribed } from '../../../../shared/Utils/CommonUtils';

const defaultProfileImage = require('../../../../assets/Images/avatar.jpg');

const ProfileScreen: React.FC = (props: any) => {
  const { navigation } = props;
  const foused = useIsFocused();
  const dispatch = useDispatch<AppDispatch>();
  const { loading, setLoading } = useLoader();
  const [customerId, setCustomerId] = useState<string | null>(null);
  const { profiles, profileLoading, profileError } = useSelector(
    (state: RootState) => state.profile,
  );
  const [profileImage, setProfileImage] = useState<any>(defaultProfileImage);
  const { subscription, loading: subscriptionLoading, error: subscriptionError } = useSelector(
    (state: RootState) => state.subscription
  );


  const userName = profiles.length > 0 ? profiles[0] : { email: 'Fresslab88@gmail.com', name: 'Mikor Burton' };

  const handleLogout = () => {
    dispatch(logout()).then(() => {
      navigation.navigate('Login');
    });
  };

  const handleImagePicker = () => {
    launchImageLibrary({ mediaType: 'photo', quality: 1 }, async response => {
      if (response.assets && response.assets.length > 0) {
        const selectedImage = response.assets[0];
        const formData = new FormData();
        formData.append('fileName', {
          uri: selectedImage.uri,
          name: selectedImage.fileName || 'profile.jpg',
          type: selectedImage.type || 'image/jpeg',
        });
        setLoading(true);

        try {
          const result = await updateProfilePicture(formData);
          if (result) {
            setProfileImage(result.avatar);
          }
        } catch (error) {
          console.error('Failed to update profile picture:', error);
        } finally {
          setLoading(false);
        }
      }
    });
  };

  useEffect(() => {
    const loadProfileImage = async () => {
      try {
        const storedProfileImage = await AsyncStorage.getItem('profile');
        if (storedProfileImage) {
          setProfileImage(storedProfileImage);
        }
      } catch (error) {
        console.error('Failed to load profile image:', error);
      }
    };

    loadProfileImage();
  }, []);

  useEffect(() => {
    dispatch(fetchSubscriptionInfo()).unwrap();
  }, [foused]);


  useEffect(() => {
    const loadCustomerId = async () => {
      try {
        const customerId = await AsyncStorage.getItem('customerId');

        if (customerId) {
          setCustomerId(customerId);
        }
      } catch (error) {
        console.error('Failed to load profile image:', error);
      }
    };

    loadCustomerId();
  }, []);
  return (
    <View style={styles.container}>
      <CustomHeader onBackPress={navigation.goBack} title={'Profile'} />
      {loading && (
        <View
          style={{ alignSelf: 'center', marginTop: heightPercentageToDP('1%') }}>
          <Progress width={200} indeterminate={true} />
        </View>
      )}
      <ScrollView
        contentContainerStyle={{ flexGrow: 1, paddingBottom: 60 }}
        showsVerticalScrollIndicator={false}>
        <View style={styles.profileContainer}>
          <View>
            {/* <Image source={{ uri: profileImage }} style={styles.profileImage}
              onError={() => setProfileImage(defaultProfileImage)} /> */}
            <Image
              source={
                typeof profileImage === 'string' && profileImage
                  ? { uri: profileImage }
                  : defaultProfileImage
              }
              indicator={ProgressBar}
              style={styles.profileImage} borderRadius={63}
              onError={() => setProfileImage(defaultProfileImage)}
            />

            <TouchableOpacity
              style={styles.cameraIconContainer}
              onPress={handleImagePicker}>
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
            text={subscription && checkUserSubscribed(subscription) ? "Manage Subscription" : "Buy Subscription"}
            onPress={() => {
              if (subscription && checkUserSubscribed(subscription)) {
                navigation.navigate('cancelSubs', customerId);
              } else {
                navigation.navigate('subscription', userName);
              }
            }}
          />
          <OptionRow
            icon="lock"
            text="Change Password"
            onPress={() => navigation.navigate('resetPassword')} // Add navigation for Change Password
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
  onPress,
}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[styles.optionContainer, isLast && styles.lastOption]}>
      <View style={styles.optionIcon}>
        <Icon name={icon} size={16} color="#192126" />
      </View>
      <Text style={styles.optionText}>{text}</Text>
      {rightText && <Text style={styles.optionRightText}>{rightText}</Text>}
      {text !== 'Log out' && (
        <Icon name="chevron-right" style={styles.arrowIcon} />
      )}
    </TouchableOpacity>
  );
};

export default ProfileScreen;
