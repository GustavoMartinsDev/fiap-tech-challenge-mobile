import Banner from '@/assets/images/banner-illustration.svg';
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
import { Text, View } from 'react-native';
import { useTheme } from 'react-native-paper';

export default function Signup() {
  const { signUp } = useAuth();
  const theme = useTheme();

  const [alert, setAlert] = useState<FAlertModel>();

  const [displayName, sestDisplayName] = useState('');

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

  const handleSignUp = async () => {
    try {
      setLoading(true);
      await signUp({ email, password }, displayName);
    } catch (error: any) {
      console.log(error);

      const currentEmailError = error.message.includes('email');
      const currentPasswordError = error.message.includes('password');

      currentEmailError ? setEmailError(true) : setEmailError(false);
      currentPasswordError ? setPasswordError(true) : setPasswordError(false);

      const messageEmail = currentEmailError && 'Verifique seu e-mail';
      const messagePassword =
        currentPasswordError && 'Verifique sua senha, mínimo 6 caracteres';

      showAlert(
        `Erro ao cadastrar - ${messageEmail || messagePassword || 'Verifique suas credenciais'} `
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        padding: 16,
        gap: 12,
        backgroundColor: theme.colors.background,
      }}
    >
      <Banner width="100%" height="30%" style={{ alignSelf: 'center' }} />

      <View style={{ height: 400 }}>
        <Text
          style={{
            fontSize: 24,
            marginBottom: 16,
            fontFamily: 'Inter',
            alignSelf: 'center',
          }}
        >
          Preencha suas credenciais
        </Text>

        <FAlert
          textAlert={alert?.textAlert ?? ''}
          type={alert?.type ?? AlertMessageColor.Info}
          options={alert?.options}
        />

        <FInput
          options={{
            placeholder: 'Como devemos te chamar?',
            style: { borderWidth: 1, marginBottom: 16, padding: 8 },
            value: displayName,
            onChangeText: sestDisplayName,
          }}
        />

        <FInput
          options={{
            placeholder: 'E-mail',
            error: emailError,
            style: { borderWidth: 1, marginBottom: 16, padding: 8 },
            value: email,
            onChangeText: setEmail,
          }}
        />

        <FInput
          options={{
            placeholder: 'Senha',
            error: passwordError,
            secureTextEntry: true,
            style: { borderWidth: 1, marginBottom: 16, padding: 8 },
            value: password,
            onChangeText: setPassword,
          }}
        />

        <FButton
          innerText="Cadastrar"
          options={{
            loading,
            mode: 'contained',
            onPress: handleSignUp,
            children: null,
          }}
        />
        <Text
          style={{ marginTop: 16, fontFamily: 'Inter', alignSelf: 'center' }}
        >
          Já possui uma conta? {''}
          <Link href="/signin" style={{ color: theme.colors.secondary }}>
            Entrar
          </Link>
        </Text>
      </View>
    </View>
  );
}
