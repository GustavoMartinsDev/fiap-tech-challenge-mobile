import { FTransactionAction, FTransactionActionProps } from "../FTransactionAction/FTransactionAction"
import { View } from "react-native";
import { ThemedText } from "@/components/ThemedText";

export interface TransactionItem {
    id: string;
    type: string;
    formattedDate: string;
    formattedValue: string;
  }

export interface FTransactionItemProps
  extends Omit<TransactionItem, "id">,
    FTransactionActionProps {}

export function FTransactionItem({
    formattedDate,
    type,
    formattedValue,
    onEdit,
    onDelete,
}: FTransactionItemProps) {
    return (
        <View style={{flexDirection:'row', justifyContent:"space-between"}}>
            <View style={{flexDirection:"column", alignItems: "flex-start"}}>
                <ThemedText>{formattedDate} - {type}</ThemedText>
                <ThemedText>{formattedValue}</ThemedText>
            </View>
            <FTransactionAction onEdit={onEdit} onDelete={onDelete}></FTransactionAction>
        </View>
        
    )
}