import { ThemedText } from '@/components/ThemedText';

import { FButton } from '@/components/atoms/FButton/FButton';
import { useAuth } from '@/context/AuthContext';

import Illustration from '@/assets/images/card-illustration-2.svg';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { useAccount } from '@/context/AccountContext';

export default function HomeScreen() {
  const { user, logout } = useAuth();
  const { account } = useAccount();

  return (
    <ParallaxScrollView>
      <Illustration style={{ alignSelf: 'center', marginVertical: 16 }} />
      <ThemedText type="title">E-mail</ThemedText>
      <ThemedText type="default">{user?.email}</ThemedText>
      <ThemedText type="title">ID da conta</ThemedText>
      <ThemedText type="default">{account?.id}</ThemedText>
      <FButton
        innerText="Logout"
        options={{
          mode: 'contained',
          children: null,
          onPress: () => logout(),
        }}
        textProps={{
          style: { fontWeight: '600', color: 'white' },
          children: null,
        }}
      />
    </ParallaxScrollView>
  );
}
