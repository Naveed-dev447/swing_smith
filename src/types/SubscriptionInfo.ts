export interface ICardDetails {
  brand: string;
  cardholder_name: string | null;
  exp_month: number;
  exp_year: number;
  last4: string;
}

export interface IPaymentInfo {
  amount_paid: number;
  card: ICardDetails;
  currency: string;
}

export interface IBillingInfo {
  billing_cycle: string;
  end_date: string;
  name: string;
  start_date: string;
}

export interface INextPaymentInfo {
  next_payment_amount: number;
  next_payment_date: string;
}

export interface IInfoSubscription {
  billingInfo: IBillingInfo;
  nextPaymentInfo: INextPaymentInfo;
  paymentInfo: IPaymentInfo;
}

export interface IInfoSubscriptionResponse {
  data: IInfoSubscription
  message?: string;
  status: number;
}
