import { FIconButton } from "@/components/atoms/FIconButton/FIconButton";
import { View } from "react-native";

export interface FTransactionActionProps {
    onEdit: () => void;
    onDelete: () => void;
  }

export function FTransactionAction({
    onEdit,
    onDelete
}: FTransactionActionProps) {
    return (
        <View style={{flexDirection:"row", marginTop: -10}}>
            <FIconButton options={{
                icon: 'pencil-circle',
                mode: 'contained',
                onPress: onEdit
            }}>
            </FIconButton>
            <FIconButton options={{
                icon: 'delete-circle',
                mode: 'contained',
                onPress: onDelete
            }}>
            </FIconButton>
        </View>
    )
}