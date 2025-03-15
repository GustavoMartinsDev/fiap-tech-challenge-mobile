import { Colors } from '@/constants/Colors';
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

interface InvestmentStatProps {
  label?: string;
  value?: string;
  backgroundColor?: string;
  children?: React.ReactElement;
}

export const FInvestmentStat = ({
  label,
  value,
  backgroundColor,
  children,
}: InvestmentStatProps) => (
  <View style={[styles.container, { backgroundColor }]}>
    <Text style={styles.label}>{label}</Text>
    <Text style={styles.value}>{value}</Text>
    {children}
  </View>
);

const styles = StyleSheet.create({
  container: {
    padding: 16,
    color: Colors.primary.contrastText,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    borderRadius: 8,
  },
  label: {
    fontSize: 16,
    color: Colors.primary.contrastText,
  },
  value: {
    fontSize: 20,
    color: Colors.primary.contrastText,
  },
});
