import { ThemedText } from "@/components/ThemedText";
import { FIconButton } from "@/components/atoms/FIconButton/FIconButton";
import { View } from "react-native";
import { FTransactionAction, FTransactionActionProps } from "../FTransactionAction/FTransactionAction";

export interface TransactionItem {
    id: string;
    type: string;
    formattedDate: string;
    formattedValue: string;
  }

export interface FTransactionItemProps
  extends Omit<TransactionItem, "id">,
    FTransactionActionProps {
        onFile: () => void;
        fileURL: string;
    }

export function FTransactionItem({
    formattedDate,
    type,
    formattedValue,
    onEdit,
    onDelete,
    onFile,
    fileURL
}: FTransactionItemProps) {
    return (
        <View style={{flexDirection:'row', justifyContent:'space-between'}}>
            <View style={{flexDirection:"column", alignItems: "flex-start"}}>
                <ThemedText>{formattedDate} - {type}</ThemedText>
                <ThemedText>{formattedValue}</ThemedText>
            </View>
            {fileURL && (
                <FIconButton
                options={{
                    icon: 'file',
                    mode: 'contained',
                    onPress: onFile,
                }}
                />
            )}
            <FTransactionAction onEdit={onEdit} onDelete={onDelete}></FTransactionAction>
        </View>
    )
}