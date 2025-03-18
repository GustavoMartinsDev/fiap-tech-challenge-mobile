import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import FInvestmentsCard from '@/components/organisms/FInvestmentsCard/FInvestmentsCard';
import FSummaryCard from '@/components/organisms/FSummaryCard/FSummaryCard';
import { useAccount } from '@/context/AccountContext';
import { useAuth } from '@/context/AuthContext';

export default function HomeScreen() {
  const { user } = useAuth();
  const { account } = useAccount();

  return (
    <ParallaxScrollView>
      <FSummaryCard user={user} account={account} />
      <FInvestmentsCard />

      <ThemedText type="caption">E-mail: {user?.email}</ThemedText>
      <ThemedText type="caption">ID da conta: {account?.id}</ThemedText>
    </ParallaxScrollView>
  );
}
