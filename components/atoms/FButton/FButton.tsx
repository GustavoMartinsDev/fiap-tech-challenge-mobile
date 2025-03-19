import { TextStyle, View } from 'react-native';
import { Button, ButtonProps, Text, TextProps } from 'react-native-paper';

interface FButtonProps {
  innerText: string;
  options?: ButtonProps;
  textProps?: TextProps<TextStyle>;
}

export function FButton(props: FButtonProps) {
  return (
    <View>
      <Button {...props.options}>
        <Text {...props.textProps} style={{ fontWeight: 600 }}>
          {props.innerText}
        </Text>
      </Button>
    </View>
  );
}
