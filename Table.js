import React, {
  useRef,
  useState,
  useReducer,
  useCallback,
  useMemo,
  useEffect,
} from 'react';
import {
  View,
  FlatList,
  Pressable,
  Animated,
  PanResponder,
  useAnimated,
} from 'react-native';
import { TableContext } from './TableContext';
import { TableHead } from './TableHead';
import { TableRow } from './TableRow';

function resetPosition(fields, indexCellWidth, cellWidth, resizerWidth) {
  let prevRight = indexCellWidth;
  let width = cellWidth;

  return fields.map((field) => {
    const left = prevRight;
    prevRight += width;
    const leftValue = left;
    const widthValue = width;
    const rightValue = prevRight - resizerWidth / 2;
    const highlightValue = 0;
    const result = {
      left,
      width,
      ...field,
    };
    if (!result.leftValue) {
      result.leftValue = new Animated.Value(leftValue);
      result.widthValue = new Animated.Value(widthValue);
      result.rightValue = new Animated.Value(rightValue);
      result.highlightValue = new Animated.Value(highlightValue);
    } else {
      result.leftValue.setValue(leftValue);
      result.widthValue.setValue(widthValue);
      result.rightValue.setValue(rightValue);
      result.highlightValue.setValue(highlightValue);
    }
    return result
  });
}

export function Table({
  fields,
  style,
  data,
  keyExtractor = (item) => item.id,
  resizeable = true,
  onValueChange,
  cellWidth = 150,
  resizerWidth = 24,
  borderColor = '#d8dee4',
  highlightBorderColor = 'blue',
  indexCellWidth = 40,
  rowHeight = 36,
  rowHoverdBackgroundColor = '#f6f8fa',
}: {
  /**
   * 行高
   */
  rowHeight?: number,
  /**
   * 单元格宽度
   */
  cellWidth?: number,
  /**
   * 调整列宽的控件宽度
   */
  resizerWidth?: number,
  style?: any,
  keyExtractor?: any,
  resizeable?: booelean,
  onValueChange?: any,
  /**
   * 普通边框
   */
  borderColor?: string,
  /**
   * 高亮边框
   */
  highlightBorderColor?: string,
  /**
   * 字段（决定表格的列）
   */
  fields: any[],
  data: any[],
  /**
   * 序号单元格宽度
   */
  indexCellWidth?: number,
  /**
   * 悬浮行背景颜色
   */
  rowHoverdBackgroundColor?: string,
}) {
  const [internalFields, dispatch] = useReducer(
    (state, action) => {
      if (action.type === 'reindex') {
            console.log(
          'reindex current state',
          JSON.stringify(state.map((item) => item.fieldId))
        );

        const { fromIndex, toIndex } = action.payload;
        const nextState = state.slice();
        const target = nextState[fromIndex];
        nextState.splice(fromIndex, 1);
        nextState.splice(toIndex, 0, target);
        console.log(
          'reindex next state',
          JSON.stringify(nextState.map((item) => item.fieldId))
        );
        // return state;
        // return nextState;
        return resetPosition(
          nextState,
          indexCellWidth,
          cellWidth,
          resizerWidth
        );
      }
      return state;
    },
    fields,
    (fields) => {
      return resetPosition(fields, indexCellWidth, cellWidth, resizerWidth);
    }
  );

  const panController = useRef({}).current
  const [focusedRow, setFocusedRow] = useState(null);
  const [focusedField, setFocusedField] = useState(null);
  const [userSelect] = useState('none');

  const focusCell = useCallback(
    ({ fieldId, rowId }: { fieldId: string, rowId: string }) => {
      setFocusedField(fieldId);
      setFocusedRow(rowId);
    },
    []
  );

  const reIndex = useCallback(
    (payload: { fromIndex: number, toIndex: number }) => {
      dispatch({ type: 'reindex', payload });
    },
    []
  );

  const value = useMemo(() => {
    const totalWidth = internalFields.reduce((total, item) => {
      return total + item.width;
    }, indexCellWidth);

    return {
      panController,
      resizerWidth,
      resizeable,
      totalWidth,
      fields: internalFields,
      data,
      keyExtractor,
      cellWidth,
      borderColor,
      highlightBorderColor,
      rowHoverdBackgroundColor,
      rowHeight,
      focusCell,
      focusedField,
      focusedRow,
      indexCellWidth,
      reIndex,
    };
  }, [
    reIndex,
    panController,
    rowHeight,
    cellWidth,
    borderColor,
    resizerWidth,
    internalFields,
    resizeable,
    data,
    keyExtractor,
    highlightBorderColor,
    rowHoverdBackgroundColor,
    focusCell,
    focusedField,
    focusedRow,
    indexCellWidth,
  ]);

  useEffect(() => {
    return () => {};
  }, []);

  useEffect(() => {
    if (onValueChange) {
      onValueChange(value);
    }
  }, [value, onValueChange]);
  return (
    <TableContext.Provider value={value}>
      <Animated.FlatList
        style={[
          {
            userSelect,
            overflow: 'auto',
            borderRadius: 2,
            borderColor,
            borderTopWidth: 1,
            borderRightWidth: 1,
            borderLeftWidth: 1,
            borderBottomWidth: 1,
          },
          style,
        ]}
        stickyHeaderIndices={[0]}
        ListHeaderComponent={TableHead}
        keyExtractor={keyExtractor}
        data={data}
        renderItem={(data) => {
          return <TableRow {...data}></TableRow>;
        }}></Animated.FlatList>
    </TableContext.Provider>
  );
}