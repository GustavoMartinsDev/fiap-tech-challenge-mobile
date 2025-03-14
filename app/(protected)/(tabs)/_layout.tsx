import { Tabs } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { Platform, View, ActivityIndicator, Text } from 'react-native';

import { IconSymbol } from '@/components/ui/IconSymbol';
import { Colors } from '@/constants/Colors';
import { useAuth } from '@/context/AuthContext';
import { AccountProvider, useAccount } from '@/context/AccountContext';
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
          title: 'Home',
          tabBarIcon: ({ color }) => (
            <IconSymbol size={28} name="house.fill" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="explore"
        options={{
          title: 'Explore',
          tabBarIcon: ({ color }) => (
            <IconSymbol size={28} name="paperplane.fill" color={color} />
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
      <ProtectedTabs />
    </AccountProvider>
  );
}
