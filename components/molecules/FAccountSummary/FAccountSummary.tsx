import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { Colors } from '@/constants/Colors';
import { useState } from 'react';
import { Divider, IconButton } from 'react-native-paper';

interface FAccountSummaryProps {
  balance: number;
}

export default function FAccountSummary(props: FAccountSummaryProps) {
  const [showBalance, setShowBalance] = useState(false);
  const formattedBalance = new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(props.balance);

  return (
    <ThemedView style={{ marginTop: 8 }}>
      <ThemedView
        style={{ flexDirection: 'row', alignItems: 'center', gap: 25 }}
      >
        <ThemedText type="defaultSemiBold" isDark>
          Saldo
        </ThemedText>
        <IconButton
          icon={showBalance ? 'eye' : 'eye-off'}
          size={20}
          onPress={() => setShowBalance(!showBalance)}
          iconColor={Colors.secondary.main}
        />
      </ThemedView>
      <Divider
        style={{
          width: '100%',
          borderBottomWidth: 1,
          borderColor: Colors.secondary.main,
        }}
      />
      <ThemedView style={{ marginTop: 16, gap: 8 }}>
        <ThemedText type="default" isDark>
          Conta corrente
        </ThemedText>
        <ThemedText style={{ fontSize: 24, lineHeight: 32 }} isDark>
          {showBalance ? formattedBalance : '****'}
        </ThemedText>
      </ThemedView>
    </ThemedView>
  );
}
