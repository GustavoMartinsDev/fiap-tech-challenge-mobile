import { db } from '@/firebase/config';
import { AccountInput, AccountModel } from '@/firebase/types/account';
import {
  query,
  collection,
  where,
  getDocs,
  addDoc,
  doc,
  updateDoc,
} from 'firebase/firestore';

export const getAccount = async (
  userId: string
): Promise<AccountModel | null> => {
  const q = query(collection(db, 'accounts'), where('ownerId', '==', userId));

  const querySnapshot = await getDocs(q);

  if (querySnapshot.empty) {
    return null;
  }

  const doc = querySnapshot.docs[0]; // Will only support the initial account for now
  const data = doc.data();

  return {
    id: doc.id,
    balance: data.balance,
    ownerId: data.ownerId,
    type: data.type,
  } as AccountModel;
};

export const createAccount = async (userId: string): Promise<AccountModel> => {
  const accountCollectionRef = collection(db, 'accounts');

  const newAccount: AccountInput = {
    ownerId: userId,
    type: 'Corrente', // For now only account type supported
    balance: 0,
  };

  const docRef = await addDoc(accountCollectionRef, newAccount);

  return {
    ...newAccount,
    id: docRef.id,
  } as AccountModel;
};

export const updateAccountBalance = async (
  accountId: string,
  newBalance: number
): Promise<void> => {
  try {
    const accountRef = doc(db, 'accounts', accountId);

    updateDoc(accountRef, {
      balance: newBalance,
    });
  } catch (error) {
    console.error('Error updating account balance: ', error);
  }
};
