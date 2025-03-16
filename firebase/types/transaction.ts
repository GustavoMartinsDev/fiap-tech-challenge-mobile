import { Timestamp } from 'firebase/firestore';

export interface TransactionModel {
  id: string;
  accountId: string;
  ownerId: string;
  amount: number;
  type: string;
  receiptUrl: string;
  date: Timestamp;
}

export interface TransactionInput {
  amount: number;
  type: string;
  accountId?: string;
  ownerId?: string;
  receiptUrl?: string;
  date?: Timestamp;
}
