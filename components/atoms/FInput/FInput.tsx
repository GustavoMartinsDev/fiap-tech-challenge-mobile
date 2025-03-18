import { Colors } from '@/constants/Colors';
import { View } from 'react-native';
import { TextInput, TextInputProps } from 'react-native-paper';
import { StyleSheet } from 'react-native';

type FInputProps = {
  options?: TextInputProps;
};

export function FInput(props: FInputProps) {
  return (
    <View style={styles.container}>
      <TextInput
        {...props.options}
        style={styles.input}
        value={props.options?.value ?? ''}
        placeholder={props.options?.placeholder ?? 'Digite...'}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    backgroundColor: Colors.primary.contrastText,
    borderRadius: 8,
  },
  input: {
    borderWidth: 1,
    borderRadius: 8,
    borderColor: Colors.primary.main,
  },
});
