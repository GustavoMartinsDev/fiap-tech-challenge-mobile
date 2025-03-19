import { ThemedText } from '@/components/ThemedText';
import { FIconButton } from '@/components/atoms/FIconButton/FIconButton';
import { Colors } from '@/constants/Colors';
import { useState } from 'react';
import { Image, StyleSheet, View } from 'react-native';
import {
  FTransactionAction,
  FTransactionActionProps,
} from '../FTransactionAction/FTransactionAction';

export interface TransactionItem {
  id: string;
  type: string;
  formattedDate: string;
  formattedValue: string;
}

export interface FTransactionItemProps
  extends Omit<TransactionItem, 'id'>,
    FTransactionActionProps {
  fileURL: string;
}

export function FTransactionItem({
  formattedDate,
  type,
  formattedValue,
  onEdit,
  fileURL,
}: FTransactionItemProps) {
  const [image, setImage] = useState<string>('');

  const handleViewImage = (imageData: string) => {
    let img = !image ? imageData : '';

    setImage(img);
  };

  return (
    <View>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
        <View style={{ flexDirection: 'column', alignItems: 'flex-start' }}>
          <ThemedText>
            {formattedDate} - {type}
          </ThemedText>
          <ThemedText>{formattedValue}</ThemedText>
        </View>
        {fileURL && (
          <FIconButton
            options={{
              icon: 'file',
              mode: 'contained',
              onPress: () => handleViewImage(fileURL),
            }}
          />
        )}
        <FTransactionAction onEdit={onEdit} />
      </View>
      <View>
        {image && (
          <View style={styles.imageContainer}>
            <Image source={{ uri: image }} style={styles.image} />
          </View>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  imageContainer: {
    alignItems: 'center',
    backgroundColor: Colors.primary.light,
    borderColor: Colors.primary.dark,
    borderRadius: 4,
    borderStyle: 'dashed',
    borderWidth: 1,
    padding: 8,
  },
  image: {
    width: 200,
    height: 200,
  },
});
