import React, { createContext, useContext, useEffect, useState } from 'react';
import { createAccount, getAccount } from '@/firebase/controllers/account';
import { AccountModel } from '@/firebase/types/account';
import { useAuth } from './AuthContext';

interface AccountContextType {
  account: AccountModel | null;
  loading: boolean;
}

const AccountContext = createContext<AccountContextType>({
  account: null,
  loading: true,
});

export const AccountProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const { user } = useAuth();
  const [account, setAccount] = useState<AccountModel | null>(null);
  const [loading, setLoading] = useState(true);

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
    <AccountContext.Provider value={{ account, loading }}>
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
