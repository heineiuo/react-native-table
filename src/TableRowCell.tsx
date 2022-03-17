import React, {
  useCallback,
  useImperativeHandle,
  useMemo,
  useRef,
  useState,
} from "react";
import { View, Animated, TouchableOpacity } from "react-native";
import { useTable } from "./TableContext";
import { ColumnSeperater } from "./ColumnSeperater";
import { TableRowCellHighlight } from "./TableRowCellHighlight";

export function TableRowCell({
  field,
  fieldIndex,
  data,
  rowId,
}: {
  rowId: string;
  data: any;
  resizeable?: boolean;
  field: any;
  fieldIndex: number;
  index: number;
}) {
  const {
    focusCell,
    borderColor,
    highlightBorderColor,
    rowHeight,
    renderCell,
    keyExtractor,
    fields,
    indexCellWidth,
  } = useTable();

  const [isFocused, setIsFocused] = useState(false);

  const cellRef = useRef({
    blur() {
      setIsFocused(false);
    },
    focus() {
      setIsFocused(true);
    },
  });

  const onPress = useCallback(() => {
    focusCell({ cellRef });
  }, [focusCell]);

  return (
    <>
      <Animated.View
        style={[
          {
            zIndex: 5,
            position: "relative",
            borderColor,
            borderBottomWidth: 1,
            height: rowHeight,
            alignItems: "center",
            width: field.widthValue,
            /**
             * Set overflow visible to keep seperator visible
             */
            overflow: "visible",
          },
        ]}
      >
        <TableRowCellHighlight
          visible={isFocused}
          color={highlightBorderColor}
        ></TableRowCellHighlight>
        <TouchableOpacity
          style={{ width: "100%", height: "100%", overflow: "hidden" }}
          onPress={onPress}
        >
          {renderCell({
            columnId: field.fieldId,
            fieldId: field.fieldId,
            rowId,
            item: data,
          })}
        </TouchableOpacity>
        <ColumnSeperater
          field={field}
          fieldIndex={fieldIndex}
        ></ColumnSeperater>
      </Animated.View>
    </>
  );
}
