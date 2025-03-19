import { FIconButton } from '@/components/atoms/FIconButton/FIconButton';
import { View } from 'react-native';

export interface FTransactionActionProps {
  onEdit: () => void;
}

export function FTransactionAction({ onEdit }: FTransactionActionProps) {
  return (
    <View style={{ flexDirection: 'row' }}>
      <FIconButton
        options={{
          icon: 'pencil-circle',
          mode: 'contained',
          onPress: onEdit,
        }}
      ></FIconButton>
    </View>
  );
}
