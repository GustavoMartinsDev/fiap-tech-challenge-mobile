import Logo from '@/assets/images/logo.svg';
import {
  AlertMessageColor,
  FAlert,
  FAlertModel,
} from '@/components/atoms/FAlert/FAlert';
import { FButton } from '@/components/atoms/FButton/FButton';
import { FInput } from '@/components/atoms/FInput/FInput';
import { useAuth } from '@/context/AuthContext';
import { Link } from 'expo-router';
import { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useTheme } from 'react-native-paper';

export default function SignIn() {
  const { signIn } = useAuth();
  const theme = useTheme();

  const [alert, setAlert] = useState<FAlertModel>();

  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState(false);

  const [password, setPassword] = useState('');
  const [passwordError, setPasswordError] = useState(false);

  const [loading, setLoading] = useState(false);

  const showAlert = (text: string) => {
    const alertPopUp: FAlertModel = {
      type: AlertMessageColor.Error,
      textAlert: text,
      options: {
        visible: true,
        onDismiss: () => setAlert(undefined),
        action: { label: 'X' },
        duration: 2000,
        children: null,
      },
    };

    setAlert(alertPopUp);
  };

  const handleSignin = async () => {
    try {
      setLoading(true);
      await signIn({ email, password });
    } catch (error) {
      setEmailError(true);
      setPasswordError(true);
      showAlert('Erro ao entrar, verifique suas credenciais');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View
      style={{ ...styles.container, backgroundColor: theme.colors.background }}
    >
      <FAlert
        textAlert={alert?.textAlert ?? ''}
        type={alert?.type ?? AlertMessageColor.Info}
        options={alert?.options}
      />
      <Logo style={{ alignSelf: 'center', marginVertical: 16 }} />

      <View style={{ gap: 16, height: 200 }}>
        <FInput
          options={{
            error: emailError,
            placeholder: 'E-mail',
            style: { borderWidth: 1, padding: 8 },
            value: email,
            onChangeText: setEmail,
          }}
        />
        <FInput
          options={{
            error: passwordError,
            placeholder: 'Senha',
            secureTextEntry: true,
            style: { borderWidth: 1, padding: 8 },
            value: password,
            onChangeText: setPassword,
          }}
        />

        <FButton
          innerText="Entrar"
          options={{
            loading,
            mode: 'contained',
            onPress: handleSignin,
            children: null,
          }}
        />
      </View>
      <Text style={{ marginTop: 16, fontFamily: 'Inter', alignSelf: 'center' }}>
        Não possui uma conta? {''}
        <Link href="/signup" style={{ color: theme.colors.secondary }}>
          Criar
        </Link>
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 16,
    gap: 12,
  },
});
