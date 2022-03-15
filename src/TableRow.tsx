import React, { useMemo } from "react";
import { View, Text, Animated, Pressable } from "react-native";
import { useTable } from "./TableContext";
import { TableRowCell } from "./TableRowCell";

export function TableRow({ item, index = 0 }: { item: any; index: number }) {
  const {
    fields,
    rowHoverdBackgroundColor,
    rowHeight,
    borderColor,
    indexCellWidth,
    totalWidthValue,
    keyExtractor,
    tableWidth,
  } = useTable();

  const rowId = useMemo(() => {
    return keyExtractor(item);
  }, [keyExtractor, item]);

  return (
    <Animated.View
      style={{
        height: rowHeight,
        width: totalWidthValue,
        minWidth: tableWidth,
      }}
    >
      <Pressable
        style={(state) => {
          const hovered = (state as unknown as any).hovered;
          return [
            {
              display: "flex",
              flexDirection: "row",
              justifyContent: "flex-start",
              height: rowHeight,
              width: "100%",
              borderBottomWidth: 1,
              borderColor,
            },
            hovered && {
              backgroundColor: rowHoverdBackgroundColor,
            },
          ];
        }}
      >
        <View
          style={{
            // position: "absolute",
            left: 0,
            top: 0,
            padding: 4,
            height: rowHeight,
            width: indexCellWidth,
          }}
        >
          <Text>{index + 1}</Text>
        </View>
        {fields.map((field, fieldIndex) => {
          const data = item.fields.find(
            (dataField) => dataField.fieldId === field.fieldId
          );
          return (
            <TableRowCell
              field={field}
              rowId={rowId}
              index={index}
              fieldIndex={fieldIndex}
              data={data ?? {}}
              key={field.fieldId}
            ></TableRowCell>
          );
        })}
      </Pressable>
    </Animated.View>
  );
}
