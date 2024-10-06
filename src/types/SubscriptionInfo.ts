
export interface ICardDetails {
  brand: string;
  last4: string;
  exp_month: number;
  exp_year: number;
}

export interface IPaymentMethodDetails {
  card: ICardDetails;
}

export interface IPayment {
  status: string;
  amount_paid: number;
  payment_method: string;
  payment_method_details: IPaymentMethodDetails;
}

export interface IPlan {
  name: string;
  amount: number;
  currency: string;
  interval: string;
}

export interface IInfoSubscription {
  id: string;
  status: string;
  plan: IPlan;
  current_period_start: number;
  current_period_end: number;
  cancel_at_period_end: boolean;
  payment: IPayment;
}

export interface IInfoSubscriptionResponse {
  subscription: IInfoSubscription[];
}
