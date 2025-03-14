export interface Transaction {
  id: string;
  accountId: string;
  amount: number;
  ownerId: string;
  type: string;
  date: string;
  receiptUrl: string;
}
