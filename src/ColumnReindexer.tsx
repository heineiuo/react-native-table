import React, { useRef, useMemo, ReactNode } from "react";
import { Animated, PanResponder } from "react-native";
import { useTable } from "./TableContext";

export function ColumnReindexer({
  field,
  children,
  index,
}: {
  field: any;
  index: number;
  children: ReactNode;
}) {
  const { fields, rowHeight, panController, reIndex } = useTable();
  const { widthValue, leftValue } = field;
  const opacityValue = useRef(new Animated.Value(1)).current;
  const startPosition = useRef(0);

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
        // console.log("[reindex] grant: ", left, event.nativeEvent.locationX);
        startPosition.current = left + event.nativeEvent.locationX;
      },
      onPanResponderMove: (event, gestureState) => {
        const currentX = startPosition.current + gestureState.dx;

        let highlightField = null;
        for (const field1 of fields) {
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
        opacityValue.setValue(1);
        panController.current = null;

        // console.log(
        //   "[reindex] current fields:",
        //   fields.map((field1) => field1.fieldId)
        // );

        const currentX = startPosition.current + gestureState.dx;
        // console.log("[reindex] currentX:", currentX);

        let highlightField = null;
        let highlightIndex = -1;
        let i = 0;
        for (const field1 of fields) {
          if (!highlightField && field1.fieldId !== field.fieldId) {
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
            // console.log(`[reindex] fromIndex ${index} toIndex ${toIndex}`);
            reIndex({ fromIndex: index, toIndex });
          }
        } else {
          // console.log("[reindex] not change, release at wrong position");
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
        width: widthValue,
        height: rowHeight,
      }}
    >
      {children}
    </Animated.View>
  );
}
