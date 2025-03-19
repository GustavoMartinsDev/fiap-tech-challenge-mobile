import { Tabs } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Platform, Text, View } from 'react-native';

import { IconSymbol } from '@/components/ui/IconSymbol';
import { Colors } from '@/constants/Colors';
import { AccountProvider, useAccount } from '@/context/AccountContext';
import { useAuth } from '@/context/AuthContext';
import { TransactionProvider } from '@/context/TransactionContext';
import { router } from 'expo-router';

const ProtectedTabs = () => {
  const { loading } = useAccount();

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color={Colors.primary.main} />
        <Text
          style={{
            marginTop: 16,
            fontSize: 16,
            fontFamily: 'InterBold',
            alignSelf: 'center',
          }}
        >
          Carregando informações da conta...
        </Text>
      </View>
    );
  }

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: Colors.primary.main,
        tabBarStyle: Platform.select({
          ios: { position: 'absolute' },
        }),
        tabBarLabelStyle: { fontFamily: 'InterBold' },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Início',
          tabBarIcon: ({ color }) => (
            <IconSymbol size={28} name="house" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="transactions"
        options={{
          title: 'Transações',
          tabBarIcon: ({ color }) => (
            <IconSymbol size={28} name="wallet.bifold" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Perfil',
          tabBarIcon: ({ color }) => (
            <IconSymbol size={28} name="person" color={color} />
          ),
        }}
      />
    </Tabs>
  );
};

export default function TabLayout() {
  const { isAuthenticated } = useAuth();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (isMounted && !isAuthenticated) {
      router.replace('/(auth)/signin');
    }
  }, [isMounted, isAuthenticated]);

  if (!isAuthenticated) {
    return null;
  }

  return (
    <AccountProvider>
      <TransactionProvider>
        <ProtectedTabs />
      </TransactionProvider>
    </AccountProvider>
  );
}
