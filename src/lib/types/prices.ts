export type TPrice = {
  id: string;
  name: string;
  yearly: boolean;
  unit_amount: number;
};

export type TUserSubscription = {
  status: string;
  cancel_end: number | null;
  canceled: boolean;
};
