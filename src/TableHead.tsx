import React, { ReactNode, useEffect } from "react";
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
    TailColumnHeaderComponent,
  } = useTable();

  let tailCell: ReactNode = null;

  if (TailColumnHeaderComponent) {
    if ("type" in TailColumnHeaderComponent) {
      tailCell = TailColumnHeaderComponent;
    } else {
      tailCell = <TailColumnHeaderComponent></TailColumnHeaderComponent>;
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
      >
        {tailCell}
      </Animated.View>
    </Animated.View>
  );
}
