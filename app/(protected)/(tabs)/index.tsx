import { StyleSheet } from 'react-native';

import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import FAccountSummary from '@/components/molecules/FAccountSummary/FAccountSummary';
import { FInvestmentStats } from '@/components/molecules/FInvestimentStats/FInvestimentStats';
import { PieChartComponent } from '@/components/molecules/FPieChart/FPieChart';
import { Colors } from '@/constants/Colors';
import { useAccount } from '@/context/AccountContext';
import { useAuth } from '@/context/AuthContext';
import { formatDateNow } from '@/firebase/utils/formatDateNow';
import { useTheme } from 'react-native-paper';

const data = [
  {
    name: 'Fundos de investimento',
    value: 30,
    color: '#0400ff',
  },
  {
    name: 'Tesouro Direto',
    value: 40,
    color: '#F00',
  },
  {
    name: 'Previdência Privada',
    value: 15,
    color: '#ff009d',
  },
  {
    name: 'Bolsa de Valores',
    value: 15,
    color: '#d9ff00',
  },
];

export default function HomeScreen() {
  const theme = useTheme();
  const { user } = useAuth();
  const { account } = useAccount();

  return (
    <ParallaxScrollView>
      <ThemedView style={styles.cardDark}>
        <ThemedText type="title" isDark>
          Olá, {user?.displayName}!
        </ThemedText>
        <ThemedText
          type="caption"
          isDark
          style={{ textTransform: 'capitalize' }}
        >
          {formatDateNow()}
        </ThemedText>
        <FAccountSummary balance={account?.balance ?? 0} />
      </ThemedView>

      <ThemedView style={styles.cardLight}>
        <ThemedText type="title">Investimentos</ThemedText>
        <ThemedText type="subtitle">Total: R$ 50.000,00</ThemedText>
        <FInvestmentStats />
        <PieChartComponent data={data} />
      </ThemedView>

      <ThemedText type="caption">E-mail: {user?.email}</ThemedText>
      <ThemedText type="caption">ID da conta: {account?.id}</ThemedText>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  cardDark: {
    backgroundColor: Colors.bgCard.dark,
    padding: 40,
    borderRadius: 8,
    gap: 16,
  },
  cardLight: {
    backgroundColor: Colors.bgCard.light,
    padding: 40,
    borderRadius: 8,
    gap: 16,
  },
});
