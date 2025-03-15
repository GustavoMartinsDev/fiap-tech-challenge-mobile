import { db, storage } from '@/firebase/config';
import {
  TransactionInput,
  TransactionModel,
} from '@/firebase/types/transaction';
import {
  query,
  collection,
  where,
  getDocs,
  Timestamp,
  addDoc,
  updateDoc,
  doc,
  getDoc,
  orderBy,
} from 'firebase/firestore';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';

export const getTransactions = async (
  userId: string,
  accountId: string
): Promise<TransactionModel[]> => {
  if (!accountId) {
    return [];
  }

  try {
    const q = query(
      collection(db, 'transactions'),
      where('ownerId', '==', userId),
      where('accountId', '==', accountId),
      orderBy('date', 'desc')
    );
    const querySnapshot = await getDocs(q);

    if (querySnapshot.empty) {
      return [];
    }

    return querySnapshot.docs.map((doc) => {
      const data = doc.data();

      return {
        id: doc.id,
        accountId: data.accountId,
        amount: data.amount,
        ownerId: data.ownerId,
        type: data.type,
        date: data.date,
        receiptUrl: data.receiptUrl,
      } as TransactionModel;
    });
  } catch (error) {
    console.error('Error fetching transactions:', error);

    return [];
  }
};

export const getTransaction = async (
  transactionId: string
): Promise<TransactionModel | null> => {
  try {
    const transactionRef = doc(db, 'transactions', transactionId);

    const transactionSnap = await getDoc(transactionRef);
    const transactionData = transactionSnap.data();

    if (!transactionData) {
      return null;
    }

    return {
      id: transactionSnap.id,
      ...transactionData,
    } as TransactionModel;
  } catch (error) {
    console.error('Error getting transaction: ', error);

    return null;
  }
};

export const createTransaction = async (
  userId: string,
  accountId: string,
  transaction: TransactionInput
): Promise<string | null> => {
  try {
    const transactionCollectionRef = collection(db, 'transactions');

    const newTransaction: TransactionInput = {
      ...transaction,
      ownerId: userId,
      accountId,
      date: Timestamp.now(),
      receiptUrl: transaction.receiptUrl ?? '',
    };

    const docRef = await addDoc(transactionCollectionRef, newTransaction);

    return docRef.id;
  } catch (error) {
    console.error('Error creating transaction:', error);
    return null;
  }
};

export const uploadTransactionReceipt = async (
  userId: string,
  transactionId: string,
  image: string
): Promise<string | null> => {
  if (!userId || !transactionId || !image) {
    return null;
  }

  try {
    const response = await fetch(image);
    const blob = await response.blob();

    const filename = `receipts/${userId}/${transactionId}.jpg`;
    const storageRef = ref(storage, filename);

    await uploadBytes(storageRef, blob);
    const downloadURL = await getDownloadURL(storageRef);

    return downloadURL;
  } catch (error) {
    console.error('Upload error:', error);

    return null;
  }
};

export const updateTransactionReceiptUrl = async (
  transactionId: string,
  receiptUrl: string
): Promise<void> => {
  try {
    const transactionRef = doc(db, 'transactions', transactionId);

    updateDoc(transactionRef, {
      receiptUrl,
    });
  } catch (error) {
    console.error('Error setting transaction receipt url: ', error);
  }
};
