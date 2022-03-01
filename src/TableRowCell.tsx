import React, {
  useRef,
  useState,
  useReducer,
  useCallback,
  useMemo,
  useEffect,
} from "react";
import {
  SafeAreaView,
  Pressable,
  Text,
  View,
  StyleSheet,
  Animated,
  PanResponder,
  TouchableOpacity,
} from "react-native";
import { TableContext, useTable } from "./TableContext";
import { ColumnSeperater } from "./ColumnSeperater";

export function TableRowCell({
  resizeable = false,
  field,
  index,
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
      <ColumnSeperater field={field}></ColumnSeperater>
    </>
  );
}
