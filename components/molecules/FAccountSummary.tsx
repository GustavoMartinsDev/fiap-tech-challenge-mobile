import { useState } from 'react';
import { View } from 'react-native';
import { Divider, IconButton, Text } from 'react-native-paper';

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
    <View>
      <View style={{ flexDirection: 'row', alignItems: 'center', gap: 25 }}>
        <Text style={{ fontSize: 20 }}>Saldo</Text>
        <IconButton
          icon={showBalance ? 'eye' : 'eye-off'}
          size={20}
          onPress={() => setShowBalance(!showBalance)}
        />
      </View>
      <Divider
        style={{
          width: '60%',
          borderBottomWidth: 1,
        }}
      />
      <View style={{ marginTop: 16, gap: 8 }}>
        <Text style={{ fontSize: 16 }}>Conta corrente</Text>
        <Text style={{ fontSize: 32 }}>
          {showBalance ? formattedBalance : '****'}
        </Text>
      </View>
    </View>
  );
}
