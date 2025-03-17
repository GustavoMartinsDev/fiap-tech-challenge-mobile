import { Image, StyleSheet, View } from 'react-native';

import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import {
  AlertMessageColor,
  FAlert,
  FAlertModel,
} from '@/components/atoms/FAlert/FAlert';
import { FButton } from '@/components/atoms/FButton/FButton';
import { FIconButton } from '@/components/atoms/FIconButton/FIconButton';
import { FInput } from '@/components/atoms/FInput/FInput';
import { FInputImage } from '@/components/atoms/FInputImage/FInputImage';
import FSelectInput from '@/components/atoms/FSelect/FSelect';
import { TransactionType } from '@/constants/TransactionType.enum';
import { useAccount } from '@/context/AccountContext';
import { useAuth } from '@/context/AuthContext';
import { useTransactions } from '@/context/TransactionContext';
import { TransactionModel } from '@/firebase/types/transaction';
import { formatBalanceToCurrency } from '@/firebase/utils/formatBalanceToCurrency';
import { formatTimestampToDate } from '@/firebase/utils/formatTimestampToDate';
import { useState } from 'react';

export default function TransactionsScreen() {
  const [image, setImage] = useState<string>('');
  const [shownReceipts, setShownReceipts] = useState<string[]>([]);
  const [transactionValue, settransactionValue] = useState<string>('');
  const [alert, setAlert] = useState<FAlertModel>();
  const [options, setOptions] = useState<string[]>(
    Object.values(TransactionType)
  );
  const [optionSelected, setOptionSelected] = useState<string>('');

  const [transactionSelected, setTransactionSelected] =
    useState<TransactionModel | null>(null);

  const { user } = useAuth();
  const { account } = useAccount();
  const {
    transactions,
    fetchTransactions,
    addTransaction,
    creating: creatingTransaction,
    loading: loadingTransactions,
    editing: editingTransaction,
    loadingMore: loadingMoreTransactions,
    editTransaction,
    hasMoreTransactions,
    loadMoreTransactions,
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

  const handleTransactionSelectedInput = (input: string) => {
    setTransactionSelected((prev) => {
      if (!prev) return null;

      return {
        ...prev,
        amount: Number(input),
      };
    });
  };

  const changeTransactionSelectedType = (transactionOption: string) => {
    setTransactionSelected((prev) => {
      if (!prev) return null;

      return {
        ...prev,
        type: transactionOption,
      };
    });
  };

  const onChangeTransactionImage = (img: string) => {
    setTransactionSelected((prev) => {
      if (!prev) return null;

      return {
        ...prev,
        receiptUrl: img,
      };
    });
  };

  const handleEditTransaction = async () => {
    if (!transactionSelected) {
      return;
    }

    await editTransaction(transactionSelected);

    await handleShowAlert('Transação editada com sucesso');
  };

  return (
    <ParallaxScrollView>
      <FAlert
        textAlert={alert?.textAlert ?? ''}
        type={alert?.type ?? AlertMessageColor.Info}
        options={alert?.options}
      />
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
            <ThemedText type="subtitle">
              Transações - Total: {transactions.length}
            </ThemedText>
            {transactions && transactions.length > 0 ? (
              transactions.map((transaction, index) => (
                <View
                  key={index}
                  style={{
                    marginBottom: 16,
                    paddingBottom: 8,
                    borderBottomWidth: 1,
                    borderBottomColor: '#ccc',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                  }}
                >
                  <ThemedText>
                    {transaction.type !== TransactionType.Deposit &&
                    transaction.type !== TransactionType.Loan
                      ? '-'
                      : ''}
                    {formatBalanceToCurrency(transaction.amount)} -{' '}
                    {formatTimestampToDate(transaction.date)} -{' '}
                    {transaction.type}
                  </ThemedText>
                  <View>
                    <FIconButton
                      options={{
                        icon: 'pencil',
                        mode: 'contained',
                        onPress: () => setTransactionSelected(transaction),
                      }}
                    />
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

        {hasMoreTransactions && (
          <FButton
            innerText="Load more transactions"
            options={{
              mode: 'contained',
              children: null,
              loading: loadingMoreTransactions,
              onPress: async () => {
                await loadMoreTransactions();
              },
            }}
            textProps={{
              style: { fontWeight: '600', color: 'white' },
              children: null,
            }}
          />
        )}
      </ThemedView>

      {transactionSelected && (
        <ThemedView style={styles.stepContainer}>
          <ThemedText type="subtitle">Editar transação:</ThemedText>
          <FSelectInput
            data={options}
            placeholder={transactionSelected.type}
            onChange={changeTransactionSelectedType}
          />
          <FInput
            options={{
              value: transactionSelected.amount.toString(),
              onChangeText: (input: string) =>
                handleTransactionSelectedInput(input),
            }}
          />
          <FInputImage onGetImage={onChangeTransactionImage} />
          {transactionSelected.receiptUrl && (
            <View>
              <Image
                source={{ uri: transactionSelected.receiptUrl }}
                style={styles.image}
              />
            </View>
          )}

          <FButton
            innerText="Edit transaction"
            options={{
              loading: editingTransaction,
              mode: 'contained',
              children: null,
              onPress: () => handleEditTransaction(),
            }}
            textProps={{
              style: { fontWeight: '600', color: 'white' },
              children: null,
            }}
          />
        </ThemedView>
      )}
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
