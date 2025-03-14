import { Image, StyleSheet, Platform, View } from 'react-native';

import { HelloWave } from '@/components/HelloWave';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { MyChart } from '@/components/MyChart';
import { FButton } from '@/components/atoms/FButton/FButton';
import { FIconButton } from '@/components/atoms/FIconButton/FIconButton';
import { FInput } from '@/components/atoms/FInput/FInput';
import { useState } from 'react';
import {
  FAlert,
  AlertMessageColor,
  FAlertModel,
} from '@/components/atoms/FAlert/FAlert';
import { FInputImage } from '@/components/atoms/FInputImage/FInputImage';
import { router } from 'expo-router';
import { doc, updateDoc } from 'firebase/firestore';
import { db, storage } from '@/firebase/config';
import { useAuth } from '@/context/AuthContext';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import FSelectInput from '@/components/atoms/FSelect/FSelect';
import { TRANSACTION_TYPES } from '@/constants/FSelectInput.constants';
import { FInvestmentStat } from '@/components/atoms/FInvestmentStat/FInvestimentStat';
import { Colors } from '@/constants/Colors';
import { useAccount } from '@/context/AccountContext';
import { useTransactions } from '@/context/TransactionContext';

export default function HomeScreen() {
  const [image, setImage] = useState<string>('');
  const [textExample, setTextExample] = useState<string>('');
  const [alert, setAlert] = useState<FAlertModel>();
  const [options, setOptions] = useState<string[]>(TRANSACTION_TYPES);
  const [optionSelected, setOptionSelected] = useState<string>('');
  const { user } = useAuth();
  const { account } = useAccount();
  const {
    transactions,
    fetchTransactions,
    loading: loadingTransactions,
  } = useTransactions();

  const handleInputChange = (input: string) => {
    setTextExample(input);
  };

  const handleShowAlert = () => {
    const alertPopUp: FAlertModel = {
      type: AlertMessageColor.Success,
      textAlert: 'Alerta de teste',
      options: {
        visible: true,
        onDismiss: () => handleHiddenAlert(),
        action: { label: 'X' },
        duration: 2000,
        children: null,
      },
    };
    setAlert(alertPopUp);
  };

  const handleHiddenAlert = () => {
    setAlert(undefined);
  };

  const onGetImage = async (img: string) => {
    if (!img || !user) {
      return;
    }

    const userId = user.uid;
    const transactionId = 'jEoLQwLVBtzPGnQYS4CB';

    try {
      const response = await fetch(img);
      const blob = await response.blob();

      const filename = `receipts/${userId}/${transactionId}.jpg`;
      const storageRef = ref(storage, filename);

      await uploadBytes(storageRef, blob);
      const downloadURL = await getDownloadURL(storageRef);

      await updateTransactionReceipt(transactionId, downloadURL);

      console.log('Uploaded image, download URL:', downloadURL);
      setImage(img);
    } catch (error) {
      console.error('Upload error:', error);
    }
  };

  async function updateTransactionReceipt(
    transactionId: string,
    receiptUrl: string
  ) {
    try {
      const transactionRef = doc(db, 'transactions', transactionId);
      await updateDoc(transactionRef, {
        receiptUrl,
      });

      console.log('Transaction updated with receipt URL');
    } catch (error) {
      console.error('Error updating transaction:', error);
    }
  }

  const handleTransactionChange = (transactionOption: string) => {
    setOptionSelected(transactionOption);
  };

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#A1CEDC', dark: '#1D3D47' }}
      headerImage={
        <Image
          source={require('@/assets/images/partial-react-logo.png')}
          style={styles.reactLogo}
        />
      }
    >
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">Olá</ThemedText>
        <HelloWave />
      </ThemedView>
      <ThemedView style={styles.stepContainer}>
        <ThemedText type="subtitle">E-mail logado</ThemedText>
        <ThemedText>{user?.email}</ThemedText>
      </ThemedView>
      <ThemedView style={styles.stepContainer}>
        <ThemedText type="subtitle">Saldo atual</ThemedText>
        <ThemedText>R${account?.balance}</ThemedText>
      </ThemedView>
      <ThemedView style={styles.stepContainer}>
        <ThemedText type="subtitle">ID da conta</ThemedText>
        <ThemedText>{account?.id}</ThemedText>
      </ThemedView>
      <ThemedView style={styles.stepContainer}>
        <MyChart />
      </ThemedView>
      <ThemedView style={styles.stepContainer}>
        <FSelectInput
          data={options}
          onChange={handleTransactionChange}
          placeholder={optionSelected}
        />
        <FButton
          innerText="Teste"
          options={{
            mode: 'contained',
            children: null,
            onPress: () => handleShowAlert(),
          }}
          textProps={{
            style: { fontWeight: '600', color: 'white' },
            children: null,
          }}
        />
        <FButton
          innerText="Teste 2"
          options={{
            mode: 'contained',
            children: null,
            onPress: () => router.replace('/explore'),
          }}
          textProps={{
            style: { fontWeight: '600', color: 'white' },
            children: null,
          }}
        />
        <FButton
          innerText="Get transactions"
          options={{
            mode: 'contained',
            children: null,
            loading: loadingTransactions,
            onPress: async () => {
              await fetchTransactions();
            },
          }}
          textProps={{
            style: { fontWeight: '600', color: 'white' },
            children: null,
          }}
        />

        {loadingTransactions ? (
          <ThemedText>Carregando transações...</ThemedText>
        ) : (
          <View>
            <ThemedText type="subtitle">Transações:</ThemedText>
            {transactions && transactions.length > 0 ? (
              transactions.map((transaction, index) => (
                <View
                  key={index}
                  style={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                  }}
                >
                  <ThemedText>
                    R${transaction.amount} - {transaction.date}
                  </ThemedText>
                  <FIconButton
                    options={{
                      icon: 'file',
                      mode: 'contained',
                      onPress: () => {
                        setImage(transaction.receiptUrl);
                      },
                    }}
                  />
                </View>
              ))
            ) : (
              <ThemedText>Nenhuma transação carregada.</ThemedText>
            )}
            {image && (
              <View>
                <Image source={{ uri: image }} style={styles.image} />
              </View>
            )}
          </View>
        )}
        <FInput
          options={{
            value: textExample,
            onChangeText: (input: string) => handleInputChange(input),
          }}
        />
        <FInputImage onGetImage={onGetImage} />
      </ThemedView>

      <FAlert
        textAlert={alert?.textAlert ?? ''}
        type={alert?.type ?? AlertMessageColor.Info}
        options={alert?.options}
      />

      <FInvestmentStat
        label="Renda Fixa"
        value="R$ 36.000,00"
        backgroundColor={Colors.investmentCard.main}
      />
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: 'absolute',
  },
  image: {
    width: 200,
    height: 200,
  },
});
