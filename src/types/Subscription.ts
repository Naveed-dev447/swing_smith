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


// types/SubscriptionPlan.ts
export interface ISubscriptionPlan {
  name: string;
  interval: string;
  amount: number;
  currency: string;
}

export interface ISubscriptionPlanResponse {
  status: number;
  plans: ISubscriptionPlan[];
}
