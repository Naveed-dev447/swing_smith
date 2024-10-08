// src/services/SubscriptionAPICall.ts

import { ISubscription, ISubscriptionResponse } from "../../../../types/Subscription";
import apiClient from "../../../../config/client";
import { ShowToast } from "../../../../components/ShowToast";

export const SubscriptionAPICall = async (payload: ISubscription) => {
  try {
    const response = await apiClient.post<ISubscriptionResponse>('account/subscribe', payload);
    if (response.data) {
      ShowToast('success', `${response.data?.message}`);
    }
    return response.data;

  } catch (error: any) {
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

export const getSubscriptionInfo = async () => {
  try {
    const response = await apiClient.get<any>(`account/subscription/info`);

    return response.data;

  } catch (error: any) {
    ShowToast('error', `${error}`)
    const errorMessage = error.response?.data?.error?.message || 'An unexpected error occurred';
    console.error(error, 'Get Subscription Info API error:', errorMessage);
    throw error;
  }
}


export const cancelSubscription = async (customerId: string) => {

  try {
    const response = await apiClient.post<any>(`account/cancel/subscription`, { subscriptionId: customerId });
    ShowToast('success', `${response.data.message}`);
    return response.data;
  } catch (error: any) {
    const errorMessage = error.response?.data?.error?.message || 'An unexpected error occurred';
    ShowToast('error', `${errorMessage}`);
    console.error('Cancel Subscription API error:', errorMessage);
    throw error;
  }
}

export const updateAutoRenewal = async (autoRenewal: boolean) => {
  try {
    const response = await apiClient.post<any>('account/subscription/auto-renewal', { autoRenewal: autoRenewal });
    ShowToast('success', `${response.data.message}`);
    return response.data;
  } catch (error: any) {
    const errorMessage = error.response?.data?.error?.message || 'An unexpected error occurred';
    ShowToast('error', `${errorMessage}`);
    console.error('Update Auto-Renewal API error:', errorMessage);
    throw error;
  }
}


