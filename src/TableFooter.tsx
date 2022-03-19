import React, { ReactNode, useEffect } from "react";
import { View, Animated } from "react-native";
import { useTable } from "./TableContext";

export function TableFooter() {
  const {
    borderColor,
    indexCellWidth,
    rowHeight,
    totalWidthValue,
    tableWidth,
    FooterIndexCellComponent,
    FooterCellComponent,
  } = useTable();

  let indexCell: ReactNode = null;
  let footerCell: ReactNode = null;

  if (FooterIndexCellComponent) {
    if ("type" in FooterIndexCellComponent) {
      indexCell = FooterIndexCellComponent;
    } else {
      indexCell = <FooterIndexCellComponent></FooterIndexCellComponent>;
    }
  }

  if (FooterCellComponent) {
    if ("type" in FooterCellComponent) {
      footerCell = FooterCellComponent;
    } else {
      footerCell = <FooterCellComponent></FooterCellComponent>;
    }
  }

  return (
    <Animated.View
      style={[
        {
          width: totalWidthValue,
          minWidth: tableWidth,
          borderBottomWidth: 1,
          height: rowHeight,
          borderColor,
          backgroundColor: "#fff",
          display: "flex",
          flexDirection: "row",
          justifyContent: "flex-start",
        },
      ]}
    >
      <View
        style={{
          height: rowHeight,
          width: indexCellWidth,
        }}
      >
        {indexCell}
      </View>
      <Animated.View
        style={{
          minWidth: Animated.subtract(totalWidthValue, indexCellWidth),
          height: rowHeight,
        }}
      >
        {footerCell}
      </Animated.View>
    </Animated.View>
  );
}
