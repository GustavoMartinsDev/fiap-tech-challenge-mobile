import React, { createContext, useContext, useState, useEffect } from 'react';
import { TransactionModel } from '@/firebase/types/transaction';
import { useAuth } from './AuthContext';
import { getTransactions } from '@/firebase/controllers/transaction';
import { useAccount } from './AccountContext';

interface TransactionContextType {
  transactions: TransactionModel[];
  loading: boolean;
  fetchTransactions: () => Promise<void>;
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
  const { user } = useAuth();
  const { account } = useAccount();

  const fetchTransactions = async () => {
    if (!user || !account) return;

    setLoading(true);
    try {
      const fetchedTransactions = await getTransactions(user.uid, account.id);

      setTransactions(fetchedTransactions);
    } catch (error) {
      console.error('Error fetching transactions:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <TransactionContext.Provider
      value={{ transactions, loading, fetchTransactions }}
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
