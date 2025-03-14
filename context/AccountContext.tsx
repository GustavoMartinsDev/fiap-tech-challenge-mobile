import React, { createContext, useContext, useEffect, useState } from 'react';
import { getAccount } from '@/firebase/controllers/account';
import { Account } from '@/firebase/types/account';
import { useAuth } from './AuthContext';

interface AccountContextProps {
  account: Account | null;
  loading: boolean;
}

const AccountContext = createContext<AccountContextProps>({
  account: null,
  loading: true,
});

export const useAccount = () => useContext(AccountContext);

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
