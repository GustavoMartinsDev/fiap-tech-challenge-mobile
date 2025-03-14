import React, { createContext, useContext, useState, useEffect } from 'react';
import { TransactionModel } from '@/firebase/types/transaction';
import { useAuth } from './AuthContext';
import {
  createTransaction,
  getTransaction,
  getTransactions,
  updateTransactionReceiptUrl,
  uploadTransactionReceipt,
} from '@/firebase/controllers/transaction';
import { useAccount } from './AccountContext';

interface TransactionContextType {
  transactions: TransactionModel[];
  loading: boolean;
  creating: boolean;
  fetchTransactions: () => Promise<void>;
  addTransaction: (
    amount: number,
    type: string,
    receipt?: string
  ) => Promise<void>;
}

const TransactionContext = createContext<TransactionContextType | undefined>(
  undefined
);

export const TransactionProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [transactions, setTransactions] = useState<TransactionModel[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [creating, setCreating] = useState<boolean>(false);
  const { user } = useAuth();
  const { account } = useAccount();

  const fetchTransactions = async () => {
    if (!user || !account) return;

    setLoading(true);
    const fetchedTransactions = await getTransactions(user.uid, account.id);

    setTransactions(fetchedTransactions);
    
    setLoading(false);
  };

  const addTransaction = async (
    amount: number,
    type: string,
    receipt?: string
  ) => {
    if (!user || !account) return;

    setCreating(true);

    const createdTransactionId = await createTransaction(user.uid, account.id, {
      amount,
      type,
    });

    if (!createdTransactionId) return;

    if (receipt) {
      const receiptUrl = await uploadTransactionReceipt(
        user.uid,
        createdTransactionId,
        receipt
      );

      if (!receiptUrl) return;

      await updateTransactionReceiptUrl(createdTransactionId, receiptUrl);
    }

    const transaction = await getTransaction(createdTransactionId);

    if (!transaction) return;

    setTransactions([transaction, ...transactions]);
    setCreating(false);
  };

  return (
    <TransactionContext.Provider
      value={{
        transactions,
        loading,
        creating,
        fetchTransactions,
        addTransaction,
      }}
    >
      {children}
    </TransactionContext.Provider>
  );
};

export const useTransactions = (): TransactionContextType => {
  const context = useContext(TransactionContext);

  if (!context) {
    throw new Error(
      'useTransactions must be used within a TransactionProvider'
    );
  }
  return context;
};
