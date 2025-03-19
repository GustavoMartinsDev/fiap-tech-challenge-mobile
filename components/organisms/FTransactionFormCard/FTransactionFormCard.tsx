import { FTransactionForm } from '@/components/molecules/FTransactionForm/FTransactionForm';
import { ThemedView } from '@/components/ThemedView';
import { Colors } from '@/constants/Colors';
import React from 'react';
import { StyleSheet } from 'react-native';

interface FTransactionFormCardProps {
  edit: boolean;
  handleAlertMessage?: (message: string) => void;
}

export function FTransactionFormCard({
  edit,
  handleAlertMessage,
}: FTransactionFormCardProps) {
  return (
    <ThemedView style={styles.container}>
      <FTransactionForm edit={edit} handleAlertMessage={handleAlertMessage} />
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.bgCard.light,
    padding: 24,
    borderRadius: 8,
    gap: 16,
  },
});
