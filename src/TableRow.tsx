import React, { ReactNode, useMemo } from "react";
import { View, Text, Animated, Pressable } from "react-native";

import { useTable } from "./TableContext";
import { TableRowCell } from "./TableRowCell";

export function TableRow({ item, index = 0 }: { item: any; index: number }) {
  const {
    columns,
    columnKeyExtractor,
    cellsExtractor,
    rowHoverdBackgroundColor,
    rowHeight,
    borderColor,
    indexCellWidth,
    totalWidthValue,
    keyExtractor,
    TailCellComponent,
    IndexCellComponent,
    tableWidth,
  } = useTable();

  const rowId = useMemo(() => {
    return keyExtractor(item);
  }, [keyExtractor, item]);

  let tailCell: ReactNode = null;
  let indexCell: ReactNode = (
    <View>
      <Text>{index + 1}</Text>
    </View>
  );

  if (TailCellComponent) {
    if ("type" in TailCellComponent) {
      tailCell = TailCellComponent;
    } else {
      tailCell = <TailCellComponent index={index} />;
    }
  }

  if (IndexCellComponent) {
    if ("type" in IndexCellComponent) {
      indexCell = IndexCellComponent;
    } else {
      indexCell = <IndexCellComponent index={index} />;
    }
  }

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
          {indexCell}
        </View>
        {columns.map((field, fieldIndex) => {
          const data = cellsExtractor(item).find(
            (cell) => columnKeyExtractor(cell) === columnKeyExtractor(field)
          );
          return (
            <TableRowCell
              column={field}
              rowId={rowId}
              index={index}
              fieldIndex={fieldIndex}
              data={data ?? {}}
              key={columnKeyExtractor(field)}
            />
          );
        })}
        {tailCell}
      </Pressable>
    </Animated.View>
  );
}
