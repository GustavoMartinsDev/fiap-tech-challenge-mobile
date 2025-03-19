import { FTransactionForm } from '@/components/molecules/FTransactionForm/FTransactionForm';
import { ThemedView } from '@/components/ThemedView';
import { Colors } from '@/constants/Colors';
import React from 'react';
import { StyleSheet } from 'react-native';

export function FTransactionFormCard() {
  return (
    <ThemedView style={styles.container}>
      <FTransactionForm />
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.bgCard.light,
    padding: 40,
    borderRadius: 8,
    gap: 16,
  },
});
