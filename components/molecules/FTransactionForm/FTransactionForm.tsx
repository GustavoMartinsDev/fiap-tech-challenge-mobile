import {
  AlertMessageColor,
  FAlert,
  FAlertModel,
} from '@/components/atoms/FAlert/FAlert';
import FSelectInput from '@/components/atoms/FSelect/FSelect';
import { Colors } from '@/constants/Colors';
import { useState } from 'react';
import { Image, StyleSheet, View } from 'react-native';
import { Text } from 'react-native-paper';
import { TransactionTypes } from '@/constants/TransactionType.enum';
import { FInput } from '@/components/atoms/FInput/FInput';
import { FButton } from '@/components/atoms/FButton/FButton';
import { useTransactions } from '@/context/TransactionContext';
import { useAuth } from '@/context/AuthContext';
import { useAccount } from '@/context/AccountContext';
import { FInputImage } from '@/components/atoms/FInputImage/FInputImage';

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
      <FAlert
        textAlert={alert?.textAlert ?? ''}
        type={alert?.type!}
        options={alert?.options}
      />
      <Text style={[styles.legendText, { color: Colors.primary.contrastText }]}>
        Nova transação
      </Text>
      <FSelectInput
        placeholder={transactionType}
        data={TransactionTypes}
        onChange={handleTransactionTypeChange}
      />
      <Text style={[styles.legendText, { color: Colors.primary.contrastText }]}>
        Valor
      </Text>
      <View
        style={{
          flexDirection: 'row',
          width: '100%',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <View style={{ width: '80%' }}>
          <FInput
            options={{
              value: transactionValue.toString(),
              onChangeText: (item: string) => handleValueChange(item),
              keyboardType: 'numeric',
            }}
          />
        </View>
        <View style={{ width: '10%' }}>
          <FInputImage onGetImage={onGetImage} />
        </View>
      </View>
      {image && (
        <View>
          <Image source={{ uri: image }} style={styles.image} />
        </View>
      )}
      <FButton
        innerText="Concluir transação"
        options={{
          loading: creatingTransaction,
          mode: 'contained',
          children: null,
          onPress: () => handleNewTransaction(),
        }}
        textProps={{
          style: { fontWeight: '600', color: Colors.primary.contrastText },
          children: null,
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: 16,
  },
  legendText: {
    fontWeight: '700',
    fontSize: 25,
  },
  image: {
    width: 200,
    height: 200,
  },
});
