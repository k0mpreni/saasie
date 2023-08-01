export type TPlan = {
  id: string;
  name: string;
  yearly: boolean;
  unit_amount: number;
  current: boolean;
  cancel_end: number | null;
  canceled: boolean;
};

export type TUserSubscription = {
  status: string;
  cancel_end: number | null;
  canceled: boolean;
};
