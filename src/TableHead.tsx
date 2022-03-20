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
    HeadColumnHeaderComponent,
    TailColumnHeaderComponent,
  } = useTable();

  let tailCell: ReactNode = null;
  let headCell: ReactNode = null;

  if (TailColumnHeaderComponent) {
    if ("type" in TailColumnHeaderComponent) {
      tailCell = TailColumnHeaderComponent;
    } else {
      tailCell = <TailColumnHeaderComponent />;
    }
  }

  if (HeadColumnHeaderComponent) {
    if ("type" in HeadColumnHeaderComponent) {
      headCell = HeadColumnHeaderComponent;
    } else {
      headCell = <HeadColumnHeaderComponent />;
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
        {headCell}
      </View>
      {fields.map((field, index) => {
        return (
          <TableHeadCell
            resizeable={resizeable}
            field={field}
            index={index}
            key={field.fieldId}
          />
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
