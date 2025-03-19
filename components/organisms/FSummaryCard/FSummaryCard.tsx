import { StyleSheet } from 'react-native';

import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import FAccountSummary from '@/components/molecules/FAccountSummary/FAccountSummary';
import { Colors } from '@/constants/Colors';
import { AccountModel } from '@/firebase/types/account';
import { formatDateNow } from '@/firebase/utils/formatDateNow';
import { User } from 'firebase/auth';

type FSummaryCardProps = {
  user: User | null;
  account: AccountModel | null;
};

export default function FSummaryCard({ user, account }: FSummaryCardProps) {
  return (
    <ThemedView style={styles.cardDark}>
      <ThemedText type="title" isDark>
        Olá {user?.displayName}!
      </ThemedText>
      <ThemedText type="caption" isDark style={{ textTransform: 'capitalize' }}>
        {formatDateNow()}
      </ThemedText>
      <FAccountSummary balance={account?.balance ?? 0} />
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  cardDark: {
    backgroundColor: Colors.bgCard.dark,
    padding: 40,
    borderRadius: 8,
    gap: 16,
  },
});
