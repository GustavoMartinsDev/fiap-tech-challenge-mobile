import {
  Modal,
  StyleSheet,
  TouchableWithoutFeedback,
  View,
} from 'react-native';

import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import {
  AlertMessageColor,
  FAlert,
  FAlertModel,
} from '@/components/atoms/FAlert/FAlert';
import { FButton } from '@/components/atoms/FButton/FButton';
import { FTransactionList } from '@/components/molecules/FTransactionList/FTransactionList';
import { FTransactionFormCard } from '@/components/organisms/FTransactionFormCard/FTransactionFormCard';
import { Colors } from '@/constants/Colors';
import { TransactionType } from '@/constants/TransactionType.enum';
import { useAccount } from '@/context/AccountContext';
import { useAuth } from '@/context/AuthContext';
import { useTransactions } from '@/context/TransactionContext';
import { TransactionModel } from '@/firebase/types/transaction';
import { useCallback, useEffect, useState } from 'react';

export default function TransactionsScreen() {
  const [image, setImage] = useState<string>('');
  const [shownReceipts, setShownReceipts] = useState<string[]>([]);
  const [transactionValue, settransactionValue] = useState<string>('');
  const [alert, setAlert] = useState<FAlertModel>();
  const [options, setOptions] = useState<string[]>(
    Object.values(TransactionType)
  );
  const [optionSelected, setOptionSelected] = useState<string>('');

  const { user } = useAuth();
  const { account } = useAccount();
  const {
    transactions,
    fetchTransactions,
    addTransaction,
    loading: loadingTransactions,
    loadingMore: loadingMoreTransactions,
    hasMoreTransactions,
    loadMoreTransactions,
    setTransactionSelected,
    transactionSelected,
  } = useTransactions();

  useEffect(() => {
    fetchTransactions();
  }, []);

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

  const handleEditTransaction = (item: TransactionModel) => {
    setTransactionSelected(item);
  };

  const toggleExpanded = useCallback(() => setTransactionSelected(null), []);

  return (
    <ParallaxScrollView>
      <ThemedView style={styles.stepContainer}>
        <FTransactionFormCard edit={false} />
        <FButton
          innerText="Carregar transações"
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
            <FTransactionList
              transactionItems={transactions}
              editTransaction={handleEditTransaction}
              openFile={function (): void {
                throw new Error('Function not implemented.');
              }}
            />
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
        <Modal
          transparent={true}
          animationType="fade"
          visible={transactionSelected?.id ? true : false}
          onRequestClose={toggleExpanded}
        >
          <TouchableWithoutFeedback onPress={toggleExpanded}>
            <View style={styles.backdrop}>
              <View style={[styles.optionsBox]}>
                <FTransactionFormCard
                  edit={true}
                  handleAlertMessage={handleShowAlert}
                />
              </View>
            </View>
          </TouchableWithoutFeedback>
        </Modal>
      )}
      <FAlert
        textAlert={alert?.textAlert ?? ''}
        type={alert?.type ?? AlertMessageColor.Info}
        options={alert?.options}
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
  backdrop: {
    padding: 0,
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    backgroundColor: Colors.modal.background,
  },
  optionsBox: {
    backgroundColor: Colors.modal.main,
    width: '90%',
    borderRadius: 6,
    position: 'absolute',
    left: 20,
  },
});
