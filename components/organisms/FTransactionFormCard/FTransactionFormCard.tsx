import { FTransactionForm } from '@/components/molecules/FTransactionForm/FTransactionForm';
import { Colors } from '@/constants/Colors';
import React from 'react';
import { View, StyleSheet, Image } from 'react-native';
import { Card, Title, Button } from 'react-native-paper';
import Pixel3 from '@/assets/images/card-pixels-3.svg';
import Pixel4 from '@/assets/images/card-pixels-4.svg';
import BannerWomanCard from '@/assets/images/card-illustration-2.svg';

export function FTransactionFormCard() {
  return (
    <View style={styles.container}>
      <View>
        <Pixel3 width={100} height={100} style={styles.pixel3} />
      </View>
      <Pixel4 width={100} height={100} style={styles.pixel4} />
      <BannerWomanCard width={230} height={200} style={styles.bannerWoman} />

      <View style={styles.formContainer}>
        <FTransactionForm />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.bgCard.light,
    minHeight: 530,
    borderRadius: 16,
  },
  formContainer: {
    margin: 16,
  },
  pixel3: {
    borderEndEndRadius: 18,
    overflow: 'hidden',
    position: 'absolute',
    transform: [{ rotate: '180deg' }],
    top: 0,
  },
  pixel4: {
    borderTopStartRadius: 18,
    overflow: 'hidden',
    position: 'absolute',
    transform: [{ rotate: '180deg' }],
    bottom: 0,
    right: 0,
  },
  bannerWoman: {
    position: 'absolute',
    bottom: 0,
    left: 0,
  },
});
