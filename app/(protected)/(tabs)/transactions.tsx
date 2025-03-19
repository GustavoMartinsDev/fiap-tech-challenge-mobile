import {
  Modal,
  StyleSheet,
  TouchableWithoutFeedback,
  View,
} from 'react-native';

import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import {
  AlertMessageColor,
  FAlert,
  FAlertModel,
} from '@/components/atoms/FAlert/FAlert';
import { FButton } from '@/components/atoms/FButton/FButton';
import { FTransactionList } from '@/components/molecules/FTransactionList/FTransactionList';
import { FTransactionFormCard } from '@/components/organisms/FTransactionFormCard/FTransactionFormCard';
import { Colors } from '@/constants/Colors';
import { useTransactions } from '@/context/TransactionContext';
import { TransactionModel } from '@/firebase/types/transaction';
import { useCallback, useEffect, useState } from 'react';

export default function TransactionsScreen() {
  const [alert, setAlert] = useState<FAlertModel>();

  const {
    transactions,
    fetchTransactions,
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

  const handleEditTransaction = (item: TransactionModel) => {
    setTransactionSelected(item);
  };

  const toggleExpanded = useCallback(() => setTransactionSelected(null), []);

  return (
    <ParallaxScrollView>
      <FTransactionFormCard edit={false} />
      {loadingTransactions ? (
        <ThemedText>Carregando transações...</ThemedText>
      ) : (
        <View
          style={{
            backgroundColor: Colors.bgCard.contrastText,
            padding: 24,
            borderRadius: 8,
            gap: 8,
          }}
        >
          <ThemedText type="title">Transações</ThemedText>
          <FTransactionList
            transactionItems={transactions}
            editTransaction={handleEditTransaction}
            openFile={function (): void {
              throw new Error('Function not implemented.');
            }}
          />
          {hasMoreTransactions && (
            <FButton
              innerText="Carregar mais..."
              options={{
                mode: 'text',
                children: null,
                loading: loadingMoreTransactions,
                onPress: async () => {
                  await loadMoreTransactions();
                },
              }}
            />
          )}
        </View>
      )}

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
    gap: 16,
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
