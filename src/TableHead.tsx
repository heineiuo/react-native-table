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
    tailCellWidth,
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
          minWidth: tailCellWidth,
          height: rowHeight,
        }}
      ></Animated.View>
    </Animated.View>
  );
}
