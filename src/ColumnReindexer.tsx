import React, { useRef, useMemo, ReactNode } from "react";
import { Animated, PanResponder } from "react-native";

import { useTable } from "./TableContext";

export function ColumnReindexer({
  column,
  children,
  index,
}: {
  column: any;
  index: number;
  children: ReactNode;
}) {
  const {
    debug,
    columns,
    rowHeight,
    panController,
    reIndex,
    columnKeyExtractor,
  } = useTable();
  const { widthValue, leftValue } = column;
  const opacityValue = useRef(new Animated.Value(1)).current;
  const startPosition = useRef(0);

  const columnKey = columnKeyExtractor(column);
  const panResponder = useMemo(() => {
    return PanResponder.create({
      onMoveShouldSetPanResponder: (event, gestureState) => {
        if (!panController.current) {
          panController.current = gestureState.stateID;
          return true;
        }
        return panController.current === gestureState.stateID;
      },
      onPanResponderGrant: (event, gestureState) => {
        opacityValue.setValue(0.4);
        const left = JSON.parse(JSON.stringify(leftValue));
        if (debug) {
          console.log("[reindex] grant: ", left, event.nativeEvent.locationX);
        }
        startPosition.current = left + event.nativeEvent.locationX;
      },
      onPanResponderMove: (event, gestureState) => {
        if (debug) {
          console.log("onPanResponderMove", event);
        }
        const currentX = startPosition.current + gestureState.dx;

        let highlightField = null;
        for (const field1 of columns) {
          if (highlightField) {
            field1.highlightValue.setValue(0);
          } else {
            const field1Right = JSON.parse(JSON.stringify(field1.rightValue));
            if (Math.abs(field1Right - currentX) < 50) {
              highlightField = field1;
              field1.highlightValue.setValue(1);
            } else {
              field1.highlightValue.setValue(0);
            }
          }
        }
      },
      onPanResponderRelease: (event, gestureState) => {
        if (debug) {
          console.log("onPanResponderRelease", event);
        }
        opacityValue.setValue(1);
        panController.current = null;

        const currentX = startPosition.current + gestureState.dx;

        let highlightField = null;
        let highlightIndex = -1;
        let i = 0;
        for (const field1 of columns) {
          if (!highlightField && columnKeyExtractor(field1) !== columnKey) {
            const field1Right = JSON.parse(JSON.stringify(field1.rightValue));
            if (Math.abs(field1Right - currentX) < 50) {
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
            // console.log("[reindex] not change");
          } else {
            if (index < highlightIndex) {
              toIndex--;
            }
            if (debug) {
              console.log(`[reindex] fromIndex ${index} toIndex ${toIndex}`);
            }
            reIndex({ fromIndex: index, toIndex });
          }
        } else {
          if (debug) {
            console.log("[reindex] not change, release at wrong position");
          }
        }
      },
    });
  }, [
    debug,
    columns,
    panController,
    columnKey,
    columnKeyExtractor,
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
        width: widthValue,
        height: rowHeight,
      }}
    >
      {children}
    </Animated.View>
  );
}
