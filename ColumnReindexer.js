import React, { useRef, useMemo } from 'react';
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

export function ColumnReindexer({
  field,
  children,
  index,
}: {
  field: any,
  index: number,
  children: ReactNode,
}) {
  const { fields, rowHeight, panController, reIndex } = useTable();
  const { highlightValue, widthValue, rightValue, leftValue } = field;
  const opacityValue = useRef(new Animated.Value(1)).current;
  const startPosition = useRef(0);

  const panResponder = useMemo(() => {
    return PanResponder.create({
      onMoveShouldSetPanResponder: (event, gestureState) => {
        // console.log('reindexer onMoveShouldSetPanResponder:')
        // console.log('reindexer onMoveShouldSetPanResponder', panController.current)

        if (!panController.current) {
          panController.current = gestureState.stateID;
          return true;
        }
        return panController.current === gestureState.stateID;
      },
      onPanResponderGrant: (event, gestureState) => {
        opacityValue.setValue(0.4);
        startPosition.current = leftValue._value + event.nativeEvent.locationX;
      },
      onPanResponderMove: (event, gestureState) => {
        // console.log('reindexer onPanResponderMove', panController.current)

        const currentX = startPosition.current + gestureState.dx;

        let highlightField = null;
        for (const field1 of fields) {
          if (highlightField) {
            field1.highlightValue.setValue(0);
          } else {
            if (Math.abs(field1.rightValue._value - currentX) < 50) {
              highlightField = field1;
              field1.highlightValue.setValue(1);
            } else {
              field1.highlightValue.setValue(0);
            }
          }
        }
      },
      onPanResponderRelease: (event, gestureState) => {
        opacityValue.setValue(1);
        panController.current = null;

        console.log(
          'reindex current fields',
          fields.map((field1) => field1.fieldId)
        );
        const currentX = startPosition.current + gestureState.dx;

        let highlightField = null;
        let highlightIndex = -1;
        let i = 0;
        for (const field1 of fields) {
          if (!highlightField && field1.fieldId !== field.fieldId) {
            if (Math.abs(field1.rightValue._value - currentX) < 50) {
              highlightField = field1;
              highlightIndex = i;
            }
          }
          field1.highlightValue.setValue(0);
          i++;
        }
        if (highlightField) {
          let toIndex = highlightIndex + 1;
          if (toIndex === index) {
            console.log('reindex: not change');
          } else {
            if (index < highlightIndex) {
              toIndex--;
            }
            console.log(`reindex: fromIndex ${index} toIndex ${toIndex}`);
            reIndex({ fromIndex: index, toIndex });
          }
        }
      },
    });
  }, [
    fields,
    panController,
    field.fieldId,
    index,
    leftValue,
    opacityValue,
    reIndex,
  ]);

  return (
    <Animated.View
      {...panResponder.panHandlers}
      style={{
        zIndex: -1,
        opacity: opacityValue,
        widthValue,
        height: rowHeight,
      }}>
      {children}
    </Animated.View>
  );
}
