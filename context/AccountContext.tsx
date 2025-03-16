import React, { createContext, useContext, useEffect, useState } from 'react';
import {
  createAccount,
  getAccount,
  updateAccountBalance,
} from '@/firebase/controllers/account';
import { AccountModel } from '@/firebase/types/account';
import { useAuth } from './AuthContext';
import { TransactionType } from '@/constants/TransactionType.enum';

interface AccountContextType {
  account: AccountModel | null;
  updateBalance: (
    amount: number,
    type: string,
    reverted?: {
      oldAmount: number;
      oldType: string;
    }
  ) => Promise<void>;
  loading: boolean;
}

const AccountContext = createContext<AccountContextType | undefined>(undefined);

export const AccountProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const { user } = useAuth();
  const [account, setAccount] = useState<AccountModel | null>(null);
  const [loading, setLoading] = useState(true);

  const updateBalance = async (
    amount: number,
    type: string,
    reverted?: {
      oldAmount: number;
      oldType: string;
    }
  ) => {
    if (!user || !account) return;

    let newBalance: number = account.balance;

    if (reverted?.oldAmount && reverted?.oldType) {
      newBalance =
        reverted.oldType === TransactionType.Deposit ||
        reverted.oldType === TransactionType.Loan
          ? account.balance - reverted.oldAmount
          : account.balance + reverted.oldAmount;
    }

    newBalance =
      type === TransactionType.Deposit || type === TransactionType.Loan
        ? newBalance + amount
        : newBalance - amount;

    await updateAccountBalance(account.id, newBalance);

    setAccount({
      ...account,
      balance: newBalance,
    });
  };

  useEffect(() => {
    const fetchAccount = async () => {
      if (!user) return;

      try {
        setLoading(true);

        let accountData: AccountModel | null;

        accountData = await getAccount(user.uid);

        if (!accountData) {
          accountData = await createAccount(user.uid);
        }

        setAccount(accountData);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchAccount();
  }, [user]);

  return (
    <AccountContext.Provider value={{ account, loading, updateBalance }}>
      {children}
    </AccountContext.Provider>
  );
};

export const useAccount = (): AccountContextType => {
  const context = useContext(AccountContext);

  if (!context) {
    throw new Error('useAccount must be used within an AccountProvider');
  }

  return context;
};
