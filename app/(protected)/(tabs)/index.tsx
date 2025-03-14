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
import { useAuth } from '@/context/AuthContext';
import FSelectInput from '@/components/atoms/FSelect/FSelect';
import { TRANSACTION_TYPES } from '@/constants/FSelectInput.constants';
import { FInvestmentStat } from '@/components/atoms/FInvestmentStat/FInvestimentStat';
import { Colors } from '@/constants/Colors';
import { useAccount } from '@/context/AccountContext';
import { useTransactions } from '@/context/TransactionContext';

export default function HomeScreen() {
  const [image, setImage] = useState<string>('');
  const [shownReceipts, setShownReceipts] = useState<string[]>([]);
  const [transactionValue, settransactionValue] = useState<string>('');
  const [alert, setAlert] = useState<FAlertModel>();
  const [options, setOptions] = useState<string[]>(TRANSACTION_TYPES);
  const [optionSelected, setOptionSelected] = useState<string>('');
  const { user } = useAuth();
  const { account } = useAccount();
  const {
    transactions,
    fetchTransactions,
    addTransaction,
    creating: creatingTransaction,
    loading: loadingTransactions,
  } = useTransactions();

  const handleInputChange = (input: string) => {
    settransactionValue(input);
  };

  const toggleShownReceipts = (receiptUrl: string) => {
    setShownReceipts((prev) =>
      prev.includes(receiptUrl)
        ? prev.filter((url) => url !== receiptUrl)
        : [...prev, receiptUrl]
    );
  };

  const handleShowAlert = (textAlert: string) => {
    const alertPopUp: FAlertModel = {
      type: AlertMessageColor.Success,
      textAlert,
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

  const onGetImage = (img: string) => {
    setImage(img);
  };

  const handleNewTransaction = async () => {
    if (!optionSelected || !transactionValue || !user || !account) {
      return;
    }

    await addTransaction(Number(transactionValue), optionSelected, image);

    handleShowAlert('Transação criada com sucesso');
  };

  const handleTransactionChange = (transactionOption: string) => {
    setOptionSelected(transactionOption);
  };

  return (
    <ParallaxScrollView>
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
        <FInput
          options={{
            value: transactionValue,
            onChangeText: (input: string) => handleInputChange(input),
          }}
        />
        <FInputImage onGetImage={onGetImage} />
        {image && (
          <View>
            <Image source={{ uri: image }} style={styles.image} />
          </View>
        )}

        <FAlert
          textAlert={alert?.textAlert ?? ''}
          type={alert?.type ?? AlertMessageColor.Info}
          options={alert?.options}
        />

        <FButton
          innerText="Create transaction"
          options={{
            loading: creatingTransaction,
            mode: 'contained',
            children: null,
            onPress: () => handleNewTransaction(),
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
                    marginBottom: 16,
                    paddingBottom: 8,
                    borderBottomWidth: 1,
                    borderBottomColor: '#ccc',
                  }}
                >
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                    }}
                  >
                    <ThemedText>
                      R${transaction.amount} - {transaction.date}
                    </ThemedText>
                    {transaction.receiptUrl && (
                      <FIconButton
                        options={{
                          icon: 'file',
                          mode: 'contained',
                          onPress: () => toggleShownReceipts(transaction.id),
                        }}
                      />
                    )}
                  </View>

                  {shownReceipts.includes(transaction.id) &&
                    transaction.receiptUrl && (
                      <View style={{ marginTop: 8, alignItems: 'center' }}>
                        <Image
                          source={{ uri: transaction.receiptUrl }}
                          style={styles.image}
                        />
                      </View>
                    )}
                </View>
              ))
            ) : (
              <ThemedText>Nenhuma transação carregada.</ThemedText>
            )}
          </View>
        )}
      </ThemedView>

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
