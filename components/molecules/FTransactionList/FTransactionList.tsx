import { ThemedText } from '@/components/ThemedText';
import { TransactionModel } from '@/firebase/types/transaction';
import { formatBalanceToCurrency } from '@/firebase/utils/formatBalanceToCurrency';
import { formatTimestampToDate } from '@/firebase/utils/formatTimestampToDate';
import { View } from 'react-native';
import { List } from 'react-native-paper';
import { FTransactionItem } from '../FTransactionItem/FTransactionItem';

export interface FTransactionListProps {
  transactionItems: TransactionModel[];
  editTransaction: (transaction: TransactionModel) => void;
  openFile: () => void;
}

export function FTransactionList({
  transactionItems,
  editTransaction,
  openFile,
}: FTransactionListProps) {
  return transactionItems.length > 0 ? (
    transactionItems.map((transaction, index) => (
      <View key={index}>
        <List.Section
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'baseline',
          }}
        >
          <FTransactionItem
            type={transaction.type}
            formattedDate={formatTimestampToDate(transaction.date)}
            formattedValue={formatBalanceToCurrency(transaction.amount)}
            onEdit={() => editTransaction(transaction)}
            fileURL={transaction.receiptUrl}
          />
        </List.Section>
      </View>
    ))
  ) : (
    <ThemedText>Nenhuma transação carregada.</ThemedText>
  );
}
