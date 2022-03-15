import React, { useCallback, useMemo } from "react";
import { View, Animated, TouchableOpacity } from "react-native";
import { useTable } from "./TableContext";
import { ColumnSeperater } from "./ColumnSeperater";

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
    focusedField,
    focusedRow,
    renderCell,
    keyExtractor,
    fields,
    indexCellWidth,
  } = useTable();

  const onPress = useCallback(() => {
    focusCell({ fieldId: field.fieldId, rowId });
  }, [focusCell, field.fieldId, rowId]);

  const isFocused = useMemo(() => {
    return focusedRow === rowId && focusedField === field.fieldId;
  }, [focusedRow, focusedField, rowId, field.fieldId]);

  return (
    <>
      <Animated.View
        style={[
          {
            zIndex: 5,
            position: "absolute",
            top: 0,
            borderColor,
            borderBottomWidth: 1,
            height: rowHeight,
            overflow: "hidden",
            alignItems: "center",
          },
          { left: field.leftValue, width: field.widthValue },
        ]}
      >
        {isFocused && (
          <View
            style={[
              {
                zIndex: 0,
                position: "absolute",
                width: "100%",
                height: "100%",
                borderWidth: 2,
                top: 0,
                left: 0,
                borderColor: highlightBorderColor,
              },
            ]}
          >
            <View
              style={[
                {
                  width: "100%",
                  height: "100%",
                  borderWidth: 3,
                  top: 0,
                  left: 0,
                  borderColor: "#fff",
                },
              ]}
            ></View>
          </View>
        )}
        <TouchableOpacity
          style={{ width: "100%", height: "100%" }}
          onPress={onPress}
        >
          {renderCell({
            columnId: field.fieldId,
            fieldId: field.fieldId,
            rowId,
            item: data,
          })}
        </TouchableOpacity>
      </Animated.View>
      <ColumnSeperater field={field} fieldIndex={fieldIndex}></ColumnSeperater>
    </>
  );
}
