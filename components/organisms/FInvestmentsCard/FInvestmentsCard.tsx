import { StyleSheet } from 'react-native';

import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { FInvestmentStats } from '@/components/molecules/FInvestimentStats/FInvestimentStats';
import { PieChartComponent } from '@/components/molecules/FPieChart/FPieChart';
import { Colors } from '@/constants/Colors';

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

export default function FInvestmentsCard() {
  return (
    <ThemedView style={styles.cardLight}>
      <ThemedText type="title">Investimentos</ThemedText>
      <ThemedText type="default">Total: R$ 50.000,00</ThemedText>
      <FInvestmentStats />
      <PieChartComponent data={data} />
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  cardLight: {
    backgroundColor: Colors.bgCard.light,
    padding: 40,
    borderRadius: 8,
    gap: 16,
  },
});
