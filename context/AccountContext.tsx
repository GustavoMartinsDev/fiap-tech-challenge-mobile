import React, { createContext, useContext, useEffect, useState } from 'react';
import { getAccount } from '@/firebase/controllers/account';
import { Account } from '@/firebase/types/account';
import { useAuth } from './AuthContext';

interface AccountContextType {
  account: Account | null;
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
  const [account, setAccount] = useState<Account | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAccount = async () => {
      if (!user) return;

      setLoading(true);

      const accountData = await getAccount(user.uid);

      setAccount(accountData);

      setLoading(false);
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
