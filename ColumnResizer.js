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

export function ColumnResizer({
  index,
  field,
  resizeable = false,
}: {
  index: number,
  field: any,
  resizeable?: boolean,
}) {
  const { leftValue, highlightValue, rightValue, widthValue } = field;
  const [draging, setDraging] = useState(false);
  const [panResult, setPanResult] = useState(null);
  const {
    rowHeight,
    fields,
    socket,
    resizerWidth,
    borderColor,
    highlightBorderColor,
  } = useTable();

  const nextField = fields[index + 1];

  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: () => true,
      onPanResponderGrant: () => {
        highlightValue.setValue(1);
        widthValue.setOffset(widthValue._value);
        rightValue.setOffset(rightValue._value);
        if (nextField) {
          nextField.widthValue.setOffset(nextField.widthValue._value);
          nextField.leftValue.setOffset(nextField.leftValue._value);
        }
      },
      onPanResponderMove: (event, gestureState) => {
        widthValue.setValue(gestureState.dx);
        rightValue.setValue(gestureState.dx);
        if (nextField) {
          nextField.widthValue.setValue(-gestureState.dx);
          nextField.leftValue.setValue(gestureState.dx);
        }
      },
      onPanResponderRelease: () => {
        highlightValue.setValue(0);
        widthValue.flattenOffset();
        rightValue.flattenOffset();
        if (nextField) {
          nextField.widthValue.flattenOffset();
          nextField.leftValue.flattenOffset();
        }
      },
    })
  ).current;

  return (
    <Animated.View
      {...panResponder.panHandlers}
      style={[
        {
          position: 'absolute',
          top: 0,
          zIndex: 10,
          height: rowHeight,
          width: resizerWidth,
          left: rightValue,
        },
      ]}>
      <Pressable
        style={[
          {
            display: 'flex',
            alignItems: 'center',
            width: resizerWidth,
            height: rowHeight,
          },
        ]}>
        {(state) => {
          return (
            <Animated.View
              style={[
                {
                  height: rowHeight,
                },
                {
                  backgroundColor: highlightValue.interpolate({
                    inputRange: [0, 1],
                    outputRange: [borderColor, highlightBorderColor],
                  }),
                  width: highlightValue.interpolate({
                    inputRange: [0, 1],
                    outputRange: [1, 3],
                  }),
                },
                state.hovered && {
                  width: 3,
                  backgroundColor: highlightBorderColor,
                },
              ]}></Animated.View>
          );
        }}
      </Pressable>
    </Animated.View>
  );
}
