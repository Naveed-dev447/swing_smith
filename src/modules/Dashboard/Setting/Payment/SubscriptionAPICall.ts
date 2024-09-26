// src/services/SubscriptionAPICall.ts

import { ISubscription, ISubscriptionResponse } from "../../../../types/Subscription";
import apiClient from "../../../../config/client";
import { ShowToast } from "../../../../components/ShowToast";

export const SubscriptionAPICall = async (payload: ISubscription) => {
  try {
    const response = await apiClient.post<ISubscriptionResponse>('account/subscribe', payload);
    if (response.data) {
      ShowToast('success', `${response.data.message}`);
    }
    return response.data;

  } catch (error) {
    const errorMessage = error.response?.data?.error?.message || 'An unexpected error occurred';
    ShowToast('error', `${errorMessage}`);
    throw error;
  }
}

// API call to validate the coupon
export const CouponValidationAPICall = async (couponCode: string) => {
  try {
    const response = await apiClient.get(`account/coupon/${couponCode}`);
    return response.data;

  } catch (error) {
    console.error('Coupon API error:', error);
    throw error;
  }
};

