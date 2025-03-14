export interface TransactionModel extends TransactionInput {
  id: string;
}

export interface TransactionInput {
  accountId: string;
  amount: number;
  ownerId: string;
  type: string;
  date: string;
  receiptUrl: string;
}
