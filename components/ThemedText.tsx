import { Colors } from '@/constants/Colors';
import { StyleSheet, Text, type TextProps } from 'react-native';

export type ThemedTextProps = TextProps & {
  isDark?: boolean;
  type?: 'default' | 'title' | 'defaultSemiBold' | 'subtitle' | 'caption';
};

export function ThemedText({
  style,
  isDark = false,
  type = 'default',
  ...rest
}: ThemedTextProps) {
  return (
    <Text
      style={[
        { color: isDark ? Colors.primary.contrastText : Colors.primary.main },
        type === 'default' ? styles.default : undefined,
        type === 'title' ? styles.title : undefined,
        type === 'defaultSemiBold' ? styles.defaultSemiBold : undefined,
        type === 'subtitle' ? styles.subtitle : undefined,
        type === 'caption' ? styles.caption : undefined,
        style,
      ]}
      {...rest}
    />
  );
}

const styles = StyleSheet.create({
  default: {
    fontSize: 16,
    lineHeight: 24,
  },
  defaultSemiBold: {
    fontSize: 16,
    lineHeight: 24,
    fontWeight: '600',
  },
  title: {
    fontSize: 24,
    lineHeight: 32,
    fontWeight: 'bold',
  },
  subtitle: {
    fontSize: 20,
    lineHeight: 28,
  },
  caption: {
    fontSize: 14,
    lineHeight: 20,
  },
});
