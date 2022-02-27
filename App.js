import React, {
  useRef,
  useState,
  useReducer,
  useCallback,
  useMemo,
  useEffect,
} from 'react';
import {
  SafeAreaView,
  useWindowDimensions,
  Pressable,
  Text,
  View,
  StyleSheet,
  Animated,
  PanResponder,
  useAnimated,
} from 'react-native';
import { Table } from './Table';

const sampleData = () =>
  Array.from({ length: 999 }, (v, k) => {
    return {
      id: `id${k}`,
      fields: [
        { fieldId: 'f1', value: `${Math.random().toString().slice(2, 10)}` },
        { fieldId: 'f2', value: `${Math.random().toString().slice(2)}` },
      ],
    };
  });

const sampleFields = () => [
  { fieldId: 'f1', title: 'Fileds1' },
  { fieldId: 'f2', title: 'Fileds2' },
];

export default function App() {
  const { height, width } = useWindowDimensions()
  const [fields, setFields] = useState(sampleFields);
  const [data, setData] = useState(sampleData);

  return (
    <SafeAreaView>
      <Table
        highlightBorderColor="blue"
        style={{ margin: 10, width: width - 20, height: height - 20 }}
        fields={fields}
        data={data}></Table>
    </SafeAreaView>
  );
}
