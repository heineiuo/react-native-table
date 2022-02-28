import React, {
  useRef,
  useState,
  useReducer,
  useCallback,
  useMemo,
  useEffect,
} from "react";
import { Text, View, Animated } from "react-native";
import { TableContext, useTable } from "./TableContext";
import { ColumnResizer } from "./ColumnResizer";
import { ColumnReindexer } from "./ColumnReindexer";

export function TableHeadCell({
  resizeable = false,
  field,
  index,
}: {
  resizeable?: boolean;
  field: any;
  index: number;
}) {
  const { fields, rowHeight, borderColor } = useTable();
  // const prevField = fields[index - 1] ?? null;

  return (
    <>
      <Animated.View
        style={[
          {
            overflow: "hidden",
            zIndex: 5,
            borderColor,
            borderBottomWidth: 1,
            height: rowHeight,
            position: "absolute",
            top: 0,
            alignItems: "center",
          },
          {
            left: field.leftValue,
            width: field.widthValue,
          },
        ]}
      >
        <ColumnReindexer field={field} index={index}>
          <View
            style={{
              padding: 4,
            }}
          >
            <Text>{field.title}</Text>
          </View>
        </ColumnReindexer>
      </Animated.View>
      <ColumnResizer
        resizeable={resizeable}
        field={field}
        index={index}
      ></ColumnResizer>
    </>
  );
}
