import { Colors } from '@/constants/Colors';
import { StyleSheet, View } from 'react-native';
import { TextInput, TextInputProps } from 'react-native-paper';

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
    flex: 1,
  },
  input: {
    borderWidth: 1,
    borderRadius: 4,
    borderColor: Colors.primary.main,
    backgroundColor: Colors.primary.light,
  },
});
