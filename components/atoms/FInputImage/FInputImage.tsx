import { useState } from 'react';
import { FIconButton } from '../FIconButton/FIconButton';
import * as ImagePicker from 'expo-image-picker';

interface FInputImageProps {
  onGetImage: (image: string) => void;
}

export function FInputImage(props: FInputImageProps) {
  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images'],
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      props.onGetImage(result.assets[0].uri);
    }
  };

  return (
    <FIconButton
      options={{ icon: 'camera', mode: 'contained', onPress: pickImage }}
    />
  );
}
