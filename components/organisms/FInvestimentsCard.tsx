import { FInvestmentStats } from '@/components/molecules/FInvestimentStats/FInvestimentStats';
import { PieChartComponent } from '@/components/molecules/FPieChart/FPieChart';
import { ThemedText } from '@/components/ThemedText';
import { Colors } from '@/constants/Colors';
import { View } from 'react-native';

export function InvestmentsCard() {
  return (
    <View style={{ marginVertical: 20 }}>
      <ThemedText type="title" style={{ color: Colors.primary.main }}>
        Investimentos
      </ThemedText>
      <ThemedText
        type="subtitle"
        style={{ color: Colors.primary.main, marginVertical: 10 }}
      >
        Total: R$ 50.000,00
      </ThemedText>
      <FInvestmentStats />
      <PieChartComponent data={data} />
    </View>
  );
}

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
