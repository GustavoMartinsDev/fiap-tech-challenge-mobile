import { ThemedText } from '@/components/ThemedText';
import { FIconButton } from '@/components/atoms/FIconButton/FIconButton';
import { Colors } from '@/constants/Colors';
import { useEffect, useState } from 'react';
import { Image, StyleSheet, View } from 'react-native';
import { Divider } from 'react-native-paper';
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

  useEffect(() => {
    setImage('');
  }, [fileURL]);

  const handleViewImage = (imageData: string) => {
    let img = !image ? imageData : '';

    setImage(img);
  };

  return (
    <View style={{ gap: 8 }}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          width: '100%',
        }}
      >
        <View style={{ flexDirection: 'column', alignItems: 'flex-start' }}>
          <ThemedText type="caption" style={{ color: Colors.textLight.main }}>
            {formattedDate}
          </ThemedText>
          <ThemedText>{type}</ThemedText>
          <ThemedText type="defaultSemiBold">{formattedValue}</ThemedText>
        </View>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          {fileURL && (
            <FIconButton
              options={{
                icon: 'image',
                mode: 'contained',
                onPress: () => handleViewImage(fileURL),
              }}
            />
          )}
          <FTransactionAction onEdit={onEdit} />
        </View>
      </View>
      <View>
        {image && (
          <View style={styles.imageContainer}>
            <Image source={{ uri: image }} style={styles.image} />
          </View>
        )}
      </View>
      <Divider
        style={{
          width: '100%',
          borderBottomWidth: 1,
          borderColor: Colors.primary.light,
        }}
      />
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
