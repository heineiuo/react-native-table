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
    panController,
    fields,
    resizerWidth,
    borderColor,
    highlightBorderColor,
  } = useTable();

  const nextField = fields[index + 1];

  const panResponder = useMemo(() => {
    return PanResponder.create({
      onMoveShouldSetPanResponder: (event, gestureState) => {
        // console.log('resizer onMoveShouldSetPanResponder start');
        // console.log(
        //   'resizer onMoveShouldSetPanResponder',
        //   panController.current
        // );
        if (!panController.current) {
          panController.current = gestureState.stateID;
          return true;
        }
        return panController.current === gestureState.stateID;
      },
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
        // console.log('resizer onPanResponderMove', panController.current);

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
        panController.current = null;
        if (nextField) {
          nextField.widthValue.flattenOffset();
          nextField.leftValue.flattenOffset();
        }
      },
    });
  }, [highlightValue, nextField, panController, rightValue, widthValue]);

  return (
    <Animated.View
      {...panResponder.panHandlers}
      style={[
        {
          position: 'absolute',
          top: 0,
          left: rightValue,
          zIndex: 10,
          height: rowHeight,
          width: resizerWidth,
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
