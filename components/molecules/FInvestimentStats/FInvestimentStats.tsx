import { ThemedText } from '@/components/ThemedText';
import { View, StyleSheet, Text } from 'react-native';
import { useTheme } from 'react-native-paper';

export function FInvestmentStats() {
  const theme = useTheme();
  return (
    <View style={styles.container}>
      <View style={[styles.box, { backgroundColor: theme.colors.background }]}>
        <ThemedText
          type="defaultSemiBold"
          style={[
            styles.investimentText,
            {
              color: theme.colors.primary,
            },
          ]}
        >
          Renda fixa
        </ThemedText>
        <ThemedText
          type="default"
          style={[
            styles.investimentText,
            {
              color: theme.colors.primary,
            },
          ]}
        >
          R$ 36.000,00
        </ThemedText>
      </View>
      <View style={[styles.box, { backgroundColor: theme.colors.background }]}>
        <ThemedText
          type="defaultSemiBold"
          style={[
            styles.investimentText,
            {
              color: theme.colors.primary,
            },
          ]}
        >
          Renda variável
        </ThemedText>

        <ThemedText
          type="default"
          style={[
            styles.investimentText,
            {
              color: theme.colors.primary,
            },
          ]}
        >
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
  },
  investimentText: {
    fontSize: 16,
    marginBottom: 10,
  },
});
