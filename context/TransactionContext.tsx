import React, { createContext, useContext, useState, useEffect } from 'react';
import { TransactionModel } from '@/firebase/types/transaction';
import { useAuth } from './AuthContext';
import {
  createTransaction,
  editTransactionData,
  getTransaction,
  getTransactions,
  updateTransactionReceiptUrl,
  uploadTransactionReceipt,
} from '@/firebase/controllers/transaction';
import { useAccount } from './AccountContext';
import { DocumentSnapshot } from 'firebase/firestore';

interface TransactionContextType {
  transactions: TransactionModel[];
  loading: boolean;
  creating: boolean;
  editing: boolean;
  loadingMore: boolean;
  hasMoreTransactions: boolean;
  fetchTransactions: () => Promise<void>;
  loadMoreTransactions: () => Promise<void>;
  editTransaction: (transaction: TransactionModel) => Promise<void>;
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
  const [editing, setEditing] = useState<boolean>(false);
  const [lastVisible, setLastVisible] = useState<DocumentSnapshot | null>(null);
  const [loadingMore, setLoadingMore] = useState<boolean>(false);
  const [hasMoreTransactions, setHasMoreTransactions] =
    useState<boolean>(false);
  const { user } = useAuth();
  const { account, updateBalance } = useAccount();
  const pageLimit = 10;

  const fetchTransactions = async () => {
    if (!user || !account) return;

    setLoading(true);
    const { transactions: fetchedTransactions, lastVisible: newLastVisible } =
      await getTransactions(user.uid, account.id, pageLimit);

    setTransactions(fetchedTransactions);
    setLastVisible(newLastVisible);
    setHasMoreTransactions(fetchedTransactions.length === pageLimit);

    setLoading(false);
  };

  const loadMoreTransactions = async () => {
    if (!user || !account || !lastVisible || !hasMoreTransactions) return;

    setLoadingMore(true);
    const { transactions: fetchedTransactions, lastVisible: newLastVisible } =
      await getTransactions(user.uid, account.id, pageLimit, lastVisible);

    setHasMoreTransactions(fetchedTransactions.length === pageLimit);

    setTransactions((prevTransactions) => [
      ...prevTransactions,
      ...fetchedTransactions,
    ]);
    setLastVisible(newLastVisible);

    setLoadingMore(false);
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
    await updateBalance(amount, type);
    setCreating(false);
  };

  const editTransaction = async (editedTransaction: TransactionModel) => {
    if (!user || !account) return;

    setEditing(true);

    const oldTransaction = transactions.find(
      (transaction) => transaction.id === editedTransaction.id
    );

    if (!oldTransaction) return;

    const isNewReceipt =
      editedTransaction.receiptUrl !== oldTransaction.receiptUrl;

    if (isNewReceipt) {
      const newReceiptUrl = await uploadTransactionReceipt(
        user.uid,
        editedTransaction.id,
        editedTransaction.receiptUrl
      );

      if (!newReceiptUrl) return;

      await updateTransactionReceiptUrl(editedTransaction.id, newReceiptUrl);
    }

    await editTransactionData(editedTransaction);

    const updatedTransaction = await getTransaction(editedTransaction.id);

    if (!updatedTransaction) return;

    const newTransactions = transactions.map((transaction) =>
      transaction.id === updatedTransaction.id
        ? updatedTransaction
        : transaction
    );

    setTransactions([...newTransactions]);

    await updateBalance(updatedTransaction.amount, updatedTransaction.type, {
      oldAmount: oldTransaction.amount,
      oldType: oldTransaction.type,
    });

    setEditing(false);
  };

  return (
    <TransactionContext.Provider
      value={{
        transactions,
        loading,
        creating,
        editing,
        hasMoreTransactions,
        editTransaction,
        fetchTransactions,
        loadMoreTransactions,
        addTransaction,
        loadingMore,
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
