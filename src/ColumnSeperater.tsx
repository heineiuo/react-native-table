import React from "react";
import { StyleSheet, Animated } from "react-native";

import { useTable } from "./TableContext";

export function ColumnSeperater({
  column,
  columnIndex,
}: {
  column: any;
  columnIndex: number;
}) {
  const {
    rowHeight,
    resizerWidth,
    borderColor,
    highlightBorderColor,
    indexCellWidth,
  } = useTable();
  const { highlightValue } = column;

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
          right: -resizerWidth / 2,
        },
      ]}
    >
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
        ]}
      />
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    position: "absolute",
    top: 0,
    display: "flex",
    alignItems: "center",
  },
});
