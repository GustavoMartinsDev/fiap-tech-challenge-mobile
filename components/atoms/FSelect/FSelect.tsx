import { ThemedText } from '@/components/ThemedText';
import { Colors } from '@/constants/Colors';
import { AntDesign } from '@expo/vector-icons';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import {
  Modal,
  StyleSheet,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
  VirtualizedList,
} from 'react-native';

interface DropDownProps {
  data: string[];
  onChange: (item: string) => void;
  placeholder: string;
}

export default function FSelectInput({
  data,
  onChange,
  placeholder,
}: DropDownProps) {
  const [expanded, setExpanded] = useState(false);

  const toggleExpanded = useCallback(() => setExpanded(!expanded), [expanded]);

  const buttonRef = useRef<View>(null);

  const [value, setValue] = useState('');

  useEffect(() => {
    setValue(placeholder || 'Selecione...');
  }, [placeholder]);

  const onSelect = useCallback((item: string) => {
    onChange(item);
    setValue(item);
    setExpanded(false);
  }, []);

  const getItem = (data: string[], index: number) => data[index];
  const getItemCount = (data: string[]) => data.length;

  return (
    <View ref={buttonRef} style={styles.container}>
      <TouchableOpacity
        style={styles.button}
        activeOpacity={0.8}
        onPress={toggleExpanded}
      >
        <ThemedText type="default">{value || placeholder}</ThemedText>
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
                  keyExtractor={(item) => item}
                  data={data}
                  initialNumToRender={4}
                  renderItem={({ item }) => (
                    <TouchableOpacity
                      activeOpacity={0.8}
                      style={styles.optionItem}
                      onPress={() => onSelect(item)}
                    >
                      <ThemedText type="default">{item}</ThemedText>
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
  container: {
    borderWidth: 1,
    borderRadius: 4,
    borderColor: Colors.primary.main,
  },
  backdrop: {
    padding: 0,
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    backgroundColor: Colors.modal.background,
  },
  optionItem: {
    height: 60,
    justifyContent: 'center',
    paddingHorizontal: 16,
  },
  separator: {
    height: 4,
  },
  optionsBox: {
    backgroundColor: Colors.modal.main,
    width: '90%',
    padding: 10,
    borderRadius: 4,
    maxHeight: 200,
    position: 'absolute',
    left: 20,
  },
  button: {
    height: 60,
    justifyContent: 'space-between',
    backgroundColor: Colors.primary.light,
    flexDirection: 'row',
    width: '100%',
    alignItems: 'center',
    paddingHorizontal: 15,
    borderRadius: 4,
  },
});
