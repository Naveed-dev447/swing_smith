import { IUpdateAvatarResponse } from "../../../../types/Profile";
import apiClient from "../../../../config/client";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ShowToast } from "../../../../components/ShowToast"

export const updateProfilePicture = async (payload: FormData): Promise<IUpdateAvatarResponse | null> => {
  try {
    const response = await apiClient.put<IUpdateAvatarResponse>('account/update/avatar', payload, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    const result = response.data;
    await AsyncStorage.setItem('profile', result.avatar);
    ShowToast('success', `${result.message}`);
    return result;
  } catch (error) {
    console.error('Failed to update profile picture:', error);
    ShowToast('error', 'Failed to update profile picture');
    return null;
  }
};
