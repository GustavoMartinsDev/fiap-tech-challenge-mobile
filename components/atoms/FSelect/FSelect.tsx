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
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { AntDesign } from '@expo/vector-icons';
import { Colors } from '@/constants/Colors';

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
    <View ref={buttonRef}>
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
                  keyExtractor={(item) => item}
                  data={data}
                  initialNumToRender={4}
                  renderItem={({ item }) => (
                    <TouchableOpacity
                      activeOpacity={0.8}
                      style={styles.optionItem}
                      onPress={() => onSelect(item)}
                    >
                      <Text>{item}</Text>
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
    backgroundColor: Colors.modal.background,
  },
  optionItem: {
    height: 40,
    justifyContent: 'center',
  },
  separator: {
    height: 4,
  },
  optionsBox: {
    backgroundColor: Colors.modal.main,
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
    backgroundColor: Colors.modal.main,
    flexDirection: 'row',
    width: '100%',
    alignItems: 'center',
    paddingHorizontal: 15,
    borderRadius: 8,
  },
});
