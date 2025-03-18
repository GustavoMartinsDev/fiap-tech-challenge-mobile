import { View } from "react-native";
import { List } from "react-native-paper";
import { FTransactionItem } from "../FTransactionItem/FTransactionItem";
import { ThemedText } from "@/components/ThemedText";
import { TransactionModel } from "@/firebase/types/transaction";
import { formatBalanceToCurrency } from "@/firebase/utils/formatBalanceToCurrency";
import { formatTimestampToDate } from "@/firebase/utils/formatTimestampToDate";

export interface FTransactionListProps {
    transactionItems: TransactionModel[];
    deleteTransaction: () => void;
    editTransaction: () => void;
  }

export function FTransactionList ({
    transactionItems,
    editTransaction,
    deleteTransaction
}: FTransactionListProps) {
    return (
        transactionItems.length > 0 ? (
            transactionItems.map((transaction, index) => (
                <View
                    key={index}
                    >
                    <List.Section>                     
                        <FTransactionItem
                            type={transaction.type}
                            formattedDate={formatTimestampToDate(transaction.date)}
                            formattedValue={formatBalanceToCurrency(transaction.amount)}
                            onEdit={editTransaction}
                            onDelete={deleteTransaction}>
                        </FTransactionItem>
                    </List.Section>
                </View>

            ))
        ) : (
                <ThemedText>Nenhuma transação carregada.</ThemedText>
            )
    )
}