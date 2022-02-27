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
  Pressable,
  Text,
  View,
  StyleSheet,
  Animated,
  PanResponder,
  useAnimated,
} from 'react-native';
import { TableContext, useTable } from './TableContext';
import { ColumnResizer } from './ColumnResizer';

export function TableHeadCell({
  resizeable = false,
  field,
  index,
}: {
  resizeable?: boolean,
  field: any,
  index: number,
}) {
  const { fields, rowHeight, borderColor } = useTable();
  const prevField = fields[index - 1] ?? null;

  return (
    <>
      <Animated.View
        style={[
          {
            overflow: 'hidden',
            zIndex: 5,
            borderColor,
            borderBottomWidth: 1,
            height: rowHeight,
            position: 'absolute',
            top: 0,
            padding: 4,
            textAligh: 'center',
          },
          {
            left: field.leftValue,
            width: field.widthValue,
          },
        ]}>
        <Text>{field.title}</Text>
      </Animated.View>
      <ColumnResizer
        resizeable={resizeable}
        field={field}
        index={index}></ColumnResizer>
    </>
  );
}
