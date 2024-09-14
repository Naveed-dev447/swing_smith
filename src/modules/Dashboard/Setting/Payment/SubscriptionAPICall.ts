// src/services/SubscriptionAPICall.ts

import { ISubscription, ISubscriptionResponse } from "../../../../types/Subscription";
import apiClient from "../../../../config/client";
import { ShowToast } from "../../../../components/ShowToast";

export const SubscriptionAPICall = async (payload: ISubscription) => {
  try {
    const response = await apiClient.post<ISubscriptionResponse>('account/subscribe', payload);

    if (response.data) {
      ShowToast('success', 'Subscription Successful');
    }

    return response.data;
  } catch (error) {
    const errorMessage = error.response?.data?.error?.message || 'An unexpected error occurred';

    ShowToast('error', `${errorMessage}`);

    console.error('Subscription API call error:', errorMessage);

    // Rethrow the error if needed for further handling up the call stack
    throw error;
  }
}

export default SubscriptionAPICall;
