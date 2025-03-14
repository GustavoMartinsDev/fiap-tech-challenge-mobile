import { db } from '@/firebase/config';
import { Account } from '@/firebase/types/account';
import { query, collection, where, getDocs } from 'firebase/firestore';

export const getAccount = async (userId: string): Promise<Account | null> => {
  if (!userId) {
    return null;
  }

  try {
    const q = query(collection(db, 'accounts'), where('ownerId', '==', userId));
    const querySnapshot = await getDocs(q);

    if (querySnapshot.empty) {
      console.error('No account found for this user.');

      return null;
    }

    const doc = querySnapshot.docs[0]; // Will only support the initial account for now
    const data = doc.data();

    return {
      id: doc.id,
      balance: data.balance ?? 0,
      ownerId: data.ownerId ?? '',
      type: data.type ?? '',
    } as Account;
  } catch (error) {
    console.error('Error fetching account:', error);

    return null;
  }
};
