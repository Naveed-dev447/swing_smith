import React, { useState, useEffect } from 'react';
import { View, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useDispatch } from 'react-redux';
import { logout } from '../../../redux/Slices/AuthSlice';
import { AppDispatch } from '../../../redux/store';
import globalStyles from '../../Onboarding/styles';
import CustomHeader from '../../../shared/Component/CustomHeader';
import LogoutModal from '../../../components/LogoutModal'; // Import the modal component
import styles from './WeightTransferDrillStyles';
import { useIsFocused } from '@react-navigation/native';

const WeightTransferDrill: React.FC = (props: any) => {
  const { navigation } = props;
  const dispatch = useDispatch<AppDispatch>();
  const [modalVisible, setModalVisible] = useState(false);
  const isFocused = useIsFocused();

  // Show modal when component is focused
  useEffect(() => {
    if (isFocused) {
      setModalVisible(true);
    }

    return () => {
      setModalVisible(false);
    };
  }, [isFocused]);

  const handleLogout = () => {
    dispatch(logout()).then(() => {
      navigation.navigate('Login');
    });
    setModalVisible(false);
  };

  const onClose = () => {
    setModalVisible(false);
    navigation.goBack();
  };

  return (
    <View style={globalStyles.container}>
      <CustomHeader
        onBackPress={navigation.goBack}
        title="Logout"
      />
      <TouchableOpacity style={styles.logoutButton} onPress={() => setModalVisible(true)}>
        <Icon name="sign-out" size={24} color="white" />
      </TouchableOpacity>

      {/* Modal for logout confirmation */}
      <LogoutModal
        visible={modalVisible}
        onClose={onClose}
        onLogout={handleLogout}
      />
    </View>
  );
}

export default WeightTransferDrill;
