import { db } from '@/firebase/config';
import { Transaction } from '@/firebase/types/transaction';
import { formatTimestampToDate } from '@/firebase/utils/formatTimestampToDate';
import {
  query,
  collection,
  where,
  getDocs,
  Timestamp,
} from 'firebase/firestore';

export const getTransactions = async (
  userId: string,
  accountId: string
): Promise<Transaction[]> => {
  if (!accountId) {
    return [];
  }

  try {
    const q = query(
      collection(db, 'transactions'),
      where('ownerId', '==', userId),
      where('accountId', '==', accountId)
    );
    const querySnapshot = await getDocs(q);

    if (querySnapshot.empty) {
      return [];
    }

    return querySnapshot.docs.map((doc) => {
      const data = doc.data();

      return {
        id: doc.id,
        accountId: data.accountId ?? '',
        amount: data.amount ?? 0,
        ownerId: data.ownerId ?? '',
        type: data.type ?? '',
        date: formatTimestampToDate(data.date as Timestamp),
        receiptUrl: data.receiptUrl ?? '',
      } as Transaction;
    });
  } catch (error) {
    console.error('Error fetching transactions:', error);

    return [];
  }
};
