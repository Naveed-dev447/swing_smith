// src/types/SubscriptionTypes.ts

export interface ISubscription {
  plan: string;
  email: string;
  paymentMethodId: string;
  couponCode: string;
}

export interface ISubscriptionResponse {
  status: string;
  message: string;
  data?: any;
}
