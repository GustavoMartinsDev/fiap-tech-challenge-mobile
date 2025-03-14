import { StyleSheet } from 'react-native';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { FInvestmentStats } from '@/components/molecules/FInvestimentStats/FInvestimentStats';
import { PieChartComponent } from '@/components/molecules/FPieChart/FPieChart';
import { ThemedText } from '@/components/ThemedText';
import { useTheme } from 'react-native-paper';

export default function TabTwoScreen() {
  const theme = useTheme();
  return (
    <ParallaxScrollView>
      <ThemedText type="title" style={{ color: theme.colors.primary }}>
        Investimentos
      </ThemedText>
      <ThemedText type="subtitle" style={{ color: theme.colors.primary }}>
        Total: R$ 50.000,00
      </ThemedText>
      <FInvestmentStats />
      <PieChartComponent data={data} />
    </ParallaxScrollView>
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

const styles = StyleSheet.create({
  headerImage: {
    color: '#808080',
    bottom: -90,
    left: -35,
    position: 'absolute',
  },
  titleContainer: {
    flexDirection: 'row',
    gap: 8,
  },
});
