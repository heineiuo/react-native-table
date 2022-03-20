import React from "react";
import { Text, View, Animated } from "react-native";

import { ColumnReindexer } from "./ColumnReindexer";
import { ColumnResizer } from "./ColumnResizer";
import { useTable } from "./TableContext";

export function TableHeadCell({
  resizeable = false,
  field,
  index,
}: {
  resizeable?: boolean;
  field: any;
  index: number;
}) {
  const { rowHeight, borderColor, ColumnHeaderComponent } = useTable();

  let header = (
    <View
      style={{
        padding: 4,
      }}
    >
      <Text>{field.title}</Text>
    </View>
  );

  if (ColumnHeaderComponent) {
    if ("type" in ColumnHeaderComponent) {
      header = ColumnHeaderComponent;
    } else {
      header = <ColumnHeaderComponent column={field} field={field} />;
    }
  }

  return (
    <>
      <Animated.View
        style={[
          {
            overflow: "hidden",
            zIndex: -1,
            borderColor,
            borderBottomWidth: 1,
            height: rowHeight,
            top: 0,
            alignItems: "center",
            width: field.widthValue,
          },
        ]}
      >
        <ColumnReindexer field={field} index={index}>
          {header}
        </ColumnReindexer>
      </Animated.View>
      <ColumnResizer resizeable={resizeable} field={field} index={index} />
    </>
  );
}
