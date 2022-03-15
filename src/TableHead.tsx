import React, { useEffect } from "react";
import { View, Animated } from "react-native";
import { useTable } from "./TableContext";
import { TableHeadCell } from "./TableHeadCell";

export function TableHead() {
  const {
    borderColor,
    indexCellWidth,
    fields,
    rowHeight,
    totalWidthValue,
    tailCellLeftValue,
    resizeable,
    tableWidth,
  } = useTable();

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
        },
      ]}
    >
      <View
        style={{
          position: "absolute",
          left: 0,
          top: 0,
          height: rowHeight,
          // borderColor,
          // borderBottomWidth: 1,
          width: indexCellWidth,
        }}
      ></View>
      {fields.map((field, index) => {
        return (
          <TableHeadCell
            resizeable={resizeable}
            field={field}
            index={index}
            key={field.fieldId}
          ></TableHeadCell>
        );
      })}
      <Animated.View
        style={{
          position: "absolute",
          top: 0,
          left: tailCellLeftValue,
          minWidth: 100,
          height: rowHeight,
        }}
      ></Animated.View>
    </Animated.View>
  );
}
