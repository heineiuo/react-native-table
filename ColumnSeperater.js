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
import { useTable } from './TableContext';

export function ColumnSeperater({ field }, { field: any }) {
  const { rowHeight, resizerWidth, borderColor, highlightBorderColor } =
    useTable();
  const { rightValue, highlightValue } = field;

  return (
    <Animated.View
      style={[
        styles.wrapper,
        {
          height: rowHeight,
          width: resizerWidth,
          zIndex: highlightValue.interpolate({
            inputRange: [0, 1],
            outputRange: [-10, 10],
          }),
          left: rightValue,
        },
      ]}>
      <Animated.View
        style={[
          {
            height: rowHeight,
            backgroundColor: highlightValue.interpolate({
              inputRange: [0, 1],
              outputRange: [borderColor, highlightBorderColor],
            }),
            width: highlightValue.interpolate({
              inputRange: [0, 1],
              outputRange: [1, 3],
            }),
          },
        ]}></Animated.View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    position: 'absolute',
    top: 0,
    display: 'flex',
    alignItems: 'center',
  },
});
