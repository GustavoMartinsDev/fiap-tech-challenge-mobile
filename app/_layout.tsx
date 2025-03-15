import {
  Inter_400Regular,
  Inter_700Bold,
  useFonts,
} from '@expo-google-fonts/inter';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import {
  configureFonts,
  MD3LightTheme as DefaultTheme,
  Provider as PaperProvider,
} from 'react-native-paper';
import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';
import 'react-native-reanimated';

import { AuthProvider } from '@/context/AuthContext';
import { Colors } from '@/constants/Colors';
import { ThemeProp } from 'react-native-paper/lib/typescript/types';

SplashScreen.preventAutoHideAsync();

const theme: ThemeProp = {
  ...DefaultTheme,
  colors: {
    // ...DefaultTheme.colors,
    primary: Colors.primary.main,
    onPrimary: Colors.primary.contrastText,
    secondary: Colors.secondary.main,
    onSecondary: Colors.secondary.contrastText,
    tertiary: Colors.tertiary.main,
    background: Colors.tertiary.light,
    error: Colors.error.main,
    onError: Colors.error.contrastText,
    // surface: Colors.bgCard.main,
    // text: Colors.textLight.main,
  },
  fonts: configureFonts({ config: { fontFamily: 'Inter' } }),
};

export default function RootLayout() {
  const [loaded] = useFonts({
    Inter: Inter_400Regular,
    InterBold: Inter_700Bold,
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <AuthProvider>
      <PaperProvider theme={theme}>
        <Stack>
          <Stack.Screen name="(auth)/signin" options={{ headerShown: false }} />
          <Stack.Screen name="(auth)/signup" options={{ headerShown: false }} />
          <Stack.Screen
            name="(protected)/(tabs)"
            options={{ headerShown: false }}
          />
          <Stack.Screen name="+not-found" />
        </Stack>
        <StatusBar style="auto" backgroundColor={theme.colors!.primary} />
      </PaperProvider>
    </AuthProvider>
  );
}
