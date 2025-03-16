import { ThemedText } from '@/components/ThemedText';
import { Colors } from '@/constants/Colors';
import { View, StyleSheet, Text } from 'react-native';

export function FInvestmentStats() {
  return (
    <View style={styles.container}>
      <View style={styles.box}>
        <ThemedText type="defaultSemiBold" style={styles.investimentText}>
          Renda fixa
        </ThemedText>
        <ThemedText type="default" style={styles.investimentText}>
          R$ 36.000,00
        </ThemedText>
      </View>
      <View style={styles.box}>
        <ThemedText type="defaultSemiBold" style={[styles.investimentText]}>
          Renda variável
        </ThemedText>

        <ThemedText type="default" style={[styles.investimentText]}>
          R$ 14.000,00
        </ThemedText>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  box: {
    width: '100%',
    height: 100,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 10,
    borderRadius: 10,
    backgroundColor: Colors.investmentCard.main,
  },
  investimentText: {
    fontSize: 16,
    color: Colors.primary.contrastText,
    marginBottom: 10,
  },
});
