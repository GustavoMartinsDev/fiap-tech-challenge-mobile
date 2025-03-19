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
import { useState } from 'react';
import { Image, StyleSheet, View } from 'react-native';

export interface FTransactionFormItemInput {
  type: string;
  value: number;
  fileBase64?: string;
  fileName?: string;
}

export interface FTransactionFormItem extends FTransactionFormItemInput {
  id: string;
}

export interface FTransactionFormProps {}

export function FTransactionForm({}: FTransactionFormProps) {
  const [image, setImage] = useState<string>('');
  const [alert, setAlert] = useState<FAlertModel>();
  const [transactionType, setTransactionType] = useState<string>('');
  const [transactionValue, setTransactionValue] = useState<string>('');
  const { addTransaction, creating: creatingTransaction } = useTransactions();

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
    setAlert(alertPopUp);
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

  return (
    <View style={styles.container}>
      <ThemedText type="title">Nova transação</ThemedText>
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
        innerText="Concluir"
        options={{
          loading: creatingTransaction,
          mode: 'contained',
          children: null,
          onPress: () => handleNewTransaction(),
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
