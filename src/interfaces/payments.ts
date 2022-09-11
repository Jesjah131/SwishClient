export interface Payment {
  amount: number;
  message: string;
  name: string;
  timestamp: number;
}

export interface Root {
  payments: Payment[];
  totalSum: number;
}
