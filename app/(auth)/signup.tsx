import { View, Text } from 'react-native';
import { FButton } from '@/components/atoms/FButton/FButton';
import { FInput } from '@/components/atoms/FInput/FInput';
import { Link } from 'expo-router';
import { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import Banner from '@/assets/images/banner-illustration.svg';
import { useTheme } from 'react-native-paper';

export default function Signup() {
  const { signUp } = useAuth();
  const theme = useTheme();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

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

      <FInput
        options={{
          placeholder: 'E-mail',
          style: { borderWidth: 1, marginBottom: 16, padding: 8 },
          value: email,
          onChangeText: setEmail,
        }}
      />

      <FInput
        options={{
          placeholder: 'Senha',
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
          onPress: async () => {
            setLoading(true);
            await signUp({ email, password });
            setLoading(false);
          },
          children: null,
        }}
      />
      <Text style={{ marginTop: 16, fontFamily: 'Inter', alignSelf: 'center' }}>
        Já possui uma conta? {''}
        <Link href="/signin" style={{ color: theme.colors.secondary }}>
          Entrar
        </Link>
      </Text>
    </View>
  );
}
