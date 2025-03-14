import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Modal,
  TouchableWithoutFeedback,
  Platform,
  VirtualizedList,
} from 'react-native';
import React, { useCallback, useRef, useState } from 'react';
import { AntDesign } from '@expo/vector-icons';

export type OptionItemModel = {
  value: string;
  label: string;
};

interface DropDownProps {
  data: OptionItemModel[];
  onChange: (item: OptionItemModel) => void;
  placeholder: string;
}

export default function FSelectInput({
  data,
  onChange,
  placeholder,
}: DropDownProps) {
  const [expanded, setExpanded] = useState(false);

  const toggleExpanded = useCallback(() => setExpanded(!expanded), [expanded]);

  const [value, setValue] = useState('');

  const buttonRef = useRef<View>(null);

  const [top, setTop] = useState(0);

  const onSelect = useCallback((item: OptionItemModel) => {
    onChange(item);
    setValue(item.label);
    setExpanded(false);
  }, []);

  const getItem = (data: OptionItemModel[], index: number) => data[index];
  const getItemCount = (data: OptionItemModel[]) => data.length;

  return (
    <View
      ref={buttonRef}
      onLayout={(event) => {
        const layout = event.nativeEvent.layout;
        const topOffset = layout.y;
        const heightOfComponent = layout.height;

        const finalValue =
          topOffset + heightOfComponent + (Platform.OS === 'android' ? -32 : 3);

        setTop(finalValue);
      }}
    >
      <TouchableOpacity
        style={styles.button}
        activeOpacity={0.8}
        onPress={toggleExpanded}
      >
        <Text style={styles.text}>{value || placeholder}</Text>
        <AntDesign name={expanded ? 'caretup' : 'caretdown'} />
      </TouchableOpacity>
      {expanded ? (
        <Modal
          transparent={true}
          animationType="fade"
          visible={expanded}
          onRequestClose={toggleExpanded}
        >
          <TouchableWithoutFeedback onPress={toggleExpanded}>
            <View style={styles.backdrop}>
              <View style={[styles.optionsBox]}>
                <VirtualizedList
                  keyExtractor={(item) => item.value}
                  data={data}
                  initialNumToRender={4}
                  renderItem={({ item }) => (
                    <TouchableOpacity
                      activeOpacity={0.8}
                      style={styles.optionItem}
                      onPress={() => onSelect(item)}
                    >
                      <Text>{item.label}</Text>
                    </TouchableOpacity>
                  )}
                  getItem={getItem}
                  getItemCount={getItemCount}
                  ItemSeparatorComponent={() => (
                    <View style={styles.separator} />
                  )}
                />
              </View>
            </View>
          </TouchableWithoutFeedback>
        </Modal>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  backdrop: {
    padding: 0,
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  optionItem: {
    height: 40,
    justifyContent: 'center',
  },
  separator: {
    height: 4,
  },
  optionsBox: {
    backgroundColor: 'white',
    width: '90%',
    padding: 10,
    borderRadius: 6,
    maxHeight: 200,
    position: 'absolute',
    left: 20,
  },
  text: {
    fontSize: 15,
    opacity: 0.8,
  },
  button: {
    height: 50,
    justifyContent: 'space-between',
    backgroundColor: '#fff',
    flexDirection: 'row',
    width: '100%',
    alignItems: 'center',
    paddingHorizontal: 15,
    borderRadius: 8,
  },
});
