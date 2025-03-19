import { Colors } from '@/constants/Colors';
import { View } from 'react-native';
import { Portal, Snackbar, SnackbarProps } from 'react-native-paper';

export enum AlertMessageColor {
  Success = 'green',
  Error = 'red',
  Warning = 'yellow',
  Info = 'blue',
}

export interface FAlertModel {
  textAlert: string;
  type: AlertMessageColor;
  options?: SnackbarProps;
}

const alertMessageColors = {
  [AlertMessageColor.Success]: Colors.alerts.success,
  [AlertMessageColor.Error]: Colors.alerts.error,
  [AlertMessageColor.Warning]: Colors.alerts.warning,
  [AlertMessageColor.Info]: Colors.alerts.info,
};

export function FAlert(props: FAlertModel) {
  return (
    <View>
      <Portal>
        <Snackbar
          visible={props.options?.visible!}
          onDismiss={() => props.options?.onDismiss()}
          {...props.options}
          style={{
            display: props.options?.visible ? 'flex' : 'none',
            backgroundColor: alertMessageColors[props.type],
            position: 'relative',
            top: 0,
            left: 0,
            marginBottom: 30,
          }}
        >
          {props.textAlert}
        </Snackbar>
      </Portal>
    </View>
  );
}
