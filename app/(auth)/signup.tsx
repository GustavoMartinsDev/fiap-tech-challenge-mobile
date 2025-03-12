import { View, Text } from 'react-native';
import { FButton } from '@/components/atoms/FButton/FButton';
import { FInput } from '@/components/atoms/FInput/FInput';
import { Link } from 'expo-router';
import { useState } from 'react';
import { useAuth } from '@/context/AuthContext';

export default function Signup() {
  const { signUp } = useAuth();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <View style={{ flex: 1, justifyContent: 'center', padding: 16 }}>
      <Text style={{ fontSize: 24, marginBottom: 16 }}>Sign Up</Text>

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
          style: { borderWidth: 1, marginBottom: 16, padding: 8 },
          value: password,
          onChangeText: setPassword,
        }}
      />

      <FButton
        innerText="Sign Up"
        options={{
          mode: 'contained',
          onPress: () => signUp(email, password),
          children: null,
        }}
      />
      <Link href="/login" style={{ marginTop: 16 }}>
        Already have an account? Log in
      </Link>
    </View>
  );
}
