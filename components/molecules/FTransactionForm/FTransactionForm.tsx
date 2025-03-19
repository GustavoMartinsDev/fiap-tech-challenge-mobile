import {
  AlertMessageColor,
  FAlert,
  FAlertModel,
} from '@/components/atoms/FAlert/FAlert';
import { FButton } from '@/components/atoms/FButton/FButton';
import { FInput } from '@/components/atoms/FInput/FInput';
import { FInputImage } from '@/components/atoms/FInputImage/FInputImage';
import FSelectInput from '@/components/atoms/FSelect/FSelect';
import { ThemedText } from '@/components/ThemedText';
import { Colors } from '@/constants/Colors';
import { TransactionTypes } from '@/constants/TransactionType.enum';
import { useAccount } from '@/context/AccountContext';
import { useAuth } from '@/context/AuthContext';
import { useTransactions } from '@/context/TransactionContext';
import { useEffect, useState } from 'react';
import { Image, StyleSheet, View } from 'react-native';

interface FTransactionFormProps {
  edit: boolean;
  handleAlertMessage?: (message: string) => void;
}

export function FTransactionForm({
  edit,
  handleAlertMessage,
}: FTransactionFormProps) {
  const [image, setImage] = useState<string>('');
  const [alert, setAlert] = useState<FAlertModel>();
  const [transactionType, setTransactionType] = useState<string>('');
  const [transactionValue, setTransactionValue] = useState<string>('');
  const {
    addTransaction,
    creating: creatingTransaction,
    editing: editingTransaction,
    editTransaction,
    transactionSelected,
  } = useTransactions();

  useEffect(() => {
    if (!edit) {
      return;
    }

    setTransactionType(transactionSelected?.type ?? '');
    setTransactionValue(
      transactionSelected?.amount?.toFixed(2).toString() ?? ''
    );
    setImage(transactionSelected?.receiptUrl ?? '');
  }, [transactionSelected?.id]);

  const { user } = useAuth();
  const { account } = useAccount();

  const isAddValueAccount = ['Depósito', 'Empréstimo'].includes(
    transactionType
  );

  const handleTransactionTypeChange = (type: string) => {
    setTransactionType(type);
  };

  const handleValueChange = (item: string) => {
    let value = item.replaceAll(',', '.');
    setTransactionValue(value);
  };

  const onGetImage = (img: string) => {
    setImage(img);
  };

  const handleHiddenAlert = () => {
    setAlert(undefined);
  };

  const handleShowAlert = (
    textAlert: string,
    typeMessage: AlertMessageColor
  ) => {
    const alertPopUp: FAlertModel = {
      type: typeMessage,
      textAlert,
      options: {
        visible: true,
        onDismiss: () => handleHiddenAlert(),
        action: { label: 'X' },
        duration: 2000,
        children: null,
      },
    };

    if (edit) {
      handleAlertMessage!(textAlert);
    } else {
      setAlert(alertPopUp);
    }
  };

  const cleanTransactionForm = () => {
    setTransactionType('');
    setTransactionValue('');
    setImage('');
  };

  const handleNewTransaction = async () => {
    if (!transactionType || !transactionValue || !user || !account) {
      return;
    }

    if (
      Number(transactionValue) > Number(account.balance ?? 0) &&
      !isAddValueAccount
    ) {
      handleShowAlert(
        'Atenção! Saldo insuficiente!',
        AlertMessageColor.Warning
      );
      return;
    }

    await addTransaction(Number(transactionValue), transactionType, image);

    handleShowAlert('Transação criada com sucesso', AlertMessageColor.Success);
    cleanTransactionForm();
  };

  const handleEditTransaction = async () => {
    if (!transactionSelected) {
      return;
    }

    let modelTransaction = JSON.parse(JSON.stringify(transactionSelected));

    modelTransaction.amount = Number(transactionValue);
    modelTransaction.type = transactionType;
    modelTransaction.receiptUrl = image;

    await editTransaction(modelTransaction);

    await handleShowAlert(
      'Transação editada com sucesso',
      AlertMessageColor.Success
    );
  };

  return (
    <View style={styles.container}>
      <ThemedText type="title">
        {edit ? 'Editar transação' : 'Nova transação'}
      </ThemedText>
      <ThemedText type="default">Tipo</ThemedText>
      <FSelectInput
        placeholder={transactionType}
        data={TransactionTypes}
        onChange={handleTransactionTypeChange}
      />
      <ThemedText type="default">Valor</ThemedText>
      <View style={styles.inputContainer}>
        <FInput
          options={{
            value: transactionValue.toString(),
            onChangeText: (item: string) => handleValueChange(item),
            keyboardType: 'numeric',
          }}
        />
        <FInputImage onGetImage={onGetImage} />
      </View>
      {image && (
        <View style={styles.imageContainer}>
          <Image source={{ uri: image }} style={styles.image} />
        </View>
      )}
      <FButton
        innerText={edit ? 'Editar' : 'Concluir'}
        options={{
          loading: creatingTransaction || editingTransaction,
          mode: 'contained',
          children: null,
          onPress: () =>
            edit ? handleEditTransaction() : handleNewTransaction(),
        }}
      />
      <FAlert
        textAlert={alert?.textAlert ?? ''}
        type={alert?.type!}
        options={alert?.options}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: 16,
  },
  inputContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
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
