import { View, Text } from 'react-native';
import { FButton } from '@/components/atoms/FButton/FButton';
import { FInput } from '@/components/atoms/FInput/FInput';
import { Link } from 'expo-router';
import { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import Logo from '@/assets/images/logo.svg';
import { useTheme } from 'react-native-paper';

export default function SignIn() {
  const { signIn } = useAuth();
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
      <Logo style={{ alignSelf: 'center', marginVertical: 16 }} />

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
          secureTextEntry: true,
          style: { borderWidth: 1, marginBottom: 16, padding: 8 },
          value: password,
          onChangeText: setPassword,
        }}
      />

      <FButton
        innerText="Entrar"
        options={{
          loading,
          mode: 'contained',
          onPress: async () => { 
            setLoading(true);
            await signIn({ email, password }) 
            setLoading(false);
          },
          children: null,
        }}
      />
      <Text style={{ marginTop: 16, fontFamily: 'Inter', alignSelf: 'center' }}>
        Não possui uma conta? {''}
        <Link href="/signup" style={{ color: theme.colors.secondary }}>
          Criar
        </Link>
      </Text>
    </View>
  );
}
