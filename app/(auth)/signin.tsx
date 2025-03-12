import { View, Text } from 'react-native';
import { FButton } from '@/components/atoms/FButton/FButton';
import { FInput } from '@/components/atoms/FInput/FInput';
import { Link } from 'expo-router';
import { router } from 'expo-router';
import { useState } from 'react';
import { useAuth } from '@/context/AuthContext';

export default function SignIn() {
  const { signIn, isAuthenticated } = useAuth();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <View style={{ flex: 1, justifyContent: 'center', padding: 16 }}>
      <Text style={{ fontSize: 24, marginBottom: 16 }}>Welcome back!</Text>

      <FInput
        options={{
          placeholder: 'Email',
          style: { borderWidth: 1, marginBottom: 16, padding: 8 },
          value: email,
          onChangeText: setEmail,
        }}
      />

      <FInput
        options={{
          placeholder: 'Password',
          secureTextEntry: true,
          style: { borderWidth: 1, marginBottom: 16, padding: 8 },
          value: password,
          onChangeText: setPassword,
        }}
      />

      <FButton
        innerText="Sign In"
        options={{
          mode: 'contained',
          onPress:() => signIn({ email, password }),
          children: null,
        }}
      />
      <Link href="/signup" style={{ marginTop: 16 }}>
        Don't have an account? Sign up
      </Link>
    </View>
  );
}
